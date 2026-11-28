// ---------- Core static data for 鸭鸭鸭行动 ----------

export type Rarity = 0 | 1 | 2 | 3 | 4 | 5;

export const RARITY_COLORS = ['#c9cdd3', '#5fd36a', '#4aa8ff', '#b56cff', '#ffb93b', '#ff4f4f'];
export const RARITY_RGB = ['201,205,211', '95,211,106', '74,168,255', '181,108,255', '255,185,59', '255,79,79'];
export const RARITY_NAMES = ['普通', '优秀', '精良', '史诗', '传说', '至臻'];
export const SEARCH_TIME = [0.32, 0.45, 0.65, 0.9, 1.25, 1.8];

export const RAID_TIME = 360; // seconds
export const EXTRACT_TIME = 6;
export const MAP_W = 3200;
export const MAP_H = 2400;

export type ItemKind = 'loot' | 'bandage' | 'medkit' | 'grenade' | 'armor' | 'weapon';

export interface ItemDef {
  id: string;
  name: string;
  icon: string;
  rarity: Rarity;
  value: number;
  kind: ItemKind;
  armor?: number;
  weapon?: string;
  throwable?: ThrowableId;
}

const L = (id: string, name: string, icon: string, rarity: Rarity, value: number): ItemDef => ({
  id, name, icon, rarity, value, kind: 'loot',
});

export const LOOT: ItemDef[] = [
  L('crumb', '面包屑', '🍞', 0, 800),
  L('news', '旧报纸', '📰', 0, 1100),
  L('corn', '玉米棒', '🌽', 0, 900),
  L('bolt', '螺丝钉', '🔩', 0, 1400),
  L('tissue', '卷纸', '🧻', 0, 1000),
  L('sock', '旧袜子', '🧦', 0, 600),
  L('can', '午餐肉罐头', '🥫', 1, 3200),
  L('battery', '电池', '🔋', 1, 4200),
  L('torch', '手电筒', '🔦', 1, 3800),
  L('wrench', '扳手', '🔧', 1, 4800),
  L('coffee', '速溶咖啡', '☕', 1, 2900),
  L('magnet', '强力磁铁', '🧲', 1, 3500),
  L('radio', '军用对讲机', '📻', 2, 12500),
  L('hdd', '机械硬盘', '💽', 2, 14800),
  L('watch', '机械表', '⌚', 2, 16500),
  L('scope', '望远镜', '🔭', 2, 13200),
  L('pad', '游戏手柄', '🎮', 2, 11000),
  L('chem', '化学试剂', '🧪', 2, 15500),
  L('tablet', '军用平板', '📱', 3, 36000),
  L('drone', '侦察无人机', '🚁', 3, 48000),
  L('camera', '古董相机', '📷', 3, 32000),
  L('chip', '加密芯片', '💾', 3, 42000),
  L('micro', '显微镜', '🔬', 3, 38000),
  L('vase', '古董花瓶', '🏺', 4, 118000),
  L('gold', '一袋金币', '💰', 4, 135000),
  L('laptop', '军用笔记本', '💻', 4, 108000),
  L('crown', '鸭王王冠', '👑', 4, 168000),
  L('statue', '神秘石像', '🗿', 4, 125000),
  L('heart', '鸭之心', '💎', 5, 980000),
  L('tear', '池塘之泪', '🔮', 5, 720000),
  L('brain', '量子鸭脑', '🧠', 5, 650000),
  L('trophy', '黄金奖杯', '🏆', 5, 540000),
  L('rocket', '火箭模型', '🚀', 5, 480000),
  // 空军基地专属战利品
  L('rivet', '航空铆钉', '🔩', 0, 1200),
  L('pilot_badge', '飞行员徽章', '🎖️', 2, 14000),
  L('flight_log', '飞行记录仪', '📔', 3, 38000),
  L('jet_part', '引擎部件', '⚙️', 4, 130000),
  L('ace_helmet', '王牌头盔', '🪖', 5, 520000),
];

export const LOOT_BY_RARITY: ItemDef[][] = [0, 1, 2, 3, 4, 5].map((r) => LOOT.filter((i) => i.rarity === r));

/** Special everyday items sold by the searchable vending machines. */
export const VENDING_LOOT: ItemDef[] = [
  L('duck_soda', '鸭力汽水', '🥤', 1, 2600),
  L('orange_soda', '柑橘汽水', '🧃', 1, 2400),
  L('water_bottle', '瓶装水', '💧', 0, 1200),
  L('chips', '盐味薯片', '🍟', 0, 900),
  L('coffee_can', '罐装咖啡', '☕', 1, 3200),
  L('battery_pack', '备用电池组', '🔋', 1, 4200),
];

export type ThrowableId = 'grenade' | 'smoke' | 'flash' | 'fire';

export const ITEM_BANDAGE: ItemDef = { id: 'bandage', name: '绷带', icon: '🩹', rarity: 0, value: 1500, kind: 'bandage' };
export const ITEM_MEDKIT: ItemDef = { id: 'medkit', name: '急救针', icon: '💉', rarity: 2, value: 9000, kind: 'medkit' };
export const ITEM_GRENADE: ItemDef = { id: 'grenade', name: '破片手雷', icon: '💣', rarity: 1, value: 4000, kind: 'grenade', throwable: 'grenade' };
export const ITEM_SMOKE: ItemDef = { id: 'smoke', name: '烟雾弹', icon: '🌫️', rarity: 1, value: 6000, kind: 'grenade', throwable: 'smoke' };
export const ITEM_FLASH: ItemDef = { id: 'flash', name: '闪光弹', icon: '✨', rarity: 2, value: 7500, kind: 'grenade', throwable: 'flash' };
export const ITEM_FIRE: ItemDef = { id: 'fire', name: '燃烧瓶', icon: '🔥', rarity: 2, value: 8500, kind: 'grenade', throwable: 'fire' };

export const THROWABLE_IDS: ThrowableId[] = ['grenade', 'smoke', 'flash', 'fire'];
export const THROWABLE_ITEMS: ItemDef[] = [ITEM_GRENADE, ITEM_SMOKE, ITEM_FLASH, ITEM_FIRE];

export interface ThrowableDef {
  id: ThrowableId; name: string; icon: string; color: string;
  radius: number; fuse: number; value: number; damage: number; desc: string;
}

