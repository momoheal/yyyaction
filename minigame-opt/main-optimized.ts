import { fakeElement } from '../src/minigame/adapter';
import { Game, Renderer, Input, LOADOUTS, getRaidMap, type RaidResult } from './core.js';
import { Sfx } from '../src/game/audio';
import { Music, trackFor } from '../src/game/music';
import { insertScore, loadSave, writeSave } from '../src/game/storage';
import { showRewarded } from './ads';
import { COIN_AD_DAILY_LIMIT, COIN_AD_REWARD, REVIVE_ARMOR_RATIO, REVIVE_HP_RATIO } from './config';
import { drawUi, hitUi, type Hit, type Screen, type UiState } from './ui';

type RaidMapId = string;
type SaveData = ReturnType<typeof loadSave>;
type ScoreEntry = SaveData['scores'][number];

const KEY_COIN_DAY = 'duckops.coinaday.v1';
const KEY_COIN_COUNT = 'duckops.coinacount.v1';

function today() { return new Date().toISOString().slice(0, 10); }

function coinAdsToday() {
  try {
    if (wx.getStorageSync<string>(KEY_COIN_DAY) !== today()) {
      wx.setStorageSync(KEY_COIN_DAY, today());
      wx.setStorageSync(KEY_COIN_COUNT, 0);
      return 0;
    }
    return Number(wx.getStorageSync<number>(KEY_COIN_COUNT) || 0);
  } catch { return 0; }
}

function setCoinAdsToday(n: number) {
  wx.setStorageSync(KEY_COIN_DAY, today());
  wx.setStorageSync(KEY_COIN_COUNT, n);
}

function affordableLoadout(id: string, stash: number) {
  return LOADOUTS.find((l: any) => l.id === id && l.cost <= stash) ?? LOADOUTS[0];
}

const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
let W = info.windowWidth, H = info.windowHeight;

const canvas = (document.createElement('canvas') as HTMLCanvasElement);
canvas.width = Math.round(W * Math.min(info.pixelRatio || 1, 2));
canvas.height = Math.round(H * Math.min(info.pixelRatio || 1, 2));

const sfx = new Sfx();
const music = new Music();
const input = new Input(fakeElement as unknown as HTMLElement);
input.touchMode = true;
input.enabled = false;
input.setSize(W, H);
input.onPause = () => pause();

const game = new Game(sfx as any, input as any);
const renderer = new Renderer(canvas);
renderer.bind(game);
renderer.resize(W, H, game);

let save: SaveData = loadSave();
let kit = affordableLoadout(save.kit, save.stash).id;
let mapId: RaidMapId = 'island';
let screen: Screen = 'menu';
let helpOpen = false;
let result: RaidResult | null = null;
let pendingResult: RaidResult | null = null;
let revivedThisRaid = false;
let training = false;
let hits: Hit[] = [];
let lastTime = Date.now();
let musicCombatHold = 0;

function commit(s: SaveData) { save = s; writeSave(s); }

function commitResult(r: RaidResult) {
  const s = save;
  const ok = r.outcome === 'extract';
  if (r.training) {
    const reward = ok && !s.trainingCompleted ? r.value : 0;
    if (reward) commit({ ...s, stash: s.stash + reward, trainingCompleted: true, firstRun: false } as SaveData);
    result = r;
    return;
  }
  const stash = s.stash + (ok ? r.value + r.kitCost : 0);
  let list = s.scores;
  let rank = -1;
  if (r.score > 0) {
    const entry: ScoreEntry = {
      score: r.score, outcome: r.outcome, value: ok ? r.value : 0, kills: r.kills, time: Math.round(r.time), date: Date.now(), kit: r.kit, mapId: r.mapId, characterId: r.characterId,
      best: ok ? r.best?.name : undefined, bestIcon: ok ? r.best?.icon : undefined, bestR: ok ? r.best?.rarity : undefined,
    };
    const res = insertScore(s.scores, entry);
    list = res.list;
    rank = res.rank;
  }
  commit({ ...s, stash, scores: list, extracts: s.extracts + (ok ? 1 : 0), bestValue: Math.max(s.bestValue, ok ? r.value : 0) } as SaveData);
  result = r;
  if (rank === 0) wx.vibrateShort?.();
}

