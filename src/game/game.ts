import {
  ARMORS, CONTAINER_DEFS, ENEMIES, EXTRACT_TIME, ITEM_BANDAGE, ITEM_GRENADE, ITEM_MEDKIT, LOADOUTS, LOOT, LOOT_BY_RARITY,
  RAID_TIME, RARITY_COLORS, RARITY_NAMES, SEARCH_TIME, WEAPONS, fmtMoney, weaponItem,
  type EnemyDef, type EnemyType, type ItemDef, type Loadout, type WeaponDef,
} from './data';
import { buildMap, buildTrainingMap, F_BULLET, F_MOVE, F_SIGHT, type GameMap, type Solid } from './map';
import { Grid, Nav, segCircle, type Hit } from './physics';
import type { Sfx } from './audio';
import type { Input } from './input';

export const TAU = Math.PI * 2;
export const P_SPARK = 0, P_FEATHER = 1, P_SMOKE = 2, P_FIRE = 3, P_DEBRIS = 4, P_CASING = 5, P_RING = 6, P_DUST = 7, P_STAR = 8, P_MUZZLE = 9;

export interface WeaponInst { def: WeaponDef; ammo: number; reloadT: number; cd: number }
export interface LootItem { def: ItemDef; revealed: boolean; taken: boolean; at: number }
export interface Container {
  id: number; type: string; name: string; x: number; y: number; w: number; h: number;
  items: LootItem[]; revealed: number; body: boolean; etype?: EnemyType; angle: number; open: number; shake: number;
}
export interface Player {
  x: number; y: number; vx: number; vy: number; kvx: number; kvy: number; r: number; aim: number;
  hp: number; maxHp: number; armor: number; armorMax: number;
  weapons: (WeaponInst | null)[]; cur: number;
  rollT: number; rollCd: number; rollDx: number; rollDy: number;
  healT: number; healDur: number; healType: 'bandage' | 'medkit' | null;
  bandages: number; medkits: number; grenades: number;
  backpack: LootItem[]; capacity: number;
  walk: number; hurtT: number; dead: boolean; bloom: number; stepAcc: number; kick: number; flash: number;
}
export type EState = 'idle' | 'react' | 'engage' | 'hunt' | 'search';
export interface Enemy {
  id: number; type: EnemyType; def: EnemyDef; x: number; y: number; vx: number; vy: number; kvx: number; kvy: number; r: number;
  hp: number; maxHp: number; armor: number; armorMax: number; aim: number;
  state: EState; homeX: number; homeY: number; tx: number; ty: number;
  weapon: WeaponDef | null; ammo: number; reloadT: number; cd: number; burst: number; burstPause: number;
  losT: number; los: boolean; canSee: boolean; vis: boolean; visA: number; lastX: number; lastY: number; lostT: number; huntT: number;
  strafe: number; strafeT: number; reactT: number; alertT: number; qT: number; flash: number; walk: number; atkCd: number;
  special: string | null; specialT: number; cdx: number; cdy: number; honkCd: number; chargeCd: number; wanderT: number;
  dead: boolean; kick: number; hurtT: number;
}
export interface Bullet { x: number; y: number; ox: number; oy: number; vx: number; vy: number; dmg: number; life: number; from: 0 | 1; pierce: number; hit: number; src: Enemy | null; w: number; crit: boolean }
export interface Particle { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; max: number; size: number; color: string; type: number; rot: number; vr: number; drag: number; grow: number }
export interface FText { x: number; y: number; text: string; color: string; life: number; max: number; size: number; vy: number }
export interface Grenade { x: number; y: number; z: number; vx: number; vy: number; vz: number; fuse: number; spin: number }
export interface Light { x: number; y: number; r: number; color: string; life: number; max: number }
export interface Decal { x: number; y: number; r: number; rot: number }
export interface Beam { x: number; y: number; color: string; life: number; max: number }
export interface Msg { text: string; color: string; t: number }
export interface Banner { text: string; sub: string; color: string; t: number; dur: number }
export interface ExtractZone { id: string; name: string; x: number; y: number; r: number }
export type Outcome = 'extract' | 'dead' | 'mia';
export interface ResultItem { name: string; icon: string; rarity: number; value: number }
export interface RaidResult {
  training: boolean; outcome: Outcome; items: ResultItem[]; value: number; killScore: number; kills: number; killsBy: Record<string, number>;
  time: number; score: number; kit: string; kitCost: number; best: ResultItem | null;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const randInt = (a: number, b: number) => Math.floor(a + Math.random() * (b - a + 1));
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const angDiff = (a: number, b: number) => {
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};
const turnToward = (a: number, b: number, maxStep: number) => {
  const d = angDiff(a, b);
  return a + clamp(d, -maxStep, maxStep);
};
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 1.4;
function pickIndex(w: number[]): number {
  let s = 0;
  for (const x of w) s += x;
  let r = Math.random() * s;
  for (let i = 0; i < w.length; i++) { r -= w[i]; if (r <= 0) return i; }
  return w.length - 1;
}
function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const FEATHER_COLORS: Record<string, string[]> = {
  bandit: ['#a3abb0', '#2f7d4f', '#ffffff', '#8d969c'],
  elite: ['#3a3f45', '#23272b', '#5a6068'],
  chicken: ['#ffffff', '#f3ead8', '#e23b3b'],
  goose: ['#ffffff', '#f0f0ea', '#ff8a1e', '#ffffff'],
  player: ['#ffd43b', '#fff1a8', '#ffffff', '#f2c12e'],
};

export class Game {
  map: GameMap;
  grid: Grid;
  nav: Nav;
  sfx: Sfx;
  input: Input;
  mode: 'demo' | 'raid' = 'demo';
  t = 0;
  realT = 0;
  hitstop = 0;
  slowT = 0;
  slowScale = 1;
  player!: Player;
  enemies: Enemy[] = [];
  bullets: Bullet[] = [];
  particles: Particle[] = [];
  texts: FText[] = [];
  containers: Container[] = [];
  grenades: Grenade[] = [];
  lights: Light[] = [];
  decals: Decal[] = [];
  beams: Beam[] = [];
  msgs: Msg[] = [];
  banner: Banner | null = null;
  dmgInds: { ang: number; t: number }[] = [];
  extracts: ExtractZone[] = [];
  exZone: ExtractZone | null = null;
  exProg = 0;
  exWaves = new Set<string>();
  cam = { x: 1600, y: 1200, zoom: 1, base: 1, trauma: 0, punch: 0, kx: 0, ky: 0, sx: 0, sy: 0, endZoom: 1 };
  hitmark = { t: 0, kill: false };
  search: { c: Container; t: number; tick: number } | null = null;
  nearC: Container | null = null;
  stats = { kills: 0, killScore: 0, killsBy: {} as Record<string, number>, shots: 0, hits: 0 };
  waveT = 50;
  navT = 0;
  nextId = 1;
  kit: Loadout = LOADOUTS[0];
  boss: Enemy | null = null;
  bossSeen = false;
  zoneName = '';
  zoneT = 0;
  tutorialT = 0;
  training = false;
  get timeLimit() { return this.training ? 90 : RAID_TIME; }
  booms: { x: number; y: number; t: number; r: number; dmg: number }[] = [];
  flash = { t: 0, color: '255,255,255' };
  ended = false;
  endT = 0;
  endSent = false;
  outcome: Outcome | null = null;
  warned60 = false;
  dodgeT = 0;
  bufRoll = 0;
  bufHeal = 0;
  bufNade = 0;
  streak = 0;
  lastKillT = -10;
  aimDist = 200;
  maxParticles = 700;
  viewW = 1280;
  viewH = 720;
  barrels: Solid[];
  onGameOver: (r: RaidResult) => void = () => {};
  private hit: Hit = { t: 0, s: null, nx: 0, ny: 0 };
  private mv = { x: 0, y: 0 };
  private fd = { x: 0, y: 0 };
  private dv = { x: 0, y: 0 };

  constructor(sfx: Sfx, input: Input) {
    this.sfx = sfx;
    this.input = input;
    this.map = buildMap();
    this.grid = new Grid(this.map.w, this.map.h, this.map.solids);
    this.nav = new Nav(this.map.w, this.map.h, this.grid);
    this.barrels = this.map.solids.filter((s) => s.kind === 'barrel');
    this.startDemo();
  }

  // ---------------------------------------------------------------- setup
  private selectMap(training: boolean) {
    if (training === this.training) return;
    this.training = training;
    this.map = training ? buildTrainingMap() : buildMap();
    this.grid = new Grid(this.map.w, this.map.h, this.map.solids);
    this.nav = new Nav(this.map.w, this.map.h, this.grid);
    this.barrels = this.map.solids.filter((s) => s.kind === 'barrel');
  }

  private resetWorld() {
    this.input.interactVisible = false;
    this.dodgeT = 0; this.bufRoll = 0; this.bufHeal = 0; this.bufNade = 0;
    this.t = 0;
    this.enemies = []; this.bullets = []; this.particles = []; this.texts = []; this.containers = [];
    this.grenades = []; this.lights = []; this.decals = []; this.beams = []; this.msgs = []; this.dmgInds = []; this.booms = [];
    this.banner = null; this.exZone = null; this.exProg = 0; this.exWaves.clear(); this.search = null; this.nearC = null;
    this.stats = { kills: 0, killScore: 0, killsBy: {}, shots: 0, hits: 0 };
    this.boss = null; this.bossSeen = false; this.ended = false; this.streak = 0; this.lastKillT = -10; this.endT = 0; this.endSent = false; this.outcome = null;
    this.warned60 = false; this.hitstop = 0; this.slowT = 0; this.zoneName = ''; this.zoneT = 0;
    this.cam.trauma = 0; this.cam.punch = 0; this.cam.kx = 0; this.cam.ky = 0; this.cam.endZoom = 1;
    for (const b of this.barrels) { b.dead = false; b.hp = 20; }
    for (const spot of this.map.containers) {
      const d = CONTAINER_DEFS[spot.type];
      this.containers.push({ id: this.nextId++, type: spot.type, name: d.name, x: spot.x, y: spot.y, w: d.w, h: d.h, items: this.training ? [{ def: LOOT.find((item) => item.id === 'battery')!, revealed: false, taken: false, at: 0 }] : this.rollItems(spot.type), revealed: 0, body: false, angle: 0, open: 0, shake: 0 });
    }
  }

  private makeWeapon(id: string): WeaponInst {
    const def = WEAPONS[id];
    return { def, ammo: def.mag, reloadT: 0, cd: 0 };
  }