/** Shared tuning for both the thrown projectile and the warehouse loadout UI. */
export const THROWABLES: Record<ThrowableId, ThrowableDef> = {
  grenade: { id: 'grenade', name: '破片手雷', icon: '💣', color: '#ff8a3c', radius: 150, fuse: 1.3, value: 4000, damage: 135, desc: '范围爆发伤害，可引爆油桶' },
  smoke: { id: 'smoke', name: '烟雾弹', icon: '🌫️', color: '#b9c6cc', radius: 190, fuse: 1.1, value: 6000, damage: 0, desc: '烟雾持续 9 秒，阻断敌人视线' },
  flash: { id: 'flash', name: '闪光弹', icon: '✨', color: '#fff3b0', radius: 260, fuse: 1.0, value: 7500, damage: 0, desc: '范围内敌人目眩 2.6 秒，停止射击' },
  fire: { id: 'fire', name: '燃烧瓶', icon: '🔥', color: '#ff5a2a', radius: 135, fuse: 1.2, value: 8500, damage: 18, desc: '地面燃烧 6 秒，持续灼烧范围内目标' },
};
/** Six armour tiers. Values are the raw rating before character scaling and mods. */
export const ARMORS: ItemDef[] = [
  { id: 'armor1', name: '一级护甲', icon: 'gear:armor1', rarity: 0, value: 4000, kind: 'armor', armor: 25 },
  { id: 'armor2', name: '二级护甲', icon: 'gear:armor2', rarity: 1, value: 12000, kind: 'armor', armor: 60 },
  { id: 'armor3', name: '三级护甲', icon: 'gear:armor3', rarity: 2, value: 26000, kind: 'armor', armor: 90 },
  { id: 'armor4', name: '四级护甲', icon: 'gear:armor4', rarity: 3, value: 45000, kind: 'armor', armor: 120 },
  { id: 'armor5', name: '五级护甲', icon: 'gear:armor5', rarity: 3, value: 78000, kind: 'armor', armor: 150 },
  { id: 'armor6', name: '六级护甲', icon: 'gear:armor6', rarity: 4, value: 120000, kind: 'armor', armor: 180 },
];

export function armorById(id: string): ItemDef | undefined {
  return ARMORS.find((armor) => armor.id === id);
}

/** The three-cell armour atlas is reused across six tiers (light / medium / heavy art). */
export const ARMOR_ART_CELL: Record<string, number> = {
  armor1: 0, armor2: 0, armor3: 1, armor4: 1, armor5: 2, armor6: 2,
};

export interface WeaponDef {
  id: string;
  name: string;
  short: string;
  tier: number;
  dmg: number;
  rate: number;
  mag: number;
  reload: number;
  spread: number;
  pellets: number;
  speed: number;
  range: number;
  shake: number;
  kick: number;
  noise: number;
  sound: string;
  value: number;
  len: number;
  color: string;
  pierce: number;
  rarity: Rarity;
  /** Rocket-style splash applied on impact; scaled by damage mods. */
  blast?: { radius: number; dmg: number };
  /** Fraction of armour ignored on every hit (signature trait of the iron breaker). */
  antiArmor?: number;
  /** Per-trigger chance to jam and skip a shot (trade-off of the overload bolt). */
  jamChance?: number;
  /** Active mod-combo id resolved at tuning time (e.g. 'barrage'). */
  combo?: string;
}

