import { CHARACTERS, ENEMIES, LOADOUTS, RARITY_COLORS, fmtMoney, fmtTime, RAID_MAPS, getRaidMap } from './core.js';
type CharacterId = string;
type RaidMapId = string;
type RaidResult = any;
type SaveData = any;
import { COIN_AD_DAILY_LIMIT, COIN_AD_REWARD, isAdConfigured, AD_UNITS } from './config';
import { PORTRAIT_ATLAS, BOSS_ATLAS } from './portraits-data';

// 头像图集：角色 3x2，Boss 2x2。用微信小游戏兼容的 Image 垫片异步加载。
type Img = { complete: boolean; naturalWidth: number; naturalHeight: number; src: string };
function makeImg(src: string): Img {
  const im = new Image() as unknown as Img;
  im.src = src;
  return im;
}
let portraitImg: Img | null = null;
let bossImg: Img | null = null;
function portraits(): Img | null {
  if (!portraitImg) portraitImg = makeImg(PORTRAIT_ATLAS);
  return portraitImg && portraitImg.complete && portraitImg.naturalWidth > 0 ? portraitImg : null;
}
function bossAtlas(): Img | null {
  if (!bossImg) bossImg = makeImg(BOSS_ATLAS);
  return bossImg && bossImg.complete && bossImg.naturalWidth > 0 ? bossImg : null;
}
// 角色图集（3列2行）：小黄/铁头/快羽 / 鹅老大/船长/监工
const CHAR_CELL: Record<string, [number, number]> = {
  duck: [0, 0], tank: [1, 0], scout: [2, 0],
  goose: [0, 1], harborBoss: [1, 1], foundryBoss: [2, 1],
};
// Boss 图集（2列2行）：鸭后/霜羽 / 铁壁/鸭王
const BOSS_CELL: Record<string, [number, number]> = {
  broodQueen: [0, 0], frostMarshal: [1, 0], ironGuard: [0, 1], duckKing: [1, 1],
};

/** 画一个圆形裁切的头像。返回是否真的画出了图（false 表示图还没加载好）。 */
function avatar(ctx: CanvasRenderingContext2D, id: string, cx: number, cy: number, size: number): boolean {
  let img: Img | null = null, cell: [number, number] | undefined, cols = 3, rows = 2;
  if (CHAR_CELL[id]) { img = portraits(); cell = CHAR_CELL[id]; cols = 3; rows = 2; }
  else if (BOSS_CELL[id]) { img = bossAtlas(); cell = BOSS_CELL[id]; cols = 2; rows = 2; }
  if (!img || !cell) return false;
  const cw = img.naturalWidth / cols, ch = img.naturalHeight / rows;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img as unknown as CanvasImageSource, cell[0] * cw, cell[1] * ch, cw, ch, cx - size / 2, cy - size / 2, size, size);
  ctx.restore();
  return true;
}
/** 头像未加载时显示的底色圆，避免布局闪烁。 */
function avatarBg(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.fillStyle = '#252925';
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1;
  ctx.stroke();
}
/** 头像 + 首字兜底（flameAce/radarWarden 等没有图集的 Boss 用首字占位）。 */
const BOSS_EMOJI: Record<string, string> = { flameAce: '🔥', radarWarden: '📡' };

function avatarOr(ctx: CanvasRenderingContext2D, id: string, name: string, cx: number, cy: number, size: number) {
  avatarBg(ctx, cx, cy, size);
  if (avatar(ctx, id, cx, cy, size)) return;
  const emo = BOSS_EMOJI[id];
  if (emo) {
    text(ctx, emo, cx, cy + size * 0.02, size * 0.5, '#ffffff', 'center', '400');
    return;
  }
  text(ctx, (name || '?').slice(0, 1), cx, cy + size * 0.02, size * 0.42, '#ffffff', 'center', '900');
}

export type Screen = 'menu' | 'chars' | 'maps' | 'kits' | 'playing' | 'paused' | 'gameover' | 'revive';

export interface UiState {
  screen: Screen;
  save: SaveData;
  kit: string;
  mapId: RaidMapId;
  characterId: CharacterId;
  result: RaidResult | null;
  stats: { time: number; value: number; kills: number; items: number };
  muted: boolean;
  coinAdsToday: number;
}

export interface Hit { id: string; x: number; y: number; w: number; h: number; enabled: boolean }

const GOLD = '#ffd23f';
const GREEN = '#6dff9e';
const RED = '#ff6b6b';
const FONT = '"PingFang SC","Microsoft YaHei",sans-serif';

function clamp(v: number, a: number, b: number) { return v < a ? a : v > b ? b : v; }

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

function text(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = 'left', weight = '700') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}

/** 按宽度折行，最多 maxLines 行，超出用省略号。 */
function wrap(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, maxW: number, size: number, color: string, lineH: number, maxLines: number, weight = '400') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  const chars = Array.from(s);
  const lines: string[] = [];
  let line = '';
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = ch;
      if (lines.length === maxLines) break;
    } else {
      line = test;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);
  if (lines.length === maxLines && (line.length + lines.join('').length) < chars.length) {
    let last = lines[lines.length - 1];
    while (last.length > 1 && ctx.measureText(last + '…').width > maxW) last = last.slice(0, -1);
    lines[lines.length - 1] = last + '…';
  }
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineH));
}

/** 单行截断，超出加省略号。 */
function ellipsis(ctx: CanvasRenderingContext2D, s: string, size: number, maxW: number, weight = '400') {
  ctx.font = `${weight} ${size}px ${FONT}`;
  if (ctx.measureText(s).width <= maxW) return s;
  let t = s;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
  return t + '…';
}

function hit(hits: Hit[], id: string, x: number, y: number, w: number, h: number, enabled = true) {
  hits.push({ id, x, y, w, h, enabled });
}

