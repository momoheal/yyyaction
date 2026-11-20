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
];

export const LOOT_BY_RARITY: ItemDef[][] = [0, 1, 2, 3, 4, 5].map((r) => LOOT.filter((i) => i.rarity === r));

export const ITEM_BANDAGE: ItemDef = { id: 'bandage', name: '绷带', icon: '🩹', rarity: 0, value: 1500, kind: 'bandage' };
export const ITEM_MEDKIT: ItemDef = { id: 'medkit', name: '急救针', icon: '💉', rarity: 2, value: 9000, kind: 'medkit' };
export const ITEM_GRENADE: ItemDef = { id: 'grenade', name: '破片手雷', icon: '💣', rarity: 1, value: 4000, kind: 'grenade' };
export const ARMORS: ItemDef[] = [
  { id: 'armor2', name: '二级护甲', icon: '🦺', rarity: 1, value: 12000, kind: 'armor', armor: 60 },
  { id: 'armor4', name: '四级护甲', icon: '🦺', rarity: 3, value: 45000, kind: 'armor', armor: 120 },
  { id: 'armor6', name: '六级护甲', icon: '🦺', rarity: 4, value: 120000, kind: 'armor', armor: 180 },
];

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
}

export const WEAPONS: Record<string, WeaponDef> = {
  pistol: { id: 'pistol', name: 'M9 鸭牌手枪', short: 'M9', tier: 0, dmg: 26, rate: 4.6, mag: 12, reload: 1.0, spread: 0.035, pellets: 1, speed: 1350, range: 720, shake: 0.1, kick: 3, noise: 520, sound: 'pistol', value: 3000, len: 12, color: '#2b2b2e', pierce: 0, rarity: 0 },
  smg: { id: 'smg', name: 'MP5 冲锋枪', short: 'MP5', tier: 1, dmg: 17, rate: 11, mag: 30, reload: 1.5, spread: 0.075, pellets: 1, speed: 1400, range: 680, shake: 0.085, kick: 2.5, noise: 600, sound: 'smg', value: 18000, len: 18, color: '#303338', pierce: 0, rarity: 1 },
  shotgun: { id: 'shotgun', name: 'M870 霰弹枪', short: 'M870', tier: 2, dmg: 15, rate: 1.35, mag: 6, reload: 2.1, spread: 0.3, pellets: 8, speed: 1150, range: 430, shake: 0.34, kick: 9, noise: 750, sound: 'shotgun', value: 26000, len: 24, color: '#5a3d26', pierce: 0, rarity: 2 },
  rifle: { id: 'rifle', name: 'M4A1 突击步枪', short: 'M4A1', tier: 3, dmg: 28, rate: 8.5, mag: 30, reload: 1.9, spread: 0.04, pellets: 1, speed: 1650, range: 950, shake: 0.13, kick: 3.5, noise: 800, sound: 'rifle', value: 42000, len: 25, color: '#3a3f36', pierce: 0, rarity: 2 },
  sniper: { id: 'sniper', name: 'AWM 狙击步枪', short: 'AWM', tier: 4, dmg: 150, rate: 0.9, mag: 5, reload: 2.6, spread: 0.004, pellets: 1, speed: 2800, range: 1500, shake: 0.45, kick: 12, noise: 1100, sound: 'sniper', value: 88000, len: 33, color: '#4a5a3a', pierce: 2, rarity: 3 },
  lmg: { id: 'lmg', name: 'M249 轻机枪', short: 'M249', tier: 4, dmg: 24, rate: 12, mag: 80, reload: 3.4, spread: 0.085, pellets: 1, speed: 1550, range: 900, shake: 0.15, kick: 3.5, noise: 900, sound: 'lmg', value: 76000, len: 29, color: '#2f3230', pierce: 0, rarity: 3 },
};

export function weaponItem(id: string): ItemDef {
  const w = WEAPONS[id];
  return { id: 'w_' + id, name: w.name, icon: 'GUN', rarity: w.rarity, value: w.value, kind: 'weapon', weapon: id };
}