  private makePlayer(x: number, y: number, kit: Loadout): Player {
    return {
      x, y, vx: 0, vy: 0, kvx: 0, kvy: 0, r: 15, aim: 0, hp: 100, maxHp: 100, armor: kit.armor, armorMax: kit.armor,
      weapons: [kit.primary ? this.makeWeapon(kit.primary) : null, this.makeWeapon('pistol')], cur: kit.primary ? 0 : 1,
      rollT: 0, rollCd: 0, rollDx: 0, rollDy: 0, healT: 0, healDur: 0, healType: null,
      bandages: kit.bandages, medkits: kit.medkits, grenades: kit.grenades, backpack: [], capacity: 20,
      walk: 0, hurtT: 0, dead: false, bloom: 0, stepAcc: 0, kick: 0, flash: 0,
    };
  }

  startDemo() {
    this.selectMap(false);
    this.mode = 'demo';
    this.resetWorld();
    this.player = this.makePlayer(-500, -500, LOADOUTS[0]);
    this.player.dead = true;
    for (const s of this.map.enemySpots) {
      if (s.type === 'chicken') this.spawnPack(s.x, s.y, s.n);
      else this.spawnEnemy(s.type, s.x, s.y, 'idle');
    }
    this.extracts = this.map.extractions.map((e) => ({ ...e }));
  }

  startRaid(kitId: string, training = false) {
    this.selectMap(training);
    this.mode = 'raid';
    this.resetWorld();
    const kit = training ? LOADOUTS[0] : LOADOUTS.find((k) => k.id === kitId) ?? LOADOUTS[0];
    this.kit = kit;
    const sp = this.map.spawns[Math.floor(Math.random() * this.map.spawns.length)];
    const p = this.makePlayer(sp.x, sp.y, kit);
    this.player = p;
    p.aim = Math.atan2(this.map.h / 2 - sp.y, this.map.w / 2 - sp.x);
    if (training) {
      this.extracts = this.map.extractions.map((e) => ({ ...e }));
      this.nav.compute(p.x, p.y);
      this.navT = 0.3;
      this.cam.x = p.x; this.cam.y = p.y;
      this.tutorialT = 0;
      this.sfx.play('deploy');
      return;
    }
    const ex = this.map.extractions.map((e) => ({ e, d: Math.hypot(e.x - sp.x, e.y - sp.y) }));
    let cands = shuffle(ex.filter((o) => o.d > 1300));
    if (cands.length < 2) cands = ex.sort((a, b) => b.d - a.d);
    this.extracts = cands.slice(0, 2).map((o) => ({ ...o.e }));
    for (const s of this.map.enemySpots) {
      const d = Math.hypot(s.x - sp.x, s.y - sp.y);
      if (s.type !== 'goose' && (d < 720 || Math.random() < 0.15)) continue;
      if (s.type === 'chicken') this.spawnPack(s.x, s.y, s.n);
      else this.spawnEnemy(s.type, s.x, s.y, 'idle');
    }
    this.spawnPack(sp.chick[0], sp.chick[1], 3);
    this.waveT = 50;
    this.nav.compute(p.x, p.y);
    this.navT = 0.3;
    this.cam.x = p.x; this.cam.y = p.y;
    this.banner = { text: '行动开始', sub: '搜刮物资 · 击败鸭匪 · 活着撤离', color: '#ffd23f', t: 0, dur: 2.6 };
    this.tutorialT = 10;
    this.msg(`撤离点：${this.extracts.map((e) => e.name).join(' / ')}`, '#6dff9e');
    this.sfx.play('deploy');
  }

  // ---------------------------------------------------------------- spawning & loot tables
  private rollLoot(weights: number[]): ItemDef {
    const r = pickIndex(weights);
    const list = LOOT_BY_RARITY[r];
    return list[Math.floor(Math.random() * list.length)];
  }

  private rollItems(type: string): LootItem[] {
    const d = CONTAINER_DEFS[type];
    const out: ItemDef[] = [];
    if (d.special === 'weapon') {
      const opts: [string, number][] = [['smg', 34], ['shotgun', 24], ['rifle', 24], ['lmg', 9], ['sniper', 9]];
      out.push(weaponItem(opts[pickIndex(opts.map((o) => o[1]))][0]));
      const r = Math.random();
      if (r < 0.35) out.push(Math.random() < 0.7 ? ARMORS[0] : ARMORS[1]);
      else if (r < 0.7) out.push(ITEM_GRENADE);
    } else if (d.special === 'med') {
      out.push(ITEM_BANDAGE);
      if (Math.random() < 0.65) out.push(Math.random() < 0.5 ? ITEM_MEDKIT : ITEM_BANDAGE);
      if (Math.random() < 0.3) out.push(ITEM_GRENADE);
      if (Math.random() < 0.5) out.push(this.rollLoot([30, 40, 22, 7, 1, 0]));
    } else {
      const n = randInt(d.min, d.max);
      for (let i = 0; i < n; i++) {
        if (Math.random() < 0.07) out.push(Math.random() < 0.6 ? ITEM_BANDAGE : ITEM_GRENADE);
        else out.push(this.rollLoot(d.weights));
      }
    }
    return out.map((def) => ({ def, revealed: false, taken: false, at: 0 }));
  }

  private rollBody(e: Enemy): LootItem[] {
    const out: ItemDef[] = [];
    switch (e.type) {
      case 'chicken':
        if (Math.random() < 0.45) out.push(this.rollLoot([70, 25, 5, 0, 0, 0]));
        break;
      case 'bandit': {
        const n = randInt(1, 3);
        for (let i = 0; i < n; i++) out.push(this.rollLoot([40, 34, 18, 6, 1.6, 0.25]));
        if (e.weapon && Math.random() < 0.35) out.push(weaponItem(e.weapon.id));
        if (Math.random() < 0.3) out.push(ITEM_BANDAGE);
        if (Math.random() < 0.12) out.push(ITEM_GRENADE);
        break;
      }
      case 'elite': {
        const n = randInt(2, 3);
        for (let i = 0; i < n; i++) out.push(this.rollLoot([14, 30, 30, 18, 6.5, 1.2]));
        if (e.weapon && Math.random() < 0.55) out.push(weaponItem(e.weapon.id));
        if (Math.random() < 0.35) out.push(ARMORS[Math.random() < 0.6 ? 1 : 0]);
        if (Math.random() < 0.3) out.push(ITEM_MEDKIT);
        break;
      }
      case 'goose': {
        out.push(this.rollLoot([0, 0, 0, 0, 1, 0]));
        out.push(this.rollLoot([0, 0, 0, 1, 0, 0]));
        out.push(this.rollLoot([0, 0, 30, 40, 22, 8]));
        out.push(this.rollLoot([0, 0, 30, 40, 22, 8]));
        if (Math.random() < 0.35) out.push(this.rollLoot([0, 0, 0, 0, 0, 1]));
        out.push(weaponItem('lmg'));
        if (Math.random() < 0.5) out.push(ARMORS[2]);
        break;
      }
    }
    return shuffle(out).map((def) => ({ def, revealed: false, taken: false, at: 0 }));
  }

  spawnEnemy(type: EnemyType, x: number, y: number, state: EState = 'idle'): Enemy {
    const def = ENEMIES[type];
    const pos = this.nav.nearestOpen(x, y);
    const wid = def.weapons.length ? def.weapons[Math.floor(Math.random() * def.weapons.length)] : null;
    const w = wid ? WEAPONS[wid] : null;
    const e: Enemy = {
      id: this.nextId++, type, def, x: pos.x, y: pos.y, vx: 0, vy: 0, kvx: 0, kvy: 0, r: def.r,
      hp: def.hp, maxHp: def.hp, armor: def.armor, armorMax: def.armor, aim: Math.random() * TAU,
      state, homeX: pos.x, homeY: pos.y, tx: pos.x, ty: pos.y,
      weapon: w, ammo: w ? w.mag : 0, reloadT: 0, cd: 0.4, burst: 0, burstPause: 0.25,
      losT: Math.random() * 0.2, los: false, canSee: false, vis: false, visA: 0, lastX: pos.x, lastY: pos.y, lostT: 0, huntT: 0,
      strafe: Math.random() < 0.5 ? 1 : -1, strafeT: 1, reactT: 0, alertT: 0, qT: 0, flash: 0, walk: Math.random() * 10, atkCd: 0,
      special: null, specialT: 0, cdx: 0, cdy: 0, honkCd: 4, chargeCd: 6, wanderT: Math.random() * 2, dead: false, kick: 0, hurtT: 0,
    };
    this.enemies.push(e);
    return e;
  }

  private spawnPack(x: number, y: number, n: number) {
    for (let i = 0; i < n; i++) this.spawnEnemy('chicken', x + rand(-55, 55), y + rand(-55, 55));
  }

  private spawnSquad(cx: number, cy: number, n: number, minD: number, maxD: number): boolean {
    if (this.enemies.length > 34) return false;
    const p = this.player;
    const cands: { x: number; y: number }[] = [];
    for (const r of this.map.reinforce) {
      const d = Math.hypot(r.x - cx, r.y - cy);
      if (d >= minD && d <= maxD) cands.push(r);
    }
    for (let k = 0; k < 16; k++) {
      const a = Math.random() * TAU, d = rand(minD, maxD);
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
      if (this.nav.isOpen(x, y)) cands.push({ x, y });
    }
    const ok = cands.filter((c) => Math.hypot(c.x - p.x, c.y - p.y) > 560 && !this.grid.los(p.x, p.y, c.x, c.y, F_SIGHT));
    if (!ok.length) return false;
    const pt = ok[Math.floor(Math.random() * ok.length)];
    const eliteChance = this.t > 150 ? 0.35 : 0.1;
    for (let i = 0; i < n; i++) {
      const e = this.spawnEnemy(Math.random() < eliteChance ? 'elite' : 'bandit', pt.x + rand(-40, 40), pt.y + rand(-40, 40), 'hunt');
      e.huntT = 40;
    }
    return true;
  }

  // ---------------------------------------------------------------- helpers
  msg(text: string, color = '#fff') {
    this.msgs.push({ text, color, t: 0 });
    if (this.msgs.length > 5) this.msgs.shift();
  }

  text(x: number, y: number, text: string, color: string, size = 16, big = false) {
    if (this.texts.length > 60) this.texts.shift();
    this.texts.push({ x: x + rand(-6, 6), y, text, color, life: big ? 1.7 : 0.85, max: big ? 1.7 : 0.85, size, vy: big ? -34 : -58 });
  }

  addTrauma(v: number) { this.cam.trauma = Math.min(1, this.cam.trauma + v); }

  P(type: number, x: number, y: number, vx: number, vy: number, life: number, size: number, color: string): Particle | null {
    if (this.particles.length >= this.maxParticles) return null;
    const q: Particle = { x, y, z: 0, vx, vy, vz: 0, life, max: life, size, color, type, rot: 0, vr: 0, drag: 0, grow: 0 };
    this.particles.push(q);
    return q;
  }