function button(ctx: CanvasRenderingContext2D, hits: Hit[], id: string, label: string, x: number, y: number, w: number, h: number, opts: { primary?: boolean; disabled?: boolean; color?: string; size?: number; avatar?: string } = {}) {
  const c = opts.color ?? (opts.primary ? GOLD : '#ffffff');
  const r = Math.min(12, h * 0.28);
  // 深色底：否则半透明填充会让场景纹理透进来，按钮看起来像有条纹
  ctx.fillStyle = opts.disabled ? 'rgba(8,10,13,0.72)' : 'rgba(8,10,13,0.90)';
  rr(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.fillStyle = opts.disabled ? 'rgba(255,255,255,0.02)' : opts.primary ? 'rgba(255,210,63,0.16)' : 'rgba(255,255,255,0.07)';
  rr(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.strokeStyle = opts.disabled ? 'rgba(255,255,255,0.08)' : c;
  ctx.lineWidth = opts.primary ? 2 : 1;
  rr(ctx, x, y, w, h, r);
  ctx.stroke();
  const size = opts.size ?? Math.min(h * 0.42, 20);
  if (opts.avatar) {
    const av = Math.min(h * 0.78, 34);
    const ax = x + av / 2 + 8, ay = y + h / 2;
    avatarBg(ctx, ax, ay, av);
    avatar(ctx, opts.avatar, ax, ay, av);
    text(ctx, label, x + av + 14 + (w - av - 20) / 2, y + h / 2, size, opts.disabled ? 'rgba(255,255,255,0.35)' : c, 'center');
  } else {
    text(ctx, label, x + w / 2, y + h / 2, size, opts.disabled ? 'rgba(255,255,255,0.35)' : c, 'center');
  }
  hit(hits, id, x, y, w, h, !opts.disabled);
}

/** 方形图标按钮（左上角的音效 / 说明），尺寸够大方便手指点。 */
function iconButton(ctx: CanvasRenderingContext2D, hits: Hit[], id: string, glyph: string, x: number, y: number, s: number, accent = '#ffffff') {
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.strokeStyle = 'rgba(255,255,255,0.22)';
  ctx.lineWidth = 1;
  rr(ctx, x, y, s, s, s * 0.26);
  ctx.fill();
  ctx.stroke();
  text(ctx, glyph, x + s / 2, y + s / 2 + s * 0.02, s * 0.44, accent, 'center');
  hit(hits, id, x, y, s, s);
}

function panel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = 'rgba(10,12,15,0.94)';
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  rr(ctx, x, y, w, h, 16);
  ctx.fill();
  ctx.stroke();
}

/** 卡片底：选中时金色描边 + 微亮，未选中为半透明深色。 */
function card(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, selected: boolean, disabled = false) {
  ctx.fillStyle = disabled ? 'rgba(8,10,13,0.76)' : 'rgba(8,10,13,0.85)';
  rr(ctx, x, y, w, h, 14);
  ctx.fill();
  if (selected) {
    ctx.fillStyle = 'rgba(255,210,63,0.10)';
    rr(ctx, x, y, w, h, 14);
    ctx.fill();
  }
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.07)' : selected ? GOLD : 'rgba(255,255,255,0.16)';
  ctx.lineWidth = selected ? 2.5 : 1;
  rr(ctx, x, y, w, h, 14);
  ctx.stroke();
}

function checkBadge(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  text(ctx, '✓', x, y + r * 0.04, r * 1.2, '#15181c', 'center', '900');
}