export const WEAPONS: Record<string, WeaponDef> = {
  pistol: { id: 'pistol', name: 'M9 鸭牌手枪', short: 'M9', tier: 0, dmg: 26, rate: 4.6, mag: 12, reload: 1.0, spread: 0.035, pellets: 1, speed: 1350, range: 720, shake: 0.1, kick: 3, noise: 520, sound: 'pistol', value: 3000, len: 12, color: '#2b2b2e', pierce: 0, rarity: 0 },
  smg: { id: 'smg', name: 'MP5 冲锋枪', short: 'MP5', tier: 1, dmg: 17, rate: 11, mag: 30, reload: 1.5, spread: 0.075, pellets: 1, speed: 1400, range: 680, shake: 0.085, kick: 2.5, noise: 600, sound: 'smg', value: 18000, len: 18, color: '#303338', pierce: 0, rarity: 1 },
  shotgun: { id: 'shotgun', name: 'M870 霰弹枪', short: 'M870', tier: 2, dmg: 19, rate: 1.7, mag: 8, reload: 1.9, spread: 0.26, pellets: 9, speed: 1150, range: 450, shake: 0.34, kick: 9, noise: 750, sound: 'shotgun', value: 32000, len: 24, color: '#5a3d26', pierce: 0, rarity: 2 },
  rifle: { id: 'rifle', name: 'M4A1 突击步枪', short: 'M4A1', tier: 3, dmg: 28, rate: 8.5, mag: 30, reload: 1.9, spread: 0.04, pellets: 1, speed: 1650, range: 950, shake: 0.13, kick: 3.5, noise: 800, sound: 'rifle', value: 42000, len: 25, color: '#3a3f36', pierce: 0, rarity: 2 },
  sniper: { id: 'sniper', name: 'AWM 狙击步枪', short: 'AWM', tier: 4, dmg: 185, rate: 1.15, mag: 6, reload: 2.3, spread: 0.004, pellets: 1, speed: 2800, range: 1500, shake: 0.45, kick: 12, noise: 1100, sound: 'sniper', value: 88000, len: 33, color: '#4a5a3a', pierce: 2, rarity: 3 },
  lmg: { id: 'lmg', name: 'M249 轻机枪', short: 'M249', tier: 4, dmg: 24, rate: 12, mag: 80, reload: 3.4, spread: 0.085, pellets: 1, speed: 1550, range: 900, shake: 0.15, kick: 3.5, noise: 900, sound: 'lmg', value: 76000, len: 29, color: '#2f3230', pierce: 0, rarity: 3 },
  // --- extra weapons: finer tiers plus three legendaries ---
  mp9: { id: 'mp9', name: 'MP9 冲锋枪', short: 'MP9', tier: 1, dmg: 20, rate: 13, mag: 26, reload: 1.35, spread: 0.065, pellets: 1, speed: 1450, range: 640, shake: 0.08, kick: 2.2, noise: 580, sound: 'smg', value: 21000, len: 17, color: '#33373d', pierce: 0, rarity: 1 },
  ak: { id: 'ak', name: 'AK47 突击步枪', short: 'AK47', tier: 3, dmg: 36, rate: 7.2, mag: 30, reload: 2.0, spread: 0.05, pellets: 1, speed: 1700, range: 980, shake: 0.16, kick: 5, noise: 850, sound: 'rifle', value: 52000, len: 27, color: '#4a3324', pierce: 1, rarity: 2 },
  dmr: { id: 'dmr', name: 'SVD 精确射手步枪', short: 'SVD', tier: 4, dmg: 75, rate: 3.1, mag: 15, reload: 2.0, spread: 0.012, pellets: 1, speed: 2300, range: 1250, shake: 0.22, kick: 7, noise: 1000, sound: 'sniper', value: 84000, len: 31, color: '#3c4631', pierce: 1, rarity: 3 },
  // Legendary (rarity 5, tier 5)
  m4legend: { id: 'm4legend', name: '渐变之影 M4A1', short: 'M4·影', tier: 5, dmg: 42, rate: 9.2, mag: 35, reload: 1.7, spread: 0.028, pellets: 1, speed: 1750, range: 1050, shake: 0.12, kick: 3, noise: 810, sound: 'rifle', value: 560000, len: 26, color: '#8e5bd6', pierce: 2, rarity: 5 },
  awmlegend: { id: 'awmlegend', name: '龙纹 AWM', short: 'AWM·龙', tier: 5, dmg: 190, rate: 1.0, mag: 6, reload: 2.4, spread: 0.002, pellets: 1, speed: 3000, range: 1600, shake: 0.42, kick: 11, noise: 1150, sound: 'sniper', value: 880000, len: 34, color: '#c0392b', pierce: 3, rarity: 5 },
  minigun: { id: 'minigun', name: 'M134 火神炮', short: 'M134', tier: 5, dmg: 30, rate: 16, mag: 150, reload: 4.2, spread: 0.1, pellets: 1, speed: 1600, range: 950, shake: 0.18, kick: 3, noise: 1100, sound: 'lmg', value: 720000, len: 36, color: '#6b4a1e', pierce: 1, rarity: 5 },
  rpg: { id: 'rpg', name: 'RPG 火箭筒', short: 'RPG', tier: 5, dmg: 110, rate: 0.9, mag: 3, reload: 2.5, spread: 0.008, pellets: 1, speed: 820, range: 1100, shake: 0.5, kick: 11, noise: 1300, sound: 'explosion', value: 1400000, len: 40, color: '#4d5238', pierce: 0, rarity: 5, blast: { radius: 260, dmg: 340 } },
  frostmp9: { id: 'frostmp9', name: '冰风 MP9', short: '冰MP9', tier: 5, dmg: 22, rate: 13, mag: 32, reload: 1.4, spread: 0.045, pellets: 1, speed: 1500, range: 700, shake: 0.08, kick: 2, noise: 560, sound: 'smg', value: 980000, len: 18, color: '#7fd8ef', pierce: 0, rarity: 5 },
  // Guaranteed drop from the iron warden: heavy, armour-shredding belt-fed gun.
  ironbreaker: { id: 'ironbreaker', name: '玄铁破壁者', short: '破壁者', tier: 5, dmg: 48, rate: 8.5, mag: 90, reload: 2.6, spread: 0.055, pellets: 1, speed: 1700, range: 1050, shake: 0.15, kick: 4, noise: 950, sound: 'lmg', value: 1400000, len: 30, color: '#8f1d1d', pierce: 3, rarity: 5, antiArmor: 0.5 },
  // --- boss-exclusive tier-5 fillers: high-damage shotgun, high-ROF assault, heavy sniper ---
  // Keep the boss-grade shotgun dominant up close without eclipsing the other legendary guns.
  aa12: { id: 'aa12', name: 'AA12 雷霆霰弹', short: 'AA12', tier: 5, dmg: 17, rate: 2.4, mag: 12, reload: 2.4, spread: 0.2, pellets: 9, speed: 1200, range: 500, shake: 0.36, kick: 10, noise: 950, sound: 'shotgun', value: 1600000, len: 30, color: '#2d5a52', pierce: 0, rarity: 5 },
  hk416: { id: 'hk416', name: 'HK416 疾风突击', short: 'HK416', tier: 5, dmg: 29, rate: 12.5, mag: 45, reload: 1.8, spread: 0.03, pellets: 1, speed: 1750, range: 1050, shake: 0.13, kick: 3, noise: 860, sound: 'rifle', value: 1800000, len: 28, color: '#2f3d4a', pierce: 1, rarity: 5 },
  barrett: { id: 'barrett', name: '巴雷特 M82 重狙', short: 'M82', tier: 5, dmg: 340, rate: 0.65, mag: 5, reload: 2.8, spread: 0.001, pellets: 1, speed: 3200, range: 1900, shake: 0.6, kick: 16, noise: 1400, sound: 'sniper', value: 2200000, len: 42, color: '#5a5f45', pierce: 4, rarity: 5 },
  m1911: { id: 'm1911', name: 'M1911 铁脊手枪', short: 'M1911', tier: 0, dmg: 33, rate: 3.9, mag: 8, reload: 1.15, spread: 0.037, pellets: 1, speed: 1320, range: 700, shake: 0.12, kick: 3.8, noise: 565, sound: 'pistol', value: 6500, len: 13, color: '#5e6262', pierce: 0, rarity: 0 },
  revolver: { id: 'revolver', name: '响尾蛇左轮', short: '响尾蛇', tier: 1, dmg: 49, rate: 2.8, mag: 6, reload: 1.7, spread: 0.03, pellets: 1, speed: 1430, range: 760, shake: 0.16, kick: 5.2, noise: 640, sound: 'pistol', value: 9500, len: 15, color: '#706557', pierce: 0, rarity: 1 },
  s12k: { id: 's12k', name: 'S12K 战术霰弹', short: 'S12K', tier: 3, dmg: 17, rate: 2.3, mag: 9, reload: 2.0, spread: 0.225, pellets: 8, speed: 1190, range: 482, shake: 0.32, kick: 8.2, noise: 795, sound: 'shotgun', value: 49000, len: 26, color: '#56604d', pierce: 0, rarity: 2 },
  mini14: { id: 'mini14', name: 'Mini14 白桦精确步枪', short: 'Mini14', tier: 3, dmg: 52, rate: 3.8, mag: 18, reload: 1.75, spread: 0.023, pellets: 1, speed: 1950, range: 1100, shake: 0.17, kick: 5.8, noise: 845, sound: 'sniper', value: 57000, len: 27, color: '#71674c', pierce: 1, rarity: 2 },
  sr25: { id: 'sr25', name: 'SR25 灰隼精确步枪', short: 'SR25', tier: 4, dmg: 81, rate: 3.0, mag: 16, reload: 2.1, spread: 0.011, pellets: 1, speed: 2410, range: 1320, shake: 0.23, kick: 7.8, noise: 960, sound: 'sniper', value: 96000, len: 32, color: '#505a63', pierce: 1, rarity: 3 },
  m79: { id: 'm79', name: 'M79 短管榴弹', short: 'M79', tier: 3, dmg: 30, rate: 1.0, mag: 1, reload: 2.25, spread: 0.026, pellets: 1, speed: 730, range: 740, shake: 0.24, kick: 6, noise: 845, sound: 'explosion', value: 73000, len: 22, color: '#65503a', pierce: 0, rarity: 3, blast: { radius: 105, dmg: 112 } },
  m32: { id: 'm32', name: 'M32 转轮榴弹', short: 'M32', tier: 4, dmg: 38, rate: 1.35, mag: 4, reload: 3.4, spread: 0.035, pellets: 1, speed: 785, range: 830, shake: 0.28, kick: 7.5, noise: 930, sound: 'explosion', value: 119000, len: 28, color: '#5c654e', pierce: 0, rarity: 4, blast: { radius: 125, dmg: 108 } },
};

