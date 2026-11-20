import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GameView, { type GameHandle, type Screen } from './components/GameView';
import { GameOverScreen, PauseMenu, StartScreen, type GameOverData } from './components/Menus';
import { Sfx } from './game/audio';
import { LOADOUTS } from './game/data';
import type { RaidResult } from './game/game';
import { getRaidMap, type RaidMapId } from './game/map';
import { insertScore, loadSave, writeSave, type SaveData, type ScoreEntry } from './game/storage';

function affordableLoadout(id: string, stash: number) {
  return LOADOUTS.find((loadout) => loadout.id === id && loadout.cost <= stash) ?? LOADOUTS[0];
}

export default function App() {
  const sfx = useMemo(() => new Sfx(), []);
  const [save, setSave] = useState<SaveData>(() => loadSave());
  const saveRef = useRef(save);
  const [screen, setScreen] = useState<Screen>('menu');
  const screenRef = useRef<Screen>('menu');
  const [kit, setKit] = useState(() => affordableLoadout(save.kit, save.stash).id);
  const [mapId, setMapId] = useState<RaidMapId>('island');
  const [over, setOver] = useState<GameOverData | null>(null);
  const [pauseStats, setPauseStats] = useState({ time: 0, value: 0, kills: 0, items: 0 });
  const gameRef = useRef<GameHandle>(null);
  const overAt = useRef(0);
  const trainingRef = useRef(false);

  const transition = useCallback((next: Screen) => {
    screenRef.current = next;
    setScreen(next);
  }, []);

  const commit = useCallback((s: SaveData) => {
    saveRef.current = s;
    setSave(s);
    writeSave(s);
  }, []);

  useEffect(() => {
    sfx.setMuted(save.muted);
  }, [sfx, save.muted]);

  const toggleMute = useCallback(() => {
    const s = saveRef.current;
    commit({ ...s, muted: !s.muted });
  }, [commit]);

  const deploy = useCallback((kitId: string, training = false) => {
    const game = gameRef.current;
    if (!game || screenRef.current === 'playing') return;
    const s = saveRef.current;
    if (!training && getRaidMap(mapId).requiredExtracts > s.extracts) return;
    sfx.unlock();
    try {
      const de = document.documentElement;
      if (window.matchMedia('(pointer: coarse)').matches && !document.fullscreenElement && de.requestFullscreen) void de.requestFullscreen().catch(() => {});
    } catch { /* fullscreen unsupported */ }
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<unknown> } };
      if (nav.wakeLock) void nav.wakeLock.request('screen').catch(() => {});
    } catch { /* wake lock unsupported */ }
    const k = affordableLoadout(kitId, s.stash);
    trainingRef.current = training;
    if (!training) {
      commit({ ...s, stash: s.stash - k.cost, kit: k.id, raids: s.raids + 1, firstRun: false });
      setKit(k.id);
    }
    setOver(null);
    game.startRaid(k.id, training, mapId, s.characterId);
    transition('playing');
  }, [commit, mapId, sfx, transition]);

  const pause = useCallback(() => {
    if (screenRef.current !== 'playing') return;
    const st = gameRef.current?.stats();
    if (st) setPauseStats(st);
    sfx.play('ui');
    transition('paused');
  }, [sfx, transition]);

  const resume = useCallback(() => {
    sfx.unlock();
    sfx.play('ui');
    transition('playing');
  }, [sfx, transition]);

  const toMenu = useCallback(() => {
    gameRef.current?.toMenu();
    setOver(null);
    transition('menu');
  }, [transition]);

  const onGameOver = useCallback((r: RaidResult) => {
    transition('gameover');
    const s = saveRef.current;
    const ok = r.outcome === 'extract';
    if (r.training) {
      const reward = ok && !s.trainingCompleted ? r.value : 0;
      if (reward) commit({ ...s, stash: s.stash + reward, trainingCompleted: true, firstRun: false });
      setOver({ r, rank: -1, stashBefore: s.stash, stashAfter: s.stash + reward });
      overAt.current = performance.now();
      return;
    }
    const stash = s.stash + (ok ? r.value + r.kitCost : 0);
    let list = s.scores;
    let rank = -1;
    if (r.score > 0) {
      const entry: ScoreEntry = {
        score: r.score, outcome: r.outcome, value: ok ? r.value : 0, kills: r.kills, time: Math.round(r.time), date: Date.now(), kit: r.kit, mapId: r.mapId,
        characterId: r.characterId,
        best: ok ? r.best?.name : undefined, bestIcon: ok ? r.best?.icon : undefined, bestR: ok ? r.best?.rarity : undefined,
      };
      const res = insertScore(s.scores, entry);
      list = res.list;
      rank = res.rank;
    }
    commit({ ...s, stash, scores: list, extracts: s.extracts + (ok ? 1 : 0), bestValue: Math.max(s.bestValue, ok ? r.value : 0) });
    setOver({ r, rank, stashBefore: s.stash, stashAfter: stash });
    overAt.current = performance.now();
  }, [commit, transition]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.defaultPrevented) return;
      const c = e.code;
      if ((c === 'Enter' || c === 'Space') && e.target instanceof HTMLElement && e.target.closest('button, select')) return;
      const current = screenRef.current;
      if (current === 'playing') {
        if (c === 'Escape' || c === 'KeyP') { e.preventDefault(); pause(); }
      } else if (current === 'paused') {
        if (c === 'Escape' || c === 'KeyP' || c === 'Enter') { e.preventDefault(); resume(); }
      } else if (current === 'menu') {
        if (c === 'Enter') { e.preventDefault(); deploy(kit, !saveRef.current.trainingCompleted); }
      } else if (current === 'gameover') {
        if (performance.now() - overAt.current < 700) return;
        if (c === 'Enter' || c === 'Space' || c === 'KeyR') { e.preventDefault(); deploy(kit, !!over?.r.training && over.r.outcome !== 'extract'); }
        else if (c === 'Escape') toMenu();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [kit, deploy, pause, resume, toMenu, over]);

  const kitObj = LOADOUTS.find((l) => l.id === kit) ?? LOADOUTS[0];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0d0f12] text-white">
      <GameView ref={gameRef} screen={screen} sfx={sfx} onGameOver={onGameOver} onPause={pause} onMute={toggleMute} />
      {screen === 'menu' && (
        <StartScreen
          save={save}
          kit={affordableLoadout(kit, save.stash).id}
          mapId={mapId}
          onMap={setMapId}
          onCharacter={(characterId) => { sfx.unlock(); sfx.play('ui'); commit({ ...saveRef.current, characterId }); }}
          onKit={(k) => { sfx.unlock(); sfx.play('ui'); setKit(k); }}
          onDeploy={() => deploy(kit)}
          onTraining={() => deploy(kit, true)}
          muted={save.muted}
          onMute={toggleMute}
        />
      )}
      {screen === 'paused' && (
        <PauseMenu
          stats={pauseStats}
          onResume={resume}
          training={trainingRef.current}
          onRestart={() => {
            if (trainingRef.current || window.confirm('重新部署会放弃本局，并扣除下一局的装备费（如有）。确定重开？')) {
              deploy(kit, trainingRef.current);
            }
          }}
          onQuit={() => {
            if (trainingRef.current || window.confirm('返回大厅会放弃本局物资和出击装备。确定放弃？')) toMenu();
          }}
          muted={save.muted}
          onMute={toggleMute}
        />
      )}
      {screen === 'gameover' && over && (
        <GameOverScreen data={over} scores={save.scores} onRetry={() => deploy(kit, over.r.training && over.r.outcome !== 'extract')} onMenu={toMenu} canRetryKit={save.stash >= kitObj.cost} />
      )}
    </div>
  );
}
