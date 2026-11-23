import { CHARACTERS, ENEMIES, LOADOUTS, RARITY_COLORS, fmtMoney, fmtTime, type CharacterId } from '../game/data';
import { RAID_MAPS, getRaidMap, type RaidMapId } from '../game/map';
import type { RaidResult } from '../game/game';
import type { SaveData } from '../game/storage';
import { COIN_AD_DAILY_LIMIT, COIN_AD_REWARD, isAdConfigured, AD_UNITS } from './config';

export type Screen = 'menu' | 'playing' | 'paused' | 'gameover' | 'revive';

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
  ctx.font = `${weight} ${size}px "PingFang SC","Microsoft YaHei",sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}

function button(ctx: CanvasRenderingContext2D, hits: Hit[], id: string, label: string, x: number, y: number, w: number, h: number, opts: { primary?: boolean; disabled?: boolean; color?: string; size?: number } = {}) {
  const c = opts.color ?? (opts.primary ? GOLD : '#ffffff');
  const bg = opts.primary ? 'rgba(255,210,63,0.14)' : 'rgba(255,255,255,0.06)';
  ctx.fillStyle = opts.disabled ? 'rgba(255,255,255,0.03)' : bg;
  ctx.strokeStyle = opts.disabled ? 'rgba(255,255,255,0.08)' : c;
  ctx.lineWidth = opts.primary ? 2 : 1;
  rr(ctx, x, y, w, h, 8);
  ctx.fill();
  ctx.stroke();
  text(ctx, label, x + w / 2, y + h / 2, opts.size ?? Math.min(15, h * 0.42), opts.disabled ? 'rgba(255,255,255,0.35)' : c, 'center');
  hits.push({ id, x, y, w, h, enabled: !opts.disabled });
}

function panel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = 'rgba(10,12,15,0.90)';
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  rr(ctx, x, y, w, h, 14);
  ctx.fill();
  ctx.stroke();
}

export function hitUi(hits: Hit[], x: number, y: number): string | null {
  for (let i = hits.length - 1; i >= 0; i--) {
    const h = hits[i];
    if (h.enabled && x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) return h.id;
  }
  return null;
}

function drawMenu(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const scale = Math.max(0.62, Math.min(1.05, Math.min(W, H) / 760));
  const pw = Math.min(W - 24 * scale, 660 * scale);
  const ph = Math.min(H - 20 * scale, 720 * scale);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);

  let y = py + 34 * scale;
  text(ctx, '鸭鸭鸭行动', px + pw / 2, y, 38 * scale, GOLD, 'center', '900');
  y += 28 * scale;
  text(ctx, '搜 · 打 · 撤  |  看广告复活 · 领金币', px + pw / 2, y, 12 * scale, 'rgba(255,255,255,0.6)', 'center');
  y += 26 * scale;

  const cw = (pw - 48 * scale) / 3;
  const rate = s.save.raids ? Math.round((s.save.extracts / s.save.raids) * 100) : 0;
  const stats: [string, string][] = [
    ['仓库', `¥${fmtMoney(s.save.stash)}`],
    ['出击/撤离', `${s.save.raids} · ${rate}%`],
    ['最高分', fmtMoney(s.save.scores[0]?.score ?? 0)],
  ];
  stats.forEach(([k, v], i) => {
    const x = px + 24 * scale + i * (cw + 0);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    rr(ctx, x, y, cw - 6 * scale, 44 * scale, 8); ctx.fill();
    text(ctx, k, x + 10 * scale, y + 14 * scale, 11 * scale, 'rgba(255,255,255,0.45)');
    text(ctx, v, x + 10 * scale, y + 31 * scale, 16 * scale, i === 0 ? GOLD : '#fff');
  });
  y += 58 * scale;

  text(ctx, '选择角色', px + 24 * scale, y, 12 * scale, GOLD);
  y += 16 * scale;
  CHARACTERS.forEach((c, i) => {
    const x = px + 24 * scale + i * cw;
    button(ctx, hits, `char:${c.id}`, `${c.name}·${c.role}`, x, y, cw - 6 * scale, 32 * scale, { primary: s.characterId === c.id, size: 12 * scale });
  });
  y += 44 * scale;

  text(ctx, '选择装备', px + 24 * scale, y, 12 * scale, GOLD);
  y += 16 * scale;
  LOADOUTS.forEach((l, i) => {
    const x = px + 24 * scale + i * cw;
    const locked = s.save.stash < l.cost;
    button(ctx, hits, `kit:${l.id}`, `${l.name}${l.cost ? ` ¥${fmtMoney(l.cost)}` : ' 免费'}`, x, y, cw - 6 * scale, 32 * scale, { primary: s.kit === l.id, disabled: locked, size: 11 * scale });
  });
  y += 44 * scale;

  text(ctx, '选择战区', px + 24 * scale, y, 12 * scale, GOLD);
  y += 16 * scale;
  RAID_MAPS.forEach((m, i) => {
    const x = px + 24 * scale + (i % 3) * cw;
    const yy = y + Math.floor(i / 3) * 36 * scale;
    const locked = m.requiredExtracts > s.save.extracts;
    const label = locked ? `${m.name}（需${m.requiredExtracts}撤）` : m.name;
    button(ctx, hits, `map:${m.id}`, label, x, yy, cw - 6 * scale, 32 * scale, { primary: s.mapId === m.id, disabled: locked, size: 10 * scale });
  });
  y += (Math.ceil(RAID_MAPS.length / 3) * 36 + 2) * scale;
  const m = getRaidMap(s.mapId);
  const bossNames = (m.bosses ?? [m.boss]).map((id) => ENEMIES[id].name).join(' + ');
  text(ctx, `${m.theme} · 首领 ${bossNames} · ${m.difficulty}`, px + 24 * scale, y, 10 * scale, 'rgba(255,255,255,0.55)');
  y += 26 * scale;

  const bw = pw - 48 * scale;
  button(ctx, hits, s.save.trainingCompleted ? 'deploy' : 'training', s.save.trainingCompleted ? '开始行动' : '新手行动（免费）', px + 24 * scale, y, bw, 46 * scale, { primary: true, size: 18 * scale });
  y += 54 * scale;
  button(ctx, hits, s.save.trainingCompleted ? 'training' : 'deploy', s.save.trainingCompleted ? '重玩新手行动' : '直接开始正式行动', px + 24 * scale, y, bw, 34 * scale, { size: 13 * scale });
  y += 44 * scale;

  const adOk = isAdConfigured(AD_UNITS.coins);
  const full = s.coinAdsToday >= COIN_AD_DAILY_LIMIT;
  button(ctx, hits, 'adcoin', adOk ? `看广告领金币 +¥${fmtMoney(COIN_AD_REWARD)}（今日 ${s.coinAdsToday}/${COIN_AD_DAILY_LIMIT}）` : '广告位待配置', px + 24 * scale, y, bw, 34 * scale, { disabled: !adOk || full, color: GREEN, size: 12 * scale });
  y += 42 * scale;

  button(ctx, hits, 'mute', s.muted ? '🔇 已静音' : '🔊 声音开', px + 24 * scale, y, (bw - 8 * scale) / 2, 30 * scale, { size: 12 * scale });
  button(ctx, hits, 'help', '🎮 操作说明', px + 32 * scale + (bw - 8 * scale) / 2, y, (bw - 8 * scale) / 2, 30 * scale, { size: 12 * scale });
  y += 36 * scale;
  text(ctx, '左半屏拖动移动 · 右半屏拖动瞄准自动开火 · 右下按钮翻滚/换弹/治疗', px + pw / 2, y, 10 * scale, 'rgba(255,255,255,0.42)', 'center', '400');
}

function drawPause(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const scale = Math.max(0.65, Math.min(1, Math.min(W, H) / 700));
  const pw = Math.min(W - 40, 360 * scale), ph = Math.min(H - 40, 380 * scale);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, '行动暂停', px + pw / 2, py + 34 * scale, 28 * scale, GOLD, 'center', '900');
  const rows: [string, string][] = [['剩余时间', fmtTime(s.stats.time)], ['背包价值', `¥${fmtMoney(s.stats.value)}`], ['击杀', `${s.stats.kills}`]];
  rows.forEach(([k, v], i) => {
    const y = py + 76 * scale + i * 34 * scale;
    text(ctx, k, px + 28 * scale, y, 13 * scale, 'rgba(255,255,255,0.5)');
    text(ctx, v, px + pw - 28 * scale, y, 15 * scale, '#fff', 'right');
  });
  let y = py + 190 * scale;
  const bw = pw - 56 * scale, bx = px + 28 * scale;
  button(ctx, hits, 'resume', '继续行动', bx, y, bw, 38 * scale, { primary: true, size: 15 * scale }); y += 46 * scale;
  button(ctx, hits, 'restart', '重新部署', bx, y, bw, 34 * scale, { size: 13 * scale }); y += 42 * scale;
  button(ctx, hits, 'quit', '放弃行动 · 返回大厅', bx, y, bw, 34 * scale, { color: RED, size: 13 * scale }); y += 42 * scale;
  button(ctx, hits, 'mute', s.muted ? '🔇 已静音' : '🔊 声音开', bx, y, bw, 30 * scale, { size: 12 * scale });
}

function drawGameOver(ctx: CanvasRenderingContext2D, W: number, H: number, s: UiState, hits: Hit[]) {
  const r = s.result;
  if (!r) return;
  const ok = r.outcome === 'extract';
  const scale = Math.max(0.62, Math.min(1, Math.min(W, H) / 720));
  const pw = Math.min(W - 28, 560 * scale), ph = Math.min(H - 24, 600 * scale);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, ok ? 'EXTRACTED' : r.outcome === 'dead' ? 'KILLED IN ACTION' : 'MISSING IN ACTION', px + pw / 2, py + 28 * scale, 11 * scale, ok ? GREEN : RED, 'center');
  text(ctx, ok ? '撤离成功' : r.outcome === 'dead' ? '行动失败 · 阵亡' : '行动失败 · 失踪', px + pw / 2, py + 58 * scale, 28 * scale, ok ? GREEN : RED, 'center', '900');
  text(ctx, `${getRaidMap(r.mapId).name} · 存活 ${fmtTime(r.time)} · 击杀 ${r.kills}`, px + pw / 2, py + 84 * scale, 12 * scale, 'rgba(255,255,255,0.6)', 'center');

  text(ctx, '本局得分', px + 24 * scale, py + 112 * scale, 12 * scale, 'rgba(255,255,255,0.5)');
  text(ctx, fmtMoney(r.score), px + pw - 24 * scale, py + 112 * scale, 26 * scale, '#fff', 'right', '900');
  const rows: [string, string][] = [
    ['带出物资', ok ? `¥${fmtMoney(r.value)}` : '¥0'],
    ['击杀奖励', `+${fmtMoney(ok ? r.killScore : Math.floor(r.killScore * 0.3))}`],
    ['仓库资产', `¥${fmtMoney(s.save.stash)}`],
  ];
  rows.forEach(([k, v], i) => {
    const y = py + 146 * scale + i * 26 * scale;
    text(ctx, k, px + 24 * scale, y, 12 * scale, 'rgba(255,255,255,0.5)');
    text(ctx, v, px + pw - 24 * scale, y, 14 * scale, i === 2 ? GREEN : '#fff', 'right');
  });

  let y = py + 236 * scale;
  text(ctx, `${ok ? '带出物资' : '丢失物资'} · ${r.items.length} 件`, px + 24 * scale, y, 12 * scale, GOLD);
  y += 18 * scale;
  r.items.slice(0, 8).forEach((it, i) => {
    const col = i % 4, rowI = Math.floor(i / 4);
    const x = px + 24 * scale + col * ((pw - 48 * scale) / 4);
    const yy = y + rowI * 40 * scale;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    rr(ctx, x, yy, (pw - 48 * scale) / 4 - 6 * scale, 34 * scale, 6); ctx.fill();
    text(ctx, it.name.slice(0, 6), x + 6 * scale, yy + 12 * scale, 10 * scale, RARITY_COLORS[it.rarity] ?? '#fff');
    text(ctx, `¥${fmtMoney(it.value)}`, x + 6 * scale, yy + 25 * scale, 10 * scale, GOLD);
  });
  y += 92 * scale;

  const bw = pw - 48 * scale, bx = px + 24 * scale;
  const adOk = isAdConfigured(AD_UNITS.coins);
  const full = s.coinAdsToday >= COIN_AD_DAILY_LIMIT;
  button(ctx, hits, 'adcoin', adOk ? `看广告领金币 +¥${fmtMoney(COIN_AD_REWARD)}（${s.coinAdsToday}/${COIN_AD_DAILY_LIMIT}）` : '广告位待配置', bx, y, bw, 34 * scale, { disabled: !adOk || full, color: GREEN, size: 12 * scale }); y += 42 * scale;
  button(ctx, hits, 'retry', '再次部署', bx, y, bw, 38 * scale, { primary: true, size: 15 * scale }); y += 46 * scale;
  button(ctx, hits, 'menu', '返回大厅', bx, y, bw, 34 * scale, { size: 13 * scale });
}

function drawRevive(ctx: CanvasRenderingContext2D, W: number, H: number, _s: UiState, hits: Hit[]) {
  const scale = Math.max(0.65, Math.min(1, Math.min(W, H) / 700));
  const pw = Math.min(W - 40, 380 * scale), ph = Math.min(H - 40, 250 * scale);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, '阵亡', px + pw / 2, py + 34 * scale, 28 * scale, RED, 'center', '900');
  text(ctx, '看一段广告即可原地复活，保留背包物资', px + pw / 2, py + 66 * scale, 12 * scale, 'rgba(255,255,255,0.7)', 'center');
  const bw = pw - 56 * scale, bx = px + 28 * scale;
  const adOk = isAdConfigured(AD_UNITS.revive);
  button(ctx, hits, 'revive', adOk ? '看广告复活（60% 生命）' : '广告位待配置', bx, py + 96 * scale, bw, 42 * scale, { primary: true, disabled: !adOk, size: 15 * scale });
  button(ctx, hits, 'skiprevive', '放弃 · 结算损失', bx, py + 152 * scale, bw, 34 * scale, { color: RED, size: 13 * scale });
}

function drawHelp(ctx: CanvasRenderingContext2D, W: number, H: number, hits: Hit[]) {
  const scale = Math.max(0.65, Math.min(1, Math.min(W, H) / 700));
  const pw = Math.min(W - 40, 420 * scale), ph = Math.min(H - 40, 360 * scale);
  const px = (W - pw) / 2, py = (H - ph) / 2;
  panel(ctx, px, py, pw, ph);
  text(ctx, '操作与规则', px + 24 * scale, py + 32 * scale, 22 * scale, GOLD);
  const lines = [
    '左半屏拖动：移动',
    '右半屏拖动：瞄准并自动开火（吸附+预判）',
    '右下按钮：翻滚 / 换弹 / 投掷 / 切雷 / 背包 / 治疗 / 切枪',
    '背包点枪/甲换装，点其他物品丢弃',
    '靠近容器点「搜索」搜刮物资',
    '进入绿色撤离区停留 6 秒撤离',
    '阵亡或超时：背包与装备全部丢失',
    '每局阵亡可看广告复活一次',
    '每日看广告领金币有次数上限',
  ];
  const lineGap = Math.min(30 * scale, (ph - 130 * scale) / lines.length);
  lines.forEach((l, i) => text(ctx, l, px + 24 * scale, py + 68 * scale + i * lineGap, 11.5 * scale, 'rgba(255,255,255,0.75)', 'left', '400'));
  button(ctx, hits, 'closehelp', '知道了', px + 24 * scale, py + ph - 52 * scale, pw - 48 * scale, 34 * scale, { primary: true, size: 13 * scale });
}

/** Draw the active UI overlay and return tappable regions. */
export function drawUi(ctx: CanvasRenderingContext2D, W: number, H: number, dpr: number, state: UiState, helpOpen: boolean): Hit[] {
  const hits: Hit[] = [];
  if (state.screen === 'playing') return hits;
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = 'rgba(0,0,0,0.62)';
  ctx.fillRect(0, 0, W, H);
  switch (state.screen) {
    case 'menu': drawMenu(ctx, W, H, state, hits); break;
    case 'paused': drawPause(ctx, W, H, state, hits); break;
    case 'gameover': drawGameOver(ctx, W, H, state, hits); break;
    case 'revive': drawRevive(ctx, W, H, state, hits); break;
  }
  if (helpOpen) drawHelp(ctx, W, H, hits);
  ctx.restore();
  return hits;
}