/** Short category label used by warehouse filters and mod eligibility. */
export function weaponCategory(id: string): string {
  const w = WEAPONS[id];
  if (!w) return '其他';
  if (w.blast) return '发射器';
  if (w.sound === 'pistol') return '手枪';
  if (w.pellets > 1) return '霰弹枪';
  if (id === 'dmr' || id === 'mini14' || id === 'sr25') return '精确射手';
  if (w.sound === 'sniper') return '狙击枪';
  if (w.sound === 'lmg') return '机枪';
  if (w.sound === 'smg') return '冲锋枪';
  return '突击步枪';
}

/** One-line signature trait shown next to the gun in the armory. */
export function weaponTrait(id: string): string {
  const w = WEAPONS[id];
  if (!w) return '';
  if (w.blast) return `爆炸 ${w.blast.dmg} · 半径 ${w.blast.radius}`;
  if (w.antiArmor) return `无视 ${Math.round(w.antiArmor * 100)}% 护甲`;
  if (CHILL_WEAPONS.has(id)) return '命中冰缓';
  if (w.pellets > 1) return `${w.pellets} 弹丸 · 收束改造专属`;
  if (w.pierce) return `穿透 ${w.pierce}`;
  return '通用枪械';
}

/** Weapons whose bullets slow enemies on hit. */
export const CHILL_WEAPONS = new Set(['frostmp9']);
/** Weapons whose bullets explode on impact. */
export const EXPLOSIVE_WEAPONS = new Set(Object.values(WEAPONS).filter((weapon) => weapon.blast).map((weapon) => weapon.id));

/**
 * Innate family perks that exist outside the mod system, so each gun class
 * feels different before the player ever tunes it.
 * - shotgun: bonus damage at point-blank, falloff past mid range
 * - sniper: higher crit multiplier on the built-in 10% crit roll
 * - mg: hits slow the target (suppression)
 */
export type WeaponPassive = 'shotgun' | 'sniper' | 'mg' | null;

export function weaponPassive(id: string): WeaponPassive {
  const category = weaponCategory(id);
  if (category === '霰弹枪') return 'shotgun';
  if (category === '狙击枪') return 'sniper';
  if (category === '机枪') return 'mg';
  return null;
}

/** Damage multipliers for the shotgun's range-based passive. */
export const SHOTGUN_CLOSE_RANGE = 260;
export const SHOTGUN_CLOSE_BONUS = 1.35;
export const SHOTGUN_FAR_RANGE = 430;
export const SHOTGUN_FAR_FALLOFF = 0.8;
/** Crit multiplier for sniper-class guns (normal guns use 1.8). */
export const SNIPER_CRIT_MULT = 2.6;

/** Short label for the innate family perk, shown in the armory next to the weapon trait. */
export function weaponPassiveLabel(id: string): string {
  const p = weaponPassive(id);
  if (p === 'shotgun') return `近距 +${Math.round((SHOTGUN_CLOSE_BONUS - 1) * 100)}%`;
  if (p === 'sniper') return `暴击 ×${SNIPER_CRIT_MULT}`;
  if (p === 'mg') return '命中压制';
  return '';
}

export function weaponItem(id: string): ItemDef {
  const w = WEAPONS[id];
  return { id: 'w_' + id, name: w.name, icon: `gear:w_${id}`, rarity: w.rarity, value: w.value, kind: 'weapon', weapon: id };
}

export type EnemyType = 'chicken' | 'bandit' | 'elite' | 'armored' | 'lookout' | 'shield' | 'hen' | 'goose' | 'harborBoss' | 'foundryBoss'
  | 'broodQueen' | 'frostMarshal' | 'ironGuard' | 'duckKing' | 'flameAce' | 'radarWarden';

export type BossSkillKind = 'charge' | 'pulse' | 'slam' | 'summon'
  | 'strafe' | 'napalm' | 'scan' | 'icewall' | 'mines';

export interface BossPhase {
  windup: number;
  cooldown: number;
  damage: number;
  range: number;
}

export interface BossEncounter {
  skill: BossSkillKind;
  /** Bosses with several attacks cycle through these instead of a single skill. */
  skillCycle?: BossSkillKind[];
  /** HUD label override for the signature skill. */
  skillName?: string;
  /** Current attack name shown in the boss HUD for each skill-cycle entry. */
  skillLabels?: Partial<Record<BossSkillKind, string>>;
  /** Text shown on cast; defaults to a per-skill message. */
  hitText?: string;
  /** Telegraph / ring tint as a CSS colour. */
  ringColor?: string;
  /** Minions hatched by the 'summon' skill: [phase 1 count, phase 2 count]. */
  summon?: { types: EnemyType[]; counts: [number, number] };
  warning: string;
  phaseWarning: string;
  phaseAt: number;
  phases: [BossPhase, BossPhase];
  trophy: ItemDef;
  extraLootWeights: number[];
  /** Guaranteed high-tier reward rolls, in addition to the trophy and base bonus. */
  rewardRolls?: { count: number; weights: number[] }[];
  /** Signature guns awarded when this boss is defeated. */
  weaponDrops?: string[];
}