  feathers(x: number, y: number, n: number, colors: string[], dx = 0, dy = 0, power = 1) {
    const dir = dx !== 0 || dy !== 0 ? Math.atan2(dy, dx) : 0;
    for (let i = 0; i < n; i++) {
      const a = dx !== 0 || dy !== 0 ? dir + (Math.random() - 0.5) * 1.8 : Math.random() * TAU;
      const sp = (50 + Math.random() * 230) * power;
      const q = this.P(P_FEATHER, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 2.5 + Math.random() * 3, 2.6 + Math.random() * 3, colors[Math.floor(Math.random() * colors.length)]);
      if (q) { q.z = 6 + Math.random() * 14; q.vz = 40 + Math.random() * 90 * power; q.rot = Math.random() * TAU; q.vr = (Math.random() - 0.5) * 12; }
    }
  }

  sparks(x: number, y: number, n: number, color: string, dir: number, spread: number, speed: number) {
    for (let i = 0; i < n; i++) {
      const a = dir + (Math.random() - 0.5) * spread;
      const sp = speed * (0.4 + Math.random() * 0.8);
      const q = this.P(P_SPARK, x, y, Math.cos(a) * sp, Math.sin(a) * sp, 0.12 + Math.random() * 0.22, 1.5 + Math.random() * 1.5, color);
      if (q) q.drag = 6;
    }
  }