game.onGameOver = (r: RaidResult) => {
  if (!r.training && r.outcome === 'dead' && !revivedThisRaid) {
    pendingResult = r;
    screen = 'revive';
    input.enabled = false;
    input.reset();
    sfx.play('death');
  } else {
    commitResult(r);
    screen = 'gameover';
    input.enabled = false;
    input.reset();
  }
};

function deploy(kitId: string, isTraining = false) {
  if (screen === 'playing') return;
  const s = save;
  if (!isTraining && getRaidMap(mapId).requiredExtracts > s.extracts) {
    wx.showToast({ title: `需正式撤离 ${getRaidMap(mapId).requiredExtracts} 次解锁`, icon: 'none' });
    return;
  }
  sfx.unlock();
  music.unlock();
  const k = affordableLoadout(kitId, s.stash);
  training = isTraining;
  revivedThisRaid = false;
  pendingResult = null;
  result = null;
  if (!isTraining) commit({ ...s, stash: s.stash - k.cost, kit: k.id, raids: s.raids + 1, firstRun: false } as SaveData);
  kit = k.id;
  input.reset();
  // 优化版 startRaid 第6参数为角色强化 upgrades
  game.startRaid(k.id, isTraining, mapId, s.characterId, undefined, s.upgrades);
  screen = 'playing';
  input.enabled = true;
}

function toMenu() {
  game.startDemo();
  music.setPaused(false);
  screen = 'menu';
  input.enabled = false;
  input.reset();
  result = null;
  pendingResult = null;
}

function pause() {
  if (screen !== 'playing') return;
  sfx.play('ui');
  music.setPaused(true);
  screen = 'paused';
  input.enabled = false;
  input.reset();
}

function resume() {
  sfx.unlock();
  music.unlock();
  music.setPaused(false);
  sfx.play('ui');
  screen = 'playing';
  input.enabled = true;
}

function stats() {
  return { time: game.timeLimit - game.t, value: game.lootValue, kills: game.stats.kills, items: game.player.backpack.length };
}

async function watchAd(kind: 'revive' | 'coins') {
  sfx.unlock();
  const ok = await showRewarded(kind);
  if (!ok) return;
  if (kind === 'revive') {
    if (pendingResult && game.revive(REVIVE_HP_RATIO, REVIVE_ARMOR_RATIO)) {
      revivedThisRaid = true;
      pendingResult = null;
      screen = 'playing';
      input.enabled = true;
      input.reset();
      wx.showToast({ title: '复活成功', icon: 'success' });
    }
    return;
  }
  const n = coinAdsToday();
  if (n >= COIN_AD_DAILY_LIMIT) { wx.showToast({ title: '今日次数已用完', icon: 'none' }); return; }
  setCoinAdsToday(n + 1);
  commit({ ...save, stash: save.stash + COIN_AD_REWARD, firstRun: false } as SaveData);
  sfx.play('r3');
  wx.showToast({ title: `+¥${COIN_AD_REWARD.toLocaleString('en-US')}`, icon: 'success' });
}

