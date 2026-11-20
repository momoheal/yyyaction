import { CONTAINER_DEFS, MAP_H, MAP_W, type EnemyType } from './data';

export const F_MOVE = 1;
export const F_BULLET = 2;
export const F_SIGHT = 4;

export interface Solid {
  id: number;
  t: 0 | 1; // 0 rect, 1 circle
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  f: number;
  kind: string;
  v: number;
  stamp: number;
  dead: boolean;
  hp: number;
}

export type FloorType = 'wood' | 'tile' | 'concrete';
export interface Floor { x: number; y: number; w: number; h: number; type: FloorType; name: string }
export interface Decor { x: number; y: number; t: number; s: number; c: number; rot: number }
export interface Tree { x: number; y: number; r: number; v: number; solid: boolean }
export interface ContainerSpot { type: string; x: number; y: number }
export interface ExtractDef { id: string; name: string; x: number; y: number; r: number }
export interface SpawnDef { x: number; y: number; chick: [number, number] }
export interface EnemySpot { type: EnemyType; x: number; y: number; n: number }
export interface Pad { type: string; x: number; y: number; w: number; h: number }
export interface Zone { name: string; x: number; y: number; w: number; h: number }

export interface GameMap {
  w: number;
  h: number;
  solids: Solid[];
  floors: Floor[];
  decor: Decor[];
  trees: Tree[];
  water: { x: number; y: number; r: number }[];
  roads: number[][];
  pads: Pad[];
  containers: ContainerSpot[];
  extractions: ExtractDef[];
  spawns: SpawnDef[];
  enemySpots: EnemySpot[];
  reinforce: { x: number; y: number }[];
  zones: Zone[];
  tracks: number[];
}

export type RaidMapId = 'island' | 'harbor' | 'foundry';

export interface RaidMapDef {
  id: RaidMapId;
  name: string;
  requiredExtracts: number;
  theme: string;
  loot: string;
  boss: EnemyType;
  build: () => GameMap;
}

export const RAID_MAPS: readonly RaidMapDef[] = [
  { id: 'island', name: '鸭鸭岛', requiredExtracts: 0, theme: '农场与军事基地', loot: '通用补给、军械和保险箱', boss: 'goose', build: buildMap },
  { id: 'harbor', name: '盐雾货港', requiredExtracts: 1, theme: '水道、装卸场与集装箱', loot: '码头补给、武器箱和船长航海日志', boss: 'harborBoss', build: buildHarbor },
  { id: 'foundry', name: '赤炉工厂', requiredExtracts: 3, theme: '铸造线、炉前广场与控制室', loot: '控制室机箱、保险箱和封存炉芯', boss: 'foundryBoss', build: buildFoundry },
];

