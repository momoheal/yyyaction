import { ARMOR_ART_CELL, ENEMIES, EXTRACT_TIME, RARITY_COLORS, RARITY_RGB, SEARCH_TIME, THROWABLE_IDS, THROWABLES, fmtMoney, fmtTime, type CharacterId, type WeaponDef } from './data';
import { F_SIGHT, type FloorType, type GameMap, type RaidMapId, type Solid } from './map';
import { bagUi, hudScale, type Input } from './input';
import { P_CASING, P_DEBRIS, P_DUST, P_FEATHER, P_FIRE, P_MUZZLE, P_RING, P_SMOKE, P_SPARK, P_STAR, TAU, type Container, type Enemy, type Game } from './game';
import { drawScenery } from './scenery';
import { weaponIconDataUrl } from './gear-icons';

const armorIconAtlasUrl = new URL('../assets/armor-icons.webp', import.meta.url).href;

/**
 * 图片对象工厂：浏览器走原生 Image，微信小游戏没有 DOM Image，必须用 wx.createImage()。
 * 直接写 `new Image()` 会在小游戏里抛 ReferenceError: Can't find variable: Image，
 * 且异常发生在 Renderer 构造期，整局卡在启动页。
 */
function createImage(): HTMLImageElement {
  const g = globalThis as unknown as { Image?: typeof Image; wx?: { createImage?: () => HTMLImageElement } };
  if (typeof g.Image === 'function') return new g.Image();
  if (g.wx && typeof g.wx.createImage === 'function') return g.wx.createImage();
  throw new Error('当前环境不支持图片创建（缺少 Image / wx.createImage）');
}

/** 浏览器 Image 用 complete/naturalWidth，wx.createImage 只保证 width/height，这里统一判定。 */
function imageReady(img: HTMLImageElement | null | undefined): boolean {
  if (!img) return false;
  const a = img as unknown as { complete?: boolean; naturalWidth?: number; width?: number };
  if (a.complete === false) return false;
  return (a.naturalWidth || a.width || 0) > 0;
}

function imageSize(img: HTMLImageElement): { w: number; h: number } {
  const a = img as unknown as { naturalWidth?: number; naturalHeight?: number; width?: number; height?: number };
  return { w: a.naturalWidth || a.width || 0, h: a.naturalHeight || a.height || 0 };
}

const FONT_NUM = 'Rajdhani, "Bahnschrift", "DIN Alternate", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';
const FONT_CN = '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif';
const FONT_EMOJI = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

interface DuckStyle { body: string; wing: string; head: string; beak: string; vest?: string; helmet?: string; band?: string; visor?: string }
const ST_PLAYER: DuckStyle = { body: '#ffd43b', wing: '#efbd27', head: '#ffd43b', beak: '#ff8c1a', vest: '#4b5a2e', helmet: '#5b6b35' };
const PLAYER_STYLES: Record<CharacterId, DuckStyle> = {
  duck: ST_PLAYER,
  tank: { body: '#b0bca1', wing: '#839580', head: '#d7d9b5', beak: '#eda14b', vest: '#334139', helmet: '#536952', visor: '#d8deaa' },
  scout: { body: '#a2e1ea', wing: '#63aec1', head: '#bfe8ea', beak: '#ef9f46', vest: '#2f5866', band: '#f18c44' },
};
const ST_BANDIT: DuckStyle = { body: '#a3abb0', wing: '#858e94', head: '#2f7d4f', beak: '#f2b134', vest: '#6b4a35', band: '#d64545' };
const ST_ELITE: DuckStyle = { body: '#3d4248', wing: '#2c3035', head: '#24282c', beak: '#e0a030', vest: '#17191c', helmet: '#2b2f33', visor: '#ff4d4d' };
const ST_CHICKEN: DuckStyle = { body: '#f7f3ea', wing: '#e6dfd0', head: '#f7f3ea', beak: '#f4b400' };
const ST_GOOSE: DuckStyle = { body: '#f4f4f0', wing: '#dcdcd4', head: '#f4f4f0', beak: '#ff8a1e' };
const STYLES: Record<Enemy['type'], DuckStyle> = {
  bandit: ST_BANDIT, elite: ST_ELITE, chicken: ST_CHICKEN, goose: ST_GOOSE,
  armored: { body: '#827887', wing: '#615464', head: '#b898a3', beak: '#ffb771', vest: '#48414e', helmet: '#59435b', visor: '#ff9273' },
  lookout: { body: '#d6b681', wing: '#9d784d', head: '#e5c796', beak: '#b86d32', vest: '#645039', band: '#e8b13b' },
  shield: { body: '#7d8a99', wing: '#586572', head: '#a9b6c2', beak: '#ffb771', vest: '#3f4a57', helmet: '#4a5663', visor: '#8fd0ff' },
  hen: { body: '#e8d5b0', wing: '#c4a878', head: '#f2e4c6', beak: '#e09a2c', vest: '#b98b4e', band: '#d94f3d' },
  harborBoss: { ...ST_GOOSE, body: '#accad1', wing: '#557d89', head: '#cee6e8', vest: '#27475f', band: '#b14638' },
  foundryBoss: { ...ST_GOOSE, body: '#b38e7b', wing: '#75554b', head: '#d9bc9d', vest: '#523840', helmet: '#574147', visor: '#ff8542' },
  broodQueen: { body: '#e7e9c4', wing: '#a8bf72', head: '#f6f3d9', beak: '#ffb43b', vest: '#6c8247', band: '#ffd75e' },
  frostMarshal: { body: '#d9f2fc', wing: '#87b9d4', head: '#eefaff', beak: '#7fd8ef', vest: '#3d6b85', helmet: '#9fdcf2', visor: '#d9f6ff' },
  ironGuard: { body: '#241a1e', wing: '#120f12', head: '#2c2226', beak: '#d94b3f', vest: '#0d0b0d', helmet: '#3a1216', visor: '#ff3b30' },
  duckKing: { body: '#ffdf7d', wing: '#d4a12e', head: '#fff1bd', beak: '#ff9a1f', vest: '#5b2d78', helmet: '#7a4a9e', band: '#ffd75e', visor: '#b56cff' },
};

function mk(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function hexA(hex: string, a: number) {
  if (hex.startsWith('rgba') || hex.startsWith('rgb')) return hex;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const q = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + q, y);
  ctx.arcTo(x + w, y, x + w, y + h, q);
  ctx.arcTo(x + w, y + h, x, y + h, q);
  ctx.arcTo(x, y + h, x, y, q);
  ctx.arcTo(x, y, x + w, y, q);
  ctx.closePath();
}

function ell(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, rot = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), rot, 0, TAU);
  ctx.fill();
}

export function drawDuck(
  ctx: CanvasRenderingContext2D, x: number, y: number, ang: number, r: number, st: DuckStyle, walk: number,
  flash: boolean, gun: WeaponDef | null, kick: number, kind: number, dead = false,
) {
  ctx.fillStyle = 'rgba(15,22,10,0.3)';
  ell(ctx, x + 2, y + r * 0.5, r * 1.1, r * 0.72);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);
  const bob = dead ? 1 : 1 + Math.sin(walk * 2) * 0.05;
  ctx.scale(bob, 2 - bob);
  const W = flash ? '#ffffff' : null;
  if (!dead) {
    const fp = Math.sin(walk) * r * 0.35;
    ctx.fillStyle = '#f08a1c';
    ell(ctx, -r * 0.1 + fp, -r * 0.52, r * 0.3, r * 0.17);
    ell(ctx, -r * 0.1 - fp, r * 0.52, r * 0.3, r * 0.17);
  }
  ctx.fillStyle = W ?? st.wing;
  ctx.beginPath();
  ctx.moveTo(-r * 0.78, -r * 0.4);
  ctx.lineTo(-r * 1.34, 0);
  ctx.lineTo(-r * 0.78, r * 0.4);
  ctx.fill();
  ctx.fillStyle = W ?? st.body;
  ell(ctx, 0, 0, r, r * 0.86);
  ctx.fillStyle = W ?? st.wing;
  ell(ctx, -r * 0.18, -r * 0.6, r * 0.6, r * 0.27, -0.18);
  ell(ctx, -r * 0.18, r * 0.6, r * 0.6, r * 0.27, 0.18);
  if (st.vest && !W) {
    ctx.fillStyle = st.vest;
    rr(ctx, -r * 0.64, -r * 0.5, r * 0.84, r, r * 0.22);
    ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(-r * 0.5, -r * 0.36, r * 0.24, r * 0.3);
    ctx.fillRect(-r * 0.5, r * 0.06, r * 0.24, r * 0.3);
  }
  if (gun && !dead) {
    const L = gun.len + r * 0.5;
    const gx = r * 0.1 - kick;
    ctx.fillStyle = gun.color;
    ctx.fillRect(gx, r * 0.3, L, 5);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(gx, r * 0.3, L, 1.4);
    ctx.fillStyle = '#121212';
    ctx.fillRect(gx + L - 3, r * 0.3 + 0.5, 3.5, 4);
    if (gun.mag > 12) { ctx.fillStyle = gun.color; ctx.fillRect(gx + L * 0.42, r * 0.3 + 4, 4, gun.mag > 40 ? 7 : 5); }
    ctx.fillStyle = W ?? st.wing;
    ell(ctx, r * 0.38 - kick * 0.5, r * 0.44, r * 0.2, r * 0.2);
  }
  let hx = r * 0.58, hr = r * 0.56;
  if (kind === 2) {
    hx = r * 1.08; hr = r * 0.42;
    ctx.strokeStyle = W ?? st.body;
    ctx.lineWidth = r * 0.46;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.3, 0);
    ctx.lineTo(hx - hr * 0.3, 0);
    ctx.stroke();
    ctx.strokeStyle = '#ffcf3a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(r * 0.35, 0, r * 0.42, -1.2, 1.2);
    ctx.stroke();
  }
  ctx.fillStyle = W ?? st.head;
  ell(ctx, hx, 0, hr, hr);
  ctx.fillStyle = st.beak;
  ell(ctx, hx + hr * 0.95, 0, hr * 0.6, hr * 0.42);
  if (kind === 2 && !W) { ctx.fillStyle = '#222'; ell(ctx, hx + hr * 0.5, 0, hr * 0.22, hr * 0.22); }
  if (dead) {
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.6;
    for (const s of [-1, 1]) {
      const ex = hx + hr * 0.3, ey = s * hr * 0.5, k = hr * 0.2;
      ctx.beginPath();
      ctx.moveTo(ex - k, ey - k); ctx.lineTo(ex + k, ey + k);
      ctx.moveTo(ex + k, ey - k); ctx.lineTo(ex - k, ey + k);
      ctx.stroke();
    }
  } else if (kind === 2) {
    ctx.fillStyle = '#111';
    ctx.fillRect(hx + hr * 0.12, -hr * 0.85, hr * 0.42, hr * 1.7);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(hx + hr * 0.18, -hr * 0.7, hr * 0.12, hr * 0.4);
  } else {
    ctx.fillStyle = '#141414';
    ell(ctx, hx + hr * 0.32, -hr * 0.55, hr * 0.17, hr * 0.17);
    ell(ctx, hx + hr * 0.32, hr * 0.55, hr * 0.17, hr * 0.17);
    ctx.fillStyle = '#fff';
    ell(ctx, hx + hr * 0.38, -hr * 0.6, hr * 0.06, hr * 0.06);
    ell(ctx, hx + hr * 0.38, hr * 0.5, hr * 0.06, hr * 0.06);
  }
  if (st.helmet && !W) {
    ctx.fillStyle = st.helmet;
    ctx.beginPath();
    ctx.arc(hx - hr * 0.08, 0, hr * 1.07, Math.PI * 0.42, Math.PI * 1.58);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ell(ctx, hx - hr * 0.45, -hr * 0.3, hr * 0.35, hr * 0.22);
  }
  if (st.visor && !W && !dead) { ctx.fillStyle = st.visor; ctx.fillRect(hx + hr * 0.16, -hr * 0.78, hr * 0.28, hr * 1.56); }
  if (st.band && !W) {
    ctx.strokeStyle = st.band;
    ctx.lineWidth = hr * 0.34;
    ctx.beginPath();
    ctx.arc(hx, 0, hr * 0.86, Math.PI * 0.55, Math.PI * 1.45);
    ctx.stroke();
  }
  if (kind === 1 && !W) {
    ctx.fillStyle = '#e23b3b';
    ell(ctx, hx - hr * 0.35, 0, hr * 0.3, hr * 0.22);
    ell(ctx, hx, 0, hr * 0.32, hr * 0.24);
    ell(ctx, hx + hr * 0.35, 0, hr * 0.26, hr * 0.2);
  }
  ctx.restore();
}

function mapRoads(m: GameMap) {
  const rp = new Path2D();
  for (const r of m.roads) {
    rp.moveTo(r[0], r[1]);
    for (let i = 2; i < r.length; i += 2) rp.lineTo(r[i], r[i + 1]);
  }
  return rp;
}