function handleUiTap(id: string) {
  sfx.unlock();
  music.unlock();
  if (id === 'help') { helpOpen = true; sfx.play('ui'); return; }
  if (id === 'closehelp') { helpOpen = false; sfx.play('ui'); return; }
  if (helpOpen) return;
  sfx.play('ui');
  if (id === 'nav:chars') { screen = 'chars'; return; }
  if (id === 'nav:maps') { screen = 'maps'; return; }
  if (id === 'nav:kits') { screen = 'kits'; return; }
  if (id === 'back') { screen = 'menu'; return; }
  if (id === 'mute') { commit({ ...save, muted: !save.muted } as SaveData); sfx.setMuted(save.muted); music.setMuted(save.muted); return; }
  if (id === 'adcoin') { void watchAd('coins'); return; }
  if (id === 'revive') { void watchAd('revive'); return; }
  if (id === 'skiprevive') {
    if (pendingResult) { commitResult(pendingResult); pendingResult = null; }
    screen = 'gameover';
    return;
  }
  if (id.startsWith('kit:')) {
    const l = LOADOUTS.find((x: any) => x.id === id.slice(4));
    if (l && save.stash >= l.cost) kit = l.id;
    return;
  }
  if (id.startsWith('char:')) {
    const c = id.slice(5);
    if (c === 'duck' || c === 'tank' || c === 'scout') commit({ ...save, characterId: c } as SaveData);
    return;
  }
  if (id.startsWith('map:')) {
    const m = id.slice(4) as RaidMapId;
    if (getRaidMap(m).requiredExtracts <= save.extracts) mapId = m;
    return;
  }
  switch (id) {
    case 'deploy': deploy(kit); break;
    case 'training': deploy(kit, true); break;
    case 'resume': resume(); break;
    case 'restart': deploy(kit, training); break;
    case 'quit': toMenu(); break;
    case 'retry': deploy(kit, !!result?.training && result.outcome !== 'extract'); break;
    case 'menu': toMenu(); break;
  }
}

wx.onTouchStart((e) => {
  if (screen === 'playing') return;
  const t = e.changedTouches[e.changedTouches.length - 1];
  if (!t) return;
  const id = hitUi(hits, t.clientX, t.clientY);
  if (id) handleUiTap(id);
});

wx.onShow(() => { lastTime = Date.now(); if (screen === 'playing') pause(); });
wx.onHide(() => { if (screen === 'playing') pause(); });

sfx.setMuted(save.muted);
music.setMuted(save.muted);

function loop() {
  const now = Date.now();
  let dt = (now - lastTime) / 1000;
  lastTime = now;
  if (dt > 0.25) dt = 0.25;
  if (dt <= 0) dt = 0.001;
  const step = Math.min(dt, 1 / 30);
  input.hasHealing = game.player.bandages + game.player.medkits > 0;
  const carried = Object.values(game.player.throwables);
  input.hasGrenade = carried.some((n) => Number(n) > 0);
  input.hasThrowableNext = carried.filter((n) => Number(n) > 0).length > 1;
  input.hasSecondWeapon = game.player.weapons.every(Boolean);
  input.dropLowestEnabled = game.player.backpack.length > 0;
  input.bagOpen = screen === 'playing' && game.bagOpen && !game.player.dead && !game.ended;
  if (screen === 'playing') game.update(step);
  else if (screen === 'menu' || screen === 'chars' || screen === 'maps' || screen === 'kits') game.updateDemo(step);
  else game.updateIdle(step);

  music.update(dt);
  if (screen === 'playing' || screen === 'gameover') {
    const p = game.player;
    const live = game.enemies.filter((e: any) => !e.dead && e.state !== 'idle' && e.state !== 'search');
    if (live.some((e: any) => Math.hypot(e.x - p.x, e.y - p.y) < 1100 && (e.canSee || e.alertT > 0))) musicCombatHold = 3.2;
    else musicCombatHold = Math.max(0, musicCombatHold - dt);
    const extracting = (!!game.exZone && game.exProg > 0) || (game.ended && game.outcome === 'extract');
    const bossType = game.boss && !game.boss.dead ? game.boss.type : null;
    music.play(trackFor(game.mode, game.mapId, bossType, musicCombatHold > 0, extracting));
  } else if (screen === 'menu' || screen === 'chars' || screen === 'maps' || screen === 'kits') {
    music.play('menu');
  }

  renderer.render(game, input, screen, dt);
  const state: UiState = {
    screen, save, kit, mapId, characterId: save.characterId, result,
    stats: stats(), muted: save.muted, coinAdsToday: coinAdsToday(),
  } as UiState;
  hits = drawUi(renderer.ctx, W, H, renderer.dpr, state, helpOpen, (icon, x, y, size) => renderer.drawIcon(icon, x, y, size));
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