export type EnemyType = 'chicken' | 'bandit' | 'elite' | 'armored' | 'lookout' | 'goose' | 'harborBoss' | 'foundryBoss';

export interface BossPhase {
  windup: number;
  cooldown: number;
  damage: number;
  range: number;
}

export interface BossEncounter {
  skill: 'charge' | 'pulse';
  warning: string;
  phaseWarning: string;
  phaseAt: number;
  phases: [BossPhase, BossPhase];
  trophy: ItemDef;
  extraLootWeights: number[];
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
  encounter?: BossEncounter;
}

export const ENEMIES: Record<EnemyType, EnemyDef> = {
  chicken: { id: 'chicken', name: '暴走鸡', hp: 26, armor: 0, r: 11, speed: 250, vision: 430, reaction: 0.12, accuracy: 0, score: 200, weapons: [], dmgMul: 0, bulletSpeed: 0, prefMin: 0, prefMax: 0, burst: [0, 0], melee: 8, boss: false },
  bandit: { id: 'bandit', name: '鸭匪', hp: 85, armor: 0, r: 15, speed: 150, vision: 540, reaction: 0.55, accuracy: 0.11, score: 600, weapons: ['pistol', 'smg', 'smg', 'shotgun'], dmgMul: 0.36, bulletSpeed: 680, prefMin: 190, prefMax: 370, burst: [3, 5], melee: 0, boss: false },
  elite: { id: 'elite', name: '精英鸭匪', hp: 120, armor: 60, r: 16, speed: 165, vision: 600, reaction: 0.32, accuracy: 0.075, score: 1500, weapons: ['rifle', 'smg', 'shotgun', 'rifle'], dmgMul: 0.4, bulletSpeed: 760, prefMin: 220, prefMax: 420, burst: [4, 7], melee: 0, boss: false },
  armored: { id: 'armored', name: '护甲鸭', hp: 100, armor: 95, r: 17, speed: 122, vision: 475, reaction: 0.52, accuracy: 0.13, score: 1300, weapons: ['shotgun'], dmgMul: 0.34, bulletSpeed: 630, prefMin: 90, prefMax: 200, burst: [1, 1], melee: 0, boss: false },
  lookout: { id: 'lookout', name: '哨戒鸭', hp: 70, armor: 0, r: 14, speed: 175, vision: 700, reaction: 0.48, accuracy: 0.1, score: 1000, weapons: ['rifle'], dmgMul: 0.3, bulletSpeed: 820, prefMin: 370, prefMax: 570, burst: [2, 3], melee: 0, boss: false },
  goose: { id: 'goose', name: '鹅老大', hp: 1000, armor: 150, r: 26, speed: 130, vision: 650, reaction: 0.25, accuracy: 0.1, score: 15000, weapons: ['lmg'], dmgMul: 0.3, bulletSpeed: 700, prefMin: 150, prefMax: 380, burst: [10, 16], melee: 0, boss: true },
  harborBoss: {
    id: 'harborBoss', name: '铁钩船长', hp: 760, armor: 90, r: 24, speed: 140, vision: 620, reaction: 0.35,
    accuracy: 0.15, score: 11000, weapons: ['shotgun'], dmgMul: 0.32, bulletSpeed: 620,
    prefMin: 90, prefMax: 240, burst: [1, 1], melee: 0, boss: true,
    encounter: {
      skill: 'charge', warning: '看到红色冲撞路线后横向闪避，引它撞上货柜',
      phaseWarning: '冲撞预警缩短，冲得更远', phaseAt: 0.5,
      phases: [
        { windup: 0.95, cooldown: 8, damage: 24, range: 360 },
        { windup: 0.65, cooldown: 5.5, damage: 32, range: 470 },
      ],
      trophy: L('captain_log', '船长航海日志', '📕', 4, 96000),
      extraLootWeights: [0, 0, 0, 1, 0, 0],
    },
  },
  foundryBoss: {
    id: 'foundryBoss', name: '炉心监工', hp: 1250, armor: 220, r: 27, speed: 112, vision: 690, reaction: 0.28,
    accuracy: 0.1, score: 22000, weapons: ['rifle'], dmgMul: 0.38, bulletSpeed: 760,
    prefMin: 180, prefMax: 300, burst: [5, 8], melee: 0, boss: true,
    encounter: {
      skill: 'pulse', warning: '橙圈内会受到热浪冲击，退圈或躲到实墙后',
      phaseWarning: '热浪范围扩大，间隔缩短', phaseAt: 0.45,
      phases: [
        { windup: 1.15, cooldown: 8.5, damage: 24, range: 250 },
        { windup: 0.9, cooldown: 5.5, damage: 34, range: 340 },
      ],
      trophy: L('furnace_core', '封存炉芯', '🧿', 5, 260000),
      extraLootWeights: [0, 0, 0, 0, 1, 0],
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
  special?: 'med' | 'weapon';
}

export const CONTAINER_DEFS: Record<string, ContainerDef> = {
  crate: { name: '木箱', min: 2, max: 4, w: 34, h: 30, weights: [46, 32, 15, 5.5, 1.3, 0.2] },
  toolbox: { name: '工具箱', min: 2, max: 3, w: 34, h: 22, weights: [28, 40, 22, 8, 1.6, 0.25] },
  medbox: { name: '医疗箱', min: 2, max: 3, w: 30, h: 26, weights: [40, 40, 15, 5, 0, 0], special: 'med' },
  weaponcase: { name: '武器箱', min: 1, max: 2, w: 46, h: 22, weights: [0, 0, 0, 0, 0, 0], special: 'weapon' },
  pc: { name: '电脑机箱', min: 1, max: 3, w: 24, h: 32, weights: [8, 22, 40, 22, 6, 0.6] },
  safe: { name: '保险箱', min: 2, max: 3, w: 32, h: 32, weights: [0, 8, 28, 36, 22, 6] },
  duffel: { name: '旅行包', min: 2, max: 4, w: 36, h: 24, weights: [34, 34, 20, 9, 2.5, 0.35] },
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
}

export const CHARACTERS: readonly CharacterDef[] = [
  { id: 'duck', name: '黄鸭', role: '均衡', speed: 240, armorScale: 1, armorBonus: 0, minArmor: 0, feathers: ['#ffd43b', '#fff1a8', '#ffffff', '#f2c12e'] },
  { id: 'tank', name: '铁头', role: '重甲', speed: 192, armorScale: 1, armorBonus: 45, minArmor: 0, feathers: ['#b0bca1', '#728573', '#d8dbb9'] },
  { id: 'scout', name: '快羽', role: '侦察', speed: 288, armorScale: 0.55, armorBonus: 0, minArmor: 15, feathers: ['#a2e1ea', '#63aec1', '#d8f3f3'] },
];

export function getCharacter(id?: string): CharacterDef {
  return CHARACTERS.find((character) => character.id === id) ?? CHARACTERS[0];
}

export function characterArmor(character: CharacterDef, armor: number) {
  return Math.max(character.minArmor, Math.round(armor * character.armorScale) + character.armorBonus);
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
  grenades: number;
}

export const LOADOUTS: Loadout[] = [
  { id: 'knife', name: '跑刀', tag: '零成本', desc: 'M9 手枪 · 无甲 · 1 绷带', cost: 0, primary: null, armor: 0, bandages: 1, medkits: 0, grenades: 0 },
  { id: 'assault', name: '突击', tag: '均衡', desc: 'MP5 · 二级甲 · 绷带×2 · 急救针 · 手雷', cost: 60000, primary: 'smg', armor: 60, bandages: 2, medkits: 1, grenades: 1 },
  { id: 'heavy', name: '重装', tag: '火力压制', desc: 'M4A1 · 四级甲 · 绷带×3 · 急救针×2 · 手雷×2', cost: 180000, primary: 'rifle', armor: 120, bandages: 3, medkits: 2, grenades: 2 },
];

export const STARTING_STASH = 100000;

export function fmtMoney(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

export function fmtTime(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`;
}
