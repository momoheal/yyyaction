import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GameView, { type GameHandle, type Screen } from './components/GameView';
import { GameOverScreen, PauseMenu, StartScreen, type GameOverData } from './components/Menus';
import { Sfx } from './game/audio';
import { Music } from './game/music';
import { LOADOUTS, UPGRADE_MAX, upgradePrice } from './game/data';
import type { RaidResult } from './game/game';
import { getRaidMap, type RaidMapId } from './game/map';
import { insertScore, loadSave, writeSave, type SaveData, type ScoreEntry } from './game/storage';
import { availableGear, changeStock, gearDef, hasWarehouseLoadout, normalizeConsumables, raidGearItems, sameGear, tuningPrice, warehouseLoadout, WAREHOUSE_KIT, type RaidGear } from './game/warehouse';
import type { WarehouseAction } from './components/Armory';

function affordableLoadout(id: string, stash: number) {
  return LOADOUTS.find((loadout) => loadout.id === id && loadout.cost <= stash) ?? LOADOUTS[0];
}

export default function App() {
  const sfx = useMemo(() => new Sfx(), []);
  const music = useMemo(() => new Music(), []);
  const [save, setSave] = useState<SaveData>(() => loadSave());
  const saveRef = useRef(save);
  const [screen, setScreen] = useState<Screen>('menu');
  const screenRef = useRef<Screen>('menu');
  const [kit, setKit] = useState(() => save.kit === WAREHOUSE_KIT ? save.kit : affordableLoadout(save.kit, save.stash).id);
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
    music.setMuted(save.muted);
  }, [sfx, music, save.muted]);

  // Browsers only allow audio after a user gesture. Start the lobby theme on first interaction.
  useEffect(() => {
    const start = () => {
      music.unlock();
      music.play('menu');
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [music]);

  const toggleMute = useCallback(() => {
    const s = saveRef.current;
    commit({ ...s, muted: !s.muted });
  }, [commit]);

  const changeWarehouse = (action: WarehouseAction) => {
    const s = saveRef.current;
    const { items, selected } = s.warehouse;
    if (action.type === 'select') {
      const next: RaidGear = {
        weapon: items.find((item) => sameGear(selected.weapon, item)),
        armor: items.find((item) => sameGear(selected.armor, item)),
        consumables: selected.consumables,
      };
      const item = action.gear;
      if (item && (gearDef(item.id)?.kind !== action.slot || !items.some((row) => sameGear(item, row)))) return;
      next[action.slot] = item && { id: item.id, tuned: item.tuned };
      const nextKit = hasWarehouseLoadout(next) ? WAREHOUSE_KIT : LOADOUTS[0].id;
      setKit(nextKit);
      commit({ ...s, kit: nextKit, warehouse: { items, selected: next } });
      return;
    }
    if (action.type === 'consumable') {
      const c = normalizeConsumables(selected.consumables);
      if (action.key === 'bandages') c.bandages += action.delta;
      else if (action.key === 'medkits') c.medkits += action.delta;
      else c.throwables[action.key] = (c.throwables[action.key] ?? 0) + action.delta;
      const next: RaidGear = { ...selected, consumables: normalizeConsumables(c) };
      const nextKit = hasWarehouseLoadout(next) ? WAREHOUSE_KIT : LOADOUTS[0].id;
      setKit(nextKit);
      commit({ ...s, kit: nextKit, warehouse: { items, selected: next } });
      return;
    }
    if (action.type === 'upgrade') {
      const level = s.upgrades[action.key];
      if (level >= UPGRADE_MAX) return;
      const cost = upgradePrice(action.key, level);
      if (s.stash < cost) return;
      commit({ ...s, stash: s.stash - cost, upgrades: { ...s.upgrades, [action.key]: level + 1 } });
      return;
    }
    const def = gearDef(action.id);
    if (!def || def.kind !== 'weapon') return;
    const gear = { id: action.id, tuned: false };
    if (action.type === 'buy') {
      if (s.stash < def.value) return;
      commit({ ...s, stash: s.stash - def.value, warehouse: { items: changeStock(items, gear, 1), selected } });
    } else {
      const cost = tuningPrice(def);
      const source = items.find((item) => item.id === gear.id && (!item.tuned || (item.mod ?? 'stable') !== action.mod)) ?? items.find((item) => sameGear(gear, item));
      if (s.stash < cost || !source) return;
      const tuned = { id: action.id, tuned: true, mod: action.mod };
      commit({ ...s, stash: s.stash - cost, warehouse: {
        items: changeStock(changeStock(items, source, -1), tuned, 1),
        selected: sameGear(selected.weapon, source) ? { ...selected, weapon: tuned } : selected,
      } });
    }
  };

  const deploy = useCallback((kitId: string, training = false) => {
    const game = gameRef.current;
    if (!game || screenRef.current === 'playing') return;
    const s = saveRef.current;
    if (!training && getRaidMap(mapId).requiredExtracts > s.extracts) return;
    sfx.unlock();
    music.unlock();
    try {
      const de = document.documentElement;
      if (window.matchMedia('(pointer: coarse)').matches && !document.fullscreenElement && de.requestFullscreen) void de.requestFullscreen().catch(() => {});
    } catch { /* fullscreen unsupported */ }
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<unknown> } };
      if (nav.wakeLock) void nav.wakeLock.request('screen').catch(() => {});
    } catch { /* wake lock unsupported */ }
    let gear = !training && kitId === WAREHOUSE_KIT ? availableGear(s.warehouse) : {};
    let k = hasWarehouseLoadout(gear) ? warehouseLoadout(gear) : affordableLoadout(kitId, s.stash);
    if (k.cost > s.stash) {
      // Custom supplies must never drive the stash negative — fall back to a free run.
      gear = {};
      k = LOADOUTS[0];
    }
    const equipped = raidGearItems(gear);
    trainingRef.current = training;
    if (!training) {
      const items = equipped.reduce((stock, item) => changeStock(stock, item, -1), s.warehouse.items);
      commit({ ...s, stash: s.stash - k.cost, kit: k.id, raids: s.raids + 1, firstRun: false, warehouse: { ...s.warehouse, items } });
      setKit(k.id);
    }
    setOver(null);
    game.startRaid(k.id, training, mapId, s.characterId, gear, s.upgrades);
    transition('playing');
  }, [commit, mapId, sfx, music, transition]);

  const pause = useCallback(() => {
    if (screenRef.current !== 'playing') return;
    const st = gameRef.current?.stats();
    if (st) setPauseStats(st);
    sfx.play('ui');
    music.setPaused(true);
    transition('paused');
  }, [sfx, music, transition]);

  const resume = useCallback(() => {
    sfx.unlock();
    music.setPaused(false);
    sfx.play('ui');
    transition('playing');
  }, [sfx, music, transition]);

  const toMenu = useCallback(() => {
    gameRef.current?.toMenu();
    music.setPaused(false);
    setOver(null);
    transition('menu');
  }, [music, transition]);

  const onGameOver = useCallback((r: RaidResult) => {
    if (screenRef.current === 'gameover') return;
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
    const stash = s.stash + (ok ? r.cashValue + r.kitCost : 0);
    const gear = ok ? [...r.usedGear, ...r.foundGear] : [];
    const stock = gear.reduce((items, item) => changeStock(items, item, 1), s.warehouse.items);
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
    commit({ ...s, stash, scores: list, extracts: s.extracts + (ok ? 1 : 0), bestValue: Math.max(s.bestValue, ok ? r.value : 0), warehouse: { ...s.warehouse, items: stock } });
    setOver({ r, rank, stashBefore: s.stash, stashAfter: stash });
    overAt.current = performance.now();
  }, [commit, transition]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.defaultPrevented || document.activeElement?.closest('dialog[open]')) return;
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

  const gear = availableGear(save.warehouse);
  const kitObj = kit === WAREHOUSE_KIT && hasWarehouseLoadout(gear) ? warehouseLoadout(gear) : affordableLoadout(kit, save.stash);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0d0f12] text-white">
      <GameView ref={gameRef} screen={screen} sfx={sfx} music={music} onGameOver={onGameOver} onPause={pause} onMute={toggleMute} />
      {screen === 'menu' && (
        <StartScreen
          save={save}
          kit={kitObj}
          mapId={mapId}
          onMap={setMapId}
          onWarehouse={changeWarehouse}
          onUseWarehouse={() => { setKit(WAREHOUSE_KIT); commit({ ...saveRef.current, kit: WAREHOUSE_KIT }); }}
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
        <GameOverScreen data={over} scores={save.scores} onRetry={() => deploy(kit, over.r.training && over.r.outcome !== 'extract')} onMenu={toMenu} canRetryKit={kitObj.id === kit} />
      )}
    </div>
  );
}