  puff(x: number, y: number, n: number, color: string, size: number, speed: number, life = 0.6) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, sp = Math.random() * speed;
      const q = this.P(P_DUST, x + rand(-4, 4), y + rand(-4, 4), Math.cos(a) * sp, Math.sin(a) * sp, life * (0.6 + Math.random() * 0.6), size * (0.6 + Math.random() * 0.6), color);
      if (q) { q.drag = 4; q.grow = size * 1.4; }
    }
  }

  screenToWorld(sx: number, sy: number) {
    const c = this.cam;
    return { x: c.x + c.kx + (sx - this.viewW / 2) / c.zoom, y: c.y + c.ky + (sy - this.viewH / 2) / c.zoom };
  }

  contDist(c: Container, x: number, y: number) {
    if (c.body) return Math.max(0, Math.hypot(c.x - x, c.y - y) - 12);
    const qx = clamp(x, c.x - c.w / 2, c.x + c.w / 2), qy = clamp(y, c.y - c.h / 2, c.y + c.h / 2);
    return Math.hypot(x - qx, y - qy);
  }

  get lootValue() {
    let v = 0;
    for (const it of this.player.backpack) v += it.def.value;
    return v;
  }

  // ---------------------------------------------------------------- main update
  update(rawDt: number) {
    this.realT += rawDt;
    let scale = 1;
    if (this.hitstop > 0) { this.hitstop -= rawDt; scale = 0.07; }
    else if (this.slowT > 0) { this.slowT -= rawDt; scale = this.slowScale; }
    const dt = rawDt * scale;
    const p = this.player;
    if (!this.ended) {
      this.t += dt;
      this.updatePlayer(dt);
      this.updateContainers(dt);
      this.updateExtraction(dt);
      if (!this.training) this.updateWaves();
      if (this.timeLimit - this.t <= 0) this.finish('mia');
    } else {
      this.endT += rawDt;
      p.vx *= 0.9; p.vy *= 0.9;
      if (this.endT > (this.outcome === 'extract' ? 1.5 : 1.9) && !this.endSent) {
        this.endSent = true;
        this.onGameOver(this.buildResult());
      }
    }
    this.navT -= dt;
    if (this.navT <= 0 && !p.dead) { this.navT = 0.3; this.nav.compute(p.x, p.y); }
    this.updateEnemies(dt);
    this.updateBullets(dt);
    this.updateGrenades(dt);
    this.updateBooms(dt);
    this.updateFx(dt, rawDt);
    this.updateCamera(rawDt);
    this.sfx.lx = p.x; this.sfx.ly = p.y;
  }

  updateDemo(dt: number) {
    this.realT += dt;
    this.t += dt;
    const T = this.realT;
    this.cam.x = 1600 + Math.sin(T * 0.045) * 1050;
    this.cam.y = 1200 + Math.sin(T * 0.031 + 1) * 720;
    this.cam.zoom = this.cam.base * 0.92;
    this.cam.sx = 0; this.cam.sy = 0; this.cam.kx = 0; this.cam.ky = 0;
    this.updateEnemies(dt);
    this.updateFx(dt, dt);
  }

  /** keeps ambient fx alive while overlays are shown */
  updateIdle(dt: number) {
    this.realT += dt;
    this.updateFx(dt * 0.5, dt);
  }

  // ---------------------------------------------------------------- player
  private updatePlayer(dt: number) {
    const p = this.player, inp = this.input;
    if (p.dead) return;
    p.rollCd -= dt; p.hurtT -= dt; p.flash -= dt;
    p.kick *= Math.exp(-dt * 18);
    p.bloom = Math.max(0, p.bloom - dt * 0.35);
    this.dodgeT -= dt;
    inp.moveVec(this.mv);
    const mx = this.mv.x, my = this.mv.y;
    const mmag = Math.hypot(mx, my);

    if (!inp.touchMode) {
      if (inp.mouseX > -100) {
        const w = this.screenToWorld(inp.mouseX, inp.mouseY);
        p.aim = Math.atan2(w.y - p.y, w.x - p.x);
        this.aimDist = Math.hypot(w.x - p.x, w.y - p.y);
      } else if (mmag > 0.2) p.aim = turnToward(p.aim, Math.atan2(my, mx), dt * 10);
    } else if (inp.aimActive()) {
      p.aim = this.aimAssist(inp.aimAngle());
    } else if (mmag > 0.2) {
      p.aim = turnToward(p.aim, Math.atan2(my, mx), dt * 10);
    }

    if (inp.consume('swap')) this.swapWeapon(p.cur === 0 ? 1 : 0);
    if (inp.consume('slot1')) this.swapWeapon(0);
    if (inp.consume('slot2')) this.swapWeapon(1);
    const w = p.weapons[p.cur] ?? p.weapons[1]!;
    w.cd -= dt;
    if (w.reloadT > 0) {
      w.reloadT -= dt;
      if (w.reloadT <= 0) { w.ammo = w.def.mag; this.sfx.play('reloadEnd'); }
    }
    if (inp.consume('reload')) this.startReload(w);

    if (inp.consume('roll')) this.bufRoll = 0.18;
    this.bufRoll -= dt;
    if (this.bufRoll > 0 && p.rollCd <= 0 && p.rollT <= 0) {
      this.bufRoll = 0;
      let dx = mx, dy = my;
      if (mmag < 0.2) { dx = Math.cos(p.aim); dy = Math.sin(p.aim); }
      const l = Math.hypot(dx, dy) || 1;
      p.rollDx = dx / l; p.rollDy = dy / l;
      p.rollT = 0.3; p.rollCd = 0.72;
      if (p.healT > 0) { p.healT = 0; p.healType = null; }
      this.sfx.play('roll');
      this.puff(p.x, p.y + 6, 8, 'rgba(214,196,160,0.5)', 7, 90);
    }

    // short input buffers so presses during a roll are not swallowed
    if (inp.consume('heal')) this.bufHeal = 0.35;
    this.bufHeal -= dt;
    if (this.bufHeal > 0 && p.rollT <= 0) { this.bufHeal = 0; this.startHeal(); }
    if (p.healT > 0) {
      p.healT -= dt;
      if (p.healT <= 0) this.finishHeal();
    }
    if (inp.consume('grenade')) this.bufNade = 0.35;
    this.bufNade -= dt;
    if (this.bufNade > 0 && p.rollT <= 0) { this.bufNade = 0; this.throwGrenade(); }

    if (p.rollT > 0) {
      p.rollT -= dt;
      const sp = 610 * (0.55 + 0.45 * Math.max(0, p.rollT / 0.3));
      p.vx = p.rollDx * sp; p.vy = p.rollDy * sp;
      if (Math.random() < 0.6) this.puff(p.x - p.rollDx * 10, p.y - p.rollDy * 10 + 6, 1, 'rgba(214,196,160,0.45)', 6, 30, 0.4);
    } else {
      let speed = 240;
      if (p.healT > 0) speed *= 0.5;
      if (w.def.id === 'lmg') speed *= 0.9;
      const k = Math.min(1, dt * 20);
      p.vx += (mx * speed - p.vx) * k;
      p.vy += (my * speed - p.vy) * k;
    }
    p.x += (p.vx + p.kvx) * dt;
    p.y += (p.vy + p.kvy) * dt;
    p.kvx *= Math.exp(-dt * 8); p.kvy *= Math.exp(-dt * 8);
    this.grid.resolve(p, p.r, F_MOVE);
    for (const e of this.enemies) {
      const dx = p.x - e.x, dy = p.y - e.y, rr = p.r + e.r;
      const d2 = dx * dx + dy * dy;
      if (d2 < rr * rr && d2 > 0.01) {
        const d = Math.sqrt(d2), push = (rr - d) * 0.5;
        p.x += (dx / d) * push; p.y += (dy / d) * push;
        e.x -= (dx / d) * push; e.y -= (dy / d) * push;
      }
    }
    this.grid.resolve(p, p.r, F_MOVE);
    p.x = clamp(p.x, p.r, this.map.w - p.r);
    p.y = clamp(p.y, p.r, this.map.h - p.r);

    const spd = Math.hypot(p.vx, p.vy);
    p.walk += spd * dt * 0.055;
    p.stepAcc += spd * dt;
    if (p.stepAcc > 52 && p.rollT <= 0) {
      p.stepAcc = 0;
      this.puff(p.x - (p.vx / (spd || 1)) * 8, p.y + 8, 1, 'rgba(214,196,160,0.35)', 4, 12, 0.45);
    }

    const firing = inp.firing();
    if (firing && p.rollT <= 0) {
      if (p.healT > 0) { p.healT = 0; p.healType = null; this.msg('治疗被打断', '#aaa'); }
      if (w.reloadT <= 0 && w.cd <= 0) {
        if (w.ammo > 0) this.playerFire(w);
        else { this.sfx.play('empty'); this.startReload(w); }
      }
    }
    if (w.ammo === 0 && w.reloadT <= 0 && !firing) this.startReload(w);

    const z = this.map.zones.find((zz) => p.x >= zz.x && p.x < zz.x + zz.w && p.y >= zz.y && p.y < zz.y + zz.h);
    if (z && z.name !== this.zoneName) { this.zoneName = z.name; this.zoneT = 2.6; }
  }

  private aimAssist(a: number): number {
    const p = this.player;
    let best = a, bestD = 0.24;
    for (const e of this.enemies) {
      if (e.visA < 0.5) continue;
      const dx = e.x - p.x, dy = e.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d > 720) continue;
      const ea = Math.atan2(dy, dx);
      const diff = Math.abs(angDiff(a, ea));
      if (diff < bestD) { bestD = diff; best = ea; }
    }
    return best;
  }

  private swapWeapon(slot: number) {
    const p = this.player;
    if (slot === p.cur || !p.weapons[slot]) return;
    const cur = p.weapons[p.cur];
    if (cur) cur.reloadT = 0;
    p.cur = slot;
    const w = p.weapons[slot]!;
    w.cd = Math.max(w.cd, 0.25);
    this.sfx.play('swap');
    this.text(p.x, p.y - 30, w.def.name, '#e8e4d8', 13);
  }

  private startReload(w: WeaponInst) {
    if (w.reloadT > 0 || w.ammo >= w.def.mag) return;
    w.reloadT = w.def.reload;
    this.sfx.play('reload');
  }

  private startHeal() {
    const p = this.player;
    if (p.healT > 0 || p.rollT > 0) return;
    if (p.hp >= p.maxHp) { this.msg('生命值已满', '#aaa'); return; }
    if (p.medkits > 0 && (p.hp < 55 || p.bandages === 0)) { p.healType = 'medkit'; p.healDur = 2.2; }
    else if (p.bandages > 0) { p.healType = 'bandage'; p.healDur = 1.4; }
    else { this.msg('没有医疗物资', '#aaa'); return; }
    p.healT = p.healDur;
    this.sfx.play('reload');
  }

  private finishHeal() {
    const p = this.player;
    if (!p.healType) return;
    const amt = p.healType === 'medkit' ? 75 : 30;
    if (p.healType === 'medkit') p.medkits--; else p.bandages--;
    p.hp = Math.min(p.maxHp, p.hp + amt);
    p.healType = null;
    this.text(p.x, p.y - 30, `+${amt}`, '#6dff9e', 20, true);
    for (let i = 0; i < 12; i++) {
      const q = this.P(P_STAR, p.x + rand(-16, 16), p.y + rand(-10, 16), rand(-20, 20), rand(-90, -40), 0.8, 3 + Math.random() * 2, '#6dff9e');
      if (q) q.vr = 3;
    }
    this.sfx.play('heal');
  }

  private throwGrenade() {
    const p = this.player;
    if (p.rollT > 0) return;
    if (p.grenades <= 0) { this.msg('没有手雷', '#aaa'); return; }
    p.grenades--;
    let tx: number, ty: number;
    if (!this.input.touchMode) {
      const w = this.screenToWorld(this.input.mouseX, this.input.mouseY);
      tx = w.x; ty = w.y;
    } else {
      tx = p.x + Math.cos(p.aim) * 330; ty = p.y + Math.sin(p.aim) * 330;
    }
    let dx = tx - p.x, dy = ty - p.y;
    let d = Math.hypot(dx, dy);
    if (d < 60) { dx = Math.cos(p.aim) * 60; dy = Math.sin(p.aim) * 60; d = 60; }
    if (d > 480) { dx *= 480 / d; dy *= 480 / d; d = 480; }
    const T = 0.5 + d / 1500;
    this.grenades.push({ x: p.x + Math.cos(p.aim) * 16, y: p.y + Math.sin(p.aim) * 16, z: 14, vx: (dx / T) * 0.9, vy: (dy / T) * 0.9, vz: (900 * T) / 2, fuse: 1.3, spin: 0 });
    this.sfx.play('throw');
  }

  private playerFire(w: WeaponInst) {
    const p = this.player, d = w.def;
    w.ammo--;
    w.cd = 1 / d.rate;
    const moving = Math.hypot(p.vx, p.vy) > 60;
    const spread = d.spread * (moving ? 1.3 : 1) + p.bloom;
    if (d.pellets === 1) p.bloom = Math.min(p.bloom + d.spread * 0.22, d.spread * 1.6);
    const ca = Math.cos(p.aim), sa = Math.sin(p.aim);
    const F = p.r * 0.6 + d.len + 4, S = p.r * 0.3 + 2.5;
    let mx = p.x + ca * F - sa * S, my = p.y + sa * F + ca * S;
    let blocked = this.grid.raycast(p.x, p.y, mx, my, F_BULLET, this.hit);
    if (blocked) {
      // barrel clipped into a wall at an angle: fire along the centre line if that is clear
      const fx = p.x + ca * F, fy = p.y + sa * F;
      if (!this.grid.raycast(p.x, p.y, fx, fy, F_BULLET, this.hit)) { mx = fx; my = fy; blocked = false; }
    }
    if (blocked) {
      const h = this.hit;
      this.impact(p.x + (mx - p.x) * h.t, p.y + (my - p.y) * h.t, h.nx, h.ny);
    } else {
      for (let i = 0; i < d.pellets; i++) {
        const a = p.aim + (Math.random() + Math.random() - 1) * spread;
        const sp = d.speed * (d.pellets > 1 ? 0.85 + Math.random() * 0.3 : 1);
        const crit = Math.random() < 0.1;
        this.bullets.push({ x: mx, y: my, ox: mx, oy: my, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, dmg: d.dmg * (crit ? 1.8 : 1), life: d.range / sp, from: 0, pierce: d.pierce, hit: -1, src: null, w: d.pellets > 1 ? 1.7 : d.id === 'sniper' ? 3.4 : 2.3, crit });
      }
    }
    this.stats.shots++;
    p.kick = d.kick;
    this.cam.kx -= ca * d.kick * 1.3; this.cam.ky -= sa * d.kick * 1.3;
    this.addTrauma(d.shake * 0.5);
    if (d.kick > 6) { p.kvx -= ca * d.kick * 16; p.kvy -= sa * d.kick * 16; }
    this.lights.push({ x: mx, y: my, r: 80 + d.kick * 7, color: '#ffcf7a', life: 0.06, max: 0.06 });
    const m = this.P(P_MUZZLE, mx, my, 0, 0, 0.05, 9 + d.kick * 1.4, '#fff3c4');
    if (m) m.rot = p.aim;
    const ex = p.x + ca * 6 - sa * (S + 3), ey = p.y + sa * 6 + ca * (S + 3);
    const cs = this.P(P_CASING, ex, ey, -sa * rand(70, 130) + ca * rand(-20, 20), ca * rand(70, 130) + sa * rand(-20, 20), 2.2, 2.4, d.pellets > 1 ? '#c8402a' : '#e2b04a');
    if (cs) { cs.z = 10; cs.vz = rand(120, 200); cs.vr = rand(-20, 20); cs.rot = Math.random() * TAU; }
    const sm = this.P(P_SMOKE, mx, my, ca * 30, sa * 30, 0.5, 4, 'rgba(220,220,220,0.25)');
    if (sm) { sm.grow = 18; sm.drag = 3; }
    this.sfx.play(d.sound);
    this.makeNoise(p.x, p.y, d.noise);
  }

  private makeNoise(x: number, y: number, radius: number) {
    for (const e of this.enemies) {
      if (e.state !== 'idle') continue;
      if (Math.hypot(e.x - x, e.y - y) > radius) continue;
      e.state = 'search';
      e.huntT = 7;
      e.lastX = x; e.lastY = y;
      e.qT = 1.4;
    }
  }

  private impact(x: number, y: number, nx: number, ny: number, s?: Solid | null) {
    const dir = Math.atan2(ny, nx);
    this.sparks(x, y, 4, '#ffd27a', dir, 1.6, 260);
    let col = 'rgba(190,180,160,0.5)';
    if (s) {
      if (s.kind === 'tree' || s.kind === 'container' || s.kind === 'hay') col = 'rgba(150,110,60,0.6)';
      else if (s.kind === 'sandbag') col = 'rgba(205,185,140,0.6)';
    }
    this.puff(x, y, 2, col, 4, 40, 0.4);
  }

  // ---------------------------------------------------------------- damage & death
  damageEnemy(e: Enemy, dmg: number, nx: number, ny: number, crit: boolean, hx: number, hy: number, explosive = false) {
    if (e.dead) return;
    if (e.special === 'stun') dmg *= 1.5;
    let hpd = dmg;
    let armorHit = false;
    if (e.armor > 0) {
      const absorb = Math.min(e.armor, dmg * 0.6);
      e.armor -= absorb;
      hpd = dmg - absorb;
      armorHit = true;
      if (e.armor <= 0) { this.sfx.play('shield', e.x, e.y); this.text(e.x, e.y - 34, '破甲!', '#7fb2ff', 15); }
    }
    e.hp -= hpd;
    e.flash = 0.09;
    e.hurtT = 2.5;
    const kb = ((explosive ? 3 : 1) * Math.min(260, dmg * 7)) / (e.def.boss ? 5 : 1);
    e.kvx += nx * kb; e.kvy += ny * kb;
    this.text(hx, hy - 10, Math.round(dmg).toString(), crit ? '#ffd23f' : armorHit ? '#9cc8ff' : '#ffffff', crit ? 24 : 16);
    this.feathers(hx, hy, crit ? 5 : 3, FEATHER_COLORS[e.type], nx, ny, 0.8);
    if (armorHit) this.sparks(hx, hy, 3, '#9cc8ff', Math.atan2(-ny, -nx), 2, 200);
    this.hitmark.t = 0.14;
    this.hitmark.kill = false;
    this.sfx.play(crit ? 'crit' : armorHit ? 'armor' : 'hit');
    if (e.state === 'idle' || e.state === 'search' || e.state === 'hunt') {
      e.state = 'react';
      e.reactT = Math.min(0.22, e.def.reaction);
      e.alertT = 1.2;
      e.lastX = this.player.x; e.lastY = this.player.y;
      this.sfx.play(e.type === 'chicken' ? 'cluck' : e.type === 'goose' ? 'honk' : 'quack', e.x, e.y, 0.8);
    }
    if (e.def.boss) this.engageBoss(e);
    if (e.hp <= 0) this.killEnemy(e, nx, ny);
  }

  private engageBoss(e: Enemy) {
    this.boss = e;
    if (!this.bossSeen) {
      this.bossSeen = true;
      this.banner = { text: '鹅老大 出现了！', sub: '小心冲撞与震地鹅叫', color: '#ff8a1e', t: 0, dur: 2.4 };
      this.sfx.play('alarm');
    }
  }

  private killEnemy(e: Enemy, nx: number, ny: number) {
    e.dead = true;
    this.stats.kills++;
    this.stats.killScore += e.def.score;
    this.stats.killsBy[e.type] = (this.stats.killsBy[e.type] || 0) + 1;
    this.msg(`击杀 ${e.def.name}  +${e.def.score}`, '#ffd23f');
    if (this.realT - this.lastKillT < 3) this.streak++; else this.streak = 1;
    this.lastKillT = this.realT;
    if (this.streak >= 2 && this.mode === 'raid') {
      const names = ['', '', '双杀', '三杀', '四杀', '五杀'];
      const nm = this.streak < names.length ? names[this.streak] : '暴走';
      const bonus = 150 * this.streak;
      this.stats.killScore += bonus;
      this.text(this.player.x, this.player.y - 48, `${nm}！ +${bonus}`, '#ff9a3c', 22 + Math.min(10, this.streak * 2), true);
      this.addTrauma(0.1);
      this.sfx.play('r2');
    }
    this.feathers(e.x, e.y, e.def.boss ? 60 : e.type === 'chicken' ? 14 : 22, FEATHER_COLORS[e.type], nx * 0.4, ny * 0.4, e.def.boss ? 1.6 : 1.1);
    const ring = this.P(P_RING, e.x, e.y, 0, 0, 0.35, e.r, 'rgba(255,255,255,0.7)');
    if (ring) ring.grow = 160;
    this.puff(e.x, e.y, 5, 'rgba(240,236,225,0.55)', 9, 70, 0.7);
    this.hitmark.t = 0.28;
    this.hitmark.kill = true;
    this.sfx.play('kill');
    this.hitstop = e.def.boss ? 0.22 : 0.045;
    this.addTrauma(e.def.boss ? 0.75 : 0.18);
    const items = this.rollBody(e);
    this.containers.push({ id: this.nextId++, type: 'body', name: `${e.def.name}的遗体`, x: e.x, y: e.y, w: e.r * 2, h: e.r * 2, items, revealed: 0, body: true, etype: e.type, angle: Math.atan2(ny, nx), open: 0, shake: 0 });
    if (e.def.boss) {
      this.boss = null;
      this.banner = { text: '击败 鹅老大！', sub: '搜刮它的遗体获取顶级物资', color: '#ffb93b', t: 0, dur: 2.8 };
      this.slowT = 0.9; this.slowScale = 0.3;
      this.flash = { t: 0.35, color: '255,220,120' };
      this.lights.push({ x: e.x, y: e.y, r: 420, color: '#ffb93b', life: 0.6, max: 0.6 });
    }
  }

  damagePlayer(dmg: number, sx: number, sy: number) {
    const p = this.player;
    if (p.dead || this.ended) return;
    if (p.rollT > 0) {
      if (this.dodgeT <= 0) { this.dodgeT = 0.5; this.text(p.x, p.y - 28, '闪避', '#cfe8ff', 14); }
      return;
    }
    let hpd = dmg;
    if (p.armor > 0) {
      const absorb = Math.min(p.armor, dmg * 0.6);
      p.armor -= absorb;
      hpd = dmg - absorb;
      if (p.armor <= 0) { p.armor = 0; this.msg('护甲已损坏！', '#7fb2ff'); this.sfx.play('shield'); }
    }
    p.hp -= hpd;
    p.hurtT = 0.3;
    p.flash = 0.08;
    this.addTrauma(0.2 + Math.min(0.3, dmg * 0.012));
    this.dmgInds.push({ ang: Math.atan2(sy - p.y, sx - p.x), t: 1 });
    if (this.dmgInds.length > 6) this.dmgInds.shift();
    this.feathers(p.x, p.y, 3, FEATHER_COLORS.player, p.x - sx, p.y - sy, 0.7);
    this.sfx.play('hurt');
    if (p.hp <= 0) {
      p.hp = 0;
      p.dead = true;
      this.ended = true;
      this.outcome = 'dead';
      this.endT = 0;
      this.search = null;
      this.slowT = 1.5; this.slowScale = 0.3;
      this.feathers(p.x, p.y, 45, FEATHER_COLORS.player, 0, 0, 1.4);
      this.sfx.play('death');
      this.banner = { text: '阵亡', sub: '背包物资全部丢失', color: '#ff4f4f', t: 0, dur: 3 };
      this.addTrauma(0.8);
      this.flash = { t: 0.4, color: '255,40,40' };
    }
  }

  private finish(outcome: Outcome) {
    if (this.ended) return;
    this.ended = true;
    this.outcome = outcome;
    this.endT = 0;
    this.search = null;
    const p = this.player;
    if (outcome === 'extract') {
      this.sfx.play('extract');
      this.banner = { text: '撤离成功', sub: `带出物资 ¥${fmtMoney(this.lootValue)}`, color: '#6dff9e', t: 0, dur: 3 };
      this.flash = { t: 0.45, color: '160,255,200' };
      for (let i = 0; i < 50; i++) {
        const a = Math.random() * TAU, sp = rand(80, 320);
        const q = this.P(P_STAR, p.x, p.y, Math.cos(a) * sp, Math.sin(a) * sp - 60, rand(0.8, 1.6), rand(3, 6), RARITY_COLORS[randInt(1, 5)]);
        if (q) { q.drag = 2; q.vr = rand(-6, 6); }
      }
    } else {
      this.sfx.play('death');
      this.banner = { text: '未能撤离', sub: '行动时间耗尽 · 失踪', color: '#9aa3ad', t: 0, dur: 3 };
      p.dead = true;
    }
  }

  private buildResult(): RaidResult {
    const p = this.player;
    const items: ResultItem[] = p.backpack
      .map((it) => ({ name: it.def.name, icon: it.def.icon, rarity: it.def.rarity, value: it.def.value }))
      .sort((a, b) => b.value - a.value || b.rarity - a.rarity);
    const value = items.reduce((s, i) => s + i.value, 0);
    const extracted = this.outcome === 'extract';
    const score = extracted ? value + this.stats.killScore : Math.floor(this.stats.killScore * 0.3);
    return {
      training: this.training, outcome: this.outcome ?? 'dead', items, value, killScore: this.stats.killScore, kills: this.stats.kills,
      killsBy: { ...this.stats.killsBy }, time: this.t, score, kit: this.kit.id, kitCost: this.kit.cost, best: items[0] ?? null,
    };
  }

  // ---------------------------------------------------------------- containers / loot
  private updateContainers(dt: number) {
    const p = this.player;
    if (p.dead) { this.search = null; this.nearC = null; return; }
    let best: Container | null = null, bd = 1e9;
    for (const c of this.containers) {
      if (c.shake > 0) c.shake -= dt;
      if (c.revealed >= c.items.length) continue;
      const d = this.contDist(c, p.x, p.y);
      if (d < 40 && d < bd) { bd = d; best = c; }
    }
    this.nearC = best;
    this.input.interactVisible = !!best && (!this.search || this.search.c !== best);
    if (this.input.consume('interact')) {
      if (best && (!this.search || this.search.c !== best)) this.openSearch(best);
      else if (this.search) this.search = null;
    }
    if (this.search) {
      const c = this.search.c;
      if (this.contDist(c, p.x, p.y) > 78) { this.search = null; return; }
      c.open = Math.min(1, c.open + dt * 5);
      if (c.revealed < c.items.length) {
        const it = c.items[c.revealed];
        const need = SEARCH_TIME[it.def.rarity] * (c.body ? 0.8 : 1);
        this.search.t += dt;
        this.search.tick -= dt;
        if (this.search.tick <= 0) { this.search.tick = 0.2; this.sfx.play('tick'); }
        if (this.search.t >= need) {
          this.search.t = 0;
          this.revealItem(c, it);
          if (this.training && !c.body) {
            const spot = this.map.enemySpots[0];
            const enemy = this.spawnEnemy(spot.type, spot.x, spot.y);
            enemy.def = { ...enemy.def, speed: 100, melee: 3 };
          }
          c.revealed++;
          c.shake = 0.25;
        }
      }
    }
  }

  private openSearch(c: Container) {
    this.search = { c, t: 0, tick: 0 };
    this.sfx.play('open', c.x, c.y);
  }

  private toBackpack(it: LootItem): boolean {
    const p = this.player;
    if (p.backpack.length < p.capacity) {
      p.backpack.push(it);
      if (p.backpack.length === p.capacity) this.msg('背包已满 · 可以考虑撤离了', '#ffb93b');
      return true;
    }
    let mi = 0;
    for (let i = 1; i < p.backpack.length; i++) if (p.backpack[i].def.value < p.backpack[mi].def.value) mi = i;
    if (p.backpack[mi].def.value < it.def.value) {
      const old = p.backpack[mi];
      p.backpack[mi] = it;
      old.taken = false;
      this.msg(`背包已满，丢弃 ${old.def.name}`, '#aab');
      return true;
    }
    return false;
  }

  private revealItem(c: Container, it: LootItem) {
    const p = this.player, d = it.def, r = d.rarity;
    it.revealed = true;
    it.at = this.realT;
    let taken = true;
    let note = '';
    switch (d.kind) {
      case 'bandage':
        if (p.bandages < 5) { p.bandages++; note = '绷带 +1'; } else taken = this.toBackpack(it);
        break;
      case 'medkit':
        if (p.medkits < 3) { p.medkits++; note = '急救针 +1'; } else taken = this.toBackpack(it);
        break;
      case 'grenade':
        if (p.grenades < 4) { p.grenades++; note = '手雷 +1'; } else taken = this.toBackpack(it);
        break;
      case 'armor':
        if ((d.armor ?? 0) > p.armorMax || p.armor < (d.armor ?? 0) * 0.5) { p.armorMax = d.armor ?? 0; p.armor = p.armorMax; note = `装备 ${d.name}`; this.sfx.play('shield'); }
        else taken = this.toBackpack(it);
        break;
      case 'weapon': {
        const wd = WEAPONS[d.weapon ?? 'pistol'];
        const cur = p.weapons[0];
        if (!cur || wd.tier > cur.def.tier) {
          p.weapons[0] = this.makeWeapon(wd.id);
          p.cur = 0;
          note = `装备 ${wd.name}`;
          this.sfx.play('swap');
          this.msg(`获得新武器：${wd.name}`, RARITY_COLORS[wd.rarity]);
        } else taken = this.toBackpack(it);
        break;
      }
      default:
        taken = this.toBackpack(it);
    }
    it.taken = taken;
    const label = note || `${d.name}  +${fmtMoney(d.value)}`;
    this.text(c.x, c.y - 26 - (c.revealed % 3) * 17, taken ? label : `${d.name} · 背包已满`, taken ? RARITY_COLORS[r] : '#888', r >= 4 ? 20 : 15, true);
    this.sfx.play('r' + r);
    const n = [0, 3, 7, 12, 24, 42][r];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * TAU, sp = rand(40, 120 + r * 40);
      const q = this.P(P_STAR, c.x, c.y - 6, Math.cos(a) * sp, Math.sin(a) * sp - 40, rand(0.5, 1.1), rand(2.5, 3.5 + r * 0.6), RARITY_COLORS[r]);
      if (q) { q.drag = 2.5; q.vr = rand(-5, 5); }
    }
    if (r >= 3) this.lights.push({ x: c.x, y: c.y, r: 110 + r * 34, color: RARITY_COLORS[r], life: 0.55, max: 0.55 });
    if (r >= 4) {
      this.beams.push({ x: c.x, y: c.y, color: RARITY_COLORS[r], life: 2.4, max: 2.4 });
      this.addTrauma(0.22);
      this.msg(`发现${RARITY_NAMES[r]}物品：${d.name}！`, RARITY_COLORS[r]);
      const ring = this.P(P_RING, c.x, c.y, 0, 0, 0.5, 10, RARITY_COLORS[r]);
      if (ring) ring.grow = 220;
    }
    if (r === 5) {
      this.slowT = 0.7; this.slowScale = 0.25;
      this.banner = { text: '★ 大红出货 ★', sub: `${d.name} · ¥${fmtMoney(d.value)}`, color: '#ff4f4f', t: 0, dur: 3 };
      this.flash = { t: 0.5, color: '255,90,90' };
      this.addTrauma(0.45);
    }
  }

  // ---------------------------------------------------------------- extraction & waves
  private updateExtraction(dt: number) {
    const p = this.player;
    if (p.dead || (this.training && (!p.backpack.length || !this.stats.kills))) return;
    let inZ: ExtractZone | null = null;
    for (const z of this.extracts) if (Math.hypot(p.x - z.x, p.y - z.y) < z.r) inZ = z;
    if (inZ) {
      if (this.exZone !== inZ) {
        this.exZone = inZ;
        this.exProg = 0;
        this.msg(`开始撤离：${inZ.name} · 坚守 ${EXTRACT_TIME} 秒`, '#6dff9e');
        if (!this.training && !this.exWaves.has(inZ.id)) {
          this.exWaves.add(inZ.id);
          if (this.spawnSquad(inZ.x, inZ.y, 2 + (this.t > 150 ? 1 : 0), 520, 850)) this.msg('⚠ 敌人正在逼近撤离点！', '#ff8a5c');
        }
      }
      const before = Math.floor(this.exProg);
      this.exProg += dt;
      if (Math.floor(this.exProg) !== before) this.sfx.beep(660 + Math.floor(this.exProg) * 110);
      if (this.exProg >= EXTRACT_TIME) this.finish('extract');
    } else if (this.exZone) {
      this.exZone = null;
      this.exProg = 0;
      this.msg('撤离中断！', '#ff8a5c');
    }
  }

  private updateWaves() {
    const p = this.player;
    if (p.dead) return;
    if (this.waveT <= 0) {
      const frac = this.t / RAID_TIME;
      this.waveT = 56 - frac * 24 + Math.random() * 10;
      const n = 2 + (this.t > 120 ? 1 : 0) + (this.t > 240 ? 1 : 0);
      if (this.spawnSquad(p.x, p.y, n, 850, 1700)) {
        this.msg('⚠ 侦测到敌方小队进入战区', '#ff8a5c');
        this.sfx.play('alarm');
      }
    }
    if (!this.warned60 && RAID_TIME - this.t < 60) {
      this.warned60 = true;
      this.banner = { text: '剩余 60 秒', sub: '尽快前往撤离点！', color: '#ff6b5c', t: 0, dur: 2.4 };
      this.sfx.play('alarm');
    }
  }

  // ---------------------------------------------------------------- enemies
  private updateEnemies(dt: number) {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (e.dead) { this.enemies.splice(i, 1); continue; }
      this.updateEnemy(e, dt);
    }
    const es = this.enemies;
    for (let i = 0; i < es.length; i++) {
      const a = es[i];
      for (let j = i + 1; j < es.length; j++) {
        const b = es[j];
        const dx = a.x - b.x, dy = a.y - b.y, rr = a.r + b.r;
        if (Math.abs(dx) > rr || Math.abs(dy) > rr) continue;
        const d2 = dx * dx + dy * dy;
        if (d2 < rr * rr && d2 > 0.01) {
          const d = Math.sqrt(d2), push = (rr - d) * 0.5;
          a.x += (dx / d) * push; a.y += (dy / d) * push;
          b.x -= (dx / d) * push; b.y -= (dy / d) * push;
        }
      }
    }
  }

  private wander(e: Enemy, dt: number, out: { x: number; y: number }) {
    e.wanderT -= dt;
    if (e.wanderT <= 0) {
      e.wanderT = 1.5 + Math.random() * 3;
      if (Math.random() < 0.35) { e.tx = e.x; e.ty = e.y; }
      else {
        for (let k = 0; k < 6; k++) {
          const a = Math.random() * TAU, d = 40 + Math.random() * 150;
          const x = e.homeX + Math.cos(a) * d, y = e.homeY + Math.sin(a) * d;
          if (this.nav.isOpen(x, y)) { e.tx = x; e.ty = y; break; }
        }
      }
    }
    const dx = e.tx - e.x, dy = e.ty - e.y;
    const d = Math.hypot(dx, dy);
    if (d > 10) {
      const sp = e.def.speed * (e.type === 'chicken' ? 0.35 : 0.4);
      out.x = (dx / d) * sp; out.y = (dy / d) * sp;
    } else { out.x = 0; out.y = 0; }
  }

  private flow(e: Enemy, speed: number, out: { x: number; y: number }) {
    if (this.nav.dir(e.x, e.y, this.fd)) { out.x = this.fd.x * speed; out.y = this.fd.y * speed; }
    else {
      const p = this.player;
      const dx = p.x - e.x, dy = p.y - e.y, d = Math.hypot(dx, dy) || 1;
      out.x = (dx / d) * speed; out.y = (dy / d) * speed;
    }
  }

  private alertEnemy(e: Enemy) {
    e.state = 'react';
    e.reactT = e.def.reaction * (0.8 + Math.random() * 0.4);
    e.alertT = 1.2;
    this.sfx.play(e.type === 'chicken' ? 'cluck' : e.type === 'goose' ? 'honk' : 'quack', e.x, e.y, 0.9);
    if (e.def.boss) this.engageBoss(e);
  }

  private updateEnemy(e: Enemy, dt: number) {
    const p = this.player, def = e.def;
    e.flash -= dt; e.atkCd -= dt; e.alertT -= dt; e.qT -= dt; e.hurtT -= dt;
    e.kick *= Math.exp(-dt * 16);
    const dx = p.x - e.x, dy = p.y - e.y;
    const dist = Math.hypot(dx, dy) || 0.001;
    const angTo = Math.atan2(dy, dx);
    const dv = this.dv;
    dv.x = 0; dv.y = 0;
    let faceA: number | null = null;

    if (this.mode === 'demo') {
      e.vis = true;
      e.visA = 1;
      this.wander(e, dt, dv);
    } else {
      e.losT -= dt;
      if (e.losT <= 0) {
        e.losT = 0.09 + Math.random() * 0.07;
        e.los = dist < 1150 && this.grid.los(e.x, e.y, p.x, p.y, F_SIGHT);
        e.vis = e.los && dist < 1100;
        let cs = e.los && !p.dead && dist < def.vision;
        if (cs && e.state === 'idle' && dist > 140 && Math.abs(angDiff(e.aim, angTo)) > 1.9) cs = false;
        e.canSee = cs;
      }
      e.visA += ((e.vis ? 1 : 0) - e.visA) * Math.min(1, dt * 10);
      if (p.dead && e.state !== 'idle') { e.state = 'idle'; e.homeX = e.x; e.homeY = e.y; }

      if (e.special) {
        this.updateSpecial(e, dt, dist, angTo);
        faceA = e.special === 'charge' || e.special === 'stun' ? null : angTo;
      } else {
        switch (e.state) {
          case 'idle':
            this.wander(e, dt, dv);
            if (e.canSee) this.alertEnemy(e);
            break;
          case 'react':
            faceA = angTo;
            e.reactT -= dt;
            if (e.reactT <= 0) { e.state = 'engage'; e.lostT = 0; }
            break;
          case 'search':
          case 'hunt':
            e.huntT -= dt;
            if (e.canSee) {
              if (e.state === 'search') { this.alertEnemy(e); e.reactT *= 0.6; }
              else { e.state = 'engage'; e.lostT = 0; e.alertT = 1; this.sfx.play('quack', e.x, e.y, 0.8); }
            } else if (e.huntT <= 0 || (e.def.boss && Math.hypot(e.x - e.homeX, e.y - e.homeY) > 650)) {
              e.state = 'idle';
              if (!e.def.boss) { e.homeX = e.x; e.homeY = e.y; }
              e.tx = e.homeX; e.ty = e.homeY; e.wanderT = 4;
            } else {
              this.flow(e, def.speed * (e.state === 'hunt' ? 0.95 : 0.75), dv);
            }
            break;
          case 'engage': {
            if (e.canSee) { e.lastX = p.x; e.lastY = p.y; e.lostT = 0; } else e.lostT += dt;
            if (e.lostT > 2.2) { e.state = 'hunt'; e.huntT = e.def.boss ? 5 : 10; e.qT = 1.5; break; }
            faceA = e.canSee ? angTo : Math.atan2(e.lastY - e.y, e.lastX - e.x);
            if (e.type === 'chicken') {
              if (e.canSee || dist < 70) { dv.x = (dx / dist) * def.speed; dv.y = (dy / dist) * def.speed; }
              else this.flow(e, def.speed, dv);
              if (dist < e.r + p.r + 7 && e.atkCd <= 0 && !p.dead) {
                this.damagePlayer(def.melee, e.x, e.y);
                e.atkCd = 0.7;
                e.kvx -= (dx / dist) * 160; e.kvy -= (dy / dist) * 160;
                this.sfx.play('peck', e.x, e.y);
              }
            } else {
              if (!e.canSee) this.flow(e, def.speed * 0.9, dv);
              else {
                e.strafeT -= dt;
                if (e.strafeT <= 0) { e.strafe = -e.strafe; e.strafeT = 0.7 + Math.random() * 1.1; }
                const nx = dx / dist, ny = dy / dist;
                let fx = 0, fy = 0;
                const pmax = e.weapon && e.weapon.pellets > 1 ? 200 : def.prefMax;
                const pmin = e.weapon && e.weapon.pellets > 1 ? 90 : def.prefMin;
                if (dist > pmax) { fx += nx; fy += ny; } else if (dist < pmin) { fx -= nx; fy -= ny; }
                fx += -ny * e.strafe * 0.8; fy += nx * e.strafe * 0.8;
                const l = Math.hypot(fx, fy) || 1;
                dv.x = (fx / l) * def.speed * 0.8; dv.y = (fy / l) * def.speed * 0.8;
              }
              this.enemyShoot(e, dt, dist, angTo);
              if (e.type === 'goose') {
                e.honkCd -= dt; e.chargeCd -= dt;
                if (e.canSee) {
                  if (e.honkCd <= 0 && dist < 290) { e.special = 'honkWind'; e.specialT = 0.6; }
                  else if (e.chargeCd <= 0 && dist > 150 && dist < 560) { e.special = 'chargeWind'; e.specialT = 0.75; }
                }
              }
            }
            break;
          }
        }
      }
    }

    if (faceA !== null) e.aim = turnToward(e.aim, faceA, dt * (e.state === 'engage' ? 6.5 : 5));
    else if (Math.abs(dv.x) + Math.abs(dv.y) > 5 && e.special !== 'charge') e.aim = turnToward(e.aim, Math.atan2(dv.y, dv.x), dt * 6);

    if (e.special === 'charge') {
      e.vx = e.cdx * 640; e.vy = e.cdy * 640;
    } else {
      const k = Math.min(1, dt * 8);
      e.vx += (dv.x - e.vx) * k; e.vy += (dv.y - e.vy) * k;
    }
    e.x += (e.vx + e.kvx) * dt;
    e.y += (e.vy + e.kvy) * dt;
    e.kvx *= Math.exp(-dt * 9); e.kvy *= Math.exp(-dt * 9);
    const col = this.grid.resolve(e, e.r, F_MOVE);
    e.x = clamp(e.x, e.r, this.map.w - e.r); e.y = clamp(e.y, e.r, this.map.h - e.r);
    if (col && e.special === 'charge') {
      e.special = 'stun'; e.specialT = 1.5; e.chargeCd = 9;
      this.addTrauma(Math.max(0, 0.6 - dist / 1500));
      this.sfx.play('stun', e.x, e.y);
      this.puff(e.x + e.cdx * 20, e.y + e.cdy * 20, 8, 'rgba(200,190,170,0.6)', 10, 120);
      this.text(e.x, e.y - 40, '晕眩!', '#ffd23f', 18, true);
    }
    e.walk += Math.hypot(e.vx, e.vy) * dt * 0.06;
  }

  private updateSpecial(e: Enemy, dt: number, dist: number, angTo: number) {
    const p = this.player;
    e.specialT -= dt;
    switch (e.special) {
      case 'honkWind':
        if (e.specialT <= 0) { this.honk(e, dist); e.special = null; e.honkCd = 7 + Math.random() * 3; }
        break;
      case 'chargeWind':
        e.cdx = Math.cos(angTo); e.cdy = Math.sin(angTo);
        if (e.specialT <= 0) { e.special = 'charge'; e.specialT = 0.6; this.sfx.play('honk', e.x, e.y, 0.7); }
        break;
      case 'charge':
        if (Math.random() < 0.7) this.puff(e.x - e.cdx * 20, e.y - e.cdy * 20 + 8, 1, 'rgba(214,196,160,0.5)', 8, 30, 0.5);
        if (dist < e.r + p.r + 6 && !p.dead) {
          if (p.rollT <= 0) {
            this.damagePlayer(30, e.x, e.y);
            p.kvx += e.cdx * 750; p.kvy += e.cdy * 750;
            this.addTrauma(0.5);
          }
          e.special = null; e.chargeCd = 9;
        } else if (e.specialT <= 0) { e.special = null; e.chargeCd = 9; }
        break;
      case 'stun':
        if (Math.random() < 0.15) {
          const q = this.P(P_STAR, e.x + rand(-14, 14), e.y - 30, rand(-30, 30), -30, 0.6, 3.5, '#ffd23f');
          if (q) q.vr = 6;
        }
        if (e.specialT <= 0) e.special = null;
        break;
      default:
        e.special = null;
    }
  }

  private honk(e: Enemy, dist: number) {
    const p = this.player;
    this.sfx.play('honk', e.x, e.y, 1.3);
    for (let i = 0; i < 3; i++) {
      const ring = this.P(P_RING, e.x, e.y, 0, 0, 0.45 + i * 0.12, 20, i === 0 ? 'rgba(255,170,80,0.9)' : 'rgba(255,255,255,0.6)');
      if (ring) ring.grow = 560 - i * 90;
    }
    this.text(e.x, e.y - 46, '嘎——！！', '#ff8a1e', 26, true);
    this.addTrauma(Math.max(0, 0.65 - dist / 1400));
    if (dist < 290 && !p.dead && p.rollT <= 0) {
      const nx = (p.x - e.x) / (dist || 1), ny = (p.y - e.y) / (dist || 1);
      p.kvx += nx * 680; p.kvy += ny * 680;
      if (dist < 230) this.damagePlayer(14, e.x, e.y);
    }
    for (const o of this.enemies) {
      if (o !== e && o.state === 'idle' && Math.hypot(o.x - e.x, o.y - e.y) < 900) { o.state = 'hunt'; o.huntT = 12; o.qT = 1.4; }
    }
  }

  private enemyShoot(e: Enemy, dt: number, dist: number, angTo: number) {
    const w = e.weapon;
    if (!w) return;
    const p = this.player;
    e.cd -= dt;
    if (e.reloadT > 0) {
      e.reloadT -= dt;
      if (e.reloadT <= 0) e.ammo = w.mag;
      return;
    }
    if (!e.canSee || p.dead || dist > w.range * 0.9 + 60) return;
    if (Math.abs(angDiff(e.aim, angTo)) > 0.35) return;
    if (e.burst <= 0) {
      e.burstPause -= dt;
      if (e.burstPause <= 0) e.burst = w.pellets > 1 ? 1 : randInt(e.def.burst[0], e.def.burst[1]);
      return;
    }
    if (e.cd > 0) return;
    e.cd = 1 / (w.rate * (e.type === 'goose' ? 0.85 : 0.62));
    e.ammo--;
    e.burst--;
    if (e.burst <= 0) e.burstPause = (w.pellets > 1 ? 0.9 : 0.5) + Math.random() * 0.6;
    if (e.ammo <= 0) { e.reloadT = w.reload * 1.25; e.burst = 0; }
    const ca = Math.cos(e.aim), sa = Math.sin(e.aim);
    const F = e.r * 0.6 + w.len + 4, S = e.r * 0.3 + 2.5;
    const mx = e.x + ca * F - sa * S, my = e.y + sa * F + ca * S;
    if (this.grid.raycast(e.x, e.y, mx, my, F_BULLET, this.hit)) return;
    const acc = e.def.accuracy * (Math.hypot(p.vx, p.vy) > 100 ? 1.25 : 1);
    const sp = e.def.bulletSpeed * (w.id === 'sniper' ? 1.6 : 1);
    for (let i = 0; i < w.pellets; i++) {
      const a = e.aim + gauss() * acc + (w.pellets > 1 ? (Math.random() - 0.5) * w.spread * 2 : 0);
      this.bullets.push({ x: mx, y: my, ox: mx, oy: my, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, dmg: w.dmg * e.def.dmgMul, life: (w.range * 0.95) / sp, from: 1, pierce: 0, hit: -1, src: e, w: 2.4, crit: false });
    }
    e.kick = w.kick * 0.8;
    if (e.visA > 0.05 || dist < 900) {
      this.lights.push({ x: mx, y: my, r: 70, color: '#ff9a5a', life: 0.06, max: 0.06 });
      const m = this.P(P_MUZZLE, mx, my, 0, 0, 0.05, 8 + w.kick, '#ffb38a');
      if (m) m.rot = e.aim;
    }
    this.sfx.play('eshot', e.x, e.y, w.pellets > 1 ? 1.2 : 0.9);
  }

  // ---------------------------------------------------------------- projectiles
  private updateBullets(dt: number) {
    const p = this.player;
    const bs = this.bullets;
    for (let i = bs.length - 1; i >= 0; i--) {
      const b = bs[i];
      const dx = b.vx * dt, dy = b.vy * dt;
      let tW = 2, ws: Solid | null = null, wnx = 0, wny = 0;
      if (this.grid.raycast(b.x, b.y, b.x + dx, b.y + dy, F_BULLET, this.hit)) { tW = this.hit.t; ws = this.hit.s; wnx = this.hit.nx; wny = this.hit.ny; }
      let tE = 2;
      let te: Enemy | null = null;
      let hp = false;
      if (b.from === 0) {
        for (const e of this.enemies) {
          if (e.dead || e.id === b.hit) continue;
          const t = segCircle(b.x, b.y, dx, dy, e.x, e.y, e.r + 2);
          if (t >= 0 && t < tE) { tE = t; te = e; }
        }
      } else if (!p.dead) {
        const t = segCircle(b.x, b.y, dx, dy, p.x, p.y, p.r + 1);
        if (t >= 0) { tE = t; hp = true; }
      }
      if ((te || hp) && tE < tW) {
        const hx = b.x + dx * tE, hy = b.y + dy * tE;
        const sp = Math.hypot(b.vx, b.vy) || 1;
        const nx = b.vx / sp, ny = b.vy / sp;
        if (te) {
          this.damageEnemy(te, b.dmg, nx, ny, b.crit, hx, hy);
          this.stats.hits++;
          if (b.pierce > 0) { b.pierce--; b.hit = te.id; b.x = hx + nx * 2; b.y = hy + ny * 2; b.dmg *= 0.75; continue; }
        } else {
          if (p.rollT > 0) {
            this.damagePlayer(b.dmg, b.x, b.y);
            b.x += dx; b.y += dy; b.life -= dt;
            if (b.life <= 0) { bs[i] = bs[bs.length - 1]; bs.pop(); }
            continue;
          }
          this.damagePlayer(b.dmg, b.src ? b.src.x : b.x - nx * 100, b.src ? b.src.y : b.y - ny * 100);
        }
        bs[i] = bs[bs.length - 1]; bs.pop();
        continue;
      }
      if (ws) {
        const hx = b.x + dx * tW, hy = b.y + dy * tW;
        this.impact(hx, hy, wnx, wny, ws);
        if (ws.kind === 'barrel' && !ws.dead) {
          ws.hp -= b.dmg;
          if (ws.hp <= 0) { ws.dead = true; this.booms.push({ x: ws.x, y: ws.y, t: 0.03, r: 150, dmg: 130 }); }
        }
        bs[i] = bs[bs.length - 1]; bs.pop();
        continue;
      }
      b.x += dx; b.y += dy;
      b.life -= dt;
      if (b.life <= 0) { bs[i] = bs[bs.length - 1]; bs.pop(); }
    }
  }

  private updateGrenades(dt: number) {
    const gs = this.grenades;
    for (let i = gs.length - 1; i >= 0; i--) {
      const g = gs[i];
      g.fuse -= dt;
      g.spin += dt * 12;
      g.vz -= 900 * dt;
      g.z += g.vz * dt;
      if (g.z <= 0) {
        g.z = 0;
        if (g.vz < -80) { g.vz = -g.vz * 0.35; g.vx *= 0.7; g.vy *= 0.7; this.sfx.play('bounce', g.x, g.y); }
        else g.vz = 0;
      }
      if (g.z === 0) { const f = Math.exp(-dt * 4); g.vx *= f; g.vy *= f; }
      const nx = g.x + g.vx * dt, ny = g.y + g.vy * dt;
      if (this.grid.raycast(g.x, g.y, nx, ny, F_BULLET, this.hit)) {
        const h = this.hit;
        g.x += g.vx * dt * h.t * 0.8; g.y += g.vy * dt * h.t * 0.8;
        const dot = g.vx * h.nx + g.vy * h.ny;
        g.vx = (g.vx - 2 * dot * h.nx) * 0.5; g.vy = (g.vy - 2 * dot * h.ny) * 0.5;
        this.sfx.play('bounce', g.x, g.y);
      } else { g.x = nx; g.y = ny; }
      if (g.fuse <= 0) { this.explode(g.x, g.y, 150, 135); gs.splice(i, 1); }
    }
  }

  private updateBooms(dt: number) {
    for (let i = this.booms.length - 1; i >= 0; i--) {
      const b = this.booms[i];
      b.t -= dt;
      if (b.t <= 0) { this.booms.splice(i, 1); this.explode(b.x, b.y, b.r, b.dmg); }
    }
  }

  explode(x: number, y: number, radius: number, dmg: number) {
    const p = this.player;
    for (const e of this.enemies) {
      if (e.dead) continue;
      const dx = e.x - x, dy = e.y - y, d = Math.hypot(dx, dy);
      if (d > radius + e.r) continue;
      if (!this.grid.los(x, y, e.x, e.y, F_SIGHT)) continue;
      const f = 1 - Math.max(0, d - e.r) / radius;
      const nd = d || 1;
      this.damageEnemy(e, dmg * (0.3 + 0.7 * f), dx / nd, dy / nd, false, e.x, e.y - 8, true);
    }
    if (!p.dead && this.mode === 'raid') {
      const dx = p.x - x, dy = p.y - y, d = Math.hypot(dx, dy);
      if (d < radius + p.r && this.grid.los(x, y, p.x, p.y, F_SIGHT)) {
        const f = 1 - Math.max(0, d - p.r) / radius;
        const nd = d || 1;
        this.damagePlayer(dmg * 0.55 * (0.3 + 0.7 * f), x, y);
        p.kvx += (dx / nd) * 420 * f; p.kvy += (dy / nd) * 420 * f;
      }
    }
    for (const b of this.barrels) {
      if (b.dead) continue;
      if (Math.hypot(b.x - x, b.y - y) < radius + 18) { b.dead = true; this.booms.push({ x: b.x, y: b.y, t: 0.12 + Math.random() * 0.1, r: 150, dmg: 130 }); }
    }
    this.lights.push({ x, y, r: radius * 2.6, color: '#ff9a3c', life: 0.4, max: 0.4 });
    const core = this.P(P_FIRE, x, y, 0, 0, 0.18, radius * 0.9, '#fff6d8');
    if (core) core.grow = -radius * 2;
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * TAU, sp = rand(60, 330);
      const q = this.P(P_FIRE, x, y, Math.cos(a) * sp, Math.sin(a) * sp, rand(0.25, 0.55), rand(14, 30), i % 3 === 0 ? '#ffd166' : '#ff7b2e');
      if (q) { q.drag = 5; q.grow = -20; }
    }
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * TAU, sp = rand(30, 160);
      const q = this.P(P_SMOKE, x + rand(-20, 20), y + rand(-20, 20), Math.cos(a) * sp, Math.sin(a) * sp, rand(0.9, 1.8), rand(14, 26), 'rgba(70,66,62,0.55)');
      if (q) { q.drag = 3; q.grow = 34; }
    }
    this.sparks(x, y, 26, '#ffcf6a', 0, TAU, 620);
    for (let i = 0; i < 12; i++) {
      const a = Math.random() * TAU, sp = rand(120, 380);
      const q = this.P(P_DEBRIS, x, y, Math.cos(a) * sp, Math.sin(a) * sp, rand(0.8, 1.6), rand(2, 4.5), '#3a332c');
      if (q) { q.z = 4; q.vz = rand(150, 360); q.vr = rand(-15, 15); }
    }
    const ring = this.P(P_RING, x, y, 0, 0, 0.35, 20, 'rgba(255,230,190,0.85)');
    if (ring) ring.grow = radius * 3.6;
    this.decals.push({ x, y, r: radius * 0.55, rot: Math.random() * TAU });
    if (this.decals.length > 30) this.decals.shift();
    const pd = Math.hypot(p.x - x, p.y - y);
    if (this.mode === 'raid') {
      this.addTrauma(Math.max(0, 0.85 - pd / 1100));
      this.cam.punch = Math.max(this.cam.punch, 0.05 * Math.max(0, 1 - pd / 900));
    }
    this.sfx.play('explosion', x, y, 1.3);
    this.makeNoise(x, y, 900);
  }

  // ---------------------------------------------------------------- fx & camera
  private updateFx(dt: number, rawDt: number) {
    this.waveT -= dt;
    const ps = this.particles;
    for (let i = ps.length - 1; i >= 0; i--) {
      const q = ps[i];
      q.life -= dt;
      if (q.life <= 0) { ps[i] = ps[ps.length - 1]; ps.pop(); continue; }
      if (q.type === P_FEATHER) {
        if (q.z > 0) {
          q.vz -= 130 * dt;
          q.z += q.vz * dt;
          q.x += q.vx * dt; q.y += q.vy * dt;
          const f = Math.max(0, 1 - 2.6 * dt);
          q.vx *= f; q.vy *= f;
          q.rot += q.vr * dt;
          if (q.z <= 0) q.z = 0;
        }
      } else if (q.type === P_CASING || q.type === P_DEBRIS) {
        if (q.z > 0 || q.vz > 0) {
          q.vz -= 900 * dt;
          q.z += q.vz * dt;
          q.rot += q.vr * dt;
          if (q.z < 0) {
            q.z = 0;
            q.vz = -q.vz * 0.4;
            q.vx *= 0.5; q.vy *= 0.5;
            if (Math.abs(q.vz) < 40) q.vz = 0;
          }
        } else { const f = Math.max(0, 1 - 8 * dt); q.vx *= f; q.vy *= f; }
        q.x += q.vx * dt; q.y += q.vy * dt;
      } else {
        q.x += q.vx * dt; q.y += q.vy * dt;
        if (q.drag) { const f = Math.max(0, 1 - q.drag * dt); q.vx *= f; q.vy *= f; }
        if (q.grow) q.size = Math.max(0.1, q.size + q.grow * dt);
        q.rot += q.vr * dt;
      }
    }
    const ts = this.texts;
    for (let i = ts.length - 1; i >= 0; i--) {
      const t = ts[i];
      t.life -= rawDt;
      t.y += t.vy * rawDt;
      t.vy *= Math.max(0, 1 - 3 * rawDt);
      if (t.life <= 0) ts.splice(i, 1);
    }
    for (let i = this.lights.length - 1; i >= 0; i--) { const l = this.lights[i]; l.life -= dt; if (l.life <= 0) this.lights.splice(i, 1); }
    for (let i = this.beams.length - 1; i >= 0; i--) { const b = this.beams[i]; b.life -= rawDt; if (b.life <= 0) this.beams.splice(i, 1); }
    for (let i = this.msgs.length - 1; i >= 0; i--) { const m = this.msgs[i]; m.t += rawDt; if (m.t > 3.4) this.msgs.splice(i, 1); }
    for (let i = this.dmgInds.length - 1; i >= 0; i--) { const d = this.dmgInds[i]; d.t -= rawDt * 1.1; if (d.t <= 0) this.dmgInds.splice(i, 1); }
    if (this.banner) { this.banner.t += rawDt; if (this.banner.t > this.banner.dur) this.banner = null; }
    this.hitmark.t -= rawDt;
    this.flash.t -= rawDt;
    this.zoneT -= rawDt;
    this.tutorialT -= rawDt;
  }

  private updateCamera(dt: number) {
    const p = this.player, c = this.cam, inp = this.input;
    let lx = 0, ly = 0;
    if (!p.dead && !this.ended) {
      if (!inp.touchMode && inp.mouseX > -100) {
        lx = clamp(((inp.mouseX - this.viewW / 2) / c.zoom) * 0.3, -220, 220);
        ly = clamp(((inp.mouseY - this.viewH / 2) / c.zoom) * 0.3, -170, 170);
      } else if (inp.aimActive()) {
        lx = Math.cos(p.aim) * 110; ly = Math.sin(p.aim) * 110;
      }
    }
    const k = 1 - Math.exp(-dt * 7);
    c.x += (p.x + lx - c.x) * k;
    c.y += (p.y + ly - c.y) * k;
    c.trauma = Math.max(0, c.trauma - dt * 1.5);
    const sh = c.trauma * c.trauma * 22;
    const tt = this.realT * 40;
    c.sx = sh * (Math.sin(tt * 1.13) * 0.6 + Math.sin(tt * 2.71 + 1.3) * 0.4);
    c.sy = sh * (Math.sin(tt * 1.37 + 2.1) * 0.6 + Math.sin(tt * 2.29 + 0.7) * 0.4);
    c.kx *= Math.exp(-dt * 12); c.ky *= Math.exp(-dt * 12);
    c.punch *= Math.exp(-dt * 7);
    const zt = this.ended ? (this.outcome === 'extract' ? 1.12 : 1.28) : 1;
    c.endZoom += (zt - c.endZoom) * (1 - Math.exp(-dt * 2.5));
    c.zoom = c.base * (1 + c.punch) * c.endZoom;
    const hw = this.viewW / 2 / c.zoom, hh = this.viewH / 2 / c.zoom, m = 150;
    c.x = hw * 2 > this.map.w + 2 * m ? this.map.w / 2 : clamp(c.x, hw - m, this.map.w - hw + m);
    c.y = hh * 2 > this.map.h + 2 * m ? this.map.h / 2 : clamp(c.y, hh - m, this.map.h - hh + m);
  }
}