export function drawMapThumbnail(c: HTMLCanvasElement, m: GameMap, markers = true, rp = mapRoads(m)) {
  const g = c.getContext('2d');
  if (!g) return;
  g.save();
  g.fillStyle = '#5e8743';
  g.fillRect(0, 0, c.width, c.height);
  g.scale(c.width / m.w, c.height / m.h);
  g.fillStyle = '#7d7764';
  for (const p of m.pads) if (p.type === 'base' || p.type === 'canopy' || p.type === 'parking' || p.type === 'platform') g.fillRect(p.x, p.y, p.w, p.h);
  g.fillStyle = '#7a6040';
  for (const p of m.pads) if (p.type === 'field') g.fillRect(p.x, p.y, p.w, p.h);
  g.strokeStyle = '#b8995f';
  g.lineWidth = 50;
  g.lineJoin = 'round';
  g.stroke(rp);
  g.fillStyle = '#4b93b5';
  for (const w of m.water) {
    if (w.w && w.h) g.fillRect(w.x - w.w / 2, w.y - w.h / 2, w.w, w.h);
    else { g.beginPath(); g.arc(w.x, w.y, w.r, 0, TAU); g.fill(); }
  }
  g.fillStyle = '#c4b393';
  for (const f of m.floors) g.fillRect(f.x, f.y, f.w, f.h);
  g.fillStyle = '#3a2f28';
  for (const s of m.solids) if (s.f & F_SIGHT && s.kind !== 'bound') g.fillRect(s.x, s.y, s.w, s.h);
  for (const t of m.trees) {
    if (t.x < 0 || t.y < 0 || t.x > m.w || t.y > m.h) continue;
    g.fillStyle = t.solid ? '#365d2b' : '#bad2d6';
    g.beginPath(); g.arc(t.x, t.y, t.r * 0.8, 0, TAU); g.fill();
  }
  if (markers) {
    for (const exit of m.extractions) {
      g.fillStyle = '#8effbd';
      ell(g, exit.x, exit.y, 34, 34);
    }
    for (const boss of m.enemySpots.filter((spot) => ENEMIES[spot.type].boss)) {
      g.fillStyle = '#ff895d';
      ell(g, boss.x, boss.y, 49, 49);
      g.strokeStyle = '#4f271e';
      g.lineWidth = 14;
      g.stroke();
    }
  }
  g.restore();
}

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  W = 1;
  H = 1;
  dpr = 1;
  quality = 2;
  touchDevice: boolean;
  private grass!: CanvasPattern;
  private groundPatterns: Partial<Record<RaidMapId, CanvasPattern>> = {};
  private floorPat: Record<FloorType, CanvasPattern> = {} as Record<FloorType, CanvasPattern>;
  private asphalt!: CanvasPattern;
  private glowCache = new Map<string, HTMLCanvasElement>();
  private iconCache = new Map<string, HTMLCanvasElement>();
  private gearIconCache = new Map<string, HTMLImageElement>();
  private armorIconAtlas = createImage();
  private canopies: HTMLCanvasElement[] = [];
  private snowBushCanopies: HTMLCanvasElement[] = [];
  private scorch!: HTMLCanvasElement;
  private minimap: HTMLCanvasElement | null = null;
  private vignette: HTMLCanvasElement | null = null;
  private roadPath: Path2D | null = null;
  private v = { l: 0, r: 0, t: 0, b: 0 };
  private ftAcc = 0;
  private ftN = 0;
  private lowFor = 0;
  private staticMap: Game['map'] | null = null;
  private warm = 3;
  private lily: { x: number; y: number; r: number }[] = [];
  private tall: Solid[] = [];
  private low: Solid[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.touchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && !window.matchMedia('(pointer: fine)').matches;
    this.armorIconAtlas.src = armorIconAtlasUrl;
    this.buildAssets();
  }

  private buildAssets() {
    const rnd = seeded(77);
    // grass
    {
      const c = mk(256, 256), g = c.getContext('2d')!;
      g.fillStyle = '#6f9a4b';
      g.fillRect(0, 0, 256, 256);
      const wrap = (fn: (ox: number, oy: number) => void) => { for (const ox of [-256, 0, 256]) for (const oy of [-256, 0, 256]) fn(ox, oy); };
      for (let i = 0; i < 70; i++) {
        const x = rnd() * 256, y = rnd() * 256, r = 8 + rnd() * 26;
        const col = rnd() < 0.55 ? 'rgba(88,132,58,0.32)' : 'rgba(132,172,92,0.22)';
        wrap((ox, oy) => { g.fillStyle = col; ell(g, x + ox, y + oy, r, r * 0.8, rnd() * 3); });
      }
      g.lineCap = 'round';
      for (let i = 0; i < 260; i++) {
        const x = rnd() * 256, y = rnd() * 256, l = 2.5 + rnd() * 4, a = -Math.PI / 2 + (rnd() - 0.5) * 1.2;
        const col = rnd() < 0.75 ? 'rgba(62,98,40,0.45)' : 'rgba(170,205,115,0.35)';
        wrap((ox, oy) => {
          g.strokeStyle = col; g.lineWidth = 1.2;
          g.beginPath(); g.moveTo(x + ox, y + oy); g.lineTo(x + ox + Math.cos(a) * l, y + oy + Math.sin(a) * l); g.stroke();
        });
      }
      this.grass = this.ctx.createPattern(c, 'repeat')!;
    }
    const makeGround = (base: string, light: string, shade: string, seed: number) => {
      const tile = mk(192, 192), g = tile.getContext('2d')!, rand = seeded(seed);
      g.fillStyle = base; g.fillRect(0, 0, 192, 192);
      for (let i = 0; i < 430; i++) {
        const x = rand() * 192, y = rand() * 192, rx = 1 + rand() * 4, ry = 1 + rand() * 3;
        const color = rand() < 0.5 ? light : shade;
        g.fillStyle = color;
        for (const ox of [-192, 0, 192]) for (const oy of [-192, 0, 192]) ell(g, x + ox, y + oy, rx, ry, rand() * TAU);
      }
      return this.ctx.createPattern(tile, 'repeat')!;
    };
    this.groundPatterns = {
      harbor: makeGround('#748174', 'rgba(208,198,166,0.13)', 'rgba(39,52,52,0.15)', 3201),
      foundry: makeGround('#6b675d', 'rgba(205,178,127,0.1)', 'rgba(28,29,28,0.18)', 3202),
      hatchery: makeGround('#657449', 'rgba(177,185,112,0.14)', 'rgba(39,48,30,0.17)', 3203),
      outpost: makeGround('#aabdc3', 'rgba(239,249,249,0.45)', 'rgba(76,112,127,0.14)', 3204),
      mausoleum: makeGround('#7d7966', 'rgba(203,187,145,0.13)', 'rgba(48,48,43,0.16)', 3205),
    };
    // wood floor
    {
      const c = mk(96, 64), g = c.getContext('2d')!;
      const shades = ['#a37c53', '#977249', '#9d774e', '#906c46'];
      for (let i = 0; i < 4; i++) {
        g.fillStyle = shades[i];
        g.fillRect(0, i * 16, 96, 16);
        g.fillStyle = 'rgba(70,48,28,0.55)';
        g.fillRect(0, i * 16 + 15, 96, 1);
        const sx = ((i * 37) % 96);
        g.fillRect(sx, i * 16, 1, 15);
        g.fillStyle = 'rgba(255,240,210,0.06)';
        g.fillRect(0, i * 16, 96, 2);
      }
      this.floorPat.wood = this.ctx.createPattern(c, 'repeat')!;
    }
    // tile floor
    {
      const c = mk(48, 48), g = c.getContext('2d')!;
      g.fillStyle = '#bdb4a1';
      g.fillRect(0, 0, 48, 48);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
        g.fillStyle = (i + j) % 2 ? '#d9d2c1' : '#d0c8b5';
        g.fillRect(i * 24 + 1, j * 24 + 1, 22, 22);
      }
      this.floorPat.tile = this.ctx.createPattern(c, 'repeat')!;
    }
    // concrete
    {
      const c = mk(128, 128), g = c.getContext('2d')!;
      g.fillStyle = '#9b988f';
      g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 260; i++) {
        g.fillStyle = rnd() < 0.5 ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
        g.fillRect(rnd() * 128, rnd() * 128, 1 + rnd() * 3, 1 + rnd() * 3);
      }
      g.strokeStyle = 'rgba(0,0,0,0.12)';
      g.lineWidth = 1;
      g.strokeRect(0.5, 0.5, 127, 127);
      g.beginPath(); g.moveTo(20, 30); g.lineTo(40, 44); g.lineTo(52, 40); g.stroke();
      this.floorPat.concrete = this.ctx.createPattern(c, 'repeat')!;
    }
    // asphalt
    {
      const c = mk(96, 96), g = c.getContext('2d')!;
      g.fillStyle = '#4c4d50';
      g.fillRect(0, 0, 96, 96);
      for (let i = 0; i < 200; i++) {
        g.fillStyle = rnd() < 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.07)';
        g.fillRect(rnd() * 96, rnd() * 96, 1.5, 1.5);
      }
      this.asphalt = this.ctx.createPattern(c, 'repeat')!;
    }
    // canopies
    const pals = [['#2d4f24', '#3f6b2f', '#4f7f38', '#6a9a48'], ['#284a22', '#355f2c', '#47753a', '#5f8f45'], ['#33501f', '#4a6f2a', '#5d8636', '#7aa04a']];
    const canopyBlobs: [number, number, number][][] = [];
    for (let v = 0; v < 3; v++) {
      const c = mk(220, 220), g = c.getContext('2d')!;
      const P = pals[v];
      const blobs: [number, number, number][] = [[110, 110, 64]];
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * TAU + rnd() * 0.5, d = 38 + rnd() * 14;
        blobs.push([110 + Math.cos(a) * d, 110 + Math.sin(a) * d, 34 + rnd() * 14]);
      }
      canopyBlobs.push(blobs);
      g.fillStyle = P[0];
      for (const b of blobs) ell(g, b[0], b[1], b[2] + 5, b[2] + 5);
      g.fillStyle = P[1];
      for (const b of blobs) ell(g, b[0], b[1], b[2], b[2]);
      g.fillStyle = P[2];
      for (const b of blobs) ell(g, b[0] - b[2] * 0.25, b[1] - b[2] * 0.25, b[2] * 0.68, b[2] * 0.68);
      g.fillStyle = P[3];
      for (let i = 0; i < 9; i++) {
        const b = blobs[Math.floor(rnd() * blobs.length)];
        ell(g, b[0] - b[2] * 0.4 + rnd() * 6, b[1] - b[2] * 0.4 + rnd() * 6, 6 + rnd() * 9, 5 + rnd() * 7);
      }
      this.canopies.push(c);
    }
    // Snowy outpost bushes: reuse the exact map-1 bush blobs, then lay snow on top.
    for (let v = 0; v < 3; v++) {
      const c = mk(220, 220), g = c.getContext('2d')!, P = pals[v], blobs = canopyBlobs[v];
      const srnd = seeded(4100 + v * 17);
      g.fillStyle = P[0];
      for (const b of blobs) ell(g, b[0], b[1], b[2] + 5, b[2] + 5);
      g.fillStyle = P[1];
      for (const b of blobs) ell(g, b[0], b[1], b[2], b[2]);
      g.fillStyle = P[2];
      for (const b of blobs) ell(g, b[0] - b[2] * 0.25, b[1] - b[2] * 0.25, b[2] * 0.68, b[2] * 0.68);
      g.fillStyle = 'rgba(210,233,236,0.22)';
      for (const b of blobs) ell(g, b[0] + b[2] * 0.12, b[1] + b[2] * 0.22, b[2] * 0.78, b[2] * 0.56);
      g.strokeStyle = 'rgba(246,253,253,0.94)'; g.lineCap = 'round';
      for (const [x, y, rad] of blobs) {
        g.lineWidth = Math.max(7, rad * 0.3);
        g.beginPath(); g.arc(x, y, rad * 0.82, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
      }
      g.fillStyle = 'rgba(252,254,254,0.96)';
      for (const [x, y, rad] of blobs) ell(g, x - rad * 0.14, y - rad * 0.48, rad * 0.6, rad * 0.27, -0.12);
      g.fillStyle = P[3];
      for (let i = 0; i < 9; i++) {
        const b = blobs[Math.floor(srnd() * blobs.length)];
        ell(g, b[0] - b[2] * 0.4 + srnd() * 6, b[1] - b[2] * 0.4 + srnd() * 6, 5 + srnd() * 8, 4 + srnd() * 6);
      }
      g.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 14; i++) ell(g, 38 + srnd() * 144, 38 + srnd() * 140, 1 + srnd() * 2.2, 1 + srnd() * 1.6);
      this.snowBushCanopies.push(c);
    }
    // scorch
    {
      const c = mk(128, 128), g = c.getContext('2d')!;
      const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64);
      grd.addColorStop(0, 'rgba(20,16,12,0.85)');
      grd.addColorStop(0.55, 'rgba(30,24,18,0.5)');
      grd.addColorStop(1, 'rgba(30,24,18,0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 10; i++) {
        const a = rnd() * TAU, l = 30 + rnd() * 30;
        g.strokeStyle = 'rgba(15,12,10,0.5)';
        g.lineWidth = 2 + rnd() * 3;
        g.beginPath(); g.moveTo(64, 64); g.lineTo(64 + Math.cos(a) * l, 64 + Math.sin(a) * l); g.stroke();
      }
      this.scorch = c;
    }
  }

  private glow(color: string): HTMLCanvasElement {
    let c = this.glowCache.get(color);
    if (!c) {
      c = mk(128, 128);
      const g = c.getContext('2d')!;
      const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0, hexA(color, 1));
      grd.addColorStop(0.22, hexA(color, 0.55));
      grd.addColorStop(0.6, hexA(color, 0.12));
      grd.addColorStop(1, hexA(color, 0));
      g.fillStyle = grd;
      g.fillRect(0, 0, 128, 128);
      this.glowCache.set(color, c);
    }
    return c;
  }

  private emoji(icon: string): HTMLCanvasElement {
    let c = this.iconCache.get(icon);
    if (!c) {
      c = mk(76, 76);
      const g = c.getContext('2d')!;
      if (icon === 'GUN') {
        g.fillStyle = '#d7d9dc';
        g.strokeStyle = '#2a2d31';
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(6, 30); g.lineTo(52, 30); g.lineTo(52, 26); g.lineTo(70, 26); g.lineTo(70, 34); g.lineTo(52, 36);
        g.lineTo(44, 36); g.lineTo(40, 52); g.lineTo(32, 52); g.lineTo(34, 40); g.lineTo(20, 40); g.lineTo(10, 48); g.lineTo(4, 44); g.lineTo(10, 38); g.closePath();
        g.fill(); g.stroke();
        g.fillStyle = '#9ea3a8';
        g.fillRect(44, 38, 7, 12);
      } else {
        g.font = `54px ${FONT_EMOJI}`;
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(icon, 38, 42);
      }
      this.iconCache.set(icon, c);
    }
    return c;
  }

  drawIcon(icon: string, x: number, y: number, size: number) {
    if (icon.startsWith('gear:')) {
      const id = icon.slice(5);
      if (id.startsWith('w_')) {
        let img = this.gearIconCache.get(id);
        if (!img) {
          img = createImage();
          img.src = weaponIconDataUrl(id.slice(2));
          this.gearIconCache.set(id, img);
        }
        if (imageReady(img)) {
          const iconHeight = size * 88 / 144;
          this.ctx.drawImage(img, x - size / 2, y - iconHeight / 2, size, iconHeight);
          return;
        }
        this.ctx.drawImage(this.emoji('GUN'), x - size / 2, y - size / 2, size, size);
        return;
      }
      const armorArt = ARMOR_ART_CELL[id];
      const atlasSize = imageSize(this.armorIconAtlas);
      if (armorArt !== undefined && imageReady(this.armorIconAtlas) && atlasSize.h > 0) {
        const cell = atlasSize.w / 3;
        this.ctx.drawImage(this.armorIconAtlas, armorArt * cell, 0, cell, atlasSize.h, x - size / 2, y - size / 2, size, size);
        return;
      }
      this.ctx.drawImage(this.emoji('🦺'), x - size / 2, y - size / 2, size, size);
      return;
    }
    this.ctx.drawImage(this.emoji(icon), x - size / 2, y - size / 2, size, size);
  }

  resize(w: number, h: number, game: Game) {
    this.W = w; this.H = h;
    const maxD = this.quality >= 2 ? 2 : this.quality === 1 ? 1.5 : 1;
    this.dpr = Math.min(window.devicePixelRatio || 1, maxD);
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    const target = this.touchDevice ? 800000 : 1000000;
    game.cam.base = Math.max(0.5, Math.min(1.7, Math.sqrt((w * h) / target)));
    game.viewW = w; game.viewH = h;
    game.maxParticles = this.quality >= 2 ? 700 : this.quality === 1 ? 450 : 260;
    const vc = mk(Math.max(2, w / 2), Math.max(2, h / 2)), g = vc.getContext('2d')!;
    const cx = vc.width / 2, cy = vc.height / 2;
    const grd = g.createRadialGradient(cx, cy, Math.min(cx, cy) * 0.55, cx, cy, Math.hypot(cx, cy));
    grd.addColorStop(0, 'rgba(6,8,12,0)');
    grd.addColorStop(1, 'rgba(6,8,12,0.6)');
    g.fillStyle = grd;
    g.fillRect(0, 0, vc.width, vc.height);
    this.vignette = vc;
    if (this.staticMap !== game.map) this.buildStatic(game);
  }

  private buildStatic(game: Game) {
    this.staticMap = game.map;
    this.lily = [];
    const m = game.map;
    this.tall = m.solids.filter((s) => (s.f & F_SIGHT) && s.kind !== 'bound');
    this.low = m.solids.filter((s) => !(s.f & F_SIGHT) && s.kind !== 'water' && s.kind !== 'container' && s.kind !== 'bound');
    this.roadPath = mapRoads(m);
    const rnd = seeded(5);
    for (const w of m.water) {
      if (w.w && w.h) continue; // open sea / harbour water has no pond lilies
      for (let i = 0; i < 2; i++) {
        const a = rnd() * TAU, d = rnd() * Math.max(1, w.r - 40);
        this.lily.push({ x: w.x + Math.cos(a) * d, y: w.y + Math.sin(a) * d, r: 7 + rnd() * 6 });
      }
    }
    this.minimap = mk(m.w / 10, m.h / 10);
    drawMapThumbnail(this.minimap, m, false, this.roadPath);
  }

  private trackPerf(dt: number, game: Game) {
    if (this.warm > 0) { this.warm -= dt; return; }
    if (dt > 0.1) return; // ignore hitches (tab switches, GC, font loads)
    this.ftAcc += dt;
    this.ftN++;
    if (this.ftAcc > 2) {
      const avg = this.ftAcc / this.ftN;
      this.ftAcc = 0; this.ftN = 0;
      if (avg > 1 / 48) this.lowFor++; else this.lowFor = 0;
      if (this.lowFor >= 3 && this.quality > 0) {
        this.quality--;
        this.lowFor = 0;
        this.warm = 2;
        this.resize(this.W, this.H, game);
      }
    }
  }

  // ======================================================================== render
  render(g: Game, inp: Input, mode: string, dt: number) {
    this.trackPerf(dt, g);
    if (this.staticMap !== g.map) this.buildStatic(g);
    const ctx = this.ctx, W = this.W, H = this.H, dpr = this.dpr;
    const c = g.cam, z = c.zoom;
    const camX = c.x + c.kx, camY = c.y + c.ky;
    ctx.setTransform(dpr * z, 0, 0, dpr * z, dpr * (W / 2 + c.sx - camX * z), dpr * (H / 2 + c.sy - camY * z));
    const v = this.v;
    v.l = camX - W / 2 / z - 70; v.r = camX + W / 2 / z + 70; v.t = camY - H / 2 / z - 70; v.b = camY + H / 2 / z + 70;
    ctx.fillStyle = g.mapId === 'outpost' ? '#586e78' : '#2a4224';
    ctx.fillRect(v.l, v.t, v.r - v.l, v.b - v.t);
    ctx.fillStyle = this.groundPatterns[g.mapId] ?? this.grass;
    ctx.fillRect(Math.max(0, v.l), Math.max(0, v.t), Math.min(g.map.w, v.r) - Math.max(0, v.l), Math.min(g.map.h, v.b) - Math.max(0, v.t));
    const raid = g.mode === 'raid';
    this.drawPads(g);
    this.drawRoads(g);
    this.drawWater(g);
    this.drawFloors(g);
    this.drawDecor(g);
    this.drawExtractGround(g);
    this.drawDecals(g);
    this.drawGroundShadows(g);
    this.drawScenery(g);
    this.drawContainers(g);
    this.drawLow();
    this.drawParticles(g, 0);
    this.drawGrenades(g);
    this.drawEnemies(g);
    if (raid && (!g.player.dead || g.outcome === 'extract')) this.drawPlayer(g);
    this.drawZones(g);
    this.drawCanopies(g);
    this.drawParticles(g, 1);
    if (raid) this.drawFog(g);
    this.drawWalls();
    this.drawAdditive(g);
    this.drawWorldUI(g, inp);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.vignette) ctx.drawImage(this.vignette, 0, 0, W, H);
    if (raid) {
      this.drawScreenFx(g);
      if (mode !== 'menu') this.drawHUD(g, inp, mode);
    }
    if (g.bagOpen) this.drawBag(g);
  }

  private drawBag(g: Game) {
    const ctx = this.ctx, W = this.W, H = this.H;
    const u = hudScale(W, H, true);
    const ui = bagUi(W, H, u);
    ctx.save();
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.72)';
    ctx.fillRect(0, 0, W, H);
    this.panel(ui.x, ui.y, ui.w, ui.h, 12);
    this.txt('背包 · 点枪/甲装备 · 点其他丢弃', ui.x + 14 * u, ui.y + 17 * u, 13 * u, '#ffd23f', 'left', 800);
    const total = g.lootValue;
    this.txt(`¥${fmtMoney(total)} · ${g.player.backpack.length}/${g.player.capacity}`, ui.x + ui.w - 14 * u, ui.y + 17 * u, 12 * u, '#ffcf4a', 'right', 700, FONT_NUM);
    for (const s of ui.slots) {
      const it = g.player.backpack[s.index];
      ctx.fillStyle = it ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.025)';
      ctx.strokeStyle = it ? RARITY_COLORS[it.def.rarity] : 'rgba(255,255,255,0.09)';
      ctx.lineWidth = it && it.def.rarity >= 4 ? 2.5 : 1.2;
      rr(ctx, s.x, s.y, s.w, s.h, 7);
      ctx.fill();
      ctx.stroke();
      if (!it) continue;
      this.drawIcon(it.def.icon, s.x + s.w / 2, s.y + s.h * 0.36, s.h * 0.44);
      // Equippable gear gets a corner pip so players know a tap will equip it.
      if (it.def.kind === 'weapon' || it.def.kind === 'armor') {
        ctx.fillStyle = '#8dffbb';
        ctx.beginPath(); ctx.arc(s.x + s.w - 9 * u, s.y + 9 * u, 4 * u, 0, TAU); ctx.fill();
      }
      const nm = it.def.name.length > 5 ? it.def.name.slice(0, 5) : it.def.name;
      this.txt(nm, s.x + s.w / 2, s.y + s.h * 0.72, Math.max(9, 10 * u), '#f2efe6', 'center', 700);
      this.txt(`¥${fmtMoney(it.def.value)}`, s.x + s.w / 2, s.y + s.h * 0.88, Math.max(8, 9 * u), '#ffcf4a', 'center', 700, FONT_NUM);
    }
    const b = ui.dropLowest, c = ui.close;
    ctx.fillStyle = 'rgba(255,120,90,0.16)';
    ctx.strokeStyle = '#ff8a5c'; ctx.lineWidth = 1.4;
    rr(ctx, b.x, b.y, b.w, b.h, 7); ctx.fill(); ctx.stroke();
    this.txt('丢弃最低价值', b.x + b.w / 2, b.y + b.h / 2, 12 * u, '#ffb08a', 'center', 800);
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
    rr(ctx, c.x, c.y, c.w, c.h, 7); ctx.fill(); ctx.stroke();
    this.txt('关闭', c.x + c.w / 2, c.y + c.h / 2, 12 * u, '#ddd', 'center', 800);
    ctx.restore();
  }

  private inView(x: number, y: number, m: number) {
    const v = this.v;
    return x > v.l - m && x < v.r + m && y > v.t - m && y < v.b + m;
  }

  private drawPads(g: Game) {
    const ctx = this.ctx;
    for (const p of g.map.pads) {
      if (p.x > this.v.r || p.x + p.w < this.v.l || p.y > this.v.b || p.y + p.h < this.v.t) continue;
      switch (p.type) {
        case 'base':
          ctx.fillStyle = '#8f8873';
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = 'rgba(0,0,0,0.05)';
          for (let x = p.x; x < p.x + p.w; x += 80) ctx.fillRect(x, p.y, 2, p.h);
          ctx.strokeStyle = 'rgba(240,220,120,0.45)';
          ctx.lineWidth = 4;
          ctx.setLineDash([24, 16]);
          ctx.strokeRect(p.x + 40, p.y + 40, p.w - 80, p.h - 80);
          ctx.setLineDash([]);
          break;
        case 'canopy':
          ctx.fillStyle = this.floorPat.concrete;
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.strokeStyle = 'rgba(200,40,40,0.55)';
          ctx.lineWidth = 6;
          ctx.strokeRect(p.x + 3, p.y + 3, p.w - 6, p.h - 6);
          break;
        case 'parking':
          ctx.fillStyle = this.asphalt;
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          for (let x = p.x + 10; x < p.x + p.w; x += 50) ctx.fillRect(x, p.y + 6, 3, 40);
          break;
        case 'field':
          ctx.fillStyle = '#6e5536';
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = 'rgba(40,28,15,0.35)';
          for (let y = p.y + 8; y < p.y + p.h; y += 26) ctx.fillRect(p.x + 6, y, p.w - 12, 6);
          break;
        case 'platform':
          ctx.fillStyle = this.floorPat.concrete;
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = '#e8c547';
          ctx.fillRect(p.x, p.y, p.w, 6);
          break;
        case 'helipad': {
          const cx = p.x + p.w / 2, cy = p.y + p.h / 2;
          ctx.fillStyle = '#6d6f72';
          ctx.beginPath(); ctx.arc(cx, cy, p.w / 2, 0, TAU); ctx.fill();
          ctx.strokeStyle = '#e8c547';
          ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(cx, cy, p.w / 2 - 10, 0, TAU); ctx.stroke();
          ctx.fillStyle = '#f0ede4';
          ctx.fillRect(cx - 26, cy - 30, 10, 60); ctx.fillRect(cx + 16, cy - 30, 10, 60); ctx.fillRect(cx - 16, cy - 5, 32, 10);
          break;
        }
        case 'dock':
          ctx.fillStyle = this.floorPat.wood;
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.fillStyle = '#5c4126';
          for (let x = p.x; x < p.x + p.w; x += 45) ctx.fillRect(x, p.y - 4, 8, p.h + 8);
          ctx.fillStyle = '#8a3b2b';
          rr(ctx, p.x + p.w - 30, p.y + p.h + 6, 70, 30, 14);
          ctx.fill();
          ctx.fillStyle = '#c7a26a';
          rr(ctx, p.x + p.w - 22, p.y + p.h + 12, 54, 18, 8);
          ctx.fill();
          break;
      }
    }
    // rail tracks
    const v = this.v;
    for (const ty of g.map.tracks) {
      if (ty < v.t - 20 || ty > v.b + 20) continue;
      ctx.fillStyle = '#5a4630';
      const x0 = Math.max(0, Math.floor(v.l / 22) * 22), x1 = Math.min(g.map.w, v.r);
      for (let x = x0; x < x1; x += 22) ctx.fillRect(x, ty - 18, 9, 36);
      ctx.fillStyle = '#8e9296';
      ctx.fillRect(x0, ty - 12, x1 - x0, 3.5);
      ctx.fillRect(x0, ty + 9, x1 - x0, 3.5);
    }
  }

  private drawRoads(g: Game) {
    if (!this.roadPath) return;
    const ctx = this.ctx;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const palette: Record<RaidMapId, { shoulder: string; base: string; crown: string; mark: string; dash: number[] }> = {
      island: { shoulder: '#97794c', base: '#b39563', crown: 'rgba(120,92,58,0.35)', mark: 'rgba(120,92,58,0.35)', dash: [26, 20] },
      harbor: { shoulder: '#454b4c', base: '#747b78', crown: 'rgba(210,200,164,0.54)', mark: 'rgba(216,207,177,0.7)', dash: [18, 24] },
      foundry: { shoulder: '#3b3c3b', base: '#5c5c56', crown: 'rgba(180,145,91,0.28)', mark: 'rgba(219,177,99,0.72)', dash: [24, 18] },
      hatchery: { shoulder: '#4e4934', base: '#786543', crown: 'rgba(157,131,78,0.34)', mark: 'rgba(194,172,119,0.58)', dash: [9, 25] },
      outpost: { shoulder: '#718b95', base: '#d9e5e7', crown: 'rgba(116,148,159,0.5)', mark: 'rgba(239,249,249,0.82)', dash: [20, 21] },
      mausoleum: { shoulder: '#51534d', base: '#928972', crown: 'rgba(204,189,152,0.45)', mark: 'rgba(215,204,172,0.7)', dash: [11, 17] },
    };
    const style = palette[g.mapId];
    ctx.strokeStyle = style.shoulder;
    ctx.lineWidth = g.mapId === 'island' ? 66 : 80;
    ctx.stroke(this.roadPath);
    ctx.strokeStyle = style.base;
    ctx.lineWidth = g.mapId === 'island' ? 54 : 62;
    ctx.stroke(this.roadPath);
    if (g.mapId === 'outpost') {
      // Packed snow lane with two subtle vehicle ruts.
      ctx.strokeStyle = 'rgba(91,126,139,0.42)';
      ctx.lineWidth = 3;
      ctx.setLineDash([28, 20]);
      ctx.stroke(this.roadPath);
      ctx.strokeStyle = 'rgba(250,255,255,0.72)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([15, 33]);
    } else if (g.mapId === 'mausoleum') {
      // Small joints make the pale road read as fitted stone slabs.
      ctx.strokeStyle = 'rgba(67,67,59,0.28)';
      ctx.lineWidth = 7;
      ctx.setLineDash([3, 21]);
      ctx.stroke(this.roadPath);
      ctx.strokeStyle = style.mark;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 20]);
    } else {
      ctx.strokeStyle = style.crown;
      ctx.lineWidth = g.mapId === 'island' ? 6 : g.mapId === 'harbor' || g.mapId === 'foundry' ? 2.2 : 5;
      ctx.setLineDash(style.dash);
    }
    ctx.stroke(this.roadPath);
    ctx.setLineDash([]);
  }

  private drawWater(g: Game) {
    const ctx = this.ctx, w = g.map.water;
    if (!w.some((pool) => this.inView(pool.x, pool.y, (pool.w || pool.r * 2) + 40))) return;
    const frozen = g.mapId === 'outpost';
    const ext = (c: typeof w[number], pad: number) => c.w && c.h
      ? { x: c.x - c.w / 2 - pad, y: c.y - c.h / 2 - pad, w: c.w + pad * 2, h: c.h + pad * 2 }
      : null;
    // shoreline halo
    ctx.fillStyle = frozen ? '#d0dce0' : '#cdb88a';
    for (const c of w) {
      const r = ext(c, 22);
      if (r) ctx.fillRect(r.x, r.y, r.w, r.h);
      else { ctx.beginPath(); ctx.arc(c.x, c.y, c.r + 22, 0, TAU); ctx.fill(); }
    }
    // water body
    ctx.fillStyle = frozen ? '#8bb1bc' : '#4b93b5';
    for (const c of w) {
      if (c.w && c.h) ctx.fillRect(c.x - c.w / 2, c.y - c.h / 2, c.w, c.h);
      else { ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, TAU); ctx.fill(); }
    }
    // darker inner tone
    ctx.fillStyle = frozen ? '#719ba8' : '#3f84a6';
    for (const c of w) {
      if (c.w && c.h) { const i = ext(c, -42)!; ctx.fillRect(i.x, i.y, i.w, i.h); }
      else { ctx.beginPath(); ctx.arc(c.x, c.y, Math.max(5, c.r - 42), 0, TAU); ctx.fill(); }
    }
    const t = g.realT;
    ctx.strokeStyle = frozen ? 'rgba(235,250,252,0.42)' : 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    for (let i = 0; i < w.length; i++) {
      const c = w[i];
      const rw = c.w || c.r * 2;
      for (let k = 0; k < 2; k++) {
        const ph = (t * 0.35 + i * 0.3 + k * 0.5) % 1;
        ctx.globalAlpha = 1 - ph;
        const wx = c.x + Math.sin(i * 3 + k) * rw * 0.14;
        const wy = c.y + Math.cos(i * 2 + k) * (c.h || c.r * 2) * 0.1;
        ctx.beginPath();
        ctx.ellipse(wx, wy, 10 + ph * 40, 5 + ph * 18, 0, 0, TAU);
        ctx.stroke();
      }
    }
    if (frozen) {
      ctx.save();
      ctx.beginPath();
      for (const pool of w) {
        if (pool.w && pool.h) ctx.rect(pool.x - pool.w / 2, pool.y - pool.h / 2, pool.w, pool.h);
      }
      ctx.clip();
      ctx.strokeStyle = 'rgba(235,250,252,0.23)';
      ctx.lineWidth = 2;
      for (const [i, pool] of w.entries()) {
        if (!pool.w || !pool.h) continue;
        for (let crack = 0; crack < 3; crack++) {
          const sx = pool.x - pool.w * 0.4 + ((i * 47 + crack * 89) % Math.max(1, pool.w * 0.8));
          const sy = pool.y - pool.h * 0.35 + ((i * 29 + crack * 31) % Math.max(1, pool.h * 0.7));
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + 14, sy + 7);
          ctx.lineTo(sx + 28, sy + 4);
          ctx.lineTo(sx + 41, sy + 13);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = frozen ? '#c1d5d8' : '#5d9a46';
    for (const l of this.lily) {
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.r, 0.4, TAU - 0.1);
      ctx.lineTo(l.x, l.y);
      ctx.fill();
    }
  }

  private drawFloors(g: Game) {
    const ctx = this.ctx, v = this.v;
    for (const f of g.map.floors) {
      if (f.x > v.r || f.x + f.w < v.l || f.y > v.b || f.y + f.h < v.t) continue;
      ctx.fillStyle = this.floorPat[f.type];
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeStyle = 'rgba(0,0,0,0.16)';
      ctx.lineWidth = 14;
      ctx.strokeRect(f.x + 20, f.y + 20, f.w - 40, f.h - 40);
    }
  }

  private drawDecor(g: Game) {
    const ctx = this.ctx, v = this.v;
    const d = g.map.decor;
    const cold = g.mapId === 'outpost', swamp = g.mapId === 'hatchery', crypt = g.mapId === 'mausoleum';
    const vis: number[] = [];
    for (let i = 0; i < d.length; i++) {
      const o = d[i];
      if (o.x > v.l && o.x < v.r && o.y > v.t && o.y < v.b) vis.push(i);
    }
    // bushes
    ctx.fillStyle = swamp ? '#536b39' : crypt ? '#586244' : cold ? '#496b50' : '#3f6a2e';
    ctx.beginPath();
    for (const i of vis) { const o = d[i]; if (o.t !== 3) continue; ctx.moveTo(o.x + o.s, o.y); ctx.arc(o.x, o.y, o.s, 0, TAU); ctx.moveTo(o.x + o.s * 0.9 + o.s * 0.6, o.y + 4); ctx.arc(o.x + o.s * 0.6, o.y + 4, o.s * 0.9, 0, TAU); }
    ctx.fill();
    ctx.fillStyle = swamp ? '#82954f' : crypt ? '#7d8150' : cold ? '#8ba99a' : '#548a3c';
    ctx.beginPath();
    for (const i of vis) { const o = d[i]; if (o.t !== 3) continue; ctx.moveTo(o.x - 3 + o.s * 0.6, o.y - 3); ctx.arc(o.x - 3, o.y - 3, o.s * 0.6, 0, TAU); }
    ctx.fill();
    if (swamp || crypt || cold) {
      ctx.fillStyle = cold ? 'rgba(244,252,253,0.9)' : swamp ? 'rgba(207,205,128,0.68)' : 'rgba(220,204,151,0.58)';
      ctx.beginPath();
      for (const i of vis) {
        const o = d[i]; if (o.t !== 3) continue;
        ctx.moveTo(o.x + o.s * 0.65, o.y - o.s * 0.5);
        ctx.arc(o.x + o.s * 0.52, o.y - o.s * 0.56, Math.max(1.3, o.s * 0.13), 0, TAU);
      }
      ctx.fill();
    }
    // tufts
    ctx.strokeStyle = cold ? '#e8f2f2' : swamp ? '#9aa75b' : crypt ? '#9a9869' : g.mapId === 'foundry' ? '#9a8058' : '#4f7836';
    ctx.lineWidth = cold ? 1.35 : 1.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (const i of vis) {
      const o = d[i];
      if (o.t !== 0) continue;
      ctx.moveTo(o.x, o.y); ctx.lineTo(o.x - o.s * 0.5, o.y - o.s);
      ctx.moveTo(o.x, o.y); ctx.lineTo(o.x, o.y - o.s * 1.2);
      ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + o.s * 0.5, o.y - o.s);
    }
    ctx.stroke();
    // crops
    ctx.fillStyle = '#86a843';
    ctx.beginPath();
    for (const i of vis) { const o = d[i]; if (o.t !== 4) continue; ctx.moveTo(o.x + o.s, o.y); ctx.ellipse(o.x, o.y, o.s, o.s * 0.45, o.rot, 0, TAU); ctx.moveTo(o.x + o.s * 0.45, o.y); ctx.ellipse(o.x, o.y, o.s * 0.45, o.s, o.rot, 0, TAU); }
    ctx.fill();
    // pebbles
    ctx.fillStyle = cold ? '#d6e4e6' : g.mapId === 'foundry' ? '#85847b' : '#a19c90';
    ctx.beginPath();
    for (const i of vis) { const o = d[i]; if (o.t !== 2) continue; ctx.moveTo(o.x + o.s, o.y); ctx.ellipse(o.x, o.y, o.s, o.s * 0.7, o.rot, 0, TAU); }
    ctx.fill();
    // flowers
    const fc = cold ? ['#eff8f8', '#b7dfeb', '#ffffff', '#d8e2eb']
      : swamp ? ['#f1e59c', '#ef9fba', '#f4f0d9', '#cbb3e5']
        : crypt ? ['#e9d18b', '#dfbdc2', '#f2e6ba', '#cfc4a7']
          : ['#f4e8a0', '#f2a7c3', '#ffffff', '#c9a7f2'];
    const flowerDecor = vis.map((i) => d[i]).filter((o) => o.t === 1);
    for (const o of flowerDecor) {
      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.rotate(o.rot);
      if (!cold && !swamp && !crypt && g.mapId !== 'harbor') {
        ctx.fillStyle = fc[o.c % fc.length];
        ctx.beginPath(); ctx.arc(0, 0, o.s, 0, TAU); ctx.fill();
        ctx.restore();
        continue;
      }
      if (!cold && (swamp || crypt || g.mapId === 'harbor')) {
        ctx.strokeStyle = swamp ? '#6d8746' : '#687b4b';
        ctx.lineWidth = Math.max(1, o.s * 0.22);
        ctx.beginPath(); ctx.moveTo(0, o.s * 0.18); ctx.lineTo(0, o.s * 1.8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, o.s * 1.05); ctx.lineTo(-o.s * 0.75, o.s * 0.78); ctx.moveTo(0, o.s * 1.35); ctx.lineTo(o.s * 0.68, o.s * 1.08); ctx.stroke();
      }
      ctx.fillStyle = fc[o.c % fc.length];
      if (cold) {
        for (let petal = 0; petal < 5; petal++) {
          const a = petal * TAU / 5;
          ctx.beginPath(); ctx.ellipse(Math.cos(a) * o.s * 0.55, Math.sin(a) * o.s * 0.55, Math.max(1.2, o.s * 0.35), Math.max(1, o.s * 0.23), a, 0, TAU); ctx.fill();
        }
        ctx.fillStyle = '#96bbc5';
      } else {
        for (let petal = 0; petal < 5; petal++) {
          const a = petal * TAU / 5;
          ctx.beginPath(); ctx.ellipse(Math.cos(a) * o.s * 0.52, Math.sin(a) * o.s * 0.52, Math.max(1, o.s * 0.36), Math.max(0.8, o.s * 0.22), a, 0, TAU); ctx.fill();
        }
        ctx.fillStyle = '#e4bd58';
      }
      ctx.beginPath(); ctx.arc(0, 0, Math.max(1.2, o.s * 0.24), 0, TAU); ctx.fill();
      ctx.restore();
    }
    // Marsh reeds and harbor-edge grass use a different, taller silhouette than lawn tufts.
    if (swamp || g.mapId === 'harbor') {
      ctx.lineCap = 'round';
      for (const i of vis) {
        const o = d[i]; if (o.t !== 5) continue;
        ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.rot);
        for (let blade = -2; blade <= 2; blade++) {
          const bx = blade * o.s * 0.22, lean = blade * o.s * 0.2;
          ctx.strokeStyle = blade % 2 ? '#78904b' : swamp ? '#657b3f' : '#81916a';
          ctx.lineWidth = Math.max(1.2, o.s * 0.13);
          ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(bx + lean * 0.4, -o.s * 0.55, bx + lean, -o.s * (1.2 + (Math.abs(blade) % 2) * 0.18)); ctx.stroke();
          if (blade === 0 || blade === 2) {
            ctx.fillStyle = '#c4a76a';
            ctx.beginPath(); ctx.ellipse(bx + lean, -o.s * 1.2, o.s * 0.13, o.s * 0.32, -0.15, 0, TAU); ctx.fill();
          }
        }
        ctx.restore();
      }
    }
  }

  private drawExtractGround(g: Game) {
    const ctx = this.ctx, t = g.realT;
    for (const e of g.extracts) {
      if (!this.inView(e.x, e.y, e.r + 40)) continue;
      const active = g.exZone === e;
      ctx.fillStyle = active ? 'rgba(90,255,150,0.2)' : 'rgba(90,255,150,0.1)';
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, TAU); ctx.fill();
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(t * 0.4);
      ctx.strokeStyle = 'rgba(110,255,160,0.85)';
      ctx.lineWidth = 4;
      ctx.setLineDash([18, 12]);
      ctx.beginPath(); ctx.arc(0, 0, e.r, 0, TAU); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      const pulse = (t * 0.8) % 1;
      ctx.strokeStyle = `rgba(110,255,160,${0.5 * (1 - pulse)})`;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r * (0.3 + pulse * 0.7), 0, TAU); ctx.stroke();
      if (active) {
        ctx.strokeStyle = '#7dffb0';
        ctx.lineWidth = 8;
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r - 8, -Math.PI / 2, -Math.PI / 2 + (g.exProg / EXTRACT_TIME) * TAU); ctx.stroke();
      }
    }
  }

  private drawDecals(g: Game) {
    const ctx = this.ctx;
    for (const d of g.decals) {
      if (!this.inView(d.x, d.y, d.r * 2)) continue;
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rot);
      ctx.drawImage(this.scorch, -d.r * 1.6, -d.r * 1.6, d.r * 3.2, d.r * 3.2);
      ctx.restore();
    }
  }

  private drawGroundShadows(g: Game) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(16,26,12,0.26)';
    ctx.beginPath();
    for (const t of g.map.trees) {
      if (!this.inView(t.x, t.y, t.r * 2)) continue;
      ctx.moveTo(t.x + 12 + t.r, t.y + 14);
      ctx.ellipse(t.x + 12, t.y + 14, t.r, t.r * 0.85, 0, 0, TAU);
    }
    ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    for (const s of this.tall) {
      if (s.x > this.v.r || s.x + s.w < this.v.l || s.y > this.v.b || s.y + s.h < this.v.t) continue;
      ctx.rect(s.x + 6, s.y + 8, s.w, s.h);
    }
    ctx.fill();
  }

  /** 俯视角场景道具（载具/小船/码头设施），程序化绘制，带视口剔除。 */
  private drawScenery(g: Game) {
    const props = g.map.props;
    if (!props || props.length === 0) return;
    const ctx = this.ctx;
    for (const p of props) {
      if (!this.inView(p.x, p.y, 80 * p.scale)) continue;
      drawScenery(ctx, p);
      if (p.kind === 'vending_machine') {
        const stock = g.containers.find((c) => c.type === 'vending' && c.x === p.x && c.y === p.y);
        if (stock && stock.revealed >= stock.items.length) {
          ctx.fillStyle = 'rgba(10,18,20,0.48)';
          ctx.fillRect(p.x - 18 * p.scale, p.y - 44 * p.scale, 28 * p.scale, 54 * p.scale);
        }
      }
    }
  }

  private drawContainers(g: Game) {
    const ctx = this.ctx, t = g.realT;
    for (const c of g.containers) {
      if (!this.inView(c.x, c.y, 40)) continue;
      const done = c.revealed >= c.items.length;
      if (c.body) {
        const type = c.etype ?? 'bandit';
        const st = STYLES[type], def = ENEMIES[type];
        ctx.globalAlpha = 0.92;
        drawDuck(ctx, c.x, c.y, c.angle, c.w / 2, st, 0, false, null, 0, type === 'chicken' ? 1 : def.boss ? 2 : 0, true);
        ctx.globalAlpha = 1;
      } else if (c.type !== 'vending') this.drawCrate(c, t);
      if (!done) {
        const by = c.y - (c.body ? 22 : c.h / 2 + 12) + Math.sin(t * 3 + c.id) * 3;
        ctx.fillStyle = c.revealed > 0 ? '#ffe9a0' : '#fff6cf';
        ctx.beginPath();
        ctx.moveTo(c.x, by - 6); ctx.lineTo(c.x + 4.5, by); ctx.lineTo(c.x, by + 6); ctx.lineTo(c.x - 4.5, by);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(80,60,10,0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (g.nearC === c || (g.search && g.search.c === c)) {
        ctx.strokeStyle = '#ffd23f';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.lineDashOffset = -t * 20;
        if (c.body) { ctx.beginPath(); ctx.arc(c.x, c.y, 24, 0, TAU); ctx.stroke(); }
        else ctx.strokeRect(c.x - c.w / 2 - 5, c.y - c.h / 2 - 5, c.w + 10, c.h + 10);
        ctx.setLineDash([]);
      }
    }
  }

  private drawCrate(c: Container, t: number) {
    const ctx = this.ctx;
    const sh = c.shake > 0 ? Math.sin(t * 70) * c.shake * 8 : 0;
    const w = c.w, h = c.h, x = c.x - w / 2 + sh, y = c.y - h / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(x + 3, y + 4, w, h);
    const done = c.revealed >= c.items.length;
    const rounded = (rx: number, ry: number, rw: number, rh: number, radius: number, fill: string, stroke?: string, width = 1) => {
      rr(ctx, rx, ry, rw, rh, radius);
      ctx.fillStyle = fill; ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
    };
    switch (c.type) {
      case 'crate':
        ctx.fillStyle = '#a3723f'; ctx.fillRect(x, y, w, h);
        ctx.fillStyle = '#8a5d30'; ctx.fillRect(x, y + h / 3, w, 2); ctx.fillRect(x, y + (2 * h) / 3, w, 2);
        ctx.strokeStyle = '#6a4522'; ctx.lineWidth = 2.5; ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
        ctx.beginPath(); ctx.moveTo(x + 2, y + 2); ctx.lineTo(x + w - 2, y + h - 2); ctx.stroke();
        break;
      case 'toolbox':
        ctx.fillStyle = '#c23b2f'; rr(ctx, x, y, w, h, 3); ctx.fill();
        ctx.fillStyle = '#a02e24'; ctx.fillRect(x, y + h * 0.45, w, 3);
        ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + w * 0.3, y + 4); ctx.lineTo(x + w * 0.7, y + 4); ctx.stroke();
        break;
      case 'medbox':
        ctx.fillStyle = '#eeeae0'; rr(ctx, x, y, w, h, 3); ctx.fill();
        ctx.strokeStyle = '#a9a397'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#d9383a'; ctx.fillRect(c.x + sh - 3, c.y - 8, 6, 16); ctx.fillRect(c.x + sh - 8, c.y - 3, 16, 6);
        break;
      case 'weaponcase':
        ctx.fillStyle = '#3f4a35'; rr(ctx, x, y, w, h, 4); ctx.fill();
        ctx.strokeStyle = '#252b1f'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#c9c2a5'; ctx.fillRect(x + 7, y + h / 2 - 3, 5, 6); ctx.fillRect(x + w - 12, y + h / 2 - 3, 5, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(x + 3, y + 3, w - 6, 3);
        break;
      case 'pc':
        rounded(x, y, w, h, 3, '#252a31', '#171b20', 1.2);
        rounded(x + 3, y + 3, w - 6, h - 6, 2, '#414852');
        for (let vent = 0; vent < 3; vent++) ctx.fillRect(x + 5, y + 12 + vent * 4, w * 0.42, 1.3);
        ctx.fillStyle = (Math.sin(t * 4 + c.id) > 0 && !done) ? '#4ad1ff' : '#1f6f8a';
        ctx.beginPath(); ctx.arc(x + w - 6, y + 7, 1.6, 0, TAU); ctx.fill();
        break;
      case 'desktop': {
        // Separate monitor and keyboard; the nearby searchable pc case completes the workstation.
        const screenW = w * 0.78, screenH = h * 0.6;
        rounded(x + 1, y + 1, screenW, screenH, 3, '#222831', '#11161b', 1.2);
        rounded(x + 4, y + 4, screenW - 6, screenH - 7, 2, done ? '#27485b' : '#286f87');
        ctx.fillStyle = 'rgba(173,242,255,0.75)';
        ctx.fillRect(x + 6, y + 6, screenW * 0.25, 1.6);
        ctx.fillRect(x + 6, y + 10, screenW * 0.48, 1.2);
        ctx.fillStyle = '#69d8e8';
        ctx.fillRect(x + screenW * 0.61, y + screenH * 0.54, screenW * 0.16, 2);
        rounded(x + screenW * 0.36, y + screenH - 1, screenW * 0.18, h * 0.12, 1.5, '#6d7680');
        rounded(x + screenW * 0.2, y + h * 0.69, screenW * 0.56, h * 0.11, 1.5, '#454c55', '#242930', 0.8);
        for (let key = 0; key < 6; key++) ctx.fillRect(x + screenW * 0.23 + key * screenW * 0.075, y + h * 0.72, 1.5, 1.1);
        break;
      }
      case 'laptop': {
        rounded(x + 1, y + 1, w - 2, h - 2, 3, '#303943', '#171c21', 1.2);
        rounded(x + 4, y + 3, w - 8, h * 0.43, 2, done ? '#253f4b' : '#28758d', '#1a272e', 0.8);
        ctx.fillStyle = 'rgba(184,244,255,0.8)';
        ctx.fillRect(x + 7, y + 6, w * 0.42, 1.4);
        ctx.fillRect(x + 7, y + 9, w * 0.58, 1);
        ctx.fillStyle = '#bac4ca';
        for (let row = 0; row < 2; row++) for (let key = 0; key < 6; key++) {
          ctx.fillRect(x + 5 + key * (w - 10) / 6, y + h * 0.59 + row * 3, 2.2, 1.3);
        }
        rounded(x + w * 0.38, y + h * 0.78, w * 0.24, h * 0.12, 1.2, '#697782');
        break;
      }
      case 'safe':
        ctx.fillStyle = '#6f7780'; ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#454b52'; ctx.lineWidth = 3; ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
        ctx.fillStyle = '#c9ced4'; ctx.beginPath(); ctx.arc(c.x + sh, c.y, 6, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#454b52'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c.x + sh, c.y); ctx.lineTo(c.x + sh + Math.cos(t + c.id) * 5, c.y + Math.sin(t + c.id) * 5); ctx.stroke();
        break;
      case 'duffel':
        ctx.fillStyle = '#5b6b3a'; rr(ctx, x, y, w, h, 10); ctx.fill();
        ctx.fillStyle = '#3e4a27'; ctx.fillRect(x + w * 0.28, y, 4, h); ctx.fillRect(x + w * 0.66, y, 4, h);
        ctx.strokeStyle = '#2b331b'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + 6, y + h / 2); ctx.lineTo(x + w - 6, y + h / 2); ctx.stroke();
        break;
      case 'treasure_chest':
        ctx.fillStyle = '#493321'; rr(ctx, x, y + h * 0.18, w, h * 0.78, 4); ctx.fill();
        ctx.fillStyle = '#9a6533'; rr(ctx, x + 2, y + h * 0.2, w - 4, h * 0.7, 3); ctx.fill();
        ctx.fillStyle = '#b77d3d'; rr(ctx, x + 3, y + 2, w - 6, h * 0.42, 5); ctx.fill();
        ctx.strokeStyle = '#5e3d22'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#e3b953'; ctx.fillRect(x + 4, y + h * 0.43, w - 8, 3);
        ctx.fillRect(x + w * 0.17, y + 3, 3, h - 6); ctx.fillRect(x + w * 0.78, y + 3, 3, h - 6);
        ctx.fillStyle = '#f2d477'; rr(ctx, x + w * 0.43, y + h * 0.38, w * 0.16, h * 0.28, 2); ctx.fill();
        ctx.fillStyle = '#815526'; ctx.beginPath(); ctx.arc(x + w / 2, y + h * 0.52, 1.4, 0, TAU); ctx.fill();
        break;
      case 'coin_pile': {
        const coins = [
          [x + w * 0.28, y + h * 0.55, 5], [x + w * 0.52, y + h * 0.68, 5.5], [x + w * 0.72, y + h * 0.48, 4.5],
          [x + w * 0.4, y + h * 0.35, 4], [x + w * 0.66, y + h * 0.28, 4.4], [x + w * 0.52, y + h * 0.48, 5.5],
        ] as const;
        for (const [cx, cy, radius] of coins) {
          ctx.fillStyle = '#b67e22'; ctx.beginPath(); ctx.ellipse(cx + 1, cy + 2, radius, radius * 0.68, 0, 0, TAU); ctx.fill();
          ctx.fillStyle = '#efc34e'; ctx.beginPath(); ctx.ellipse(cx, cy, radius, radius * 0.68, 0, 0, TAU); ctx.fill();
          ctx.strokeStyle = '#a46c1b'; ctx.lineWidth = 1; ctx.stroke();
          ctx.fillStyle = 'rgba(255,245,183,0.8)'; ctx.fillRect(cx - radius * 0.42, cy - 0.7, radius * 0.7, 1);
        }
        break;
      }
    }
    if (c.open > 0 && c.type !== 'duffel') {
      ctx.fillStyle = 'rgba(15,12,8,0.55)';
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);
    }
    if (done) { ctx.fillStyle = 'rgba(20,20,20,0.35)'; ctx.fillRect(x, y, w, h); }
  }

  private drawLow() {
    const ctx = this.ctx, v = this.v;
    for (const s of this.low) {
      if (s.t === 0) { if (s.x > v.r || s.x + s.w < v.l || s.y > v.b || s.y + s.h < v.t) continue; }
      else if (!this.inView(s.x, s.y, s.r)) continue;
      switch (s.kind) {
        case 'sandbag': {
          ctx.fillStyle = '#8f7a52';
          rr(ctx, s.x, s.y, s.w, s.h, 6); ctx.fill();
          ctx.fillStyle = '#c4ad7e';
          const horiz = s.w > s.h;
          const n = Math.max(2, Math.round((horiz ? s.w : s.h) / 20));
          for (let i = 0; i < n; i++) {
            if (horiz) { rr(ctx, s.x + (i * s.w) / n + 1.5, s.y + 2, s.w / n - 3, s.h - 4, 6); }
            else { rr(ctx, s.x + 2, s.y + (i * s.h) / n + 1.5, s.w - 4, s.h / n - 3, 6); }
            ctx.fill();
          }
          break;
        }
        case 'car': {
          const cols = ['#c0392b', '#2e6fb5', '#d9a21b', '#5f7c3a'];
          ctx.fillStyle = 'rgba(0,0,0,0.3)'; rr(ctx, s.x + 4, s.y + 6, s.w, s.h, 10); ctx.fill();
          ctx.fillStyle = '#1d1f22';
          const horiz = s.w > s.h;
          if (horiz) { ctx.fillRect(s.x + 14, s.y - 3, 18, s.h + 6); ctx.fillRect(s.x + s.w - 32, s.y - 3, 18, s.h + 6); }
          else { ctx.fillRect(s.x - 3, s.y + 14, s.w + 6, 18); ctx.fillRect(s.x - 3, s.y + s.h - 32, s.w + 6, 18); }
          ctx.fillStyle = cols[s.v % 4]; rr(ctx, s.x, s.y, s.w, s.h, 10); ctx.fill();
          ctx.fillStyle = '#2a3440';
          if (horiz) { rr(ctx, s.x + s.w * 0.25, s.y + 5, s.w * 0.5, s.h - 10, 6); }
          else { rr(ctx, s.x + 5, s.y + s.h * 0.25, s.w - 10, s.h * 0.5, 6); }
          ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.18)';
          if (horiz) ctx.fillRect(s.x + s.w * 0.3, s.y + 8, s.w * 0.4, 3); else ctx.fillRect(s.x + 8, s.y + s.h * 0.3, 3, s.h * 0.4);
          break;
        }
        case 'pump':
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(s.x + 3, s.y + 4, s.w, s.h);
          ctx.fillStyle = '#e8e2d4'; ctx.fillRect(s.x, s.y, s.w, s.h);
          ctx.fillStyle = '#c0392b'; ctx.fillRect(s.x, s.y, s.w, 12);
          ctx.fillStyle = '#222'; ctx.fillRect(s.x + 6, s.y + 18, s.w - 12, 8);
          break;
        case 'fence': {
          ctx.fillStyle = 'rgba(70,55,35,0.85)';
          ctx.fillRect(s.x, s.y, s.w, s.h);
          ctx.fillStyle = '#5c4630';
          const horiz = s.w > s.h;
          const len = horiz ? s.w : s.h;
          for (let d = 0; d <= len; d += 40) {
            if (horiz) ctx.fillRect(s.x + d - 3, s.y - 3, 6, s.h + 6); else ctx.fillRect(s.x - 3, s.y + d - 3, s.w + 6, 6);
          }
          break;
        }
        case 'rock':
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ell(ctx, s.x + 4, s.y + 5, s.r, s.r * 0.85);
          ctx.fillStyle = '#7f7d77'; ell(ctx, s.x, s.y, s.r, s.r * 0.88);
          ctx.fillStyle = '#9d9b94'; ell(ctx, s.x - s.r * 0.25, s.y - s.r * 0.25, s.r * 0.55, s.r * 0.45);
          break;
        case 'hay':
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ell(ctx, s.x + 4, s.y + 6, s.r, s.r * 0.9);
          ctx.fillStyle = '#d9b75a'; ell(ctx, s.x, s.y, s.r, s.r);
          ctx.strokeStyle = '#b08e3c'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.6, 0, 4.5); ctx.stroke();
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.25, 1, 5.5); ctx.stroke();
          break;
        case 'barrel':
          if (s.dead) {
            ctx.fillStyle = '#2a2420'; ell(ctx, s.x, s.y, s.r * 0.8, s.r * 0.6);
            break;
          }
          ctx.fillStyle = 'rgba(0,0,0,0.3)'; ell(ctx, s.x + 3, s.y + 4, s.r, s.r);
          ctx.fillStyle = '#b3342a'; ell(ctx, s.x, s.y, s.r, s.r);
          ctx.strokeStyle = '#7d2019'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 0.65, 0, TAU); ctx.stroke();
          ctx.fillStyle = '#f2c230';
          ctx.beginPath(); ctx.moveTo(s.x, s.y - 6); ctx.lineTo(s.x + 5.5, s.y + 4); ctx.lineTo(s.x - 5.5, s.y + 4); ctx.closePath(); ctx.fill();
          if (s.hp < 20) { ctx.fillStyle = `rgba(255,${150 + Math.random() * 80},40,0.9)`; ell(ctx, s.x + 4, s.y - 4, 3 + Math.random() * 3, 3 + Math.random() * 3); }
          break;
        case 'tree':
          ctx.fillStyle = '#5c4126'; ell(ctx, s.x, s.y, s.r, s.r);
          break;
      }
    }
  }

  private drawParticles(g: Game, layer: number) {
    const ctx = this.ctx;
    for (const q of g.particles) {
      const isHigh = q.type === P_SMOKE;
      if ((layer === 1) !== isHigh) continue;
      if (q.type === P_SPARK || q.type === P_FIRE || q.type === P_MUZZLE || q.type === P_STAR) continue;
      if (!this.inView(q.x, q.y, 40 + q.size)) continue;
      const a = q.life / q.max;
      switch (q.type) {
        case P_FEATHER: {
          ctx.globalAlpha = Math.min(1, a * 2.5);
          ctx.fillStyle = 'rgba(0,0,0,0.15)';
          if (q.z > 1) ell(ctx, q.x, q.y + 2, q.size * 0.9, q.size * 0.4);
          ctx.fillStyle = q.color;
          ell(ctx, q.x, q.y - q.z, q.size, q.size * 0.42, q.rot);
          break;
        }
        case P_CASING:
          ctx.globalAlpha = Math.min(1, a * 3);
          ctx.fillStyle = q.color;
          ctx.save(); ctx.translate(q.x, q.y - q.z); ctx.rotate(q.rot); ctx.fillRect(-q.size, -q.size * 0.45, q.size * 2, q.size * 0.9); ctx.restore();
          break;
        case P_DEBRIS:
          ctx.globalAlpha = Math.min(1, a * 3);
          ctx.fillStyle = q.color;
          ctx.save(); ctx.translate(q.x, q.y - q.z); ctx.rotate(q.rot); ctx.fillRect(-q.size, -q.size, q.size * 2, q.size * 1.4); ctx.restore();
          break;
        case P_DUST:
        case P_SMOKE:
          ctx.globalAlpha = a * (q.type === P_SMOKE ? 1 : 0.9);
          ctx.fillStyle = q.color;
          ell(ctx, q.x, q.y, q.size, q.size);
          break;
        case P_RING:
          ctx.globalAlpha = a;
          ctx.strokeStyle = q.color;
          ctx.lineWidth = 2 + a * 5;
          ctx.beginPath(); ctx.arc(q.x, q.y, q.size, 0, TAU); ctx.stroke();
          break;
      }
    }
    ctx.globalAlpha = 1;
  }

  private drawGrenades(g: Game) {
    const ctx = this.ctx;
    for (const gr of g.grenades) {
      const def = THROWABLES[gr.kind];
      const body = gr.egg ? '#f4edda' : gr.kind === 'smoke' ? '#8e9ba1' : gr.kind === 'flash' ? '#e8dfa8' : gr.kind === 'fire' ? '#a4472c' : '#3d4a2c';
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ell(ctx, gr.x + 2, gr.y + 3, 5, 3.5);
      ctx.fillStyle = body;
      ell(ctx, gr.x, gr.y - gr.z, gr.egg ? 5 : 6, gr.egg ? 6.5 : 6);
      if (gr.egg) {
        ctx.fillStyle = '#d9c9a4';
        ell(ctx, gr.x - 1.5, gr.y - gr.z - 1.5, 2, 2.5);
      }
      ctx.fillStyle = (gr.fuse < 0.6 ? Math.sin(g.realT * 40) > 0 : Math.sin(g.realT * 14) > 0) ? '#ff4040' : def.color;
      ell(ctx, gr.x + Math.cos(gr.spin) * 2, gr.y - gr.z + Math.sin(gr.spin) * 2, 2, 2);
      if (gr.z < 4 && gr.kind !== 'flash') {
        const warn = Math.max(0.08, 0.55 * (1 - gr.fuse / def.fuse));
        ctx.strokeStyle = gr.kind === 'smoke' ? `rgba(190,205,215,${warn})` : gr.kind === 'fire' ? `rgba(255,110,50,${warn})` : `rgba(255,70,50,${warn})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.beginPath(); ctx.arc(gr.x, gr.y, def.radius, 0, TAU); ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }

  private drawZones(g: Game) {
    const ctx = this.ctx;
    for (const f of g.fires) {
      const fade = Math.min(1, (f.dur - f.t) / 1.2);
      const grd = ctx.createRadialGradient(f.x, f.y, 6, f.x, f.y, f.r);
      grd.addColorStop(0, `rgba(255,140,40,${0.3 * fade})`);
      grd.addColorStop(0.7, `rgba(220,70,24,${0.18 * fade})`);
      grd.addColorStop(1, 'rgba(180,40,20,0)');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, TAU); ctx.fill();
      ctx.strokeStyle = `rgba(255,150,60,${0.4 * fade})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 8]);
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, TAU); ctx.stroke();
      ctx.setLineDash([]);
    }
    for (const s of g.smokes) {
      const edge = Math.min(1, s.t / 0.5, (s.dur - s.t) / 0.8);
      ctx.save();
      ctx.globalAlpha = 0.72 * edge;
      for (let i = 0; i < 5; i++) {
        const a = s.pulse * 0.35 + (i / 5) * TAU;
        const d = s.r * (0.28 + 0.07 * Math.sin(s.pulse * 1.4 + i));
        const grd = ctx.createRadialGradient(s.x + Math.cos(a) * d, s.y + Math.sin(a) * d, 8, s.x + Math.cos(a) * d, s.y + Math.sin(a) * d, s.r * 0.78);
        grd.addColorStop(0, 'rgba(206,214,218,0.5)');
        grd.addColorStop(1, 'rgba(182,193,199,0)');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(s.x + Math.cos(a) * d, s.y + Math.sin(a) * d, s.r * 0.78, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
  }

  private drawEnemies(g: Game) {
    const ctx = this.ctx;
    const raid = g.mode === 'raid';
    for (const e of g.enemies) {
      if (e.dead || (raid && e.visA < 0.03)) continue;
      ctx.globalAlpha = raid ? e.visA : 1;
      const phase = e.def.encounter?.phases[e.skillPhase];
      if (phase && this.inView(e.x, e.y, phase.range)) this.drawBossWindup(e, phase.range, g.realT);
      if (!this.inView(e.x, e.y, 60)) continue;
      const kind = e.type === 'chicken' ? 1 : e.def.boss ? 2 : 0;
      let ang = e.aim;
      if (e.special === 'stun') ang += Math.sin(g.realT * 20) * 0.3;
      if (e.special === 'honkWind' || e.special === 'chargeWind' || e.special === 'summonWind') {
        const s = 1 + Math.sin(g.realT * 40) * 0.04;
        ctx.save(); ctx.translate(e.x, e.y); ctx.scale(s, s); ctx.translate(-e.x, -e.y);
        drawDuck(ctx, e.x, e.y, ang, e.r, STYLES[e.type], e.walk, e.flash > 0, e.weapon, e.kick, kind);
        ctx.restore();
      } else drawDuck(ctx, e.x, e.y, ang, e.r, STYLES[e.type], e.walk, e.flash > 0, e.weapon, e.kick, kind);
      if (e.def.boss) this.drawBossIdentity(e);
      if (e.chillT > 0) {
        ctx.save();
        ctx.globalAlpha = Math.min(0.85, e.chillT * 0.5) * (raid ? e.visA : 1);
        ctx.strokeStyle = '#9fe6ff';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r + 4, 0, TAU); ctx.stroke();
        for (let i = 0; i < 3; i++) {
          const a = g.realT * 1.6 + i * 2.1;
          ctx.beginPath();
          ctx.moveTo(e.x + Math.cos(a) * (e.r + 9), e.y + Math.sin(a) * (e.r + 9));
          ctx.lineTo(e.x + Math.cos(a) * (e.r + 15), e.y + Math.sin(a) * (e.r + 15));
          ctx.stroke();
        }
        ctx.restore();
      }
      // Shield duck carries a kite shield on its facing side — signal where to aim.
      if (e.type === 'shield' && e.armor > 0) {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(ang);
        const sr = e.r;
        ctx.fillStyle = e.armor / e.armorMax > 0.5 ? '#5b7590' : '#4a4f58';
        ctx.strokeStyle = '#a8c8e8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sr * 0.35, -sr * 0.95);
        ctx.lineTo(sr * 0.95, -sr * 0.7);
        ctx.lineTo(sr * 1.05, 0);
        ctx.lineTo(sr * 0.95, sr * 0.7);
        ctx.lineTo(sr * 0.35, sr * 0.95);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#d9e6f2';
        ctx.fillRect(sr * 0.62, -sr * 0.12, sr * 0.2, sr * 0.24);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  }

  /** Large, rounded signature gear makes each late-game boss readable at play scale. */
  private drawBossIdentity(e: Enemy) {
    const ctx = this.ctx, r = e.r;
    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.aim);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    if (e.type === 'broodQueen') {
      // A woven egg sling and three bright eggs mark the summoner at a glance.
      ctx.fillStyle = '#615f37'; ctx.strokeStyle = '#d6c47a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(-r * 0.78, 0, r * 0.56, r * 0.78, 0, 0, TAU); ctx.fill(); ctx.stroke();
      for (const [x, y] of [[-r * 0.92, -r * 0.34], [-r * 0.92, r * 0.34], [-r * 0.62, 0]] as const) {
        ctx.fillStyle = '#fff3c8'; ctx.beginPath(); ctx.ellipse(x, y, r * 0.15, r * 0.21, -0.18, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#b6a36a'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(x - r * 0.06, y - r * 0.12, r * 0.08, r * 0.04);
      }
      ctx.fillStyle = '#f4d76d';
      for (const [x, y] of [[r * 0.9, -r * 0.88], [r * 1.22, -r * 1.03], [r * 1.5, -r * 0.82]] as const) {
        ctx.beginPath(); ctx.ellipse(x, y, r * 0.13, r * 0.18, -0.22, 0, TAU); ctx.fill();
      }
    } else if (e.type === 'frostMarshal') {
      // Officer's dark ice cape, bright shoulder plates and snowflake insignia.
      ctx.fillStyle = '#31586e'; ctx.strokeStyle = '#9be5ff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-r * 0.55, -r * 0.72); ctx.quadraticCurveTo(-r * 1.5, 0, -r * 0.55, r * 0.72); ctx.lineTo(-r * 0.18, r * 0.44); ctx.lineTo(-r * 0.18, -r * 0.44); ctx.closePath(); ctx.fill(); ctx.stroke();
      for (const y of [-r * 0.72, r * 0.72]) {
        ctx.fillStyle = '#8ddcf4'; ctx.beginPath(); ctx.ellipse(-r * 0.18, y, r * 0.32, r * 0.22, 0, 0, TAU); ctx.fill(); ctx.stroke();
      }
      const sx = r * 0.2, sy = 0, sr = r * 0.22;
      ctx.strokeStyle = '#e4fbff'; ctx.lineWidth = Math.max(1.5, r * 0.055);
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(a) * sr, sy + Math.sin(a) * sr); ctx.stroke();
      }
      ctx.fillStyle = '#e4fbff'; ctx.beginPath(); ctx.arc(sx, sy, r * 0.07, 0, TAU); ctx.fill();
    } else if (e.type === 'ironGuard') {
      // Blackened shoulder caps and a crimson ram plate signal the iron warden's frontal armour.
      for (const y of [-r * 0.68, r * 0.68]) {
        ctx.fillStyle = '#1a1013'; ctx.strokeStyle = '#b3262c'; ctx.lineWidth = 2;
        rr(ctx, -r * 0.45, y - r * 0.27, r * 0.68, r * 0.54, r * 0.2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#6d1a1e'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-r * 0.3, y); ctx.lineTo(r * 0.05, y); ctx.stroke();
      }
      ctx.fillStyle = '#a81e24'; ctx.strokeStyle = '#ffb3a3'; ctx.lineWidth = 2;
      rr(ctx, r * 0.12, r * 0.46, r * 0.64, r * 0.38, r * 0.13); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ffd5ad'; ctx.beginPath(); ctx.arc(r * 0.45, r * 0.65, r * 0.09, 0, TAU); ctx.fill();
    } else if (e.type === 'duckKing') {
      // Purple mantle, rounded crown and a gold scepter distinguish the final boss.
      ctx.fillStyle = '#51266e'; ctx.strokeStyle = '#e4c56d'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-r * 0.52, -r * 0.55); ctx.quadraticCurveTo(-r * 1.35, 0, -r * 0.5, r * 0.7); ctx.lineTo(-r * 0.12, r * 0.44); ctx.lineTo(-r * 0.12, -r * 0.42); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#dcae45'; ctx.strokeStyle = '#fff0ae'; ctx.lineWidth = 1.5;
      rr(ctx, r * 0.73, -r * 1.0, r * 0.64, r * 0.2, r * 0.08); ctx.fill(); ctx.stroke();
      for (const x of [r * 0.82, r * 1.04, r * 1.26]) {
        ctx.beginPath(); ctx.arc(x, -r * 1.1, r * 0.11, 0, TAU); ctx.fill(); ctx.stroke();
      }
      ctx.strokeStyle = '#f0d274'; ctx.lineWidth = r * 0.12;
      ctx.beginPath(); ctx.moveTo(r * 0.35, r * 0.68); ctx.lineTo(r * 0.78, r * 1.16); ctx.stroke();
      ctx.fillStyle = '#e8c466'; ctx.beginPath(); ctx.arc(r * 0.82, r * 1.2, r * 0.17, 0, TAU); ctx.fill();
      ctx.fillStyle = '#bb70ee'; ctx.beginPath(); ctx.arc(r * 0.82, r * 1.2, r * 0.08, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  private drawBossWindup(e: Enemy, range: number, time: number) {
    if (e.special !== 'chargeWind' && e.special !== 'honkWind' && e.special !== 'summonWind') return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha *= 0.72 + 0.2 * Math.sin(time * 20);
    ctx.beginPath();
    const tint = e.def.encounter?.ringColor;
    const soft = (a: number, fallback: string) => tint?.startsWith('rgba') ? tint.replace(/[\d.]+\)$/, `${a})`) : fallback;
    if (e.special === 'chargeWind') {
      ctx.moveTo(e.x, e.y);
      ctx.lineTo(e.x + e.cdx * range, e.y + e.cdy * range);
      ctx.lineWidth = e.r * 2;
      ctx.strokeStyle = soft(0.3, 'rgba(255,70,56,0.3)');
      ctx.stroke();
      ctx.strokeStyle = tint ?? '#ff5546';
    } else if (e.special === 'summonWind') {
      // Dashed nesting circle: step out of the hatch zone before minions appear.
      ctx.arc(e.x, e.y, Math.min(260, range * 0.42), 0, TAU);
      ctx.fillStyle = soft(0.12, 'rgba(150,240,120,0.12)');
      ctx.fill();
      ctx.strokeStyle = tint ?? '#b4ff8c';
    } else {
      ctx.arc(e.x, e.y, range, 0, TAU);
      ctx.fillStyle = soft(0.14, 'rgba(255,141,50,0.14)');
      ctx.fill();
      ctx.strokeStyle = tint ?? '#ffa94f';
    }
    ctx.setLineDash([14, 9]);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.setLineDash([]);
    if (e.special === 'summonWind') {
      const nestR = Math.min(260, range * 0.42);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU + time * 0.15, x = e.x + Math.cos(a) * nestR, y = e.y + Math.sin(a) * nestR;
        ctx.fillStyle = e.type === 'duckKing' ? '#e7c76c' : '#fff0bb';
        ctx.strokeStyle = e.type === 'duckKing' ? '#fff2ba' : '#8eaa58'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(x, y, 6, 9, a, 0, TAU); ctx.fill(); ctx.stroke();
      }
    }
    if (e.special === 'honkWind' && e.type === 'frostMarshal') {
      // Eight ice spokes make the marshal's freezing nova unlike a generic pulse.
      for (let i = 0; i < 8; i++) {
        const a = i * TAU / 8 + time * 0.08;
        ctx.strokeStyle = 'rgba(220,250,255,0.9)'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(e.x + Math.cos(a) * range * 0.76, e.y + Math.sin(a) * range * 0.76);
        ctx.lineTo(e.x + Math.cos(a) * range * 0.98, e.y + Math.sin(a) * range * 0.98);
        ctx.stroke();
      }
    }
    if (e.special === 'chargeWind' && (e.type === 'ironGuard' || e.type === 'duckKing')) {
      const tx = e.x + e.cdx * range, ty = e.y + e.cdy * range;
      const a = Math.atan2(e.cdy, e.cdx), head = e.type === 'duckKing' ? '#ffe18a' : '#ffb49a';
      ctx.save(); ctx.translate(tx, ty); ctx.rotate(a);
      ctx.fillStyle = head; ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(-8, -9); ctx.lineTo(-5, 0); ctx.lineTo(-8, 9); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    const bossLabel = e.def.encounter?.skillLabels?.[e.castSkill ?? e.def.encounter?.skill ?? 'slam'];
    if (bossLabel) {
      ctx.font = `bold 12px ${FONT_CN}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const labelY = e.y - e.r - 30;
      const width = ctx.measureText(bossLabel).width + 20;
      ctx.fillStyle = 'rgba(10,14,18,0.8)'; rr(ctx, e.x - width / 2, labelY - 10, width, 20, 9); ctx.fill();
      ctx.fillStyle = tint ?? '#ffe18a'; ctx.fillText(bossLabel, e.x, labelY);
    }
    ctx.restore();
  }

  private drawPlayer(g: Game) {
    const p = g.player;
    const w = p.weapons[p.cur];
    const style = PLAYER_STYLES[p.character.id];
    let ang = p.aim;
    if (p.rollT > 0) ang += (1 - p.rollT / 0.3) * TAU * (p.rollDx >= 0 ? 1 : -1);
    if (p.rollT > 0) {
      this.ctx.globalAlpha = 0.25;
      drawDuck(this.ctx, p.x - p.rollDx * 18, p.y - p.rollDy * 18, ang - 0.8, p.r, style, p.walk, false, null, 0, 0);
      this.ctx.globalAlpha = 1;
    }
    drawDuck(this.ctx, p.x, p.y, ang, p.r, style, p.walk, p.flash > 0, w ? w.def : null, p.kick, 0);
  }

  private drawCanopies(g: Game) {
    const ctx = this.ctx, p = g.player, t = g.realT;
    for (const tr of g.map.trees) {
      if (!this.inView(tr.x, tr.y, tr.r * 1.3)) continue;
      const under = g.mode === 'raid' && Math.hypot(p.x - tr.x, p.y - tr.y) < tr.r * 0.95;
      ctx.globalAlpha = under ? 0.38 : 0.95;
      const s = tr.r * 2.3 + Math.sin(t * 1.3 + tr.x * 0.01) * 1.5;
      const canopy = g.mapId === 'outpost' ? this.snowBushCanopies[tr.v] : this.canopies[tr.v];
      ctx.drawImage(canopy, tr.x - s / 2, tr.y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
  }

  private drawFog(g: Game) {
    const ctx = this.ctx, p = g.player, v = this.v;
    const ex = p.x, ey = p.y, FAR = 3000;
    ctx.beginPath();
    const q = (ax: number, ay: number, bx: number, by: number) => {
      const dax = ax - ex, day = ay - ey, la = FAR / (Math.hypot(dax, day) || 1);
      const dbx = bx - ex, dby = by - ey, lb = FAR / (Math.hypot(dbx, dby) || 1);
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + dbx * lb, by + dby * lb);
      ctx.lineTo(ax + dax * la, ay + day * la);
      ctx.closePath();
    };
    for (const s of this.tall) {
      if (s.x > v.r || s.x + s.w < v.l || s.y > v.b || s.y + s.h < v.t) continue;
      const x0 = s.x, y0 = s.y, x1 = s.x + s.w, y1 = s.y + s.h;
      if (ey > y0) q(x0, y0, x1, y0);
      if (ex < x1) q(x1, y0, x1, y1);
      if (ey < y1) q(x1, y1, x0, y1);
      if (ex > x0) q(x0, y1, x0, y0);
    }
    ctx.fillStyle = 'rgba(12,15,24,0.72)';
    ctx.fill();
  }

  private drawWalls() {
    const ctx = this.ctx, v = this.v;
    const vis: Solid[] = [];
    for (const s of this.tall) {
      if (s.x > v.r || s.x + s.w < v.l || s.y > v.b || s.y + s.h < v.t) continue;
      vis.push(s);
    }
    ctx.fillStyle = '#2b2723';
    ctx.beginPath();
    for (const s of vis) if (s.kind === 'wall') ctx.rect(s.x, s.y, s.w, s.h);
    ctx.fill();
    ctx.fillStyle = '#4e4740';
    ctx.beginPath();
    for (const s of vis) if (s.kind === 'wall') ctx.rect(s.x + 2, s.y + 2, s.w - 4, s.h - 4);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    for (const s of vis) if (s.kind === 'wall') ctx.rect(s.x + 2, s.y + 2, s.w - 4, 3);
    ctx.fill();
    for (const s of vis) {
      if (s.kind === 'cargo') {
        const cols = ['#c8641e', '#2f6c9e', '#a8352b'];
        ctx.fillStyle = cols[s.v % 3];
        ctx.fillRect(s.x, s.y, s.w, s.h);
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        const horiz = s.w > s.h;
        if (horiz) for (let x = s.x + 6; x < s.x + s.w - 4; x += 9) ctx.fillRect(x, s.y + 3, 3, s.h - 6);
        else for (let y = s.y + 6; y < s.y + s.h - 4; y += 9) ctx.fillRect(s.x + 3, y, s.w - 6, 3);
        ctx.strokeStyle = 'rgba(0,0,0,0.45)';
        ctx.lineWidth = 3;
        ctx.strokeRect(s.x + 1.5, s.y + 1.5, s.w - 3, s.h - 3);
      } else if (s.kind === 'train') {
        const cols = ['#6b3d2b', '#3d4a5c', '#5e6150'];
        ctx.fillStyle = '#222';
        ctx.fillRect(s.x - 3, s.y + 4, s.w + 6, s.h - 8);
        ctx.fillStyle = cols[s.v % 3];
        ctx.fillRect(s.x, s.y, s.w, s.h);
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fillRect(s.x, s.y + s.h / 2 - 2, s.w, 4);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        for (let x = s.x + 20; x < s.x + s.w - 10; x += 40) ctx.fillRect(x, s.y + 4, 3, s.h - 8);
      } else if (s.kind === 'rack') {
        ctx.fillStyle = '#4f5459';
        ctx.fillRect(s.x, s.y, s.w, s.h);
        const bc = ['#b88a4a', '#8a6a3a', '#6d7f8c', '#a14a3a'];
        const horiz = s.w > s.h;
        const n = Math.floor((horiz ? s.w : s.h) / 26);
        for (let i = 0; i < n; i++) {
          ctx.fillStyle = bc[(i + s.v) % 4];
          if (horiz) ctx.fillRect(s.x + 3 + i * 26, s.y + 3, 22, s.h - 6); else ctx.fillRect(s.x + 3, s.y + 3 + i * 26, s.w - 6, 22);
        }
      }
    }
  }

  private drawAdditive(g: Game) {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = 'lighter';
    for (const l of g.lights) {
      if (!this.inView(l.x, l.y, l.r)) continue;
      ctx.globalAlpha = Math.min(1, (l.life / l.max) * 0.9);
      ctx.drawImage(this.glow(l.color), l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
    }
    // extraction beacons
    const t = g.realT;
    for (const e of g.extracts) {
      if (!this.inView(e.x, e.y - 200, 300)) continue;
      ctx.globalAlpha = 0.35 + Math.sin(t * 3) * 0.1;
      ctx.drawImage(this.glow('#6dff9e'), e.x - 34, e.y - 420, 68, 440);
      ctx.globalAlpha = 0.25;
      ctx.drawImage(this.glow('#6dff9e'), e.x - e.r * 1.3, e.y - e.r * 1.3, e.r * 2.6, e.r * 2.6);
    }
    for (const b of g.beams) {
      const a = Math.min(1, b.life / b.max * 1.5);
      ctx.globalAlpha = a * 0.9;
      ctx.drawImage(this.glow(b.color), b.x - 30, b.y - 520, 60, 540);
      ctx.globalAlpha = a * 0.6;
      ctx.drawImage(this.glow(b.color), b.x - 90, b.y - 90, 180, 180);
    }
    ctx.globalAlpha = 1;
    // bullets
    ctx.lineCap = 'round';
    for (let pass = 0; pass < 2; pass++) {
      for (const from of [0, 1]) {
        ctx.strokeStyle = from === 0 ? (pass === 0 ? 'rgba(255,220,140,0.25)' : '#fff6cf') : (pass === 0 ? 'rgba(255,110,60,0.3)' : '#ffb08a');
        for (const b of g.bullets) {
          if (b.from !== from) continue;
          if (!this.inView(b.x, b.y, 60)) continue;
          if (b.chill) ctx.strokeStyle = pass === 0 ? 'rgba(120,210,255,0.35)' : '#bff0ff';
          else if (b.explosive) ctx.strokeStyle = pass === 0 ? 'rgba(255,120,50,0.35)' : '#ffd08a';
          else ctx.strokeStyle = from === 0 ? (pass === 0 ? 'rgba(255,220,140,0.25)' : '#fff6cf') : (pass === 0 ? 'rgba(255,110,60,0.3)' : '#ffb08a');
          const sp = Math.hypot(b.vx, b.vy) || 1;
          const tail = Math.min(Math.hypot(b.x - b.ox, b.y - b.oy), sp * (from === 0 ? 0.034 : 0.032));
          ctx.lineWidth = pass === 0 ? b.w * 3 : b.w;
          ctx.beginPath();
          ctx.moveTo(b.x - (b.vx / sp) * tail, b.y - (b.vy / sp) * tail);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const q of g.particles) {
      if (q.type !== P_SPARK && q.type !== P_FIRE && q.type !== P_MUZZLE && q.type !== P_STAR) continue;
      if (!this.inView(q.x, q.y, 40 + q.size)) continue;
      const a = q.life / q.max;
      if (q.type === P_SPARK) {
        ctx.globalAlpha = a;
        ctx.strokeStyle = q.color;
        ctx.lineWidth = q.size;
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x - q.vx * 0.03, q.y - q.vy * 0.03);
        ctx.stroke();
      } else if (q.type === P_FIRE) {
        ctx.globalAlpha = Math.min(1, a * 1.4);
        const s = q.size * 2;
        ctx.drawImage(this.glow(q.color), q.x - s / 2, q.y - s / 2, s, s);
      } else if (q.type === P_MUZZLE) {
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(q.x, q.y);
        ctx.rotate(q.rot);
        ctx.fillStyle = q.color;
        const s = q.size;
        ctx.beginPath();
        ctx.moveTo(-2, 0); ctx.lineTo(s * 0.3, -s * 0.35); ctx.lineTo(s * 1.6, 0); ctx.lineTo(s * 0.3, s * 0.35); ctx.closePath();
        ctx.moveTo(0, -s * 0.6); ctx.lineTo(s * 0.2, 0); ctx.lineTo(0, s * 0.6); ctx.lineTo(-s * 0.2, 0); ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.drawImage(this.glow('#ffcf7a'), q.x - s * 1.5, q.y - s * 1.5, s * 3, s * 3);
      } else {
        ctx.globalAlpha = Math.min(1, a * 1.5);
        ctx.fillStyle = q.color;
        const s = q.size;
        ctx.save();
        ctx.translate(q.x, q.y);
        ctx.rotate(q.rot);
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.6); ctx.lineTo(s * 0.4, -s * 0.4); ctx.lineTo(s * 1.6, 0); ctx.lineTo(s * 0.4, s * 0.4);
        ctx.lineTo(0, s * 1.6); ctx.lineTo(-s * 0.4, s * 0.4); ctx.lineTo(-s * 1.6, 0); ctx.lineTo(-s * 0.4, -s * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  private bubble(x: number, y: number, txt: string, bg: string, fg: string, s: number) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.fillStyle = bg;
    rr(ctx, -9, -11, 18, 20, 6);
    ctx.fill();
    ctx.beginPath(); ctx.moveTo(-4, 8); ctx.lineTo(0, 14); ctx.lineTo(4, 8); ctx.fill();
    ctx.fillStyle = fg;
    ctx.font = `900 15px ${FONT_NUM}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  }

  private drawWorldUI(g: Game, inp: Input) {
    const ctx = this.ctx, t = g.realT, raid = g.mode === 'raid';
    if (raid) {
      for (const e of g.enemies) {
        if (e.visA < 0.3 || !this.inView(e.x, e.y, 60)) continue;
        if (!e.def.encounter && e.special === 'chargeWind') {
          ctx.save();
          ctx.translate(e.x, e.y);
          ctx.rotate(Math.atan2(e.cdy, e.cdx));
          ctx.fillStyle = `rgba(255,60,40,${0.18 + 0.15 * Math.sin(t * 30)})`;
          ctx.fillRect(0, -e.r, 390, e.r * 2);
          ctx.strokeStyle = 'rgba(255,80,60,0.7)';
          ctx.lineWidth = 2;
          ctx.strokeRect(0, -e.r, 390, e.r * 2);
          ctx.restore();
        }
        if (!e.def.encounter && e.special === 'honkWind') {
          const k = 1 - e.specialT / 0.6;
          ctx.strokeStyle = `rgba(255,150,60,${0.4 + k * 0.5})`;
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(e.x, e.y, 60 + k * 230, 0, TAU); ctx.stroke();
        }
        if (e.hurtT > 0 && !e.def.boss) {
          const bw = 32, bx = e.x - bw / 2, by = e.y - e.r - 15;
          ctx.globalAlpha = Math.min(1, e.hurtT * 2) * e.visA;
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(bx - 1, by - 1, bw + 2, 6);
          ctx.fillStyle = '#ff5a4a';
          ctx.fillRect(bx, by, bw * Math.max(0, e.hp / e.maxHp), 4);
          if (e.armorMax > 0) { ctx.fillStyle = '#7fb2ff'; ctx.fillRect(bx, by - 4, bw * Math.max(0, e.armor / e.armorMax), 2.5); }
          ctx.globalAlpha = 1;
        }
        if (e.alertT > 0) {
          const s = e.alertT > 1.0 ? 1 + (e.alertT - 1.0) * 3 : 1;
          ctx.globalAlpha = Math.min(1, e.alertT * 3);
          this.bubble(e.x, e.y - e.r - 26, '!', '#ffcf33', '#3a2600', s);
          ctx.globalAlpha = 1;
        } else if (e.qT > 0 && (e.state === 'search' || e.state === 'hunt')) {
          ctx.globalAlpha = Math.min(1, e.qT * 2) * 0.9;
          this.bubble(e.x, e.y - e.r - 26, '?', '#f2efe6', '#333', 0.9);
          ctx.globalAlpha = 1;
        }
      }
      const p = g.player;
      if (!p.dead) {
        const w = p.weapons[p.cur];
        if (w && w.reloadT > 0) {
          ctx.strokeStyle = 'rgba(0,0,0,0.5)';
          ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 9, 0, TAU); ctx.stroke();
          ctx.strokeStyle = '#ffd23f';
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 9, -Math.PI / 2, -Math.PI / 2 + (1 - w.reloadT / w.def.reload) * TAU); ctx.stroke();
        }
        if (p.healT > 0) {
          ctx.strokeStyle = 'rgba(0,0,0,0.5)';
          ctx.lineWidth = 5;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 14, 0, TAU); ctx.stroke();
          ctx.strokeStyle = '#6dff9e';
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 14, -Math.PI / 2, -Math.PI / 2 + (1 - p.healT / p.healDur) * TAU); ctx.stroke();
        }
        if (g.nearC && (!g.search || g.search.c !== g.nearC)) {
          const c = g.nearC;
          const label = inp.touchMode ? `搜索 · ${c.name}` : `[E] 搜索 · ${c.name}`;
          ctx.font = `700 12px ${FONT_CN}`;
          const tw = ctx.measureText(label).width + 18;
          const by = c.y - (c.body ? 34 : c.h / 2 + 30) + Math.sin(t * 4) * 1.5;
          ctx.fillStyle = 'rgba(18,20,24,0.85)';
          rr(ctx, c.x - tw / 2, by - 11, tw, 22, 11);
          ctx.fill();
          ctx.strokeStyle = '#ffd23f';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = '#ffe9a0';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, c.x, by + 1);
        }
      }
    }
    for (const e of g.extracts) {
      if (!this.inView(e.x, e.y, 200)) continue;
      ctx.font = `800 15px ${FONT_CN}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = `撤离点 ${e.id} · ${e.name}`;
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(0,30,10,0.75)';
      ctx.strokeText(label, e.x, e.y - e.r - 18);
      ctx.fillStyle = '#8dffbb';
      ctx.fillText(label, e.x, e.y - e.r - 18);
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const ft of g.texts) {
      const a = Math.min(1, (ft.life / ft.max) * 2.5);
      const pop = ft.max - ft.life < 0.12 ? 1 + (0.12 - (ft.max - ft.life)) * 4 : 1;
      ctx.globalAlpha = a;
      ctx.font = `800 ${Math.round(ft.size * pop)}px ${FONT_NUM}`;
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = 'rgba(10,10,14,0.85)';
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
    }
    ctx.globalAlpha = 1;
  }

  private drawScreenFx(g: Game) {
    const ctx = this.ctx, W = this.W, H = this.H, p = g.player;
    const low = p.hp / p.maxHp;
    if (!p.dead && low < 0.35) {
      const a = (0.35 - low) * 1.6 * (0.7 + 0.3 * Math.sin(g.realT * 6));
      const grd = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.hypot(W, H) / 2);
      grd.addColorStop(0, 'rgba(180,0,0,0)');
      grd.addColorStop(1, `rgba(180,0,0,${Math.min(0.6, a)})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }
    if (p.hurtT > 0) {
      ctx.fillStyle = `rgba(255,30,30,${p.hurtT * 0.35})`;
      ctx.fillRect(0, 0, W, H);
    }
    if (g.flash.t > 0) {
      ctx.fillStyle = `rgba(${g.flash.color},${Math.min(0.55, g.flash.t)})`;
      ctx.fillRect(0, 0, W, H);
    }
    const c = g.cam;
    const sx = W / 2 + (p.x - c.x - c.kx) * c.zoom + c.sx, sy = H / 2 + (p.y - c.y - c.ky) * c.zoom + c.sy;
    const R = Math.min(W, H) * 0.16 + 30;
    for (const d of g.dmgInds) {
      ctx.strokeStyle = `rgba(255,60,50,${d.t * 0.85})`;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(sx, sy, R, d.ang - 0.28, d.ang + 0.28);
      ctx.stroke();
    }
  }

  // ======================================================================== HUD
  private panel(x: number, y: number, w: number, h: number, r = 10) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(14,16,20,0.74)';
    rr(ctx, x, y, w, h, r);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.09)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private txt(s: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = 'left', weight = 700, font = FONT_CN) {
    const ctx = this.ctx;
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(s, x, y);
  }

  private drawHUD(g: Game, inp: Input, mode: string) {
    const ctx = this.ctx, W = this.W, H = this.H;
    const touch = inp.touchMode;
    const u = hudScale(W, H, touch);
    const p = g.player;
    const t = g.realT;
    const L = inp.layout;

    // --- top-left info
    const pw = 214 * u, ph = (touch ? 118 : 86) * u;
    this.panel(12, 12, pw, ph);
    const left = g.timeLimit - g.t;
    const urgent = left < (g.training ? 15 : 60);
    this.txt('剩余时间', 24, 12 + 15 * u, 11 * u, 'rgba(230,226,214,0.6)', 'left', 600);
    this.txt(fmtTime(left), 24, 12 + 38 * u, 30 * u, urgent && Math.sin(t * 8) > 0 ? '#ff5a4a' : urgent ? '#ffb0a8' : '#f2efe6', 'left', 700, FONT_NUM);
    this.txt('背包价值', 12 + pw - 12, 12 + 15 * u, 11 * u, 'rgba(230,226,214,0.6)', 'right', 600);
    this.txt(`¥${fmtMoney(g.lootValue)}`, 12 + pw - 12, 12 + 36 * u, 19 * u, '#ffcf4a', 'right', 700, FONT_NUM);
    this.txt(`背包 ${p.backpack.length}/${p.capacity}`, 24, 12 + 66 * u, 12 * u, p.backpack.length >= p.capacity ? '#ff8a5c' : '#cfcabb', 'left', 600);
    this.txt(`击杀 ${g.stats.kills}`, 12 + pw - 12, 12 + 66 * u, 12 * u, '#cfcabb', 'right', 600);
    if (touch) this.drawBars(24, 12 + 82 * u, pw - 24, u, true);
    if (g.zoneT > 0) {
      ctx.globalAlpha = Math.min(1, g.zoneT * 2);
      this.txt(`📍 ${g.zoneName}`, 16, 12 + ph + 18 * u, 14 * u, '#f2efe6', 'left', 700);
      ctx.globalAlpha = 1;
    }

    // --- minimap
    const mmW = touch ? L.mm : Math.round(176 * u), mmH = mmW * g.map.h / g.map.w;
    const mx = W - 12 - mmW, my = 12;
    this.panel(mx - 4, my - 4, mmW + 8, mmH + 8, 8);
    if (this.minimap) ctx.drawImage(this.minimap, mx, my, mmW, mmH);
    const sc = mmW / g.map.w;
    if (g.training && !p.backpack.length) {
      const box = g.containers[0];
      ctx.fillStyle = '#ffd23f';
      ctx.fillRect(mx + box.x * sc - 3, my + box.y * sc - 3, 6, 6);
    }
    for (const e of g.extracts) {
      const pr = 4 + Math.sin(t * 4) * 1.5;
      ctx.fillStyle = '#6dff9e';
      ctx.beginPath(); ctx.arc(mx + e.x * sc, my + e.y * sc, pr, 0, TAU); ctx.fill();
      this.txt(e.id, mx + e.x * sc, my + e.y * sc - 10, 10 * u, '#b8ffd4', 'center', 800, FONT_NUM);
    }
    ctx.fillStyle = '#ff4a3a';
    for (const e of g.enemies) {
      if (e.visA < 0.5) continue;
      ctx.beginPath(); ctx.arc(mx + e.x * sc, my + e.y * sc, e.def.boss ? 3.5 : 2.2, 0, TAU); ctx.fill();
    }
    const vw = W / g.cam.zoom, vh = H / g.cam.zoom;
    ctx.save();
    ctx.beginPath();
    ctx.rect(mx, my, mmW, mmH);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mx + (g.cam.x - vw / 2) * sc, my + (g.cam.y - vh / 2) * sc, vw * sc, vh * sc);
    ctx.restore();
    ctx.save();
    ctx.translate(mx + p.x * sc, my + p.y * sc);
    ctx.rotate(p.aim);
    ctx.fillStyle = '#ffd23f';
    ctx.strokeStyle = '#3a2a00';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-4, -4); ctx.lineTo(-2, 0); ctx.lineTo(-4, 4); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();

    // --- boss bar
    const narrow = W < 640;
    const topY = narrow ? 12 + ph + 30 * u : 14;
    let msgY = topY;
    // Dual-boss encounters show every surviving boss, stacked after each other.
    const activeBosses = g.enemies.filter((e) => e.def.boss && !e.dead).slice(0, 3);
    // Keep enough vertical room between stacked boss bars so the next boss name
    // never collides with the previous boss's HP/armor bar.
    const barStep = (narrow ? 40 : 46) * u;
    const skillLabels: Record<string, string> = { charge: '冲撞', slam: '震地', pulse: '冲击', summon: '召唤' };
    for (const [i, b] of activeBosses.entries()) {
      const bw = Math.min(420 * u, W * (narrow ? 0.8 : 0.5)), bx = W / 2 - bw / 2, by = topY + 4 + i * barStep;
      const enc = b.def.encounter;
      const skill = b.castSkill ?? enc?.skillCycle?.[b.castCount % enc.skillCycle.length] ?? enc?.skill;
      const skillTag = skill ? skillLabels[skill] : '';
      const shownSkill = skill ? enc?.skillLabels?.[skill] ?? skillTag : '';
      const bossTint = enc?.ringColor ?? '#ffb37a';
      this.txt(`👑 ${b.def.name}${enc?.skillName ? ` · ${enc.skillName}` : ''}${shownSkill ? ` · ${shownSkill}` : ''}${enc ? ` · 阶段 ${b.phase + 1}` : ''}`, W / 2, by + 1, (narrow ? 12 : 14) * u, bossTint, 'center', 800);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(bx - 2, by + 14 * u, bw + 4, 12 * u + 4);
      ctx.fillStyle = '#e8463a';
      ctx.fillRect(bx, by + 14 * u + 2, bw * Math.max(0, b.hp / b.maxHp), 8 * u);
      ctx.fillStyle = '#7fb2ff';
      ctx.fillRect(bx, by + 22 * u + 2, bw * Math.max(0, b.armor / b.armorMax), 4 * u);
    }
    if (activeBosses.length) msgY = topY + 4 + activeBosses.length * barStep + 4 * u;
    // --- messages
    for (let i = 0; i < g.msgs.length; i++) {
      const m = g.msgs[i];
      const a = Math.min(1, m.t * 6) * Math.min(1, (3.4 - m.t) * 2);
      ctx.globalAlpha = Math.max(0, a);
      ctx.font = `700 ${13 * u}px ${FONT_CN}`;
      const tw = ctx.measureText(m.text).width + 22;
      const y = msgY + i * 24 * u + (touch ? 0 : 0);
      ctx.fillStyle = 'rgba(14,16,20,0.62)';
      rr(ctx, W / 2 - tw / 2, y, tw, 20 * u, 10 * u);
      ctx.fill();
      this.txt(m.text, W / 2, y + 10 * u + 1, 13 * u, m.color, 'center', 700);
    }
    ctx.globalAlpha = 1;

    // --- extraction progress
    if (g.exZone && !g.ended) {
      const cx = W / 2, cy = H * 0.24, R = 34 * u;
      ctx.fillStyle = 'rgba(10,30,18,0.7)';
      ctx.beginPath(); ctx.arc(cx, cy, R + 6, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      ctx.strokeStyle = '#6dff9e';
      ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + (g.exProg / EXTRACT_TIME) * TAU); ctx.stroke();
      this.txt((EXTRACT_TIME - g.exProg).toFixed(1), cx, cy + 1, 20 * u, '#eafff1', 'center', 700, FONT_NUM);
      this.txt('撤离中 · 保持在区域内', cx, cy + R + 22 * u, 14 * u, '#8dffbb', 'center', 800);
    }

    // --- off-screen extraction arrows
    if (!g.ended) {
      const c = g.cam;
      for (const e of g.extracts) {
        const sx = W / 2 + (e.x - c.x - c.kx) * c.zoom, sy = H / 2 + (e.y - c.y - c.ky) * c.zoom;
        const m = 40 * u;
        if (sx > m && sx < W - m && sy > m && sy < H - m) continue;
        const ang = Math.atan2(sy - H / 2, sx - W / 2);
        const top = 12 + ph + 48 * u, bot = H - (touch ? 130 : 150) * u;
        const ax = Math.max(m, Math.min(W - m, sx));
        const topB = ax > W - mmW - 40 ? Math.max(top, mmH + 44 * u) : top;
        const botB = touch && ax > W * 0.55 ? Math.max(topB + 10, H - 300 * u) : bot;
        const ay = Math.max(topB, Math.min(botB, sy));
        const dist = Math.round(Math.hypot(e.x - p.x, e.y - p.y) / 10);
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(ang);
        ctx.fillStyle = 'rgba(30,60,40,0.85)';
        ctx.beginPath(); ctx.arc(0, 0, 15 * u, 0, TAU); ctx.fill();
        ctx.fillStyle = '#6dff9e';
        ctx.beginPath(); ctx.moveTo(22 * u, 0); ctx.lineTo(10 * u, -8 * u); ctx.lineTo(10 * u, 8 * u); ctx.closePath(); ctx.fill();
        ctx.restore();
        this.txt(e.id, ax, ay + 1, 13 * u, '#b8ffd4', 'center', 800, FONT_NUM);
        this.txt(`${dist}m`, ax, ay + 24 * u, 11 * u, '#b8ffd4', 'center', 700, FONT_NUM);
      }
    }

    // --- bottom HUD
    if (!touch) {
      this.drawBars(20, H - 66 * u, 250 * u, u, false);
      this.drawWeapon(W - 20, H - 20, u, false);
    } else {
      this.drawWeapon(W / 2, H - 14, u, true);
    }

    // --- loot panel
    this.drawLoot(g, u, touch);

    // --- banner
    if (g.banner) {
      const b = g.banner;
      const a = Math.min(1, b.t * 5) * Math.min(1, (b.dur - b.t) * 2.5);
      const s = b.t < 0.25 ? 1 + (0.25 - b.t) * 2.2 : 1;
      ctx.save();
      ctx.globalAlpha = Math.max(0, a);
      ctx.translate(W / 2, H * 0.36);
      ctx.scale(s, s);
      const grd = ctx.createLinearGradient(-W * 0.35, 0, W * 0.35, 0);
      grd.addColorStop(0, 'rgba(10,12,16,0)');
      grd.addColorStop(0.5, 'rgba(10,12,16,0.75)');
      grd.addColorStop(1, 'rgba(10,12,16,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(-W * 0.35, -36 * u, W * 0.7, 76 * u);
      ctx.font = `900 ${40 * u}px ${FONT_CN}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.strokeText(b.text, 0, -6 * u);
      ctx.fillStyle = b.color;
      ctx.fillText(b.text, 0, -6 * u);
      this.txt(b.sub, 0, 26 * u, 15 * u, '#f2efe6', 'center', 600);
      ctx.restore();
    }

    // --- training objective
    if (g.training && mode === 'playing' && !g.ended) {
      const stage = Math.min(6, g.tutorialStage);
      const steps = touch ? [
        '击退挡路的小鸡（右半屏拖动开火）',
        '向右走进军械室，点「搜索」拾取冲锋枪',
        '击退军械室的 2 名鸭匪',
        '搜第二个补给箱 · 点背包可换上掉落的枪',
        '前往绿色撤离点',
        '撤离点遭伏击！击退 2 名鸭匪',
        '留在撤离区内坚守 6 秒',
      ] : [
        '击退挡路的小鸡（鼠标瞄准射击）',
        '向右走进军械室，按 E 拾取冲锋枪',
        '击退军械室的 2 名鸭匪',
        '搜第二个补给箱 · 点背包装备掉落的枪',
        '前往绿色撤离点',
        '撤离点遭伏击！击退 2 名鸭匪',
        '留在撤离区内坚守 6 秒',
      ];
      const width = Math.min(W - 24, 380 * u);
      const y = touch && W >= 700 ? 12 : 24 + Math.max(ph, mmH);
      this.panel((W - width) / 2, y, width, 48 * u);
      this.txt(`新手行动  ·  ${stage + 1}/7`, W / 2, y + 13 * u, 11 * u, '#ffd23f', 'center', 800);
      this.txt(steps[stage], W / 2, y + 32 * u, 11.5 * u, '#f2efe6', 'center', 700);
    }

    // --- tutorial
    if (g.tutorialT > 0 && g.tutorialT < 7.6 && !g.ended && mode === 'playing' && !g.search) {
      const a = Math.min(1, g.tutorialT) * Math.min(1, (7.6 - g.tutorialT) * 3);
      ctx.globalAlpha = Math.max(0, a);
      const lines = touch
        ? ['左半屏拖动 移动 · 右半屏拖动 瞄准并自动开火', '靠近容器点「搜索」 · 翻滚可闪避子弹', '目标：拾取武器 → 击退鸭匪 → 搜刮 → 安全撤离']
        : ['WASD 移动 · 鼠标 瞄准/射击 · 空格 翻滚闪避', 'E 搜索 · R 换弹 · G 投掷 · T 切雷 · H 治疗 · Q 切枪 · Esc 暂停', '目标：拾取武器 → 击退鸭匪 → 搜刮 → 安全撤离'];
      const tw = Math.min(W - 40, 470 * u), th = 76 * u;
      const c = g.cam;
      const psy = H / 2 + (p.y - c.y - c.ky) * c.zoom;
      let ty = touch ? (W > H ? H * 0.25 : H * 0.6) : H - 200 * u;
      if (!touch && Math.abs(psy - (ty + th / 2)) < th / 2 + 50 * u) ty = Math.max(12 + ph + 30 * u, H * 0.2);
      const tx = W / 2 - tw / 2;
      this.panel(tx, ty, tw, th);
      lines.forEach((l, i) => this.txt(l, W / 2, ty + 16 * u + i * 22 * u, (i === 2 ? 13 : 12.5) * u, i === 2 ? '#ffd23f' : '#e8e4d8', 'center', i === 2 ? 800 : 600));
      ctx.globalAlpha = 1;
    }

    // --- controls
    if (!touch) {
      if (!g.ended && inp.mouseX > -100) this.drawCrosshair(g, inp);
    } else if (!g.ended) this.drawTouch(g, inp, u);
  }

  private drawBars(x: number, y: number, w: number, u: number, compact: boolean) {
    const ctx = this.ctx;
    const p = (this as unknown as { _g: Game })._g.player;
    const hpH = (compact ? 10 : 14) * u;
    const hpR = Math.max(0, p.hp / p.maxHp);
    if (!compact) {
      this.panel(x - 8, y - 30 * u, w + 16, 82 * u);
      const t = THROWABLES[p.selectedThrowable];
      const items: [string, number, string][] = [['🩹', p.bandages, 'H'], ['💉', p.medkits, 'H'], [t.icon, p.throwables[p.selectedThrowable], 'G/T']];
      let ix = x;
      for (const [ic, n, k] of items) {
        ctx.globalAlpha = n > 0 ? 1 : 0.35;
        this.drawIcon(ic, ix + 9 * u, y - 15 * u, 18 * u);
        this.txt(`×${n}`, ix + 21 * u, y - 14 * u, 13 * u, '#f2efe6', 'left', 700, FONT_NUM);
        this.txt(k, ix + 42 * u, y - 14 * u, 10 * u, 'rgba(255,255,255,0.4)', 'left', 700, FONT_NUM);
        ix += 62 * u;
        ctx.globalAlpha = 1;
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    rr(ctx, x, y, w, hpH, hpH / 2);
    ctx.fill();
    const col = hpR > 0.5 ? '#5fd36a' : hpR > 0.25 ? '#ffb93b' : '#ff4f4f';
    if (hpR > 0) {
      ctx.fillStyle = col;
      rr(ctx, x, y, Math.max(hpH, w * hpR), hpH, hpH / 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(x + hpH / 2, y + 2, Math.max(0, w * hpR - hpH), hpH * 0.25);
    }
    this.txt(`${Math.ceil(p.hp)}`, x + 8, y + hpH / 2 + 1, (compact ? 10 : 12) * u, '#0e1a0f', 'left', 800, FONT_NUM);
    const ay = y + hpH + 5 * u, aH = (compact ? 6 : 8) * u;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    rr(ctx, x, ay, w, aH, aH / 2);
    ctx.fill();
    if (p.armorMax > 0 && p.armor > 0) {
      ctx.fillStyle = '#5aa8ff';
      rr(ctx, x, ay, Math.max(aH, (w * p.armor) / p.armorMax), aH, aH / 2);
      ctx.fill();
    }
    if (!compact) this.txt(p.armorMax > 0 ? `护甲 ${Math.ceil(p.armor)}/${p.armorMax}` : '无护甲', x, ay + aH + 10 * u, 11 * u, 'rgba(200,220,255,0.75)', 'left', 600);
  }

  private drawWeapon(x: number, y: number, u: number, touch: boolean) {
    const g = (this as unknown as { _g: Game })._g;
    const p = g.player;
    const w = p.weapons[p.cur];
    if (!w) return;
    const other = p.weapons[p.cur === 0 ? 1 : 0];
    if (!touch) {
      const pw = 230 * u, ph = 76 * u;
      this.panel(x - pw, y - ph, pw, ph);
      this.txt(w.def.name, x - 14, y - ph + 16 * u, 13 * u, RARITY_COLORS[w.def.rarity], 'right', 800);
      const ammoCol = w.ammo === 0 ? '#ff5a4a' : w.ammo <= w.def.mag * 0.25 ? '#ffb93b' : '#f2efe6';
      this.txt(`/${w.def.mag}`, x - 14, y - 26 * u, 16 * u, 'rgba(242,239,230,0.55)', 'right', 700, FONT_NUM);
      this.ctx.font = `700 ${16 * u}px ${FONT_NUM}`;
      const sw = this.ctx.measureText(`/${w.def.mag}`).width;
      this.txt(`${w.ammo}`, x - 18 - sw, y - 30 * u, 34 * u, ammoCol, 'right', 700, FONT_NUM);
      if (w.reloadT > 0) {
        this.ctx.fillStyle = 'rgba(255,255,255,0.12)';
        this.ctx.fillRect(x - pw + 14, y - 12 * u, pw - 28, 4 * u);
        this.ctx.fillStyle = '#ffd23f';
        this.ctx.fillRect(x - pw + 14, y - 12 * u, (pw - 28) * (1 - w.reloadT / w.def.reload), 4 * u);
        this.txt('换弹中…', x - pw + 14, y - 26 * u, 12 * u, '#ffd23f', 'left', 700);
      } else if (other) {
        this.txt(`Q ⇄ ${other.def.short}`, x - pw + 14, y - 26 * u, 12 * u, 'rgba(242,239,230,0.55)', 'left', 700, FONT_NUM);
      }
      return;
    }
    const s = `${w.def.short}  ${w.ammo}/${w.def.mag}`;
    this.ctx.font = `700 ${15 * u}px ${FONT_NUM}`;
    const tw = this.ctx.measureText(s).width + 26;
    this.panel(x - tw / 2, y - 28 * u, tw, 26 * u, 13 * u);
    this.txt(s, x, y - 15 * u + 1, 15 * u, w.ammo === 0 ? '#ff5a4a' : '#f2efe6', 'center', 700, FONT_NUM);
    if (w.reloadT > 0) {
      this.ctx.fillStyle = '#ffd23f';
      this.ctx.fillRect(x - tw / 2 + 10, y - 6 * u, (tw - 20) * (1 - w.reloadT / w.def.reload), 3 * u);
    }
  }

  private drawLoot(g: Game, u: number, touch: boolean) {
    const s = g.search;
    if (!s) return;
    const ctx = this.ctx, W = this.W, H = this.H;
    const c = s.c;
    const n = Math.max(1, c.items.length);
    const slot = Math.min(72 * u, (W - 60) / Math.max(n, 3) - 8);
    const gap = 8 * u, pad = 12 * u;
    const need = n * slot + (n - 1) * gap;
    const pw = Math.max(240 * u, need + pad * 2), ph = slot + 48 * u;
    const px = W / 2 - pw / 2, py = touch ? H - 56 * u - ph : H - 104 * u - ph;
    this.panel(px, py, pw, ph, 12);
    ctx.fillStyle = '#ffd23f';
    ctx.fillRect(px + 12, py, 40 * u, 3);
    this.txt(c.name, px + pad, py + 18 * u, 14 * u, '#f2efe6', 'left', 800);
    const done = c.revealed >= c.items.length;
    this.txt(done ? (c.items.length ? '已搜完' : '空空如也') : '搜索中…', px + pw - pad, py + 18 * u, 12 * u, done ? '#8dffbb' : '#ffd23f', 'right', 700);
    if (!c.items.length) return;
    const sx0 = W / 2 - need / 2;
    for (let i = 0; i < c.items.length; i++) {
      const it = c.items[i];
      const x = sx0 + i * (slot + gap), y = py + 34 * u;
      if (i < c.revealed) {
        const r = it.def.rarity;
        const age = g.realT - it.at;
        const pop = age < 0.25 ? 1 + (0.25 - age) * 1.3 : 1;
        ctx.save();
        ctx.translate(x + slot / 2, y + slot / 2);
        ctx.scale(pop, pop);
        const grd = ctx.createLinearGradient(0, -slot / 2, 0, slot / 2);
        grd.addColorStop(0, `rgba(${RARITY_RGB[r]},0.12)`);
        grd.addColorStop(1, `rgba(${RARITY_RGB[r]},0.5)`);
        ctx.fillStyle = grd;
        rr(ctx, -slot / 2, -slot / 2, slot, slot, 8);
        ctx.fill();
        ctx.strokeStyle = RARITY_COLORS[r];
        ctx.lineWidth = r >= 4 ? 2.5 : 1.5;
        ctx.stroke();
        ctx.fillStyle = RARITY_COLORS[r];
        ctx.fillRect(-slot / 2 + 6, slot / 2 - 4, slot - 12, 3);
        this.drawIcon(it.def.icon, 0, -slot * 0.14, slot * 0.46);
        const nm = it.def.name.length > 5 ? it.def.name.slice(0, 5) : it.def.name;
        this.txt(nm, 0, slot * 0.2, Math.max(9, 11 * u), '#f2efe6', 'center', 700);
        this.txt(`¥${fmtMoney(it.def.value)}`, 0, slot * 0.36, Math.max(8, 10 * u), '#ffcf4a', 'center', 700, FONT_NUM);
        if (!it.taken) {
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          rr(ctx, -slot / 2, -slot / 2, slot, slot, 8);
          ctx.fill();
          this.txt('背包满', 0, 0, 12 * u, '#bbb', 'center', 800);
        }
        if (age < 0.3) {
          ctx.fillStyle = `rgba(255,255,255,${(0.3 - age) * 2.5})`;
          rr(ctx, -slot / 2, -slot / 2, slot, slot, 8);
          ctx.fill();
        }
        ctx.restore();
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        rr(ctx, x, y, slot, slot, 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
        if (i === c.revealed) {
          const needT = SEARCH_TIME[it.def.rarity] * (c.body ? 0.8 : 1);
          const pr = Math.min(1, s.t / needT);
          const cx = x + slot / 2, cy = y + slot / 2 - 4 * u, R = slot * 0.24;
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 4;
          ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
          ctx.strokeStyle = '#ffd23f';
          ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + pr * TAU); ctx.stroke();
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(g.realT * 5);
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fillRect(R * 0.35, -1, R * 0.4, 2);
          ctx.restore();
          this.txt('搜索中', cx, y + slot - 12 * u, 10 * u, 'rgba(255,255,255,0.6)', 'center', 600);
        } else this.txt('?', x + slot / 2, y + slot / 2, 22 * u, 'rgba(255,255,255,0.25)', 'center', 800, FONT_NUM);
      }
    }
    if (!touch) this.txt('[E] 关闭 · 离开自动关闭', W / 2, py + ph + 12 * u, 11 * u, 'rgba(255,255,255,0.45)', 'center', 600);
  }

  private drawCrosshair(g: Game, inp: Input) {
    const ctx = this.ctx, p = g.player;
    if (p.dead) return;
    const w = p.weapons[p.cur];
    const x = inp.mouseX, y = inp.mouseY;
    const spread = w ? w.def.spread * (Math.hypot(p.vx, p.vy) > 60 ? 1.3 : 1) + p.bloom : 0.05;
    const gap = Math.max(5, Math.min(70, Math.tan(spread) * g.aimDist * g.cam.zoom)) + 3;
    ctx.lineCap = 'butt';
    for (const [col, lw] of [['rgba(0,0,0,0.7)', 4], ['#ffffff', 2]] as [string, number][]) {
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x - gap - 8, y); ctx.lineTo(x - gap, y);
      ctx.moveTo(x + gap, y); ctx.lineTo(x + gap + 8, y);
      ctx.moveTo(x, y - gap - 8); ctx.lineTo(x, y - gap);
      ctx.moveTo(x, y + gap); ctx.lineTo(x, y + gap + 8);
      ctx.stroke();
    }
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - 1, y - 1, 2, 2);
    if (g.hitmark.t > 0) {
      const k = g.hitmark.kill;
      ctx.strokeStyle = k ? '#ff4a3a' : '#ffffff';
      ctx.globalAlpha = Math.min(1, g.hitmark.t * 7);
      ctx.lineWidth = k ? 3 : 2;
      const a = 6, b = k ? 14 : 11;
      ctx.beginPath();
      ctx.moveTo(x - a, y - a); ctx.lineTo(x - b, y - b);
      ctx.moveTo(x + a, y - a); ctx.lineTo(x + b, y - b);
      ctx.moveTo(x - a, y + a); ctx.lineTo(x - b, y + b);
      ctx.moveTo(x + a, y + a); ctx.lineTo(x + b, y + b);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (w && w.reloadT > 0) {
      ctx.strokeStyle = '#ffd23f';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(x, y, gap + 14, -Math.PI / 2, -Math.PI / 2 + (1 - w.reloadT / w.def.reload) * TAU); ctx.stroke();
    } else if (w && w.ammo === 0) this.txt('R 换弹', x, y + gap + 22, 12, '#ff6a5a', 'center', 800);
  }

  private drawTouch(g: Game, inp: Input, u: number) {
    const ctx = this.ctx, L = inp.layout, p = g.player, t = g.realT;
    const R = L.stickR;
    const stick = (s: { id: number; ox: number; oy: number; x: number; y: number }, hint: { x: number; y: number }, firing: boolean, label: string) => {
      if (s.id >= 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.beginPath(); ctx.arc(s.ox, s.oy, R, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        let dx = s.x - s.ox, dy = s.y - s.oy;
        const d = Math.hypot(dx, dy);
        if (d > R) { dx *= R / d; dy *= R / d; }
        ctx.fillStyle = firing ? 'rgba(255,140,60,0.75)' : 'rgba(255,255,255,0.45)';
        ctx.beginPath(); ctx.arc(s.ox + dx, s.oy + dy, R * 0.42, 0, TAU); ctx.fill();
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.16)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath(); ctx.arc(hint.x, hint.y, R, 0, TAU); ctx.stroke();
        ctx.setLineDash([]);
        this.txt(label, hint.x, hint.y, 12 * u, 'rgba(255,255,255,0.3)', 'center', 700);
      }
    };
    stick(inp.moveS, L.moveHint, false, '移动');
    stick(inp.aimS, L.aimHint, inp.firing(), '瞄准射击');
    const w = p.weapons[p.cur];
    for (const b of L.btns) {
      const held = inp.held.has(b.id);
      let dis = false;
      let badge = '';
      let ring = -1;
      let label = b.label;
      if (b.id === 'grenade') { badge = `${p.throwables[p.selectedThrowable]}`; dis = p.throwables[p.selectedThrowable] <= 0; label = THROWABLES[p.selectedThrowable].icon; }
      if (b.id === 'throwableNext') {
        const total = THROWABLE_IDS.reduce((sum, id) => sum + p.throwables[id], 0);
        dis = total <= 1;
      }
      if (b.id === 'heal') { badge = `${p.bandages + p.medkits}`; dis = p.bandages + p.medkits <= 0; if (p.healT > 0) ring = 1 - p.healT / p.healDur; }
      if (b.id === 'roll' && p.rollCd > 0) ring = 1 - p.rollCd / 0.72;
      if (b.id === 'reload' && w && w.reloadT > 0) ring = 1 - w.reloadT / w.def.reload;
      if (!inp.buttonAvailable(b.id)) continue;
      if (b.id === 'swap') { const o = p.weapons[p.cur === 0 ? 1 : 0]; label = o ? o.def.short : '—'; dis = !o; }
      ctx.globalAlpha = dis ? 0.4 : 1;
      ctx.fillStyle = held ? 'rgba(255,210,63,0.4)' : 'rgba(16,18,24,0.55)';
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.fill();
      ctx.strokeStyle = held || (b.id === 'heal' && p.hp < p.maxHp) ? '#ffd23f' : 'rgba(255,255,255,0.32)';
      ctx.lineWidth = 2;
      ctx.stroke();
      if (ring >= 0) {
        ctx.strokeStyle = '#ffd23f';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r - 3, -Math.PI / 2, -Math.PI / 2 + ring * TAU); ctx.stroke();
      }
      this.txt(label, b.x, b.y + 1, (b.id === 'swap' ? 10 : 12) * u, '#f2efe6', 'center', 800);
      if (badge) {
        ctx.fillStyle = '#ffd23f';
        ctx.beginPath(); ctx.arc(b.x + b.r * 0.72, b.y - b.r * 0.72, 8 * u, 0, TAU); ctx.fill();
        this.txt(badge, b.x + b.r * 0.72, b.y - b.r * 0.72 + 1, 10 * u, '#2a1d00', 'center', 800, FONT_NUM);
      }
      ctx.globalAlpha = 1;
    }
    if (inp.interactVisible && g.nearC) {
      const b = L.interact;
      const s = 1 + Math.sin(t * 6) * 0.05;
      ctx.fillStyle = inp.held.has('interact') ? 'rgba(255,230,120,0.95)' : 'rgba(255,210,63,0.88)';
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * s, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();
      this.txt('搜索', b.x, b.y + 1, 15 * u, '#2a1d00', 'center', 900);
      this.txt(g.nearC.name, b.x, b.y - b.r - 10 * u, 11 * u, '#ffe9a0', 'center', 700);
    }
    const pb = L.pause;
    ctx.fillStyle = 'rgba(16,18,24,0.6)';
    ctx.beginPath(); ctx.arc(pb.x, pb.y, pb.r, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#f2efe6';
    ctx.fillRect(pb.x - 5 * u, pb.y - 6 * u, 3.5 * u, 12 * u);
    ctx.fillRect(pb.x + 1.5 * u, pb.y - 6 * u, 3.5 * u, 12 * u);
  }

  /** attach the game for HUD helpers */
  bind(g: Game) { (this as unknown as { _g: Game })._g = g; }
}

export type { Enemy };