/** 顶部渐变遮罩，让文字压在场景上也看得清。 */
function scrim(ctx: CanvasRenderingContext2D, W: number, H: number, strong = false) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, strong ? 'rgba(4,6,9,0.92)' : 'rgba(4,6,9,0.88)');
  g.addColorStop(0.45, strong ? 'rgba(4,6,9,0.72)' : 'rgba(4,6,9,0.46)');
  g.addColorStop(1, strong ? 'rgba(4,6,9,0.94)' : 'rgba(4,6,9,0.9)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

export function hitUi(hits: Hit[], x: number, y: number): string | null {
  for (let i = hits.length - 1; i >= 0; i--) {
    const h = hits[i];
    if (h.enabled && x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) return h.id;
  }
  return null;
}

const CHAR_DESC: Record<string, string> = {
  duck: '全能型，标准护甲与移速，适合第一次出击。',
  tank: '重甲型，护甲更高但移速偏慢，正面硬抗火力。',
  scout: '侦察型，移速最快但护甲较轻，擅长穿插搜刮。',
};

// ─────────────── 配装图标：三档同风格背包（矢量绘制，无外置图片） ───────────────
// 1 级侦察小包（沙色）、2 级突击包（军绿）、3 级重装大包（深橄榄）。
// 全部用同一套画法：侧袋 → 主体 → 顶盖 → 前袋 → 织带 → 拉链 → 提手。

type PackPalette = { top: string; bottom: string; lid: string; pocket: string; strap: string; edge: string; seam: string };

const PACK_PALETTES: Record<number, PackPalette> = {
  1: { top: '#dcb87e', bottom: '#a8834d', lid: '#c9a368', pocket: '#e6c58f', strap: '#6b5533', edge: 'rgba(44,32,16,0.9)', seam: 'rgba(104,80,44,0.55)' },
  2: { top: '#6e8f58', bottom: '#405933', lid: '#5d7b49', pocket: '#7c9d64', strap: '#2b3c23', edge: 'rgba(18,28,14,0.9)', seam: 'rgba(34,50,26,0.55)' },
  3: { top: '#5a6f5c', bottom: '#2e3a31', lid: '#48594b', pocket: '#617463', strap: '#1a2330', edge: 'rgba(6,10,8,0.92)', seam: 'rgba(20,30,22,0.55)' },
};

function packRR(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string | CanvasGradient, edge: string, lw = 2.4) {
  rr(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (lw > 0) {
    ctx.strokeStyle = edge;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

function packGrad(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, p: PackPalette) {
  const g = ctx.createLinearGradient(x, y, x, y + h);
  g.addColorStop(0, p.top);
  g.addColorStop(1, p.bottom);
  return g;
}

function packLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, lw: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.stroke();
}

function packHandle(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, lift: number, color: string, lw: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.quadraticCurveTo((x1 + x2) / 2, y - lift, x2, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.lineCap = 'butt';
}

/** 1 级：侦察小包，沙色、单主袋 + 顶盖，最小最轻。 */
function drawPackL1(ctx: CanvasRenderingContext2D, p: PackPalette) {
  packHandle(ctx, 42, 58, 32, 7, p.strap, 3.4);
  // 侧扣带
  ctx.fillStyle = p.strap;
  ctx.fillRect(23, 49, 6, 11);
  ctx.fillRect(71, 49, 6, 11);
  // 主体
  packRR(ctx, 28, 40, 44, 38, 8, packGrad(ctx, 28, 40, 38, p), p.edge);
  // 顶盖
  packRR(ctx, 25, 30, 50, 17, 7, p.lid, p.edge);
  // 前袋
  packRR(ctx, 35, 57, 30, 16, 4, p.pocket, p.edge, 2);
  // 拉链
  packLine(ctx, 31, 51, 69, 51, p.seam, 2.2);
  ctx.fillStyle = p.strap;
  ctx.fillRect(66, 48.4, 5, 5.6);
  // 前袋缝线
  packLine(ctx, 38, 65, 62, 65, p.seam, 1.6);
  // 高光
  ctx.beginPath();
  ctx.moveTo(34, 44);
  ctx.quadraticCurveTo(41, 41.5, 51, 41.5);
  ctx.strokeStyle = 'rgba(255,255,255,0.20)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

/** 2 级：突击中包，军绿、双侧袋 + 前袋 + 织带。 */
function drawPackL2(ctx: CanvasRenderingContext2D, p: PackPalette) {
  packHandle(ctx, 41, 59, 28, 7, p.strap, 3.6);
  // 侧袋
  packRR(ctx, 14, 46, 11, 29, 4, p.lid, p.edge, 2);
  packRR(ctx, 75, 46, 11, 29, 4, p.lid, p.edge, 2);
  // 侧袋织带
  for (let i = 0; i < 3; i++) {
    packLine(ctx, 16, 53 + i * 6.5, 23, 53 + i * 6.5, p.seam, 1.5);
    packLine(ctx, 77, 53 + i * 6.5, 84, 53 + i * 6.5, p.seam, 1.5);
  }
  // 主体
  packRR(ctx, 24, 36, 52, 48, 9, packGrad(ctx, 24, 36, 48, p), p.edge);
  // 顶盖
  packRR(ctx, 22, 27, 56, 18, 8, p.lid, p.edge);
  // 前袋
  packRR(ctx, 32, 56, 36, 21, 5, p.pocket, p.edge, 2);
  // 拉链
  packLine(ctx, 28, 51, 72, 51, p.seam, 2.2);
  ctx.fillStyle = p.strap;
  ctx.fillRect(68, 48.2, 5, 5.8);
  packLine(ctx, 36, 64, 64, 64, p.seam, 1.7);
  // 底部扣带
  ctx.fillStyle = p.strap;
  ctx.fillRect(35, 77, 6, 10);
  ctx.fillRect(59, 77, 6, 10);
  // 高光
  ctx.beginPath();
  ctx.moveTo(31, 41);
  ctx.quadraticCurveTo(40, 38.5, 52, 38.5);
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

/** 3 级：重装大包，深橄榄、更大顶盖 + 前扩展袋 + 大量织带扣带。 */
function drawPackL3(ctx: CanvasRenderingContext2D, p: PackPalette) {
  packHandle(ctx, 38, 62, 21, 8, p.strap, 4.2);
  // 侧袋
  packRR(ctx, 8, 40, 12, 37, 4, p.lid, p.edge, 2);
  packRR(ctx, 80, 40, 12, 37, 4, p.lid, p.edge, 2);
  for (let i = 0; i < 3; i++) {
    packLine(ctx, 10, 47 + i * 8, 18, 47 + i * 8, p.seam, 1.6);
    packLine(ctx, 82, 47 + i * 8, 90, 47 + i * 8, p.seam, 1.6);
  }
  // 主体
  packRR(ctx, 20, 31, 60, 56, 10, packGrad(ctx, 20, 31, 56, p), p.edge);
  // 顶盖
  packRR(ctx, 16, 19, 68, 20, 9, p.lid, p.edge);
  // 盖子扣带（比竖杠更自然）
  ctx.fillStyle = p.strap;
  ctx.fillRect(37, 34, 6, 8);
  ctx.fillRect(57, 34, 6, 8);
  // 前扩展袋
  packRR(ctx, 27, 51, 46, 29, 6, p.pocket, p.edge, 2);
  // 前袋织带
  for (let i = 0; i < 3; i++) packLine(ctx, 40 + i * 10, 64, 40 + i * 10, 76, p.seam, 1.6);
  // 拉链
  packLine(ctx, 24, 45, 76, 45, p.seam, 2.4);
  ctx.fillStyle = p.strap;
  ctx.fillRect(71, 42, 5.5, 6);
  packLine(ctx, 31, 59, 69, 59, p.seam, 2);
  // 底部扣带
  ctx.fillStyle = p.strap;
  ctx.fillRect(34, 74, 7, 14);
  ctx.fillRect(59, 74, 7, 14);
  // 高光
  ctx.beginPath();
  ctx.moveTo(27, 37);
  ctx.quadraticCurveTo(38, 34.5, 52, 34.5);
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 2.2;
  ctx.stroke();
}

/** 画配装背包图标：level 1/2/3 对应侦察/突击/重装。 */
function drawPack(ctx: CanvasRenderingContext2D, level: number, cx: number, cy: number, size: number) {
  const p = PACK_PALETTES[level] || PACK_PALETTES[2];
  const s = size / 100;
  const dy = level === 3 ? -1 : -4; // 视觉重心微调
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2 + dy * s);
  ctx.scale(s, s);
  ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 2;
  if (level === 1) drawPackL1(ctx, p);
  else if (level === 3) drawPackL3(ctx, p);
  else drawPackL2(ctx, p);
  ctx.restore();
}

/** 装备配装 → 背包等级：跑刀 1 级、突击 2 级、重装 3 级。 */
function loadoutIcon(ctx: CanvasRenderingContext2D, l: any, cx: number, cy: number, size: number) {
  const level = l.id === 'knife' ? 1 : l.id === 'heavy' ? 3 : 2;
  const k = level === 1 ? 0.76 : level === 2 ? 0.9 : 1;
  drawPack(ctx, level, cx, cy, size * k);
}

// ─────────────────────────── 顶部栏 ───────────────────────────

/**
 * 顶部栏：音效 + 操作说明固定在左上角。
 * 右上角是微信胶囊按钮区域，所有顶部内容都限制在 capsuleLeft 左侧。
 */
function topBar(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[], title: string, withBack: boolean) {
  const pad = clamp(W * 0.02, 12, 20);
  const size = clamp(H * 0.105, 38, 46);
  const y = clamp(H * 0.028, 8, 14);
  let x = pad;
  if (withBack) {
    const bw = clamp(W * 0.1, 74, 96);
    button(ctx, hits, 'back', '‹ 返回', x, y, bw, size, { size: clamp(size * 0.34, 13, 16) });
    x += bw + 10;
  }
  iconButton(ctx, hits, 'mute', s.muted ? '🔇' : '🔊', x, y, size);
  x += size + 8;
  iconButton(ctx, hits, 'help', '?', x, y, size, 'rgba(255,255,255,0.85)');
  x += size + 14;
  const titleSize = clamp(H * 0.07, 20, 30);
  text(ctx, title, x, y + size / 2, titleSize, GOLD, 'left', '900');
  return { pad, top: y + size, size, contentX: x, titleSize };
}

function statChips(ctx: CanvasRenderingContext2D, x: number, y: number, limitX: number, s: UiState) {
  const rate = s.save.raids ? Math.round((s.save.extracts / s.save.raids) * 100) : 0;
  const chips: [string, string][] = [
    ['仓库', `¥${fmtMoney(s.save.stash)}`],
    ['出击', `${s.save.raids}`],
    ['撤离', `${rate}%`],
  ];
  const ch = 26;
  let cx = x;
  for (let i = 0; i < chips.length; i++) {
    const [k, v] = chips[i];
    const label = `${k} ${v}`;
    ctx.font = `700 12px ${FONT}`;
    const w = ctx.measureText(label).width + 22;
    if (cx + w > limitX) break;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    rr(ctx, cx, y, w, ch, 13);
    ctx.fill();
    text(ctx, label, cx + w / 2, y + ch / 2, 12, i === 0 ? GOLD : 'rgba(255,255,255,0.88)', 'center');
    cx += w + 8;
  }
}

// ─────────────────────────── 大厅 ───────────────────────────

function drawMenu(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const bar = topBar(ctx, W, H, s, hits, '鸭鸭鸭行动', false);
  const pad = bar.pad;
  const rightLimit = W - Math.max(132, W * 0.155);
  // 统计条跟在标题右侧；空间不够自动少画几个
  ctx.font = `900 ${bar.titleSize}px ${FONT}`;
  const titleW = ctx.measureText('鸭鸭鸭行动').width;
  const statsX = bar.contentX + titleW + 16;
  statChips(ctx, statsX, bar.top - bar.size + (bar.size - 26) / 2, rightLimit, s);

  const cardTop = bar.top + clamp(H * 0.045, 12, 20);
  const footY = H - pad - clamp(H * 0.14, 46, 58);
  const cardH = footY - clamp(H * 0.028, 8, 14) - cardTop;
  const gap = clamp(W * 0.015, 10, 16);
  const cardW = (W - pad * 2 - gap * 2) / 3;

  const ch = CHARACTERS.find((c: any) => c.id === s.characterId) ?? CHARACTERS[0];
  const m = getRaidMap(s.mapId);
  const kit = LOADOUTS.find((l: any) => l.id === s.kit) ?? LOADOUTS[0];

  const entries: { id: string; tag: string; value: string; sub: string; avatarId: string; avatarName: string }[] = [
    { id: 'nav:chars', tag: '角色', value: `${ch.name} · ${ch.role}`, sub: '点击切换角色', avatarId: ch.id, avatarName: ch.name },
    { id: 'nav:maps', tag: '战区', value: m.name, sub: `${m.difficulty} · 点击切换`, avatarId: m.boss, avatarName: (ENEMIES[m.boss] && ENEMIES[m.boss].name) || m.name },
    { id: 'nav:kits', tag: '装备', value: kit.name, sub: kit.cost ? `¥${fmtMoney(kit.cost)} · 点击切换` : '免费 · 点击切换', avatarId: '', avatarName: '' },
  ];

  entries.forEach((e, i) => {
    const x = pad + i * (cardW + gap);
    card(ctx, x, cardTop, cardW, cardH, false);
    text(ctx, e.tag, x + 16, cardTop + 22, 13, 'rgba(255,255,255,0.5)');
    const av = Math.min(cardW * 0.42, cardH * 0.4, 96);
    const cx = x + cardW / 2, cy = cardTop + cardH * 0.42;
    if (e.id === 'nav:kits') {
      loadoutIcon(ctx, kit, cx, cy, av * 1.12);
    } else {
      avatarOr(ctx, e.avatarId, e.avatarName, cx, cy, av);
    }
    text(ctx, e.value, x + cardW / 2, cardTop + cardH * 0.74, clamp(cardW * 0.095, 15, 21), '#ffffff', 'center', '900');
    text(ctx, e.sub, x + cardW / 2, cardTop + cardH * 0.88, 12, 'rgba(255,255,255,0.5)', 'center', '400');
    text(ctx, '›', x + cardW - 18, cardTop + cardH / 2, 26, 'rgba(255,255,255,0.28)', 'center', '900');
    hit(hits, e.id, x, cardTop, cardW, cardH);
  });

  // 底部：开始行动（大）+ 右侧两个次级按钮
  const deployH = clamp(H * 0.14, 46, 58);
  const deployW = Math.max(200, (W - pad * 2) * 0.62);
  button(ctx, hits, s.save.trainingCompleted ? 'deploy' : 'training', s.save.trainingCompleted ? '开始行动' : '新手行动（免费）', pad, footY, deployW, deployH, { primary: true, size: clamp(deployH * 0.38, 17, 22) });

  const sideX = pad + deployW + gap;
  const sideW = W - pad - sideX;
  const half = (deployH - 4) / 2;
  button(ctx, hits, s.save.trainingCompleted ? 'training' : 'deploy', s.save.trainingCompleted ? '新手行动' : '直接正式行动', sideX, footY, sideW, half, { size: clamp(half * 0.5, 12, 15) });
  const adOk = isAdConfigured(AD_UNITS.coins);
  const full = s.coinAdsToday >= COIN_AD_DAILY_LIMIT;
  button(ctx, hits, 'adcoin', adOk ? `看广告领 ¥${fmtMoney(COIN_AD_REWARD)}` : '广告位待配置', sideX, footY + half + 4, sideW, half, { disabled: !adOk || full, color: GREEN, size: clamp(half * 0.5, 12, 15) });
}

// ─────────────────────────── 选角色 ───────────────────────────

function drawChars(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const bar = topBar(ctx, W, H, s, hits, '选择角色', true);
  const pad = bar.pad;
  const gap = clamp(W * 0.015, 10, 16);
  const top = bar.top + clamp(H * 0.04, 10, 18);
  const btnH = clamp(H * 0.13, 44, 54);
  const areaH = H - pad - btnH - 12 - top;
  const cw = (W - pad * 2 - gap * 2) / 3;

  CHARACTERS.forEach((c: any, i: number) => {
    const x = pad + i * (cw + gap);
    const sel = s.characterId === c.id;
    card(ctx, x, top, cw, areaH, sel);
    if (sel) checkBadge(ctx, x + cw - 20, top + 20, 13);

    // 竖向堆叠并按剩余高度居中，保证描述不会溢出卡片
    const nameS = clamp(cw * 0.12, 18, 26);
    const g = clamp(areaH * 0.035, 5, 11);
    const descLH = clamp(areaH * 0.068, 13, 16);
    const descLines = areaH > 205 ? 2 : 1;
    const av = Math.min(cw * 0.44, areaH * 0.32, 100);
    const pillH = 22;
    const statsH = 38;
    const total = av + g + nameS + g * 0.5 + pillH + g * 0.7 + statsH + g * 0.7 + descLH * descLines;
    let cy = top + Math.max(6, (areaH - total) / 2);

    avatarOr(ctx, c.id, c.name, x + cw / 2, cy + av / 2, av);
    cy += av + g;

    text(ctx, c.name, x + cw / 2, cy + nameS / 2, nameS, sel ? GOLD : '#ffffff', 'center', '900');
    cy += nameS + g * 0.5;

    // 定位标签
    ctx.font = `700 13px ${FONT}`;
    const roleW = ctx.measureText(c.role).width + 24;
    ctx.fillStyle = sel ? 'rgba(255,210,63,0.2)' : 'rgba(255,255,255,0.1)';
    rr(ctx, x + cw / 2 - roleW / 2, cy, roleW, pillH, pillH / 2);
    ctx.fill();
    text(ctx, c.role, x + cw / 2, cy + pillH / 2, 13, sel ? GOLD : 'rgba(255,255,255,0.8)', 'center');
    cy += pillH + g * 0.7;

    const armorText = c.armorBonus > 0 ? `+${c.armorBonus}` : `${Math.round((c.armorScale ?? 1) * 100)}%`;
    text(ctx, '移速', x + 18, cy + 9, 12, 'rgba(255,255,255,0.45)');
    text(ctx, `${c.speed}`, x + cw - 18, cy + 9, 14, '#ffffff', 'right');
    text(ctx, '护甲', x + 18, cy + 28, 12, 'rgba(255,255,255,0.45)');
    text(ctx, armorText, x + cw - 18, cy + 28, 14, '#ffffff', 'right');
    cy += statsH + g * 0.7;

    wrap(ctx, CHAR_DESC[c.id] ?? '', x + 18, cy + descLH / 2, cw - 36, 12, 'rgba(255,255,255,0.6)', descLH, descLines);

    hit(hits, `char:${c.id}`, x, top, cw, areaH);
  });

  const bw = (W - pad * 2 - gap) / 2;
  button(ctx, hits, 'back', '返回大厅', pad, H - pad - btnH, bw, btnH, { size: clamp(btnH * 0.36, 14, 18) });
  button(ctx, hits, s.save.trainingCompleted ? 'deploy' : 'training', s.save.trainingCompleted ? '开始行动' : '新手行动', pad + bw + gap, H - pad - btnH, bw, btnH, { primary: true, size: clamp(btnH * 0.38, 15, 20) });
}

// ─────────────────────────── 选地图 ───────────────────────────

function drawMaps(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const bar = topBar(ctx, W, H, s, hits, '选择战区', true);
  const pad = bar.pad;
  const gap = clamp(W * 0.012, 8, 14);
  const top = bar.top + clamp(H * 0.035, 8, 16);
  const btnH = clamp(H * 0.13, 44, 54);
  const areaH = H - pad - btnH - 12 - top;

  const cols = 4;
  const rows = Math.ceil(RAID_MAPS.length / cols);
  const cw = (W - pad * 2 - gap * (cols - 1)) / cols;
  const chh = (areaH - gap * (rows - 1)) / rows;

  RAID_MAPS.forEach((m: any, i: number) => {
    const col = i % cols, rowI = Math.floor(i / cols);
    const x = pad + col * (cw + gap);
    const y = top + rowI * (chh + gap);
    const locked = m.requiredExtracts > s.save.extracts;
    const sel = s.mapId === m.id && !locked;
    card(ctx, x, y, cw, chh, sel, locked);

    const boss = (ENEMIES[m.boss] && ENEMIES[m.boss].name) || m.name;
    const av = Math.min(chh * 0.46, 46);
    const avX = x + 12 + av / 2, avY = y + chh * 0.5;
    avatarOr(ctx, m.boss, boss, avX, avY, av);

    const tx = avX + av / 2 + 10;
    const tw = x + cw - 10 - tx;
    const nameS = clamp(cw * 0.095, 13, 16);
    const subS = clamp(cw * 0.072, 10, 12);
    const bossS = clamp(cw * 0.068, 10, 11);
    text(ctx, ellipsis(ctx, m.name, nameS, tw, '900'), tx, y + chh * 0.34, nameS, locked ? 'rgba(255,255,255,0.4)' : '#ffffff', 'left', '900');
    text(ctx, ellipsis(ctx, locked ? `需撤离 ${m.requiredExtracts} 次` : m.difficulty, subS, tw), tx, y + chh * 0.58, subS, locked ? RED : 'rgba(255,255,255,0.55)', 'left', '400');
    if (!locked) text(ctx, ellipsis(ctx, `首 ${boss}`, bossS, tw), tx, y + chh * 0.78, bossS, 'rgba(255,255,255,0.4)', 'left', '400');

    if (sel) checkBadge(ctx, x + 14, y + 14, 11);
    if (locked) {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      rr(ctx, x, y, cw, chh, 14);
      ctx.fill();
      text(ctx, '🔒', x + cw - 16, y + 16, 16, '#ffffff', 'center');
    }
    hit(hits, `map:${m.id}`, x, y, cw, chh, !locked);
  });

  const bw = (W - pad * 2 - gap) / 2;
  button(ctx, hits, 'back', '返回大厅', pad, H - pad - btnH, bw, btnH, { size: clamp(btnH * 0.36, 14, 18) });
  button(ctx, hits, s.save.trainingCompleted ? 'deploy' : 'training', s.save.trainingCompleted ? '开始行动' : '新手行动', pad + bw + gap, H - pad - btnH, bw, btnH, { primary: true, size: clamp(btnH * 0.38, 15, 20) });
}

// ─────────────────────────── 选装备 ───────────────────────────

function drawKits(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const bar = topBar(ctx, W, H, s, hits, '选择装备', true);
  const pad = bar.pad;
  const gap = clamp(W * 0.015, 10, 16);
  const top = bar.top + clamp(H * 0.04, 10, 18);
  const btnH = clamp(H * 0.13, 44, 54);
  const areaH = H - pad - btnH - 12 - top;
  const cw = (W - pad * 2 - gap * 2) / 3;

  LOADOUTS.forEach((l: any, i: number) => {
    const x = pad + i * (cw + gap);
    const locked = s.save.stash < l.cost;
    const sel = s.kit === l.id && !locked;
    card(ctx, x, top, cw, areaH, sel, locked);
    if (sel) checkBadge(ctx, x + cw - 20, top + 20, 13);

    text(ctx, l.name, x + 18, top + 34, clamp(cw * 0.12, 20, 27), sel ? GOLD : '#ffffff', 'left', '900');
    ctx.font = `700 12px ${FONT}`;
    const tagW = ctx.measureText(l.tag).width + 20;
    ctx.fillStyle = 'rgba(255,255,255,0.09)';
    rr(ctx, x + 18, top + 52, tagW, 21, 10);
    ctx.fill();
    text(ctx, l.tag, x + 18 + tagW / 2, top + 62, 12, 'rgba(255,255,255,0.75)', 'center');

    loadoutIcon(ctx, l, x + cw / 2, top + areaH * 0.44, Math.min(cw * 0.5, areaH * 0.44, 124));

    wrap(ctx, l.desc, x + 18, top + areaH * 0.6, cw - 36, 12.5, locked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.72)', 18, 3);

    if (locked) {
      text(ctx, `仓库不足 · 需 ¥${fmtMoney(l.cost)}`, x + cw / 2, top + areaH - 22, 12, RED, 'center');
    } else {
      text(ctx, l.cost ? `¥${fmtMoney(l.cost)}` : '免费', x + cw / 2, top + areaH - 24, clamp(cw * 0.1, 15, 20), l.cost ? GOLD : GREEN, 'center', '900');
    }
    hit(hits, `kit:${l.id}`, x, top, cw, areaH, !locked);
  });

  const bw = (W - pad * 2 - gap) / 2;
  button(ctx, hits, 'back', '返回大厅', pad, H - pad - btnH, bw, btnH, { size: clamp(btnH * 0.36, 14, 18) });
  button(ctx, hits, s.save.trainingCompleted ? 'deploy' : 'training', s.save.trainingCompleted ? '开始行动' : '新手行动', pad + bw + gap, H - pad - btnH, bw, btnH, { primary: true, size: clamp(btnH * 0.38, 15, 20) });
}

// ─────────────────────────── 暂停 ───────────────────────────

function drawPause(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const u = clamp(Math.min(W / 812, H / 375), 0.85, 1.25);
  const pw = Math.min(W - 60, 460 * u), ph = Math.min(H - 40, 330 * u);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, '行动暂停', px + pw / 2, py + 34 * u, 26 * u, GOLD, 'center', '900');
  const rows: [string, string][] = [['剩余时间', fmtTime(s.stats.time)], ['背包价值', `¥${fmtMoney(s.stats.value)}`], ['击杀', `${s.stats.kills}`]];
  rows.forEach(([k, v], i) => {
    const y = py + 74 * u + i * 28 * u;
    text(ctx, k, px + 26 * u, y, 14 * u, 'rgba(255,255,255,0.5)');
    text(ctx, v, px + pw - 26 * u, y, 16 * u, '#fff', 'right');
  });
  let y = py + 168 * u;
  const bw = pw - 52 * u, bx = px + 26 * u;
  button(ctx, hits, 'resume', '继续行动', bx, y, bw, 42 * u, { primary: true, size: 17 * u }); y += 50 * u;
  button(ctx, hits, 'restart', '重新部署', bx, y, bw, 36 * u, { size: 15 * u }); y += 44 * u;
  button(ctx, hits, 'quit', '放弃行动 · 返回大厅', bx, y, bw, 36 * u, { color: RED, size: 15 * u }); y += 44 * u;
  button(ctx, hits, 'mute', s.muted ? '🔇 已静音' : '🔊 声音开', bx, y, bw, 32 * u, { size: 14 * u });
}

// ─────────────────────────── 结算 ───────────────────────────

/** 战利品图标：gear: 前缀交给渲染器画（武器/护甲图集），其余直接画 emoji。 */
function lootIcon(ctx: CanvasRenderingContext2D, icon: string, cx: number, cy: number, size: number, drawIcon?: (icon: string, x: number, y: number, size: number) => void) {
  if (icon && icon.indexOf('gear:') === 0 && drawIcon) {
    drawIcon(icon, cx, cy, size);
    return;
  }
  ctx.font = `${size * 0.86}px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(icon || '📦', cx, cy);
}

function drawGameOver(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[], drawIcon?: (icon: string, x: number, y: number, size: number) => void) {
  const r = s.result;
  if (!r) return;
  const ok = r.outcome === 'extract';
  const u = clamp(Math.min(W / 812, H / 375), 0.8, 1.18);
  const pad = 14 * u;
  const pw = W - pad * 2, ph = H - pad * 2;
  const px = pad, py = pad;
  panel(ctx, px, py, pw, ph);
  const inn = 18 * u;
  const col = ok ? GREEN : RED;

  // 标题区
  text(ctx, ok ? '撤离成功' : r.outcome === 'dead' ? '行动阵亡' : '行动失踪', px + inn, py + 26 * u, 23 * u, col, 'left', '900');
  text(ctx, ok ? 'EXTRACTED' : r.outcome === 'dead' ? 'KILLED IN ACTION' : 'MISSING IN ACTION', px + inn, py + 47 * u, 9.5 * u, 'rgba(255,255,255,0.42)', 'left');
  const mapName = getRaidMap(r.mapId).name;
  text(ctx, `${mapName} · 存活 ${fmtTime(r.time)} · 击杀 ${r.kills}`, px + pw - inn, py + 24 * u, 11 * u, 'rgba(255,255,255,0.6)', 'right', '400');
  text(ctx, fmtMoney(r.score), px + pw - inn, py + 50 * u, 24 * u, GOLD, 'right', '900');
  text(ctx, '本局得分', px + pw - inn - 4, py + 68 * u, 9.5 * u, 'rgba(255,255,255,0.45)', 'right', '400');

  // 分隔线
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + inn, py + 80 * u);
  ctx.lineTo(px + pw - inn, py + 80 * u);
  ctx.stroke();

  // 战利品区（横向铺满，最多 2 行 × 8 列）
  const all: any[] = r.items || [];
  const items = all.slice(0, 16);
  const bandY = py + 90 * u;
  text(ctx, `${ok ? '带出物资' : '丢失物资'} · ${all.length} 件`, px + inn, bandY + 6 * u, 12 * u, GOLD);

  const cols = Math.min(8, Math.max(4, items.length || 1));
  const gap = 8 * u;
  const gridW = pw - inn * 2;
  const tileW = (gridW - gap * (cols - 1)) / cols;
  const gridY = bandY + 20 * u;
  const rows = Math.max(1, Math.min(2, Math.ceil(items.length / cols)));

  // 自下而上排布：按钮 → 汇总三格 → 战利品格子，保证互不遮挡
  const bh = 42 * u;
  const btnY = py + ph - inn * 0.65 - bh;
  const sumH = 32 * u;
  const sumY = btnY - 14 * u - sumH;
  const gridBottom = sumY - 10 * u;
  const availH = Math.max(0, gridBottom - gridY);
  const tileH = Math.max(26 * u, Math.min(66 * u, tileW * 0.9, (availH - gap * (rows - 1)) / rows));

  items.forEach((it: any, i: number) => {
    const c = i % cols, row = Math.floor(i / cols);
    const x = px + inn + c * (tileW + gap);
    const y = gridY + row * (tileH + gap);
    const rc = RARITY_COLORS[it.rarity] ?? 'rgba(255,255,255,0.2)';
    // 稀有度底色
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    rr(ctx, x, y, tileW, tileH, 9);
    ctx.fill();
    ctx.strokeStyle = rc;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.5;
    rr(ctx, x, y, tileW, tileH, 9);
    ctx.stroke();
    ctx.globalAlpha = 1;
    const iconSize = Math.min(tileW * 0.52, tileH * 0.52);
    lootIcon(ctx, it.icon, x + tileW / 2, y + tileH * 0.38, iconSize, drawIcon);
    text(ctx, `¥${fmtMoney(it.value)}`, x + tileW / 2, y + tileH * 0.82, Math.min(11 * u, tileW * 0.16), GOLD, 'center', '900');
  });

  // 汇总（一行三格）
  if (sumH >= 22 * u) {
    const cw3 = (gridW - gap * 2) / 3;
    const sums: [string, string, string][] = [
      ['带出物资', ok ? `¥${fmtMoney(r.value)}` : '¥0', '#ffffff'],
      ['击杀奖励', `+${fmtMoney(ok ? r.killScore : Math.floor(r.killScore * 0.3))}`, '#ffffff'],
      ['仓库资产', `¥${fmtMoney(s.save.stash)}`, GREEN],
    ];
    sums.forEach(([k, v, c], i) => {
      const x = px + inn + i * (cw3 + gap);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      rr(ctx, x, sumY, cw3, sumH, 8);
      ctx.fill();
      text(ctx, k, x + 12, sumY + sumH * 0.3, 10.5 * u, 'rgba(255,255,255,0.45)', 'left', '400');
      text(ctx, v, x + 12, sumY + sumH * 0.69, 14 * u, c, 'left', '900');
    });
  }

  // 按钮：再次部署 / 返回大厅 / 看广告领金币
  const adOk = isAdConfigured(AD_UNITS.coins);
  const full = s.coinAdsToday >= COIN_AD_DAILY_LIMIT;
  const b1 = gridW * 0.36, b2 = gridW * 0.3, b3 = gridW - b1 - b2 - gap * 2;
  button(ctx, hits, 'retry', '再次部署', px + inn, btnY, b1, bh, { primary: true, size: 16 * u });
  button(ctx, hits, 'menu', '返回大厅', px + inn + b1 + gap, btnY, b2, bh, { size: 15 * u });
  button(ctx, hits, 'adcoin', adOk ? `看广告 +¥${fmtMoney(COIN_AD_REWARD)}` : '广告位待配置', px + inn + b1 + gap + b2 + gap, btnY, b3, bh, { disabled: !adOk || full, color: GREEN, size: 12.5 * u });
}

// ─────────────────────────── 复活 ───────────────────────────

function drawRevive(ctx: CanvasRenderingContext2D, W: number, H: number, _s: UiState, hits: Hit[]) {
  const u = clamp(Math.min(W / 812, H / 375), 0.85, 1.2);
  const pw = Math.min(W - 60, 460 * u), ph = Math.min(H - 40, 240 * u);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, '阵亡', px + pw / 2, py + 36 * u, 27 * u, RED, 'center', '900');
  text(ctx, '看一段广告即可原地复活，保留背包物资', px + pw / 2, py + 70 * u, 13 * u, 'rgba(255,255,255,0.7)', 'center', '400');
  const bw = pw - 56 * u, bx = px + 28 * u;
  const adOk = isAdConfigured(AD_UNITS.revive);
  button(ctx, hits, 'revive', adOk ? '看广告复活（60% 生命）' : '广告位待配置', bx, py + 100 * u, bw, 46 * u, { primary: true, disabled: !adOk, size: 16 * u });
  button(ctx, hits, 'skiprevive', '放弃 · 结算损失', bx, py + 158 * u, bw, 38 * u, { color: RED, size: 14 * u });
}

// ─────────────────────────── 操作说明 ───────────────────────────

function drawHelp(ctx: CanvasRenderingContext2D, W: number, H: number, hits: Hit[]) {
  const u = clamp(Math.min(W / 812, H / 375), 0.85, 1.15);
  const pw = Math.min(W - 60, 620 * u), ph = Math.min(H - 40, 300 * u);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, '操作与规则', px + 26 * u, py + 30 * u, 21 * u, GOLD, 'left', '900');
  const lines = [
    '左半屏拖动移动 · 右半屏拖动瞄准并自动开火',
    '右下按钮：翻滚 / 换弹 / 投掷 / 切枪 / 背包 / 治疗',
    '靠近容器点「搜索」搜刮；背包点枪甲换装，点其他丢弃',
    '进入绿色撤离区停留 6 秒即可撤离',
    '阵亡或超时：背包与装备全部丢失',
    '每局阵亡可看广告复活一次 · 每日看广告领金币有上限',
  ];
  const gapY = (ph - 110 * u) / lines.length;
  lines.forEach((l, i) => text(ctx, l, px + 26 * u, py + 62 * u + i * gapY, Math.min(13 * u, gapY * 0.62), 'rgba(255,255,255,0.78)', 'left', '400'));
  button(ctx, hits, 'closehelp', '知道了', px + 26 * u, py + ph - 50 * u, pw - 52 * u, 38 * u, { primary: true, size: 15 * u });
}

/** Draw the active UI overlay and return tappable regions. */
export function drawUi(ctx: CanvasRenderingContext2D, W: number, H: number, dpr: number, state: UiState, helpOpen: boolean, drawIcon?: (icon: string, x: number, y: number, size: number) => void): Hit[] {
  const hits: Hit[] = [];
  if (state.screen === 'playing') return hits;
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  scrim(ctx, W, H, state.screen === 'gameover' || state.screen === 'paused' || state.screen === 'revive');
  switch (state.screen) {
    case 'menu': drawMenu(ctx, W, H, state, hits); break;
    case 'chars': drawChars(ctx, W, H, state, hits); break;
    case 'maps': drawMaps(ctx, W, H, state, hits); break;
    case 'kits': drawKits(ctx, W, H, state, hits); break;
    case 'paused': drawPause(ctx, W, H, state, hits); break;
    case 'gameover': drawGameOver(ctx, W, H, state, hits, drawIcon); break;
    case 'revive': drawRevive(ctx, W, H, state, hits); break;
  }
  if (helpOpen) drawHelp(ctx, W, H, hits);
  ctx.restore();
  return hits;
}
