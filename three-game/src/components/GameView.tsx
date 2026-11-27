import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Game, type RaidResult } from '../game/game';
import { Renderer } from '../game/render';
import { WorldRenderer3D } from '../game/render3d';
import { Input } from '../game/input';
import type { Sfx } from '../game/audio';
import { trackFor, type Music } from '../game/music';
import { RAID_TIME, type CharacterId, type CharacterUpgrades } from '../game/data';
import type { RaidMapId } from '../game/map';
import type { RaidGear } from '../game/warehouse';
import { VEHICLES } from '../game/vehicles';

export type Screen = 'menu' | 'playing' | 'paused' | 'gameover';

export interface GameHandle {
  startRaid(kit: string, training: boolean, mapId: RaidMapId, characterId: CharacterId, gear: RaidGear, upgrades: CharacterUpgrades): void;
  toMenu(): void;
  stats(): { time: number; value: number; kills: number; items: number };
}

interface Props {
  screen: Screen;
  sfx: Sfx;
  music: Music;
  onGameOver: (r: RaidResult) => void;
  onPause: () => void;
  onMute: () => void;
  onReady: () => void;
}

const GameView = forwardRef<GameHandle, Props>(function GameView(props, ref) {
  const worldRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [worldError, setWorldError] = useState(false);
  const gameRef = useRef<Game | null>(null);
  const inputRef = useRef<Input | null>(null);
  const screenRef = useRef<Screen>(props.screen);
  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  });

  useEffect(() => {
    screenRef.current = props.screen;
    const inp = inputRef.current;
    if (inp) {
      inp.reset();
      inp.enabled = props.screen === 'playing';
    }
  }, [props.screen]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let world: WorldRenderer3D;
    try {
      world = new WorldRenderer3D(worldRef.current!);
    } catch (error) {
      console.error('Failed to initialize Three.js', error);
      setWorldError(true);
      propsRef.current.onReady();
      return;
    }
    const input = new Input(canvas);
    const game = new Game(propsRef.current.sfx, input);
    const renderer = new Renderer(canvas, true);
    game.groundFromScreen = (x, y) => world.screenToWorld(game, x, y);
    const project = (x: number, y: number, height?: number) => world.worldToScreen(game, x, y, height);
    renderer.bind(game);
    gameRef.current = game;
    inputRef.current = input;
    (window as unknown as { __duck?: Game }).__duck = game;
    input.enabled = screenRef.current === 'playing';
    game.onGameOver = (r) => propsRef.current.onGameOver(r);
    input.onPause = () => propsRef.current.onPause();
    input.onMute = () => propsRef.current.onMute();

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.resize(w, h, game);
      world.resize(w, h);
      input.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

    let raf = 0;
    let last = performance.now();
    let firstFrame = true;
    // Music stays in combat mode briefly after the last threat, so it doesn't flip-flop.
    let combatHold = 0;
    const perf = { update: 0, render: 0, q: 2 };
    (window as unknown as { __duckPerf?: typeof perf }).__duckPerf = perf;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.25) dt = 0.25;
      if (dt <= 0) dt = 0.001;
      const scr = screenRef.current;
      const step = Math.min(dt, 1 / 30);
      const t0 = performance.now();
      if (scr === 'playing' || scr === 'gameover') game.update(step);
      else if (scr === 'menu') game.updateDemo(step);
      const t1 = performance.now();

      // --- background music: react to the current scene ---
      const music = propsRef.current.music;
      music.update(dt);
      if (scr === 'playing' || scr === 'gameover') {
        const p = game.player;
        const liveEnemies = game.enemies.filter((e) => !e.dead && e.state !== 'idle' && e.state !== 'search');
        const nearbyThreat = liveEnemies.some((e) => Math.hypot(e.x - p.x, e.y - p.y) < 1100 && (e.canSee || e.alertT > 0));
        if (nearbyThreat) combatHold = 3.2;
        else combatHold = Math.max(0, combatHold - dt);
        const extracting = (!!game.exZone && game.exProg > 0) || (game.ended && game.outcome === 'extract');
        const bossType = game.boss && !game.boss.dead ? game.boss.type : null;
        music.play(trackFor(game.mode, game.mapId, bossType, combatHold > 0, extracting));
      } else if (scr === 'menu') {
        music.play('menu');
      }

      const player = game.player;
      input.vehicleControls = game.activeVehicle
        ? (VEHICLES[game.activeVehicle.kind].movement === 'air' ? 'air' : 'ground') : null;
      input.hasHealing = player.bandages + player.medkits > 0;
      const carried = Object.values(player.throwables);
      input.hasGrenade = carried.some((n) => n > 0);
      input.hasThrowableNext = carried.filter((n) => n > 0).length > 1;
      input.hasSecondWeapon = player.weapons.every(Boolean);
      input.dropLowestEnabled = player.backpack.length > 0;
      input.bagOpen = scr === 'playing' && game.bagOpen && !game.player.dead && !game.ended;
      world.render(game);
      renderer.renderOverlay(game, input, scr, dt, project);
      if (firstFrame) {
        firstFrame = false;
        propsRef.current.onReady();
      }
      const t2 = performance.now();
      perf.update = perf.update * 0.95 + (t1 - t0) * 0.05;
      perf.render = perf.render * 0.95 + (t2 - t1) * 0.05;
      perf.q = renderer.quality;
    };
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden && screenRef.current === 'playing') propsRef.current.onPause();
    };
    document.addEventListener('visibilitychange', onVis);
    const onBlur = () => {
      if (screenRef.current === 'playing') propsRef.current.onPause();
    };
    window.addEventListener('blur', onBlur);
    const noGesture = (e: Event) => e.preventDefault();
    document.addEventListener('gesturestart', noGesture);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('gesturestart', noGesture);
      input.destroy();
      world.dispose();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    startRaid: (kit: string, training: boolean, mapId: RaidMapId, characterId: CharacterId, gear: RaidGear, upgrades: CharacterUpgrades) => {
      inputRef.current?.reset();
      gameRef.current?.startRaid(kit, training, mapId, characterId, gear, upgrades);
    },
    toMenu: () => gameRef.current?.startDemo(),
    stats: () => {
      const g = gameRef.current;
      if (!g) return { time: RAID_TIME, value: 0, kills: 0, items: 0 };
      return { time: g.timeLimit - g.t, value: g.lootValue, kills: g.stats.kills, items: g.player.backpack.length };
    },
  }), []);

  return (
    <>
      <canvas ref={worldRef} aria-hidden="true" className="pointer-events-none fixed inset-0 block h-full w-full" />
      <canvas ref={canvasRef} className="fixed inset-0 block h-full w-full touch-none select-none" />
      {worldError && (
        <div role="alert" className="fixed inset-0 z-[100] grid place-items-center bg-[#0d0f12] p-6 text-center text-white">
          当前浏览器无法初始化 3D 画面。请启用硬件加速或换用支持 WebGL 2 的浏览器。
        </div>
      )}
    </>
  );
});

export default GameView;