export function getRaidMap(id: RaidMapId): RaidMapDef {
  return RAID_MAPS.find((map) => map.id === id) ?? RAID_MAPS[0];
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Door = [string, number, number];
type Part = [string, number, number, number];
interface BDef {
  name: string;
  x: number; y: number; w: number; h: number;
  floor: FloorType;
  doors: Door[];
  parts?: Part[];
  cont?: [string, number, number][];
  abs?: [string, number, number][];
  racks?: [number, number, number, number][];
}

const T = 16;

const BUILDINGS: BDef[] = [
  { name: '湖畔小屋', x: 820, y: 190, w: 230, h: 170, floor: 'wood', doors: [['s', 0.5, 60], ['w', 0.55, 56]], cont: [['crate', 0, 0], ['duffel', 1, 0], ['toolbox', 1, 1]] },
  { name: '船屋', x: 160, y: 620, w: 210, h: 170, floor: 'wood', doors: [['n', 0.6, 60], ['e', 0.5, 56]], cont: [['crate', 0, 1], ['medbox', 1, 1], ['crate', 0, 0]] },
  { name: '红色谷仓', x: 1240, y: 170, w: 380, h: 260, floor: 'wood', doors: [['s', 0.35, 90], ['e', 0.5, 60], ['w', 0.5, 60]], parts: [['v', 0.68, 0.5, 60]], cont: [['crate', 0, 0], ['crate', 0.1, 1], ['toolbox', 0.55, 0], ['weaponcase', 1, 0], ['duffel', 1, 1]] },
  { name: '农舍', x: 1720, y: 210, w: 250, h: 200, floor: 'wood', doors: [['s', 0.3, 60], ['w', 0.65, 56]], parts: [['h', 0.5, 0.75, 60]], cont: [['pc', 1, 0], ['medbox', 0, 0], ['crate', 1, 1]] },
  { name: '便利店', x: 2480, y: 230, w: 300, h: 190, floor: 'tile', doors: [['s', 0.3, 70], ['e', 0.6, 56]], cont: [['pc', 0, 0], ['duffel', 1, 0], ['crate', 0.55, 0], ['medbox', 0, 1]] },
  { name: '指挥部', x: 1500, y: 1060, w: 320, h: 240, floor: 'concrete', doors: [['s', 0.3, 70], ['n', 0.25, 60], ['e', 0.5, 56]], parts: [['v', 0.58, 0.3, 60]], cont: [['pc', 0, 0], ['crate', 0, 1], ['medbox', 0.45, 0], ['safe', 1, 0], ['weaponcase', 1, 1]] },
  { name: '民居A', x: 180, y: 980, w: 230, h: 180, floor: 'wood', doors: [['e', 0.5, 56], ['s', 0.5, 56]], cont: [['crate', 0, 0], ['duffel', 1, 0], ['medbox', 0, 1]] },
  { name: '民居B', x: 560, y: 1000, w: 210, h: 230, floor: 'tile', doors: [['w', 0.75, 56], ['s', 0.4, 56], ['n', 0.6, 56]], parts: [['h', 0.45, 0.3, 56]], cont: [['pc', 1, 0], ['crate', 0, 0], ['toolbox', 1, 1]] },
  { name: '民居C', x: 200, y: 1330, w: 250, h: 200, floor: 'wood', doors: [['n', 0.6, 56], ['e', 0.4, 56]], cont: [['crate', 0, 0], ['duffel', 0, 1], ['weaponcase', 1, 1]] },
  { name: '民居D', x: 620, y: 1400, w: 280, h: 210, floor: 'tile', doors: [['n', 0.3, 56], ['w', 0.6, 56], ['e', 0.45, 56]], parts: [['v', 0.55, 0.6, 56]], cont: [['safe', 1, 0], ['crate', 0, 1], ['pc', 1, 1]] },
  { name: '一号仓库', x: 2300, y: 930, w: 400, h: 280, floor: 'concrete', doors: [['w', 0.5, 80], ['s', 0.75, 80], ['n', 0.5, 60]], racks: [[2390, 1010, 220, 22], [2390, 1110, 220, 22]], abs: [['crate', 2342, 976], ['toolbox', 2655, 975], ['duffel', 2632, 1071], ['weaponcase', 2655, 1150], ['crate', 2345, 1170]] },
  { name: '二号仓库', x: 2560, y: 1340, w: 420, h: 300, floor: 'concrete', doors: [['n', 0.3, 80], ['w', 0.55, 70], ['e', 0.5, 60]], racks: [[2650, 1420, 22, 150], [2770, 1420, 22, 150], [2890, 1420, 22, 150]], abs: [['pc', 2605, 1385], ['crate', 2935, 1385], ['safe', 2935, 1590], ['crate', 2605, 1590], ['duffel', 2720, 1600]] },
  { name: '车站', x: 1480, y: 1830, w: 260, h: 160, floor: 'tile', doors: [['s', 0.5, 60], ['w', 0.5, 56], ['e', 0.5, 56]], cont: [['crate', 0, 0], ['pc', 1, 0], ['medbox', 1, 1]] },
  { name: '工具棚', x: 380, y: 1900, w: 170, h: 140, floor: 'wood', doors: [['e', 0.5, 56], ['n', 0.4, 56]], cont: [['toolbox', 0, 0], ['crate', 0, 1]] },
];

const OPEN_CONTAINERS: [string, number, number][] = [
  ['duffel', 720, 640], ['duffel', 1600, 560], ['crate', 2860, 300], ['toolbox', 2560, 700],
  ['crate', 1420, 1050], ['weaponcase', 1900, 1400], ['duffel', 1400, 1380], ['crate', 1965, 975],
  ['crate', 2460, 1325], ['crate', 900, 1900], ['duffel', 2100, 1990], ['toolbox', 1250, 2250],
  // spawn starter caches
  ['crate', 255, 905], ['weaponcase', 330, 935],
  ['crate', 1205, 140], ['weaponcase', 1192, 250],
  ['crate', 3010, 760], ['weaponcase', 3010, 905],
  ['crate', 1480, 2290], ['weaponcase', 1765, 2290],
];

export function buildTrainingMap(): GameMap {
  return {
    w: 960, h: 720,
    solids: [
      { id: 0, t: 0, x: 395, y: 245, w: 24, h: 84, r: 0, f: F_MOVE | F_BULLET | F_SIGHT, kind: 'wall', v: 0, stamp: 0, dead: false, hp: 0 },
    ],
    floors: [{ x: 85, y: 230, w: 790, h: 260, type: 'concrete', name: '训练场' }],
    decor: [], trees: [], water: [], roads: [], pads: [],
    containers: [{ type: 'crate', x: 252, y: 360 }],
    extractions: [{ id: 'A', name: '训练出口', x: 805, y: 360, r: 60 }],
    spawns: [{ x: 145, y: 360, chick: [540, 360] }],
    enemySpots: [{ type: 'chicken', x: 540, y: 360, n: 1 }],
    reinforce: [], zones: [], tracks: [],
  };
}

type Cover = [kind: 'wall' | 'cargo' | 'rack', x: number, y: number, w: number, h: number];

function raidSolids(w: number, h: number, cover: Cover[], water: GameMap['water'], barrels: [number, number][]): Solid[] {
  const wall = F_MOVE | F_BULLET | F_SIGHT;
  const solids: Solid[] = [
    ...cover.map(([kind, x, y, width, height], id): Solid => ({
      id, t: 0, x, y, w: width, h: height, r: 0, f: wall, kind, v: id % 4, stamp: 0, dead: false, hp: 0,
    })),
  ];
  for (const [x, y, width, height] of [[-32, -32, w + 64, 32], [-32, h, w + 64, 32], [-32, 0, 32, h], [w, 0, 32, h]]) {
    solids.push({ id: solids.length, t: 0, x, y, w: width, h: height, r: 0, f: wall, kind: 'bound', v: 0, stamp: 0, dead: false, hp: 0 });
  }
  for (const { x, y, r } of water) {
    solids.push({ id: solids.length, t: 1, x, y, w: 0, h: 0, r: r - 6, f: F_MOVE, kind: 'water', v: 0, stamp: 0, dead: false, hp: 0 });
  }
  for (const [x, y] of barrels) {
    solids.push({ id: solids.length, t: 1, x, y, w: 0, h: 0, r: 14, f: F_MOVE | F_BULLET, kind: 'barrel', v: 0, stamp: 0, dead: false, hp: 20 });
  }
  return solids;
}

function buildHarbor(): GameMap {
  const w = 2400, h = 1664;
  const water = [{ x: 578, y: 402, r: 199 }, { x: 814, y: 402, r: 222 }, { x: 1048, y: 378, r: 169 }];
  return {
    w, h, water,
    solids: raidSolids(w, h, [
      ['cargo', 540, 740, 220, 68], ['cargo', 875, 680, 208, 68], ['cargo', 898, 996, 218, 68],
      ['cargo', 1270, 622, 208, 68], ['cargo', 1300, 1060, 220, 68], ['cargo', 1660, 650, 210, 68],
      ['cargo', 1700, 1070, 210, 68], ['cargo', 1860, 835, 70, 154], ['cargo', 1980, 440, 200, 68],
      ['wall', 682, 1298, 245, 16], ['wall', 912, 1314, 15, 132], ['wall', 1930, 1250, 16, 142],
    ], water, [[570, 828], [1117, 822], [1480, 714], [1770, 987], [2010, 710]]),
    floors: [
      { name: '北岸补给站', type: 'wood', x: 210, y: 570, w: 274, h: 180 },
      { name: '南侧货棚', type: 'wood', x: 682, y: 1300, w: 245, h: 146 },
    ],
    decor: [], trees: [], tracks: [],
    roads: [[90, 470, 280, 650, 450, 830, 1300, 830, 1900, 830, 2190, 300], [100, 1260, 610, 1180, 1200, 1200, 1850, 1260, 2200, 1370]],
    pads: [
      { type: 'dock', x: 407, y: 610, w: 780, h: 34 },
      { type: 'base', x: 1180, y: 574, w: 770, h: 600 },
      { type: 'platform', x: 2050, y: 1280, w: 288, h: 181 },
    ],
    containers: [
      { type: 'crate', x: 304, y: 624 }, { type: 'duffel', x: 352, y: 704 }, { type: 'medbox', x: 420, y: 1190 },
      { type: 'toolbox', x: 755, y: 1359 }, { type: 'weaponcase', x: 850, y: 1370 }, { type: 'crate', x: 806, y: 867 },
      { type: 'medbox', x: 1246, y: 1103 }, { type: 'weaponcase', x: 1570, y: 754 }, { type: 'safe', x: 1640, y: 924 },
      { type: 'crate', x: 2090, y: 547 }, { type: 'duffel', x: 2050, y: 1330 },
    ],
    spawns: [{ x: 144, y: 470, chick: [676, 910] }, { x: 144, y: 1248, chick: [676, 1160] }],
    extractions: [{ id: 'A', name: '北岸登船梯', x: 2190, y: 300, r: 78 }, { id: 'B', name: '南门货运道', x: 2200, y: 1370, r: 78 }],
    enemySpots: [
      { type: 'chicken', x: 676, y: 910, n: 3 }, { type: 'chicken', x: 676, y: 1160, n: 2 },
      { type: 'bandit', x: 950, y: 852, n: 1 }, { type: 'bandit', x: 1100, y: 1240, n: 1 },
      { type: 'harborBoss', x: 1536, y: 880, n: 1 }, { type: 'armored', x: 1810, y: 786, n: 1 },
      { type: 'bandit', x: 1950, y: 1130, n: 1 }, { type: 'lookout', x: 1960, y: 360, n: 1 },
    ],
    reinforce: [{ x: 1080, y: 1510 }, { x: 1264, y: 432 }, { x: 1900, y: 540 }, { x: 2050, y: 1130 }],
    zones: [
      { name: '货港入口', x: 0, y: 0, w: 520, h }, { name: '装卸通道', x: 520, y: 0, w: 660, h },
      { name: '中央装卸场', x: 1180, y: 0, w: 770, h }, { name: '外港闸口', x: 1950, y: 0, w: 450, h },
    ],
  };
}

function buildFoundry(): GameMap {
  const w = 2560, h = 1728;
  return {
    w, h,
    solids: raidSolids(w, h, [
      ['wall', 470, 540, 20, 320], ['wall', 470, 1010, 20, 280],
      ['rack', 730, 480, 214, 36], ['rack', 730, 674, 214, 36], ['rack', 730, 1100, 214, 36],
      ['wall', 1140, 570, 28, 180], ['wall', 1140, 985, 28, 180], ['wall', 1400, 613, 270, 24],
      ['wall', 1400, 1130, 270, 24], ['wall', 1710, 708, 28, 126], ['wall', 1710, 960, 28, 120],
      ['wall', 1944, 665, 24, 230], ['wall', 1944, 1020, 24, 220], ['rack', 2010, 560, 228, 32],
      ['wall', 2030, 1060, 218, 24], ['wall', 2248, 1084, 24, 160],
    ], [], [[830, 795], [1030, 985], [1245, 840], [1600, 1035], [1820, 845], [2150, 980]]),
    floors: [
      { name: '分拣车间', type: 'concrete', x: 560, y: 390, w: 490, h: 900 },
      { name: '炉前广场', type: 'concrete', x: 1110, y: 530, w: 650, h: 660 },
      { name: '控制室', type: 'tile', x: 1980, y: 1050, w: 290, h: 214 },
    ],
    decor: [], trees: [], water: [],
    roads: [[95, 480, 350, 452, 585, 370, 1060, 370, 1840, 367, 2330, 310], [100, 1260, 390, 1390, 800, 1475, 1700, 1475, 2330, 1420]],
    pads: [{ type: 'base', x: 375, y: 300, w: 1940, h: 1080 }, { type: 'platform', x: 2180, y: 1365, w: 290, h: 145 }],
    tracks: [1398, 1450],
    containers: [
      { type: 'medbox', x: 312, y: 515 }, { type: 'crate', x: 379, y: 1197 }, { type: 'toolbox', x: 740, y: 574 },
      { type: 'weaponcase', x: 958, y: 1000 }, { type: 'medbox', x: 1250, y: 710 }, { type: 'safe', x: 1550, y: 1080 },
      { type: 'pc', x: 2056, y: 1140 }, { type: 'pc', x: 2126, y: 1194 }, { type: 'safe', x: 2210, y: 1166 },
      { type: 'weaponcase', x: 2128, y: 525 }, { type: 'crate', x: 2060, y: 1440 },
    ],
    spawns: [{ x: 144, y: 490, chick: [630, 840] }, { x: 144, y: 1260, chick: [650, 1235] }],
    extractions: [{ id: 'A', name: '冷却塔侧门', x: 2330, y: 310, r: 82 }, { id: 'B', name: '铁路装运口', x: 2330, y: 1420, r: 82 }],
    enemySpots: [
      { type: 'chicken', x: 630, y: 840, n: 2 }, { type: 'bandit', x: 650, y: 1235, n: 1 },
      { type: 'armored', x: 942, y: 560, n: 1 }, { type: 'bandit', x: 1005, y: 1280, n: 1 },
      { type: 'foundryBoss', x: 1490, y: 875, n: 1 }, { type: 'elite', x: 1520, y: 458, n: 1 },
      { type: 'elite', x: 1845, y: 995, n: 1 }, { type: 'armored', x: 2075, y: 1275, n: 1 },
      { type: 'lookout', x: 2140, y: 383, n: 1 }, { type: 'lookout', x: 2120, y: 1450, n: 1 },
    ],
    reinforce: [{ x: 820, y: 240 }, { x: 995, y: 1560 }, { x: 1760, y: 550 }, { x: 2020, y: 1350 }],
    zones: [
      { name: '工厂外门', x: 0, y: 0, w: 530, h }, { name: '分拣车间', x: 530, y: 0, w: 590, h },
      { name: '炉前广场', x: 1120, y: 0, w: 660, h }, { name: '控制室与装运区', x: 1780, y: 0, w: 780, h },
    ],
  };
}

export function buildMap(): GameMap {
  const rnd = mulberry32(20251118);
  const R = (a: number, b: number) => a + rnd() * (b - a);
  const solids: Solid[] = [];
  let sid = 0;
  const addRect = (x: number, y: number, w: number, h: number, f: number, kind: string, v = 0) => {
    const s: Solid = { id: sid++, t: 0, x, y, w, h, r: 0, f, kind, v, stamp: 0, dead: false, hp: 0 };
    solids.push(s);
    return s;
  };
  const addCircle = (x: number, y: number, r: number, f: number, kind: string, hp = 0, v = 0) => {
    const s: Solid = { id: sid++, t: 1, x, y, w: 0, h: 0, r, f, kind, v, stamp: 0, dead: false, hp };
    solids.push(s);
    return s;
  };
  const WALL = F_MOVE | F_BULLET | F_SIGHT;
  const LOW = F_MOVE | F_BULLET;

  const floors: Floor[] = [];
  const containers: ContainerSpot[] = [];

  const hWall = (x0: number, x1: number, y: number, gaps: [number, number][]) => {
    const cuts = gaps.map(([p, gw]) => [x0 + (x1 - x0) * p - gw / 2, x0 + (x1 - x0) * p + gw / 2]).sort((a, b) => a[0] - b[0]);
    let cx = x0;
    for (const [a, b] of cuts) {
      if (a - cx > 2) addRect(cx, y, a - cx, T, WALL, 'wall');
      cx = b;
    }
    if (x1 - cx > 2) addRect(cx, y, x1 - cx, T, WALL, 'wall');
  };
  const vWall = (y0: number, y1: number, x: number, gaps: [number, number][]) => {
    const cuts = gaps.map(([p, gw]) => [y0 + (y1 - y0) * p - gw / 2, y0 + (y1 - y0) * p + gw / 2]).sort((a, b) => a[0] - b[0]);
    let cy = y0;
    for (const [a, b] of cuts) {
      if (a - cy > 2) addRect(x, cy, T, a - cy, WALL, 'wall');
      cy = b;
    }
    if (y1 - cy > 2) addRect(x, cy, T, y1 - cy, WALL, 'wall');
  };

  for (const b of BUILDINGS) {
    const { x, y, w, h } = b;
    floors.push({ x, y, w, h, type: b.floor, name: b.name });
    const g = (side: string) => b.doors.filter((d) => d[0] === side).map((d) => [d[1], d[2]] as [number, number]);
    hWall(x, x + w, y, g('n'));
    hWall(x, x + w, y + h - T, g('s'));
    vWall(y + T, y + h - T, x, g('w'));
    vWall(y + T, y + h - T, x + w - T, g('e'));
    for (const [axis, p, gp, gw] of b.parts || []) {
      if (axis === 'v') vWall(y + T, y + h - T, x + w * p - T / 2, [[gp, gw]]);
      else hWall(x + T, x + w - T, y + h * p - T / 2, [[gp, gw]]);
    }
    for (const r of b.racks || []) addRect(r[0], r[1], r[2], r[3], WALL, 'rack', Math.floor(rnd() * 3));
    for (const [type, rx, ry] of b.cont || []) {
      const d = CONTAINER_DEFS[type];
      const hw = d.w / 2, hh = d.h / 2;
      const cx = x + T + 6 + hw + rx * (w - 2 * T - 12 - 2 * hw);
      const cy = y + T + 6 + hh + ry * (h - 2 * T - 12 - 2 * hh);
      containers.push({ type, x: cx, y: cy });
    }
    for (const [type, ax, ay] of b.abs || []) containers.push({ type, x: ax, y: ay });
  }
  for (const [type, ax, ay] of OPEN_CONTAINERS) containers.push({ type, x: ax, y: ay });
  for (const c of containers) {
    const d = CONTAINER_DEFS[c.type];
    addRect(c.x - d.w / 2, c.y - d.h / 2, d.w, d.h, F_MOVE, 'container');
  }

  // Military base fence (blocks movement only)
  const fx0 = 1240, fy0 = 860, fx1 = 2060, fy1 = 1620, ft = 8, gate = 110;
  const fence = (x: number, y: number, w: number, h: number) => addRect(x, y, w, h, F_MOVE, 'fence');
  fence(fx0, fy0, 1650 - gate / 2 - fx0, ft);
  fence(1650 + gate / 2, fy0, fx1 - 1650 - gate / 2, ft);
  fence(fx0, fy1 - ft, 1650 - gate / 2 - fx0, ft);
  fence(1650 + gate / 2, fy1 - ft, fx1 - 1650 - gate / 2, ft);
  fence(fx0, fy0 + ft, ft, 1240 - gate / 2 - fy0 - ft);
  fence(fx0, 1240 + gate / 2, ft, fy1 - ft - 1240 - gate / 2);
  fence(fx1 - ft, fy0 + ft, ft, 1240 - gate / 2 - fy0 - ft);
  fence(fx1 - ft, 1240 + gate / 2, ft, fy1 - ft - 1240 - gate / 2);

  // Sandbags
  for (const s of [[1330, 960, 80, 22], [1900, 960, 22, 80], [1330, 1480, 22, 80], [1880, 1500, 80, 22], [1560, 1420, 110, 22], [1350, 1200, 22, 90], [1930, 1250, 22, 90], [2900, 2120, 80, 22], [260, 2120, 22, 70]]) addRect(s[0], s[1], s[2], s[3], LOW, 'sandbag');
  // Cars
  addRect(2330, 650, 120, 56, LOW, 'car', 0);
  addRect(2880, 470, 56, 120, LOW, 'car', 1);
  addRect(500, 1290, 110, 52, LOW, 'car', 2);
  addRect(1000, 600, 52, 110, LOW, 'car', 3);
  // Pumps
  for (const px of [2420, 2560, 2700]) addRect(px, 520, 28, 44, LOW, 'pump');
  // Shipping containers & train cars (tall, block sight)
  addRect(2780, 960, 170, 64, WALL, 'cargo', 0);
  addRect(2870, 1080, 64, 170, WALL, 'cargo', 1);
  addRect(2350, 1300, 64, 170, WALL, 'cargo', 2);
  addRect(1960, 1880, 150, 60, WALL, 'cargo', 1);
  addRect(1000, 1780, 64, 150, WALL, 'cargo', 0);
  for (const tc of [[700, 2040, 280, 50], [1060, 2040, 280, 50], [1900, 2120, 300, 50], [2280, 2040, 260, 50]]) addRect(tc[0], tc[1], tc[2], tc[3], WALL, 'train', Math.floor(rnd() * 3));
  // Hay
  for (const hs of [[1300, 560, 24], [1420, 660, 22], [1880, 590, 24], [1720, 690, 22]]) addCircle(hs[0], hs[1], hs[2], LOW, 'hay');
  // Explosive barrels
  for (const b of [[2470, 618], [2800, 640], [2640, 470], [1460, 960], [1960, 1540], [2760, 1272], [2470, 1262], [1180, 1960], [830, 1330], [1990, 470]]) addCircle(b[0], b[1], 14, LOW, 'barrel', 20);
  // Water
  const water = [
    { x: 540, y: 400, r: 150 }, { x: 680, y: 430, r: 120 }, { x: 450, y: 480, r: 105 }, { x: 610, y: 300, r: 95 },
  ];
  for (const wv of water) addCircle(wv.x, wv.y, wv.r - 6, F_MOVE, 'water');
  // Map bounds
  addRect(-200, -200, MAP_W + 400, 200, WALL, 'bound');
  addRect(-200, MAP_H, MAP_W + 400, 200, WALL, 'bound');
  addRect(-200, 0, 200, MAP_H, WALL, 'bound');
  addRect(MAP_W, 0, 200, MAP_H, WALL, 'bound');

  const roads: number[][] = [
    [-50, 830, 600, 842, 1150, 830, 2170, 830, 2700, 820, 3250, 832],
    [-50, 1720, 1150, 1720, 2170, 1720, 3250, 1714],
    [1150, -50, 1150, 830, 1150, 1720, 1150, 1990],
    [2170, -50, 2170, 830, 2170, 1720, 2170, 1990],
    [1150, 1240, 1250, 1240], [2050, 1240, 2170, 1240], [1650, 830, 1650, 870], [1650, 1610, 1650, 1720],
    [1610, 1720, 1610, 1830], [2170, 600, 2420, 610], [400, 842, 380, 990], [300, 1720, 290, 1530],
  ];

  const pads: Pad[] = [
    { type: 'base', x: 1248, y: 868, w: 804, h: 744 },
    { type: 'canopy', x: 2380, y: 490, w: 380, h: 110 },
    { type: 'parking', x: 2290, y: 630, w: 200, h: 100 },
    { type: 'field', x: 1262, y: 492, w: 680, h: 222 },
    { type: 'platform', x: 2860, y: 2150, w: 260, h: 120 },
    { type: 'helipad', x: 2990 - 75, y: 190 - 75, w: 150, h: 150 },
    { type: 'dock', x: 150, y: 260, w: 180, h: 34 },
  ];

  const extractions: ExtractDef[] = [
    { id: 'A', name: '湖畔码头', x: 190, y: 200, r: 85 },
    { id: 'B', name: '直升机坪', x: 2990, y: 190, r: 85 },
    { id: 'C', name: '下水道井口', x: 200, y: 2215, r: 85 },
    { id: 'D', name: '火车站台', x: 2990, y: 2210, r: 85 },
  ];

  const spawns: SpawnDef[] = [
    { x: 80, y: 900, chick: [470, 930] },
    { x: 1110, y: 105, chick: [1030, 420] },
    { x: 3120, y: 830, chick: [3060, 1180] },
    { x: 1620, y: 2290, chick: [1300, 2230] },
  ];

  const enemySpots: EnemySpot[] = [
    { type: 'bandit', x: 480, y: 1262, n: 1 }, { type: 'bandit', x: 330, y: 1255, n: 1 }, { type: 'bandit', x: 700, y: 1460, n: 1 },
    { type: 'bandit', x: 930, y: 420, n: 1 }, { type: 'bandit', x: 300, y: 560, n: 1 },
    { type: 'chicken', x: 1500, y: 610, n: 5 }, { type: 'lookout', x: 1440, y: 300, n: 1 }, { type: 'bandit', x: 1840, y: 470, n: 1 },
    { type: 'bandit', x: 2610, y: 470, n: 1 }, { type: 'bandit', x: 2650, y: 330, n: 1 }, { type: 'elite', x: 2900, y: 380, n: 1 },
    { type: 'goose', x: 1660, y: 1360, n: 1 }, { type: 'armored', x: 1420, y: 1300, n: 1 }, { type: 'elite', x: 1890, y: 1150, n: 1 }, { type: 'bandit', x: 1650, y: 960, n: 1 },
    { type: 'bandit', x: 2480, y: 1071, n: 1 }, { type: 'bandit', x: 2830, y: 1500, n: 1 }, { type: 'elite', x: 2810, y: 1290, n: 1 },
    { type: 'bandit', x: 1200, y: 1950, n: 1 }, { type: 'lookout', x: 2050, y: 2010, n: 1 }, { type: 'chicken', x: 620, y: 2250, n: 4 },
    { type: 'bandit', x: 1600, y: 1910, n: 1 }, { type: 'chicken', x: 2600, y: 1850, n: 4 },
  ];

  const reinforce = [
    { x: 60, y: 420 }, { x: 60, y: 1500 }, { x: 60, y: 1950 }, { x: 760, y: 60 }, { x: 2000, y: 60 }, { x: 2620, y: 60 },
    { x: 3140, y: 560 }, { x: 3140, y: 1500 }, { x: 3140, y: 1900 }, { x: 2450, y: 2350 }, { x: 860, y: 2350 }, { x: 1700, y: 1770 },
  ];

  const zones: Zone[] = [
    { name: '湖畔', x: 0, y: 0, w: 1100, h: 860 },
    { name: '农场', x: 1100, y: 0, w: 1100, h: 860 },
    { name: '加油站', x: 2200, y: 0, w: 1000, h: 860 },
    { name: '村庄', x: 0, y: 860, w: 1150, h: 940 },
    { name: '军事基地', x: 1150, y: 860, w: 1020, h: 940 },
    { name: '仓库区', x: 2170, y: 860, w: 1030, h: 940 },
    { name: '铁路货场', x: 0, y: 1800, w: 3200, h: 600 },
  ];

  // ---------- placement helpers ----------
  const distSeg = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
    const dx = bx - ax, dy = by - ay;
    const l2 = dx * dx + dy * dy || 1;
    let t = ((px - ax) * dx + (py - ay) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
  };
  const nearRoad = (x: number, y: number, pad: number) => {
    for (const r of roads) for (let i = 0; i + 3 < r.length; i += 2) if (distSeg(x, y, r[i], r[i + 1], r[i + 2], r[i + 3]) < 34 + pad) return true;
    return false;
  };
  const isFree = (x: number, y: number, pad: number, roadPad = pad) => {
    if (x < 30 || y < 30 || x > MAP_W - 30 || y > MAP_H - 30) return false;
    for (const f of floors) if (x > f.x - pad && x < f.x + f.w + pad && y > f.y - pad && y < f.y + f.h + pad) return false;
    for (const p of pads) if (p.type !== 'field' && x > p.x - pad && x < p.x + p.w + pad && y > p.y - pad && y < p.y + p.h + pad) return false;
    for (const s of solids) {
      if (s.kind === 'bound') continue;
      if (s.t === 0) { if (x > s.x - pad && x < s.x + s.w + pad && y > s.y - pad && y < s.y + s.h + pad) return false; }
      else if (Math.hypot(x - s.x, y - s.y) < s.r + pad + (s.kind === 'water' ? 24 : 0)) return false;
    }
    for (const e of extractions) if (Math.hypot(x - e.x, y - e.y) < e.r + pad + 10) return false;
    for (const s of spawns) if (Math.hypot(x - s.x, y - s.y) < 70 + pad) return false;
    for (const r of reinforce) if (Math.hypot(x - r.x, y - r.y) < 50 + pad) return false;
    for (const c of containers) if (Math.hypot(x - c.x, y - c.y) < 40 + pad) return false;
    for (const e of enemySpots) if (Math.hypot(x - e.x, y - e.y) < 30 + pad) return false;
    if (nearRoad(x, y, roadPad)) return false;
    return true;
  };

  const trees: Tree[] = [];
  let tries = 0;
  while (trees.length < 125 && tries < 6000) {
    tries++;
    const x = R(40, MAP_W - 40), y = R(40, MAP_H - 40);
    if (x > 1262 && x < 1942 && y > 492 && y < 714) continue;
    if (!isFree(x, y, 30)) continue;
    let ok = true;
    for (const t of trees) if (Math.hypot(t.x - x, t.y - y) < 70) { ok = false; break; }
    if (!ok) continue;
    const r = R(32, 46);
    trees.push({ x, y, r, v: Math.floor(rnd() * 3), solid: true });
    addCircle(x, y, 13, LOW, 'tree');
  }
  // rocks
  tries = 0;
  let rocks = 0;
  while (rocks < 26 && tries < 3000) {
    tries++;
    const x = R(40, MAP_W - 40), y = R(40, MAP_H - 40);
    if (!isFree(x, y, 26)) continue;
    let ok = true;
    for (const t of trees) if (Math.hypot(t.x - x, t.y - y) < 60) { ok = false; break; }
    if (!ok) continue;
    addCircle(x, y, R(13, 21), LOW, 'rock', 0, Math.floor(rnd() * 3));
    rocks++;
  }
  // border trees (decor only, outside play space)
  for (let x = -30; x < MAP_W + 60; x += R(55, 80)) {
    trees.push({ x, y: R(-40, -10), r: R(38, 52), v: Math.floor(rnd() * 3), solid: false });
    trees.push({ x, y: MAP_H + R(10, 40), r: R(38, 52), v: Math.floor(rnd() * 3), solid: false });
  }
  for (let y = 20; y < MAP_H; y += R(55, 80)) {
    trees.push({ x: R(-40, -10), y, r: R(38, 52), v: Math.floor(rnd() * 3), solid: false });
    trees.push({ x: MAP_W + R(10, 40), y, r: R(38, 52), v: Math.floor(rnd() * 3), solid: false });
  }

  const decor: Decor[] = [];
  const addDecor = (n: number, t: number, pad: number, sMin: number, sMax: number) => {
    let k = 0, tr = 0;
    while (k < n && tr < n * 8) {
      tr++;
      const x = R(20, MAP_W - 20), y = R(20, MAP_H - 20);
      if (!isFree(x, y, pad, -18)) continue;
      decor.push({ x, y, t, s: R(sMin, sMax), c: Math.floor(rnd() * 4), rot: R(0, Math.PI * 2) });
      k++;
    }
  };
  addDecor(70, 3, 18, 14, 24); // bushes
  addDecor(1100, 0, -4, 3, 7); // tufts
  addDecor(260, 1, -4, 2, 3.5); // flowers
  addDecor(170, 2, -2, 2, 5); // pebbles
  // crops
  for (let yy = 510; yy < 705; yy += 26) {
    for (let xx = 1280; xx < 1930; xx += 19) {
      let ok = true;
      for (const s of solids) if (s.t === 1 && s.kind === 'hay' && Math.hypot(xx - s.x, yy - s.y) < s.r + 14) ok = false;
      if (ok) decor.push({ x: xx + R(-2, 2), y: yy + R(-2, 2), t: 4, s: R(5, 7.5), c: Math.floor(rnd() * 3), rot: R(0, 6.28) });
    }
  }

  return {
    w: MAP_W, h: MAP_H, solids, floors, decor, trees, water, roads, pads, containers,
    extractions, spawns, enemySpots, reinforce, zones, tracks: [2060, 2140],
  };
}