export interface EnemyDef {
  id: EnemyType;
  name: string;
  hp: number;
  armor: number;
  r: number;
  speed: number;
  vision: number;
  reaction: number;
  accuracy: number;
  score: number;
  weapons: string[];
  dmgMul: number;
  bulletSpeed: number;
  prefMin: number;
  prefMax: number;
  burst: [number, number];
  melee: number;
  boss: boolean;
  /** Front-only armour: bullets hitting the facing side are absorbed, the back is soft. */
  frontArmor?: boolean;
  /** Throws egg grenades at the player on a timer. */
  thrower?: boolean;
  encounter?: BossEncounter;
}

export const ENEMIES: Record<EnemyType, EnemyDef> = {
  chicken: { id: 'chicken', name: '暴走鸡', hp: 26, armor: 0, r: 11, speed: 250, vision: 430, reaction: 0.12, accuracy: 0, score: 200, weapons: [], dmgMul: 0, bulletSpeed: 0, prefMin: 0, prefMax: 0, burst: [0, 0], melee: 6, boss: false },
  bandit: { id: 'bandit', name: '鸭匪', hp: 70, armor: 0, r: 15, speed: 150, vision: 480, reaction: 0.75, accuracy: 0.17, score: 600, weapons: ['pistol', 'smg', 'smg', 'shotgun'], dmgMul: 0.24, bulletSpeed: 680, prefMin: 190, prefMax: 370, burst: [3, 5], melee: 0, boss: false },
  elite: { id: 'elite', name: '精英鸭匪', hp: 100, armor: 50, r: 16, speed: 165, vision: 520, reaction: 0.5, accuracy: 0.12, score: 1500, weapons: ['rifle', 'smg', 'shotgun', 'rifle'], dmgMul: 0.26, bulletSpeed: 760, prefMin: 220, prefMax: 420, burst: [4, 7], melee: 0, boss: false },
  armored: { id: 'armored', name: '护甲鸭', hp: 85, armor: 80, r: 17, speed: 122, vision: 475, reaction: 0.72, accuracy: 0.19, score: 1300, weapons: ['shotgun'], dmgMul: 0.23, bulletSpeed: 630, prefMin: 90, prefMax: 200, burst: [1, 1], melee: 0, boss: false },
  lookout: { id: 'lookout', name: '哨戒鸭', hp: 60, armor: 0, r: 14, speed: 175, vision: 600, reaction: 0.68, accuracy: 0.16, score: 1000, weapons: ['rifle'], dmgMul: 0.2, bulletSpeed: 820, prefMin: 370, prefMax: 570, burst: [2, 3], melee: 0, boss: false },
  shield: { id: 'shield', name: '盾卫鸭', hp: 115, armor: 200, r: 18, speed: 92, vision: 480, reaction: 0.7, accuracy: 0.18, score: 2400, weapons: ['smg'], dmgMul: 0.22, bulletSpeed: 700, prefMin: 110, prefMax: 240, burst: [3, 5], melee: 0, boss: false, frontArmor: true },
  hen: { id: 'hen', name: '投弹母鸡', hp: 70, armor: 0, r: 15, speed: 130, vision: 560, reaction: 0.6, accuracy: 0, score: 2100, weapons: [], dmgMul: 0, bulletSpeed: 0, prefMin: 240, prefMax: 420, burst: [0, 0], melee: 5, boss: false, thrower: true },
  goose: {
    id: 'goose', name: '鹅老大', hp: 800, armor: 120, r: 26, speed: 130, vision: 650, reaction: 0.4,
    accuracy: 0.15, score: 15000, weapons: ['lmg'], dmgMul: 0.2, bulletSpeed: 700,
    prefMin: 150, prefMax: 380, burst: [10, 16], melee: 0, boss: true,
    encounter: {
      skill: 'slam', warning: '震地波无视掩体并击退，翻滚可躲；它会呼叫附近同伴围攻',
      phaseWarning: '震地更频繁、范围更大，呼叫的鸭匪更多', phaseAt: 0.5,
      phases: [
        { windup: 1.25, cooldown: 8, damage: 12, range: 300 },
        { windup: 1.0, cooldown: 5.5, damage: 17, range: 400 },
      ],
      trophy: L('goose_crest', '鹅老大羽冠', '🪶', 4, 120000),
      extraLootWeights: [0, 0, 0, 1, 0, 0],
      weaponDrops: ['aa12'],
    },
  },
  harborBoss: {
    id: 'harborBoss', name: '铁钩船长', hp: 640, armor: 75, r: 24, speed: 140, vision: 620, reaction: 0.5,
    accuracy: 0.22, score: 11000, weapons: ['shotgun'], dmgMul: 0.22, bulletSpeed: 620,
    prefMin: 90, prefMax: 240, burst: [1, 1], melee: 0, boss: true,
    encounter: {
      skill: 'charge', warning: '看到红色冲撞路线后横向闪避，引它撞上货柜',
      phaseWarning: '冲撞预警缩短，冲得更远', phaseAt: 0.5,
      phases: [
        { windup: 1.15, cooldown: 9, damage: 17, range: 360 },
        { windup: 0.85, cooldown: 6.5, damage: 24, range: 470 },
      ],
      trophy: L('captain_log', '船长航海日志', '📕', 4, 96000),
      extraLootWeights: [0, 0, 0, 1, 0, 0],
      weaponDrops: ['hk416'],
    },
  },
  foundryBoss: {
    id: 'foundryBoss', name: '炉心监工', hp: 1000, armor: 180, r: 27, speed: 112, vision: 690, reaction: 0.42,
    accuracy: 0.16, score: 22000, weapons: ['rifle'], dmgMul: 0.26, bulletSpeed: 760,
    prefMin: 180, prefMax: 300, burst: [5, 8], melee: 0, boss: true,
    encounter: {
      skill: 'pulse', warning: '橙圈内会受到热浪冲击，退圈或躲到实墙后',
      phaseWarning: '热浪范围扩大，间隔缩短', phaseAt: 0.45,
      phases: [
        { windup: 1.3, cooldown: 9.5, damage: 18, range: 250 },
        { windup: 1.1, cooldown: 6.5, damage: 25, range: 340 },
      ],
      trophy: L('furnace_core', '封存炉芯', '🧿', 5, 260000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
      weaponDrops: ['barrett'],
    },
  },
  // --- 追加战区首领：难度按 孵化场 → 哨站双首领 → 王陵 递增 ---
  broodQueen: {
    id: 'broodQueen', name: '孵巢鸭后', hp: 1500, armor: 150, r: 30, speed: 100, vision: 720, reaction: 0.36,
    accuracy: 0.16, score: 32000, weapons: ['smg'], dmgMul: 0.24, bulletSpeed: 700,
    prefMin: 180, prefMax: 360, burst: [5, 8], melee: 0, boss: true,
    encounter: {
      skill: 'summon', skillName: '孵巢潮', skillLabels: { summon: '孵巢爆发' }, hitText: '鸭后孵巢翻涌！', ringColor: 'rgba(180,255,140,0.95)',
      summon: { types: ['chicken', 'hen', 'bandit'], counts: [4, 6] },
      warning: '它会持续孵出小鸡与投弹母鸡，清掉巢边杂兵再输出首领',
      phaseWarning: '孵化速度翻倍，每波数量增加，还会带出精英鸭匪', phaseAt: 0.5,
      phases: [
        { windup: 1.4, cooldown: 10, damage: 0, range: 620 },
        { windup: 1.1, cooldown: 6.5, damage: 0, range: 760 },
      ],
      trophy: L('queen_egg', '鸭后金蛋', '🥚', 5, 620000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
      rewardRolls: [
        { count: 1, weights: [0, 0, 0, 0, 0, 1] },
        { count: 2, weights: [0, 0, 0, 0, 52, 48] },
        { count: 1, weights: [0, 0, 18, 32, 36, 14] },
      ],
      weaponDrops: ['frostmp9'],
    },
  },
  frostMarshal: {
    id: 'frostMarshal', name: '霜羽元帅', hp: 1300, armor: 160, r: 28, speed: 140, vision: 720, reaction: 0.35,
    accuracy: 0.14, score: 30000, weapons: ['frostmp9'], dmgMul: 0.26, bulletSpeed: 800,
    prefMin: 260, prefMax: 460, burst: [6, 10], melee: 0, boss: true,
    encounter: {
      skill: 'pulse', skillName: '极夜寒潮', skillLabels: { pulse: '霜环爆发' }, hitText: '霜羽释放寒潮！', ringColor: 'rgba(105,215,255,0.98)',
      warning: '冰蓝圈内会被寒潮击退，且它的子弹会减速；霜羽元帅与铁壁统领同场',
      phaseWarning: '寒潮范围扩大、预警缩短', phaseAt: 0.45,
      phases: [
        { windup: 1.2, cooldown: 8.5, damage: 20, range: 300 },
        { windup: 0.95, cooldown: 6, damage: 27, range: 390 },
      ],
      trophy: L('frost_insignia', '霜羽元帅徽记', '❄️', 5, 580000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
      rewardRolls: [
        { count: 1, weights: [0, 0, 0, 0, 0, 1] },
        { count: 2, weights: [0, 0, 0, 0, 55, 45] },
        { count: 1, weights: [0, 0, 12, 28, 42, 18] },
      ],
      weaponDrops: ['frostmp9'],
    },
  },
  ironGuard: {
    id: 'ironGuard', name: '铁壁统领', hp: 1900, armor: 280, r: 31, speed: 88, vision: 620, reaction: 0.45,
    accuracy: 0.2, score: 34000, weapons: ['lmg'], dmgMul: 0.26, bulletSpeed: 720,
    prefMin: 120, prefMax: 280, burst: [8, 12], melee: 0, boss: true, frontArmor: true,
    encounter: {
      skill: 'charge', skillName: '钢铁破阵', skillLabels: { charge: '铁壁冲锋' }, ringColor: 'rgba(255,92,72,0.98)',
      warning: '黑红重甲正面免疫大半伤害，绕后或将它的护甲打穿；击杀必掉传说武器「玄铁破壁者」',
      phaseWarning: '冲撞更频繁、距离更远', phaseAt: 0.5,
      phases: [
        { windup: 1.3, cooldown: 8, damage: 22, range: 380 },
        { windup: 1.0, cooldown: 6, damage: 30, range: 480 },
      ],
      trophy: L('iron_badge', '铁壁统领勋章', '🛡️', 5, 540000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
      rewardRolls: [
        { count: 1, weights: [0, 0, 0, 0, 0, 1] },
        { count: 2, weights: [0, 0, 0, 0, 58, 42] },
        { count: 1, weights: [0, 0, 14, 32, 38, 16] },
      ],
      weaponDrops: ['ironbreaker'],
    },
  },
  // --- 冰火空军基地双首领：与霜锋哨站同为噩梦级，但攻击范围更大、节奏更快 ---
  flameAce: {
    id: 'flameAce', name: '烈焰王牌', hp: 1400, armor: 150, r: 28, speed: 150, vision: 740, reaction: 0.32,
    accuracy: 0.15, score: 32000, weapons: ['smg'], dmgMul: 0.26, bulletSpeed: 820,
    prefMin: 260, prefMax: 480, burst: [6, 9], melee: 0, boss: true,
    encounter: {
      skill: 'strafe', skillCycle: ['strafe', 'napalm', 'strafe', 'charge'], skillName: '焦土空袭',
      skillLabels: { strafe: '低空扫射', napalm: '凝固汽油弹', charge: '加力冲刺' },
      ringColor: 'rgba(255,120,40,0.98)',
      warning: '它会呼叫僚机沿红色航线低空扫射，看到航线立刻横向离开；凝固汽油弹会留下一串燃烧带',
      phaseWarning: '扫射变成两条交叉航线，燃烧带更长', phaseAt: 0.5,
      phases: [
        { windup: 1.3, cooldown: 8, damage: 22, range: 900 },
        { windup: 1.05, cooldown: 6, damage: 28, range: 1100 },
      ],
      trophy: L('ace_wings', '王牌飞行徽章', '🎖️', 5, 560000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
      rewardRolls: [
        { count: 1, weights: [0, 0, 0, 0, 0, 1] },
        { count: 2, weights: [0, 0, 0, 0, 55, 45] },
        { count: 1, weights: [0, 0, 12, 28, 42, 18] },
      ],
      weaponDrops: ['minigun'],
    },
  },
  radarWarden: {
    id: 'radarWarden', name: '冰霜雷达官', hp: 1250, armor: 200, r: 27, speed: 105, vision: 900, reaction: 0.3,
    accuracy: 0.12, score: 30000, weapons: ['dmr'], dmgMul: 0.28, bulletSpeed: 1100,
    prefMin: 420, prefMax: 700, burst: [1, 2], melee: 0, boss: true,
    encounter: {
      skill: 'scan', skillCycle: ['scan', 'icewall', 'mines', 'scan'], skillName: '极地雷网',
      skillLabels: { scan: '雷达锁定', icewall: '冰墙封锁', mines: '冰霜地雷' },
      ringColor: 'rgba(120,220,255,0.98)',
      warning: '雷达扫描线扫过你时会被锁定并遭到狙击，躲进掩体切断视线；它会竖起冰墙封路、在地上撒冰霜地雷',
      phaseWarning: '雷达转速加快，冰墙更长，地雷更多', phaseAt: 0.45,
      phases: [
        { windup: 1.2, cooldown: 8.5, damage: 26, range: 900 },
        { windup: 0.95, cooldown: 6, damage: 34, range: 1000 },
      ],
      trophy: L('radar_core', '极地雷达核心', '📡', 5, 540000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
      rewardRolls: [
        { count: 1, weights: [0, 0, 0, 0, 0, 1] },
        { count: 2, weights: [0, 0, 0, 0, 58, 42] },
        { count: 1, weights: [0, 0, 14, 32, 38, 16] },
      ],
      weaponDrops: ['frostmp9'],
    },
  },
  duckKing: {
    id: 'duckKing', name: '鸭王', hp: 2600, armor: 240, r: 35, speed: 120, vision: 760, reaction: 0.3,
    accuracy: 0.15, score: 55000, weapons: ['ak'], dmgMul: 0.28, bulletSpeed: 820,
    prefMin: 200, prefMax: 400, burst: [6, 10], melee: 0, boss: true,
    encounter: {
      skill: 'slam', skillCycle: ['slam', 'summon', 'charge', 'pulse'], skillName: '王权轮招',
      skillLabels: { slam: '王座震地', summon: '禁卫召集', charge: '御驾冲锋', pulse: '王权冲击' },
      ringColor: 'rgba(255,205,90,0.95)',
      summon: { types: ['elite', 'hen', 'shield'], counts: [3, 5] },
      warning: '鸭王轮换震地、召集成员、冲撞与王权冲击四种招式，注意识别预警形状',
      phaseWarning: '四连招式全面提速，召唤更多护卫', phaseAt: 0.45,
      phases: [
        { windup: 1.15, cooldown: 7.5, damage: 22, range: 340 },
        { windup: 0.9, cooldown: 5, damage: 30, range: 430 },
      ],
      trophy: L('duck_throne', '鸭王御座', '👑', 5, 1800000),
      extraLootWeights: [0, 0, 0, 0, 0, 1],
      rewardRolls: [
        { count: 2, weights: [0, 0, 0, 0, 0, 1] },
        { count: 2, weights: [0, 0, 0, 0, 35, 65] },
        { count: 1, weights: [0, 0, 0, 15, 45, 40] },
      ],
      weaponDrops: ['m4legend', 'awmlegend'],
    },
  },
};

export interface ContainerDef {
  name: string;
  min: number;
  max: number;
  w: number;
  h: number;
  weights: number[];
  special?: 'med' | 'weapon' | 'vending' | 'treasure' | 'coins';
}

export const CONTAINER_DEFS: Record<string, ContainerDef> = {
  crate: { name: '木箱', min: 2, max: 4, w: 34, h: 30, weights: [46, 32, 15, 5.5, 1.3, 0.2] },
  toolbox: { name: '工具箱', min: 2, max: 3, w: 34, h: 22, weights: [28, 40, 22, 8, 1.6, 0.25] },
  medbox: { name: '医疗箱', min: 2, max: 3, w: 30, h: 26, weights: [40, 40, 15, 5, 0, 0], special: 'med' },
  weaponcase: { name: '武器箱', min: 1, max: 2, w: 46, h: 22, weights: [0, 0, 0, 0, 0, 0], special: 'weapon' },
  pc: { name: '电脑机箱', min: 1, max: 3, w: 24, h: 32, weights: [8, 22, 40, 22, 6, 0.6] },
  desktop: { name: '台式电脑', min: 1, max: 3, w: 44, h: 34, weights: [4, 16, 38, 28, 12, 2] },
  laptop: { name: '笔记本电脑', min: 1, max: 2, w: 36, h: 26, weights: [3, 14, 36, 31, 14, 2] },
  safe: { name: '保险箱', min: 2, max: 3, w: 32, h: 32, weights: [0, 8, 28, 36, 22, 6] },
  duffel: { name: '旅行包', min: 2, max: 4, w: 36, h: 24, weights: [34, 34, 20, 9, 2.5, 0.35] },
  vending: { name: '贩卖机', min: 2, max: 3, w: 48, h: 58, weights: [0, 0, 0, 0, 0, 0], special: 'vending' },
  treasure_chest: { name: '宝箱', min: 2, max: 3, w: 42, h: 32, weights: [0, 8, 28, 34, 22, 8], special: 'treasure' },
  coin_pile: { name: '金币堆', min: 1, max: 2, w: 36, h: 28, weights: [0, 0, 0, 0, 0, 0], special: 'coins' },
};

export type CharacterId = 'duck' | 'tank' | 'scout';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  role: string;
  speed: number;
  armorScale: number;
  armorBonus: number;
  minArmor: number;
  feathers: string[];
  specialty: { categories: string[]; damageBonus: number; blastRadiusBonus?: number; description: string };
  trait: { type: 'explosionResistance' | 'reloadSpeed' | 'moveSpeed'; value: number; description: string };
}

export const CHARACTERS: readonly CharacterDef[] = [
  { id: 'duck', name: '小黄', role: '均衡', speed: 240, armorScale: 1, armorBonus: 0, minArmor: 25, feathers: ['#ffd43b', '#fff1a8', '#ffffff', '#f2c12e'],
    specialty: { categories: ['突击步枪'], damageBonus: 0.12, description: '突击步枪伤害 +12%' },
    trait: { type: 'reloadSpeed', value: 0.08, description: '换弹时间 −8%' } },
  { id: 'tank', name: '铁头', role: '重甲', speed: 192, armorScale: 1, armorBonus: 45, minArmor: 0, feathers: ['#b0bca1', '#728573', '#d8dbb9'],
    specialty: { categories: ['霰弹枪', '发射器'], damageBonus: 0.12, blastRadiusBonus: 0.10, description: '霰弹近距伤害 +12% · 发射器爆炸半径 +10%' },
    trait: { type: 'explosionResistance', value: 0.12, description: '受到爆炸伤害 −12%' } },
  { id: 'scout', name: '快羽', role: '侦察', speed: 288, armorScale: 0.55, armorBonus: 0, minArmor: 15, feathers: ['#a2e1ea', '#63aec1', '#d8f3f3'],
    specialty: { categories: ['冲锋枪', '狙击枪'], damageBonus: 0.12, description: '冲锋枪与狙击枪伤害 +12%' },
    trait: { type: 'moveSpeed', value: 0.04, description: '移动速度 +4%' } },
];

export function getCharacter(id?: string): CharacterDef {
  return CHARACTERS.find((character) => character.id === id) ?? CHARACTERS[0];
}

export function characterArmor(character: CharacterDef, armor: number) {
  return Math.max(character.minArmor, Math.round(armor * character.armorScale) + character.armorBonus);
}

export function characterWeaponBonus(character: CharacterDef, weaponId: string) {
  const specialty = character.specialty;
  const category = weaponCategory(weaponId);
  const base = { damage: 1, blastRadius: 1, closeDamage: 1 };
  if (!specialty.categories.includes(category)) return base;
  if (category === '发射器') return { ...base, blastRadius: 1 + (specialty.blastRadiusBonus ?? 0) };
  if (category === '霰弹枪') return { ...base, closeDamage: 1 + specialty.damageBonus };
  return { ...base, damage: 1 + specialty.damageBonus };
}

export function characterMoveSpeed(character: CharacterDef) {
  return character.speed * (1 + (character.trait.type === 'moveSpeed' ? character.trait.value : 0));
}

export interface Loadout {
  id: string;
  name: string;
  tag: string;
  desc: string;
  cost: number;
  primary: string | null;
  armor: number;
  bandages: number;
  medkits: number;
  throwables: Partial<Record<ThrowableId, number>>;
}

export const LOADOUTS: Loadout[] = [
  { id: 'knife', name: '跑刀', tag: '零成本', desc: 'M9 手枪 · 1 绷带', cost: 0, primary: null, armor: 0, bandages: 1, medkits: 0, throwables: {} },
  { id: 'assault', name: '突击', tag: '均衡', desc: 'MP5 · 二级甲 · 绷带×2 · 急救针 · 手雷', cost: 60000, primary: 'smg', armor: 60, bandages: 2, medkits: 1, throwables: { grenade: 1 } },
  { id: 'heavy', name: '重装', tag: '火力压制', desc: 'M4A1 · 四级甲 · 绷带×3 · 急救针×2 · 手雷×2', cost: 180000, primary: 'rifle', armor: 120, bandages: 3, medkits: 2, throwables: { grenade: 2 } },
];

export const KIT_STYLES = [
  { id: 'balanced', name: '均衡', note: '火力、护甲与补给均衡', pack: 2,
    tiers: [['m1911', 1, 1, 0, {}], ['smg', 2, 2, 0, { grenade: 1 }], ['rifle', 3, 2, 1, { grenade: 1, smoke: 1 }], ['mini14', 4, 3, 1, { grenade: 2, smoke: 1 }], ['sr25', 5, 3, 2, { grenade: 2, smoke: 2 }]] },
  { id: 'breach', name: '强攻', note: '优先武器与投掷物', pack: 1,
    tiers: [['revolver', 0, 1, 0, { grenade: 1 }], ['mp9', 1, 1, 0, { grenade: 2, flash: 1 }], ['s12k', 1, 2, 0, { grenade: 2, flash: 2, fire: 1 }], ['m79', 2, 2, 1, { grenade: 3, flash: 2, fire: 1 }], ['m32', 2, 3, 1, { grenade: 3, flash: 1, fire: 2 }]] },
  { id: 'armor', name: '厚甲', note: '优先护甲与治疗', pack: 3,
    tiers: [['pistol', 1, 2, 0, {}], ['shotgun', 3, 2, 1, {}], ['ak', 4, 3, 2, { smoke: 1 }], ['lmg', 5, 3, 2, { smoke: 1 }], ['sniper', 6, 3, 3, { smoke: 2 }]] },
] satisfies { id: string; name: string; note: string; pack: number; tiers: [string | null, number, number, number, Partial<Record<ThrowableId, number>>][] }[];

const budgetKits = KIT_STYLES.flatMap((style) => style.tiers.map(([primary, grade, bandages, medkits, items], i): Loadout => {
  const armor = ARMORS[grade - 1];
  const throwables: Partial<Record<ThrowableId, number>> = items;
  const cost = (primary ? WEAPONS[primary].value : 0) + (armor?.value ?? 0)
    + bandages * ITEM_BANDAGE.value + medkits * ITEM_MEDKIT.value
    + THROWABLE_IDS.reduce((sum, id) => sum + (throwables[id] ?? 0) * THROWABLES[id].value, 0);
  return { id: `budget-${style.id}-${i}`, name: style.name, tag: style.note,
    desc: `${WEAPONS[primary ?? 'pistol'].name} · ${armor?.name ?? '无护甲'}`, cost, primary: primary === 'pistol' ? null : primary, armor: armor?.armor ?? 0, bandages, medkits, throwables };
}));

export function findLoadout(id: string) {
  return LOADOUTS.find((kit) => kit.id === id) ?? budgetKits.find((kit) => kit.id === id);
}

export function budgetLoadout(style: string, budget: number) {
  return budgetKits.filter((kit) => kit.id.startsWith(`budget-${style}-`) && kit.cost <= budget).at(-1) ?? LOADOUTS[0];
}

export const STARTING_STASH = 100000;

// ---------- permanent character upgrades ----------
export type UpgradeKey = 'capacity' | 'rollCd' | 'speed';

export interface CharacterUpgrades {
  capacity: number; // level 0-5, +4 backpack slots per level
  rollCd: number;   // level 0-5, -0.07s roll cooldown per level
  speed: number;    // level 0-5, +6% move speed per level
}

export const UPGRADE_MAX = 5;

export const UPGRADE_INFO: Record<UpgradeKey, { name: string; desc: string; icon: string; base: string }> = {
  capacity: { name: '扩容背包', desc: '每级 +4 格', icon: '🎒', base: '20 格' },
  rollCd: { name: '翻滚训练', desc: '每级翻滚冷却 −0.07 秒', icon: '💨', base: '0.72 秒' },
  speed: { name: '轻装疾行', desc: '每级移速 +6%', icon: '👟', base: '100%' },
};

export function upgradePrice(_key: UpgradeKey, level: number): number {
  return Math.round((12000 + level * 18000) / 1000) * 1000;
}

export function upgradeValue(key: UpgradeKey, level: number): string {
  if (key === 'capacity') return `${20 + level * 4} 格`;
  if (key === 'rollCd') return `${Math.max(0.37, 0.72 - level * 0.07).toFixed(2)} 秒`;
  return `${100 + level * 6}%`;
}

export function fmtMoney(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

export function fmtTime(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
}
