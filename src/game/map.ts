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
export interface ContainerSpot { type: string; x: number; y: number; fixedItem?: string }
export interface ExtractDef { id: string; name: string; x: number; y: number; r: number }
export interface SpawnDef { x: number; y: number; chick: [number, number] }
export interface EnemySpot { type: EnemyType; x: number; y: number; n: number }
export interface Pad { type: string; x: number; y: number; w: number; h: number }
export interface Zone { name: string; x: number; y: number; w: number; h: number }

/** 俯视角场景道具：由程序化 Canvas 绘制，车头/船头默认朝上，rot 为顺时针旋转弧度。 */
export interface SceneryProp {
  kind: 'delivery_truck' | 'pickup_truck' | 'dump_truck' | 'container_truck'
      | 'rowboat' | 'fishing_boat' | 'speedboat' | 'flatbed'
      | 'barrels' | 'bollard' | 'crane'
      | 'fountain' | 'duck_king_statue' | 'billboard' | 'vending_machine'
      | 'bed' | 'table_map_cup' | 'table_field_kit' | 'wood_chair'
      | 'bedside_cabinet' | 'potted_flower' | 'egg_nest' | 'ice_beacon'
      | 'wood_table' | 'wood_bench' | 'bar_stool' | 'metal_workbench'
      | 'stone_steps' | 'wood_steps' | 'duck_throne' | 'nest_cluster'
      | 'berry_bush' | 'thorn_bush' | 'crate_stack' | 'hay_bale'
      | 'king_vault_gate';
  x: number;
  y: number;
  rot: number;
  scale: number;
}

export interface GameMap {
  w: number;
  h: number;
  solids: Solid[];
  props: SceneryProp[];
  floors: Floor[];
  decor: Decor[];
  trees: Tree[];
  water: { x: number; y: number; r: number; w?: number; h?: number }[];
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

export type RaidMapId = 'island' | 'harbor' | 'foundry' | 'hatchery' | 'outpost' | 'mausoleum';

export interface RaidMapDef {
  id: RaidMapId;
  name: string;
  requiredExtracts: number;
  theme: string;
  loot: string;
  boss: EnemyType;
  /** All bosses present on the map; dual-boss maps list two. */
  bosses?: EnemyType[];
  /** Short difficulty label shown in the lobby. */
  difficulty: string;
  build: () => GameMap;
}

export const RAID_MAPS: readonly RaidMapDef[] = [
  { id: 'island', name: '鸭鸭岛', requiredExtracts: 0, theme: '农场与军事基地', loot: '通用补给、军械和保险箱', boss: 'goose', difficulty: '入门', build: buildMap },
  { id: 'harbor', name: '盐雾货港', requiredExtracts: 1, theme: '水道、装卸场与集装箱', loot: '码头补给、武器箱和船长航海日志', boss: 'harborBoss', difficulty: '普通', build: buildHarbor },
  { id: 'foundry', name: '赤炉工厂', requiredExtracts: 3, theme: '铸造线、炉前广场与控制室', loot: '控制室机箱、保险箱和封存炉芯', boss: 'foundryBoss', difficulty: '困难', build: buildFoundry },
  { id: 'hatchery', name: '腐叶孵化场', requiredExtracts: 5, theme: '沼泽育雏棚、孵化控制室与巢穴', loot: '巢穴补给、冰风 MP9 与鸭后金蛋', boss: 'broodQueen', difficulty: '精英 · 持续召怪', build: buildHatchery },
  { id: 'outpost', name: '霜锋哨站', requiredExtracts: 8, theme: '冰封机库、雷达站与冻土广场', loot: '军械库、传说枪械与双首领战利品', boss: 'frostMarshal', bosses: ['frostMarshal', 'ironGuard'], difficulty: '噩梦 · 双首领', build: buildOutpost },
  { id: 'mausoleum', name: '鸭王陵寝', requiredExtracts: 12, theme: '王陵回廊、双宝库与王座大厅', loot: '双宝库至臻物资、RPG 与鸭王御座', boss: 'duckKing', difficulty: '地狱 · 四招轮换', build: buildMausoleum },
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
  const wall = F_MOVE | F_BULLET | F_SIGHT;
  return {
    w: 1280, h: 760,
    solids: [
      // Divider between the entry room and the armoury room, with a wide doorway.
      { id: 0, t: 0, x: 560, y: 60, w: 22, h: 250, r: 0, f: wall, kind: 'wall', v: 0, stamp: 0, dead: false, hp: 0 },
      { id: 1, t: 0, x: 560, y: 450, w: 22, h: 250, r: 0, f: wall, kind: 'wall', v: 0, stamp: 0, dead: false, hp: 0 },
      // Light cover near the extraction for the final ambush.
      { id: 2, t: 0, x: 1000, y: 250, w: 22, h: 80, r: 0, f: wall, kind: 'cargo', v: 1, stamp: 0, dead: false, hp: 0 },
      { id: 3, t: 0, x: 1000, y: 430, w: 22, h: 80, r: 0, f: wall, kind: 'cargo', v: 2, stamp: 0, dead: false, hp: 0 },
    ],
    floors: [
      { x: 90, y: 200, w: 450, h: 360, type: 'concrete', name: '入口训练场' },
      { x: 600, y: 200, w: 590, h: 360, type: 'wood', name: '军械室' },
    ],
    decor: [], trees: [], water: [], roads: [], pads: [],
    // Crate 1 (armoury) gives a weapon, crate 2 gives supplies — handled in game.ts.
    containers: [{ type: 'weaponcase', x: 760, y: 300 }, { type: 'crate', x: 760, y: 500 }],
    extractions: [{ id: 'A', name: '训练出口', x: 1190, y: 380, r: 62 }],
    spawns: [{ x: 150, y: 380, chick: [400, 380] }],
    // starting chicken blocks the path to the armoury door
    enemySpots: [{ type: 'chicken', x: 400, y: 380, n: 2 }],
    reinforce: [], zones: [], tracks: [], props: [],
  };
}

type Cover = [kind: 'wall' | 'cargo' | 'rack' | 'car' | 'fence' | 'pump', x: number, y: number, w: number, h: number];

interface RoomDef {
  name: string;
  x: number; y: number; w: number; h: number;
  floor: FloorType;
  /** Doors per side: 'n'|'s'|'e'|'w' -> position along the wall (0..1) */
  doors?: [string, number][];
  /** Interior partitions: [orientation 'h'|'v', x, y, length, thickness] */
  parts?: [string, number, number, number, number][];
  /** Containers at fractional positions inside the room */
  loot?: [string, number, number][];
  /** Displays/racks: [x, y, w, h] absolute coordinates */
  racks?: [number, number, number, number][];
  kind?: string; // wall material variant
}

/** Deterministic ground scatter so industrial/harbour maps aren't bare. */
function scatterDecor(w: number, h: number, count: number, seed: number): Decor[] {
  const rnd = mulberry32(seed * 7919 + 13);
  const out: Decor[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: 60 + rnd() * (w - 120),
      y: 60 + rnd() * (h - 120),
      t: rnd() < 0.5 ? 2 : 0, // pebbles & tufts suit concrete/asphalt
      s: 3 + rnd() * 5,
      c: Math.floor(rnd() * 4),
      rot: rnd() * TAU_STATIC,
    });
  }
  return out;
}
const TAU_STATIC = Math.PI * 2;

type BiomeStyle = 'harbor' | 'foundry' | 'hatchery' | 'outpost' | 'mausoleum';

/** Add deterministic, non-blocking ground art without covering routes or combat landmarks. */
function withBiomeArt(map: GameMap, biome: BiomeStyle): GameMap {
  const settings: { seed: number; count: number } = {
    harbor: { seed: 31, count: 70 }, foundry: { seed: 47, count: 85 },
    hatchery: { seed: 59, count: 190 }, outpost: { seed: 71, count: 160 }, mausoleum: { seed: 83, count: 180 },
  }[biome];
  const rnd = mulberry32(settings.seed * 7919 + 29);
  const decor: Decor[] = [];
  const distToSegment = (x: number, y: number, ax: number, ay: number, bx: number, by: number) => {
    const dx = bx - ax, dy = by - ay, length = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / length));
    return Math.hypot(x - ax - dx * t, y - ay - dy * t);
  };
  const waterDistance = (x: number, y: number) => Math.min(Infinity, ...map.water.map((water) => {
    if (water.w && water.h) {
      const dx = Math.max(0, Math.abs(x - water.x) - water.w / 2);
      const dy = Math.max(0, Math.abs(y - water.y) - water.h / 2);
      return Math.hypot(dx, dy);
    }
    return Math.max(0, Math.hypot(x - water.x, y - water.y) - water.r);
  }));
  const blocked = (x: number, y: number, pad: number) => {
    if (x < 36 || y < 36 || x > map.w - 36 || y > map.h - 36) return true;
    if (map.floors.some((f) => x > f.x - pad && x < f.x + f.w + pad && y > f.y - pad && y < f.y + f.h + pad)) return true;
    if (map.pads.some((p) => p.type !== 'field' && x > p.x - pad && x < p.x + p.w + pad && y > p.y - pad && y < p.y + p.h + pad)) return true;
    if (map.solids.some((s) => {
      if (s.kind === 'bound' || !(s.f & F_MOVE)) return false;
      if (s.t === 0) return x > s.x - pad && x < s.x + s.w + pad && y > s.y - pad && y < s.y + s.h + pad;
      return Math.hypot(x - s.x, y - s.y) < s.r + pad;
    })) return true;
    if (map.roads.some((road) => {
      for (let i = 0; i + 3 < road.length; i += 2) if (distToSegment(x, y, road[i], road[i + 1], road[i + 2], road[i + 3]) < 56 + pad) return true;
      return false;
    })) return true;
    if (map.extractions.some((e) => Math.hypot(x - e.x, y - e.y) < e.r + pad + 16)) return true;
    if (map.spawns.some((s) => Math.hypot(x - s.x, y - s.y) < 65 + pad)) return true;
    if (map.enemySpots.some((e) => Math.hypot(x - e.x, y - e.y) < 72 + pad)) return true;
    if (map.reinforce.some((r) => Math.hypot(x - r.x, y - r.y) < 48 + pad)) return true;
    if (map.containers.some((c) => Math.hypot(x - c.x, y - c.y) < 45 + pad)) return true;
    if (map.props.some((p) => Math.hypot(x - p.x, y - p.y) < 72 * p.scale + pad)) return true;
    if (map.water.some((w) => {
      if (w.w && w.h) return Math.abs(x - w.x) < w.w / 2 + pad && Math.abs(y - w.y) < w.h / 2 + pad;
      return Math.hypot(x - w.x, y - w.y) < w.r + pad;
    })) return true;
    return false;
  };
  const existing = [...map.decor];
  for (let i = 0, tries = 0; i < settings.count && tries < settings.count * 18; tries++) {
    const roll = rnd();
    let t: number;
    if (biome === 'hatchery') t = roll < 0.48 ? 1 : roll < 0.72 ? 5 : roll < 0.9 ? 3 : 0;
    else if (biome === 'mausoleum') t = roll < 0.46 ? 1 : roll < 0.68 ? 3 : 2;
    else if (biome === 'outpost') t = roll < 0.18 ? 1 : roll < 0.45 ? 2 : 0;
    else if (biome === 'harbor') t = roll < 0.12 ? 1 : roll < 0.23 ? 5 : roll < 0.58 ? 0 : 2;
    else t = roll < 0.58 ? 0 : 2;
    const x = 36 + rnd() * (map.w - 72), y = 36 + rnd() * (map.h - 72);
    const shore = waterDistance(x, y);
    if (t === 5 ? shore < 8 || shore > 135 : shore < 48) continue;
    const size = t === 3 ? 11 + rnd() * 10 : t === 5 ? 8 + rnd() * 7 : 3 + rnd() * 5;
    if (blocked(x, y, size + 5)) continue;
    if (existing.some((d) => Math.hypot(x - d.x, y - d.y) < size + d.s + 6)) continue;
    if (decor.some((d) => Math.hypot(x - d.x, y - d.y) < size + d.s + 7)) continue;
    decor.push({ x, y, t, s: size, c: Math.floor(rnd() * 4), rot: rnd() * TAU_STATIC });
    i++;
  }

  const trees = biome === 'outpost'
    ? [0.04, 0.14, 0.25, 0.75, 0.86, 0.96].flatMap((f, i) => [
        { x: map.w * f, y: 62 + (i % 2) * 18, r: 40 + (i % 3) * 4, v: i % 3, solid: false },
        { x: map.w * f, y: map.h - 62 - (i % 2) * 18, r: 40 + ((i + 1) % 3) * 4, v: (i + 1) % 3, solid: false },
      ]).concat([
        { x: 56, y: map.h * 0.32, r: 42, v: 0, solid: false }, { x: 58, y: map.h * 0.67, r: 44, v: 1, solid: false },
        { x: map.w - 58, y: map.h * 0.3, r: 40, v: 2, solid: false }, { x: map.w - 56, y: map.h * 0.68, r: 43, v: 0, solid: false },
      ])
    : map.trees;
  return { ...map, decor: [...map.decor, ...decor], trees };
}

interface RoomResult {
  cover: Cover[];
  floors: Floor[];
  containers: ContainerSpot[];
  decor: Decor[];
  pads: Pad[];
}

/**
 * Turn a room definition into enclosing walls with real door gaps, interior
 * partitions, floor, loot and decoration. Shared by harbor & foundry so those
 * maps get the same indoor/outdoor depth as the island.
 */
function buildRooms(rooms: RoomDef[]): RoomResult {
  const cover: Cover[] = [];
  const floors: Floor[] = [];
  const containers: ContainerSpot[] = [];
  const decor: Decor[] = [];
  const pads: Pad[] = [];
  const TH = 18; // wall thickness
  // Bosses reach a 70-unit diameter. Leave room for their collider and the 32-unit nav grid.
  const GAP = 104;

  const wallKind = (kind?: string) => (kind === 'rack' ? 'rack' : 'wall') as 'wall' | 'cargo' | 'rack';

  for (const room of rooms) {
    const { x, y, w, h } = room;
    const roomCoverStart = cover.length;
    floors.push({ name: room.name, x: x + TH, y: y + TH, w: w - TH * 2, h: h - TH * 2, type: room.floor });
    pads.push({ type: 'base', x: x + TH, y: y + TH, w: w - TH * 2, h: h - TH * 2 });

    const doorAt = (side: string) => (room.doors ?? []).filter((d) => d[0] === side).map((d) => d[1]);

    const horizontal = (side: 'n' | 's', yy: number) => {
      const gaps = doorAt(side).sort((a, b) => a - b);
      let cursor = x;
      for (const p of gaps) {
        const gx = x + w * p - GAP / 2;
        if (gx > cursor) cover.push([wallKind(room.kind), cursor, yy, gx - cursor, TH]);
        cursor = gx + GAP;
      }
      if (x + w > cursor) cover.push([wallKind(room.kind), cursor, yy, x + w - cursor, TH]);
    };
    const vertical = (side: 'e' | 'w', xx: number) => {
      const gaps = doorAt(side).sort((a, b) => a - b);
      let cursor = y;
      for (const p of gaps) {
        const gy = y + h * p - GAP / 2;
        if (gy > cursor) cover.push([wallKind(room.kind), xx, cursor, TH, gy - cursor]);
        cursor = gy + GAP;
      }
      if (y + h > cursor) cover.push([wallKind(room.kind), xx, cursor, TH, y + h - cursor]);
    };
    horizontal('n', y);
    horizontal('s', y + h - TH);
    vertical('w', x);
    vertical('e', x + w - TH);

    // Keep partition channels wide enough for the largest boss collider too.
    const CHANNEL = 100;
    for (const [axis, px, py, len, thick] of room.parts ?? []) {
      if (axis === 'h') {
        const roomRight = x + w - TH;
        const maxLen = Math.max(0, roomRight - px - CHANNEL);
        const safeLen = Math.min(len, maxLen);
        if (safeLen >= 40) cover.push([wallKind(room.kind), px, py, safeLen, thick]);
      } else {
        const roomBottom = y + h - TH;
        const maxLen = Math.max(0, roomBottom - py - CHANNEL);
        const safeLen = Math.min(len, maxLen);
        if (safeLen >= 40) cover.push([wallKind(room.kind), px, py, thick, safeLen]);
      }
    }
    for (const r of room.racks ?? []) cover.push(['rack', r[0], r[1], r[2], r[3]]);
    const blockers = cover.slice(roomCoverStart);
    const clear = (px: number, py: number) => !blockers.some((c) =>
      px > c[1] - 26 && px < c[1] + c[3] + 26 && py > c[2] - 26 && py < c[2] + c[4] + 26);
    const spaced = (px: number, py: number, type: string) => {
      const d = CONTAINER_DEFS[type];
      return containers.every((other) => {
        const od = CONTAINER_DEFS[other.type];
        return Math.abs(px - other.x) >= (d.w + od.w) / 2 + 12
          || Math.abs(py - other.y) >= (d.h + od.h) / 2 + 12;
      });
    };
    const placeable = (px: number, py: number, type: string) => {
      const d = CONTAINER_DEFS[type];
      return px >= x + TH + d.w / 2 + 4 && px <= x + w - TH - d.w / 2 - 4
        && py >= y + TH + d.h / 2 + 4 && py <= y + h - TH - d.h / 2 - 4
        && clear(px, py) && spaced(px, py, type);
    };
    for (const [type, fx, fy] of room.loot ?? []) {
      let lx = x + TH + (w - TH * 2) * fx;
      let ly = y + TH + (h - TH * 2) * fy;
      // Search nearby floor tiles and keep every searchable object visibly separate.
      if (!placeable(lx, ly, type)) {
        let found = false;
        for (let r = 1; r <= 6 && !found; r++) {
          for (let dx = -r; dx <= r && !found; dx++) {
            for (let dy = -r; dy <= r && !found; dy++) {
              const nx = lx + dx * 34, ny = ly + dy * 34;
              if (placeable(nx, ny, type)) { lx = nx; ly = ny; found = true; }
            }
          }
        }
        if (!found) {
          const d = CONTAINER_DEFS[type];
          const candidates: { x: number; y: number; distance: number }[] = [];
          for (let py = y + TH + d.h / 2 + 4; py <= y + h - TH - d.h / 2 - 4; py += 24) {
            for (let px = x + TH + d.w / 2 + 4; px <= x + w - TH - d.w / 2 - 4; px += 24) {
              candidates.push({ x: px, y: py, distance: Math.hypot(px - lx, py - ly) });
            }
          }
          candidates.sort((a, b) => a.distance - b.distance);
          const spot = candidates.find((candidate) => placeable(candidate.x, candidate.y, type));
          if (!spot) continue;
          lx = spot.x; ly = spot.y;
        }
      }
      containers.push({ type, x: Math.round(lx), y: Math.round(ly) });
    }
    // A few floor markings for visual texture (t=0 small debris, t=1 crate shadow, t=2 stripe)
    for (let i = 0; i < 4; i++) {
      const dx = x + 30 + ((i * 71) % Math.max(1, w - 60));
      const dy = y + 30 + ((i * 53) % Math.max(1, h - 60));
      decor.push({ x: dx, y: dy, t: i % 3, s: 0.7 + (i % 2) * 0.5, c: i % 2, rot: (i * 1.3) % 3 });
    }
  }
  return { cover, floors, containers, decor, pads };
}

function raidSolids(w: number, h: number, cover: Cover[], water: GameMap['water'], barrels: [number, number][]): Solid[] {
  const wall = F_MOVE | F_BULLET | F_SIGHT;
  const low = F_MOVE | F_BULLET; // props block movement/bullets but not sight
  const solids: Solid[] = [
    ...cover.map(([kind, x, y, width, height], id): Solid => ({
      id, t: 0, x, y, w: width, h: height, r: 0,
      f: kind === 'car' || kind === 'pump' || kind === 'fence' ? low : wall,
      kind, v: id % 4, stamp: 0, dead: false, hp: 0,
    })),
  ];
  for (const [x, y, width, height] of [[-32, -32, w + 64, 32], [-32, h, w + 64, 32], [-32, 0, 32, h], [w, 0, 32, h]]) {
    solids.push({ id: solids.length, t: 0, x, y, w: width, h: height, r: 0, f: wall, kind: 'bound', v: 0, stamp: 0, dead: false, hp: 0 });
  }
  for (const pool of water) {
    if (pool.w && pool.h) {
      solids.push({ id: solids.length, t: 0, x: pool.x - pool.w / 2, y: pool.y - pool.h / 2, w: pool.w, h: pool.h, r: 0, f: F_MOVE, kind: 'water', v: 0, stamp: 0, dead: false, hp: 0 });
    } else {
      solids.push({ id: solids.length, t: 1, x: pool.x, y: pool.y, w: 0, h: 0, r: pool.r - 6, f: F_MOVE, kind: 'water', v: 0, stamp: 0, dead: false, hp: 0 });
    }
  }
  for (const [x, y] of barrels) {
    solids.push({ id: solids.length, t: 1, x, y, w: 0, h: 0, r: 14, f: F_MOVE | F_BULLET, kind: 'barrel', v: 0, stamp: 0, dead: false, hp: 20 });
  }
  return solids;
}

/** Move an authored raid layout into a larger world while rebuilding its outer walls. */
function reframeMap(map: GameMap, dx: number, dy: number, w: number, h: number): GameMap {
  const point = <T extends { x: number; y: number }>(item: T): T => ({ ...item, x: item.x + dx, y: item.y + dy });
  const solids = map.solids.filter((solid) => solid.kind !== 'bound').map((solid) => ({ ...solid, x: solid.x + dx, y: solid.y + dy, stamp: 0 }));
  let nextId = solids.reduce((max, solid) => Math.max(max, solid.id), -1) + 1;
  const wall = F_MOVE | F_BULLET | F_SIGHT;
  const bounds: Solid[] = [
    [-32, -32, w + 64, 32], [-32, h, w + 64, 32], [-32, 0, 32, h], [w, 0, 32, h],
  ].map(([x, y, bw, bh]) => ({ id: nextId++, t: 0, x, y, w: bw, h: bh, r: 0, f: wall, kind: 'bound', v: 0, stamp: 0, dead: false, hp: 0 }));
  const shiftPolyline = (line: number[]) => line.map((value, index) => value + (index % 2 ? dy : dx));
  return {
    ...map, w, h, solids: [...solids, ...bounds],
    props: map.props.map(point), floors: map.floors.map(point), decor: map.decor.map(point),
    trees: map.trees.map(point), water: map.water.map(point), roads: map.roads.map(shiftPolyline),
    pads: map.pads.map(point), containers: map.containers.map(point), extractions: map.extractions.map(point),
    spawns: map.spawns.map(point), enemySpots: map.enemySpots.map(point), reinforce: map.reinforce.map(point),
    zones: map.zones.map(point), tracks: map.tracks.map((y) => y + dy),
  };
}

function buildHarbor(): GameMap {
  const w = 2400, h = 1664;
  // Open harbour water along the north edge. Land piers (gaps between the
  // rectangles) jut into the sea: the main quay and the boarding pier.
  const water = [
    { x: 575, y: 20, r: 0, w: 950, h: 320 },   // western basin (x100..1050)
    { x: 1700, y: 20, r: 0, w: 700, h: 320 },  // eastern basin (x1350..2050)
  ];
  const rooms = buildRooms([
    { name: '北岸补给站', x: 210, y: 570, w: 274, h: 180, floor: 'wood', doors: [['s', 0.5], ['e', 0.6]], loot: [['crate', 0.24, 0.3], ['duffel', 0.7, 0.62], ['toolbox', 0.5, 0.75]] },
    { name: '南侧货棚', x: 682, y: 1270, w: 300, h: 186, floor: 'wood', doors: [['n', 0.45], ['w', 0.5]], parts: [['v', 862, 1300, 120, 16]], loot: [['toolbox', 0.3, 0.35], ['weaponcase', 0.75, 0.6], ['crate', 0.5, 0.8]] },
    { name: '港区办公室', x: 1180, y: 560, w: 260, h: 190, floor: 'tile', doors: [['s', 0.55], ['w', 0.4]], parts: [['v', 1380, 580, 140, 16]], loot: [['pc', 0.12, 0.2], ['desktop', 0.38, 0.2], ['laptop', 0.35, 0.65], ['safe', 0.86, 0.9], ['medbox', 0.55, 0.9]] },
    { name: '船长仓储', x: 1640, y: 1180, w: 310, h: 210, floor: 'concrete', doors: [['n', 0.4], ['e', 0.5]], racks: [[1690, 1290, 170, 22], [1690, 1350, 170, 22]], loot: [['weaponcase', 0.22, 0.22], ['safe', 0.9, 0.15], ['duffel', 0.58, 0.16]] },
    { name: '码头仓库', x: 1080, y: 200, w: 270, h: 210, floor: 'concrete', doors: [['s', 0.5], ['e', 0.55]], parts: [['h', 1150, 300, 150, 16]], loot: [['toolbox', 0.2, 0.25], ['weaponcase', 0.85, 0.3], ['crate', 0.5, 0.8]] },
    { name: '南部堆场', x: 700, y: 1450, w: 320, h: 170, floor: 'concrete', doors: [['n', 0.5], ['e', 0.5]], racks: [[740, 1520, 200, 24], [740, 1570, 200, 24]], loot: [['crate', 0.2, 0.2], ['duffel', 0.9, 0.25], ['safe', 0.9, 0.85]] },
  ]);
  const extraCover: Cover[] = [
    ['cargo', 540, 740, 220, 68], ['cargo', 875, 680, 208, 68], ['cargo', 898, 996, 218, 68],
    ['cargo', 1300, 1060, 220, 68], ['cargo', 1660, 650, 210, 68],
    ['cargo', 1600, 1070, 140, 60], ['cargo', 1860, 835, 70, 154], ['cargo', 1980, 440, 200, 68],
    ['cargo', 560, 990, 180, 60], ['cargo', 1080, 700, 70, 130], ['cargo', 1500, 1440, 170, 60],
    // quay-side cargo, bollards & crane bases (all on land piers, y>180)
    ['cargo', 300, 260, 180, 56], ['cargo', 700, 240, 150, 50], ['cargo', 1580, 260, 170, 56],
    ['wall', 2140, 240, 20, 120], ['cargo', 2220, 200, 130, 46],
    // southern yard — stacked freight
    ['cargo', 300, 1490, 170, 58], ['cargo', 1180, 1500, 210, 58], ['cargo', 1700, 1480, 200, 58],
    ['wall', 2050, 1480, 18, 130],
    // harbour dressing: dock fencing (no stray cars / fuel pumps)
    ['fence', 200, 1000, 16, 180], ['fence', 2240, 620, 16, 160],
  ];
  const props: SceneryProp[] = [
    // 陆地载具：复用已验证无重叠的旧车辆点位，横放用 PI/2
    { kind: 'delivery_truck', x: 402, y: 803, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'pickup_truck', x: 1325, y: 954, rot: 0, scale: 1.05 },
    { kind: 'dump_truck', x: 2174, y: 1005, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'container_truck', x: 940, y: 1200, rot: Math.PI / 2, scale: 1.0 },
    { kind: 'flatbed', x: 700, y: 1180, rot: Math.PI / 2, scale: 1.0 },
    // 水面小船：两片海域内，正俯视船头朝上
    { kind: 'rowboat', x: 520, y: 92, rot: 0, scale: 1.0 },
    { kind: 'fishing_boat', x: 820, y: 105, rot: 0, scale: 1.05 },
    { kind: 'speedboat', x: 1750, y: 98, rot: 0, scale: 1.0 },
    // 码头设施
    { kind: 'barrels', x: 1580, y: 985, scale: 1.0, rot: 0 },
    { kind: 'bollard', x: 1117, y: 150, scale: 1.0, rot: 0 },
    { kind: 'bollard', x: 2118, y: 192, scale: 1.0, rot: 0 },
    { kind: 'crane', x: 2220, y: 1190, scale: 1.1, rot: 0 },
    { kind: 'vending_machine', x: 430, y: 480, rot: 0, scale: 0.8 },
    { kind: 'billboard', x: 850, y: 470, rot: 0, scale: 0.85 },
    { kind: 'table_field_kit', x: 1320, y: 610, rot: 0, scale: 0.75 },
    // 码头休息角与货场杂物
    { kind: 'wood_table', x: 1516, y: 636, rot: 0, scale: 0.9 },
    { kind: 'bar_stool', x: 1600, y: 590, rot: 0, scale: 0.95 },
    { kind: 'bar_stool', x: 1578, y: 690, rot: 0, scale: 0.95 },
    { kind: 'wood_bench', x: 1520, y: 540, rot: 0, scale: 0.86 },
    { kind: 'crate_stack', x: 762, y: 902, rot: 0, scale: 0.95 },
    { kind: 'wood_steps', x: 1150, y: 516, rot: 0, scale: 0.85 },
  ];
  return withBiomeArt({
    w, h, water, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[570, 828], [1117, 822], [1480, 714], [1770, 987], [2010, 710]]),
    floors: [
      ...rooms.floors,
      { name: '中央装卸场', type: 'concrete', x: 1180, y: 574, w: 770, h: 600 },
      { name: '主码头引道', type: 'concrete', x: 1050, y: 190, w: 300, h: 240 },
      { name: '登船码头', type: 'concrete', x: 2050, y: 190, w: 290, h: 220 },
      { name: '南侧堆货区', type: 'concrete', x: 1150, y: 1450, w: 800, h: 160 },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 90, 3)], trees: [], tracks: [],
    roads: [
      // Two horizontal arterial roads (west entrance -> east gate)
      [100, 830, 2300, 830],
      [100, 1370, 2300, 1370],
      // Two vertical avenues linking them, aligned with the map's grid
      [450, 300, 450, 1560],
      [1180, 190, 1180, 1560],
      [1900, 300, 1900, 1560],
      // Spurs from arterials to the quay and the boarding pier
      [1180, 830, 1180, 190],
      [2200, 1370, 2200, 210],
    ],
    pads: [
      { type: 'dock', x: 407, y: 610, w: 780, h: 34 },
      // piers reaching north into the harbour water (on the land gaps)
      { type: 'dock', x: 1080, y: 30, w: 250, h: 180 },
      { type: 'dock', x: 2070, y: 30, w: 280, h: 180 },
      ...rooms.pads,
      { type: 'platform', x: 2050, y: 1280, w: 288, h: 181 },
    ],
    containers: [
      ...rooms.containers,
      { type: 'crate', x: 420, y: 1190 }, { type: 'crate', x: 806, y: 867 },
      { type: 'medbox', x: 1246, y: 1103 }, { type: 'weaponcase', x: 1570, y: 754 }, { type: 'safe', x: 1640, y: 924 },
      { type: 'crate', x: 2090, y: 547 }, { type: 'duffel', x: 2050, y: 1330 }, { type: 'toolbox', x: 1480, y: 1380 },
      { type: 'crate', x: 380, y: 280 }, { type: 'toolbox', x: 1050, y: 240, fixedItem: 'dmr' }, { type: 'duffel', x: 1840, y: 260, fixedItem: 'ak' },
      { type: 'crate', x: 420, y: 1560 }, { type: 'weaponcase', x: 1480, y: 1530, fixedItem: 'awmlegend' }, { type: 'safe', x: 1880, y: 1550, fixedItem: 'm4legend' },
      { type: 'vending', x: 430, y: 480 }, { type: 'treasure_chest', x: 1480, y: 1460 }, { type: 'coin_pile', x: 400, y: 1450 },
    ],
    spawns: [
      { x: 144, y: 470, chick: [676, 910] }, { x: 144, y: 1248, chick: [676, 1160] },
      { x: 1200, y: 470, chick: [1280, 560] }, { x: 2140, y: 1540, chick: [1960, 1420] },
    ],
    extractions: [{ id: 'A', name: '北岸登船梯', x: 2200, y: 120, r: 70 }, { id: 'B', name: '南门货运道', x: 2200, y: 1370, r: 78 }],
    enemySpots: [
      { type: 'chicken', x: 676, y: 910, n: 3 }, { type: 'chicken', x: 676, y: 1160, n: 2 },
      { type: 'bandit', x: 950, y: 852, n: 1 }, { type: 'bandit', x: 1100, y: 1240, n: 1 },
      { type: 'bandit', x: 1250, y: 620, n: 1 }, { type: 'armored', x: 1420, y: 1290, n: 1 },
      { type: 'harborBoss', x: 1536, y: 880, n: 1 }, { type: 'armored', x: 1810, y: 786, n: 1 },
      { type: 'bandit', x: 1950, y: 1130, n: 1 }, { type: 'lookout', x: 1960, y: 360, n: 1 },
      { type: 'bandit', x: 480, y: 240, n: 1 }, { type: 'lookout', x: 1540, y: 200, n: 1 },
      { type: 'armored', x: 1320, y: 150, n: 1 }, { type: 'bandit', x: 1400, y: 1530, n: 1 },
      { type: 'lookout', x: 1820, y: 1520, n: 1 },
      { type: 'shield', x: 1660, y: 940, n: 1 }, { type: 'shield', x: 1080, y: 1330, n: 1 },
      { type: 'hen', x: 1480, y: 1080, n: 1 }, { type: 'hen', x: 2050, y: 640, n: 1 },
    ],
    reinforce: [{ x: 1080, y: 1510 }, { x: 1264, y: 432 }, { x: 1900, y: 540 }, { x: 2050, y: 1130 }, { x: 900, y: 200 }, { x: 1600, y: 1520 }],
    zones: [
      { name: '货港入口', x: 0, y: 0, w: 520, h }, { name: '装卸通道', x: 520, y: 0, w: 660, h },
      { name: '中央装卸场', x: 1180, y: 0, w: 770, h }, { name: '外港闸口', x: 1950, y: 0, w: 450, h },
    ],
  }, 'harbor');
}

function buildFoundry(): GameMap {
  const w = 2560, h = 1728;
  const rooms = buildRooms([
    { name: '分拣车间', x: 470, y: 380, w: 620, h: 980, floor: 'concrete', kind: 'rack',
      doors: [['n', 0.25], ['s', 0.7], ['e', 0.5]],
      parts: [['h', 500, 700, 220, 18], ['h', 830, 1000, 240, 18], ['v', 720, 420, 200, 18]],
      racks: [[730, 480, 214, 36], [730, 674, 214, 36], [730, 1100, 214, 36], [540, 1300, 210, 34]],
      loot: [['toolbox', 0.22, 0.14], ['medbox', 0.78, 0.24], ['weaponcase', 0.3, 0.52], ['crate', 0.82, 0.9]] },
    { name: '炉前控制室', x: 1140, y: 540, w: 570, h: 660, floor: 'concrete',
      doors: [['w', 0.5], ['e', 0.35], ['s', 0.5]],
      parts: [['v', 1400, 613, 270, 24], ['h', 1480, 1080, 200, 20]],
      loot: [['pc', 0.16, 0.14], ['desktop', 0.31, 0.14], ['laptop', 0.24, 0.42], ['safe', 0.86, 0.22], ['medbox', 0.22, 0.6], ['weaponcase', 0.7, 0.52]] },
    { name: '主控室', x: 1980, y: 1020, w: 300, h: 250, floor: 'tile',
      doors: [['w', 0.45], ['n', 0.6]],
      parts: [['v', 2070, 1040, 80, 16]],
      loot: [['pc', 0.12, 0.86], ['pc', 0.62, 0.86], ['laptop', 0.37, 0.52], ['safe', 0.94, 0.62]] },
    { name: '铸模仓库', x: 1944, y: 480, w: 310, h: 240, floor: 'concrete',
      doors: [['s', 0.4], ['w', 0.6]],
      racks: [[2010, 540, 180, 26], [2110, 660, 130, 26]],
      loot: [['weaponcase', 0.1, 0.14], ['crate', 0.9, 0.14], ['toolbox', 0.3, 0.9]] },
    { name: '备件库', x: 350, y: 100, w: 300, h: 210, floor: 'concrete', doors: [['s', 0.5], ['e', 0.5]], racks: [[390, 160, 170, 24], [390, 220, 170, 24]], loot: [['toolbox', 0.1, 0.14], ['weaponcase', 0.9, 0.14], ['crate', 0.5, 0.9]] },
    { name: '机车库', x: 1560, y: 100, w: 330, h: 220, floor: 'concrete', doors: [['s', 0.45], ['w', 0.6]], parts: [['v', 1720, 120, 90, 16]], loot: [['crate', 0.15, 0.3], ['safe', 0.85, 0.85], ['medbox', 0.5, 0.85]] },
    { name: '炉渣堆场', x: 1120, y: 1480, w: 340, h: 190, floor: 'concrete', doors: [['n', 0.5], ['e', 0.5]], racks: [[1160, 1550, 210, 24]], loot: [['crate', 0.2, 0.2], ['duffel', 0.85, 0.25], ['safe', 0.5, 0.85]] },
  ]);
  const extraCover: Cover[] = [
    ['wall', 1140, 570, 28, 180], ['wall', 1140, 985, 28, 180],
    ['wall', 1710, 660, 28, 60], ['wall', 1710, 960, 28, 120],
    ['wall', 1944, 665, 24, 230], ['wall', 1944, 1020, 24, 90],
    ['wall', 2248, 1084, 24, 160],
    ['rack', 900, 1420, 230, 34], ['cargo', 1600, 1420, 200, 60], ['cargo', 640, 250, 180, 58],
    // northern service road — tanks and barriers
    ['cargo', 900, 120, 190, 56], ['cargo', 1320, 150, 160, 54], ['cargo', 2060, 120, 180, 56],
    ['wall', 240, 350, 20, 110], ['wall', 2280, 360, 20, 120],
    // southern slag yard — machinery & barriers
    ['cargo', 400, 1520, 190, 58], ['cargo', 1620, 1540, 180, 58], ['cargo', 2140, 1520, 180, 58],
    ['wall', 980, 1520, 18, 120],
    // foundry dressing: safety rails (vehicles/tanks now rendered as scenery props)
    ['fence', 240, 620, 16, 200], ['fence', 2380, 620, 16, 200],
  ];
  const props: SceneryProp[] = [
    // 厂区车辆：复用旧 car 点位，横放 PI/2
    { kind: 'dump_truck', x: 688, y: 1412, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'flatbed', x: 1848, y: 1452, rot: Math.PI / 2, scale: 1.0 },
    { kind: 'container_truck', x: 2324, y: 950, rot: 0, scale: 1.0 },
    { kind: 'delivery_truck', x: 978, y: 228, rot: Math.PI / 2, scale: 1.0 },
    // 厂区设施：原 pump 点位改为油桶组
    { kind: 'barrels', x: 1022, y: 543, scale: 1.0, rot: 0 },
    { kind: 'barrels', x: 1960, y: 943, scale: 1.0, rot: 0 },
    { kind: 'crane', x: 409, y: 371, scale: 1.1, rot: 0 },
    { kind: 'vending_machine', x: 2160, y: 1080, rot: 0, scale: 0.8 },
    // 车间外的工作台、石阶与料箱堆
    { kind: 'metal_workbench', x: 1004, y: 302, rot: 0, scale: 0.85 },
    { kind: 'stone_steps', x: 1240, y: 1392, rot: 0, scale: 0.9 },
    { kind: 'crate_stack', x: 1782, y: 1180, rot: 0, scale: 0.95 },
  ];
  return withBiomeArt({
    w, h, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], [], [[830, 795], [1030, 985], [1245, 840], [1600, 1035], [1820, 845], [2150, 980], [760, 1300], [1880, 1180]]),
    floors: [
      ...rooms.floors,
      { name: '炉前广场', type: 'concrete', x: 1110, y: 530, w: 650, h: 660 },
      { name: '北检修道', type: 'concrete', x: 200, y: 120, w: 1000, h: 160 },
      { name: '南炉渣区', type: 'concrete', x: 1050, y: 1500, w: 900, h: 160 },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 80, 5)], trees: [], water: [],
    roads: [
      // Foundry grid: two east-west arterials, three north-south service lanes
      [100, 370, 2460, 370],
      [100, 1470, 2460, 1470],
      [560, 120, 560, 1600],
      [1140, 120, 1140, 1600],
      [1720, 120, 1720, 1600],
      [2330, 310, 2330, 1470],
    ],
    pads: [{ type: 'base', x: 375, y: 300, w: 1940, h: 1080 }, ...rooms.pads, { type: 'platform', x: 2180, y: 1365, w: 290, h: 145 }],
    tracks: [1398, 1450],
    containers: [
      ...rooms.containers,
      { type: 'medbox', x: 312, y: 515 }, { type: 'crate', x: 379, y: 1197 },
      { type: 'weaponcase', x: 958, y: 1060 }, { type: 'medbox', x: 1250, y: 710 }, { type: 'safe', x: 1560, y: 1040 },
      { type: 'weaponcase', x: 2160, y: 850 }, { type: 'crate', x: 2060, y: 1440 }, { type: 'duffel', x: 1780, y: 1400 },
      { type: 'crate', x: 780, y: 250, fixedItem: 'ak' }, { type: 'toolbox', x: 1400, y: 220, fixedItem: 'dmr' }, { type: 'medbox', x: 2200, y: 230, fixedItem: 'minigun' },
      { type: 'crate', x: 560, y: 1580 }, { type: 'weaponcase', x: 1480, y: 1580, fixedItem: 'awmlegend' }, { type: 'safe', x: 2050, y: 1590, fixedItem: 'm4legend' },
      { type: 'vending', x: 2160, y: 1080 }, { type: 'treasure_chest', x: 900, y: 1540 }, { type: 'coin_pile', x: 1870, y: 1570 },
    ],
    spawns: [
      { x: 144, y: 490, chick: [630, 840] }, { x: 144, y: 1260, chick: [650, 1235] },
      { x: 760, y: 120, chick: [840, 250] }, { x: 2340, y: 1560, chick: [2120, 1430] },
    ],
    extractions: [{ id: 'A', name: '冷却塔侧门', x: 2330, y: 310, r: 82 }, { id: 'B', name: '铁路装运口', x: 2330, y: 1420, r: 82 }],
    enemySpots: [
      { type: 'chicken', x: 630, y: 840, n: 2 }, { type: 'bandit', x: 650, y: 1235, n: 1 },
      { type: 'armored', x: 942, y: 560, n: 1 }, { type: 'bandit', x: 1005, y: 1280, n: 1 },
      { type: 'bandit', x: 830, y: 1160, n: 1 }, { type: 'armored', x: 1580, y: 1220, n: 1 },
      { type: 'foundryBoss', x: 1490, y: 875, n: 1 }, { type: 'elite', x: 1520, y: 458, n: 1 },
      { type: 'elite', x: 1845, y: 995, n: 1 }, { type: 'armored', x: 2320, y: 1180, n: 1 },
      { type: 'lookout', x: 2140, y: 383, n: 1 }, { type: 'lookout', x: 2160, y: 1480, n: 1 },
      { type: 'bandit', x: 500, y: 220, n: 1 }, { type: 'armored', x: 1420, y: 200, n: 1 },
      { type: 'elite', x: 1750, y: 210, n: 1 }, { type: 'bandit', x: 1500, y: 1560, n: 1 },
      { type: 'armored', x: 2250, y: 1550, n: 1 },
      { type: 'shield', x: 1580, y: 660, n: 1 }, { type: 'shield', x: 1180, y: 1280, n: 1 },
      { type: 'hen', x: 1700, y: 1250, n: 1 }, { type: 'hen', x: 720, y: 700, n: 1 },
    ],
    reinforce: [{ x: 820, y: 240 }, { x: 995, y: 1560 }, { x: 1760, y: 550 }, { x: 2020, y: 1350 }, { x: 1000, y: 180 }, { x: 1700, y: 1560 }],
    zones: [
      { name: '工厂外门', x: 0, y: 0, w: 530, h }, { name: '分拣车间', x: 530, y: 0, w: 590, h },
      { name: '炉前广场', x: 1120, y: 0, w: 660, h }, { name: '控制室与装运区', x: 1780, y: 0, w: 780, h },
    ],
  }, 'foundry');
}

/** 腐叶孵化场：沼泽水洼切割通道，鸭后在中央巢穴持续孵出杂兵。 */
function buildHatchery(): GameMap {
  const w = 2300, h = 1600;
  const water = [
    { x: 900, y: 80, r: 0, w: 420, h: 150 },
    { x: 1900, y: 1450, r: 0, w: 380, h: 130 },
  ];
  const rooms = buildRooms([
    { name: '育雏大棚', x: 300, y: 250, w: 520, h: 360, floor: 'wood', doors: [['s', 0.5], ['e', 0.7]],
      parts: [['h', 340, 420, 240, 16]], loot: [['crate', 0.2, 0.25], ['toolbox', 0.75, 0.3], ['medbox', 0.5, 0.85]] },
    { name: '孵化控制室', x: 1060, y: 220, w: 340, h: 260, floor: 'tile', doors: [['s', 0.5], ['w', 0.5]],
      loot: [['pc', 0.15, 0.2], ['desktop', 0.4, 0.2], ['laptop', 0.34, 0.64], ['safe', 0.85, 0.25], ['medbox', 0.25, 0.8]] },
    { name: '饲料仓', x: 1750, y: 280, w: 360, h: 260, floor: 'wood', doors: [['s', 0.45], ['w', 0.6]],
      racks: [[1800, 340, 170, 22], [1800, 400, 170, 22]], loot: [['crate', 0.2, 0.2], ['weaponcase', 0.8, 0.2], ['duffel', 0.5, 0.85]] },
    { name: '观察哨', x: 330, y: 1120, w: 280, h: 230, floor: 'wood', doors: [['n', 0.5], ['e', 0.5]],
      loot: [['toolbox', 0.2, 0.2], ['medbox', 0.8, 0.8]] },
    { name: '孵化工棚', x: 1150, y: 1180, w: 320, h: 220, floor: 'concrete', doors: [['n', 0.4], ['w', 0.5]],
      loot: [['weaponcase', 0.2, 0.25], ['crate', 0.8, 0.25], ['safe', 0.5, 0.8]] },
    { name: '东侧巢室', x: 1830, y: 1030, w: 330, h: 250, floor: 'wood', doors: [['n', 0.5], ['w', 0.5]],
      loot: [['medbox', 0.2, 0.2], ['crate', 0.8, 0.3], ['duffel', 0.5, 0.85]] },
  ]);
  const extraCover: Cover[] = [
    ['cargo', 600, 720, 220, 68], ['cargo', 1000, 760, 180, 60], ['cargo', 1480, 700, 200, 70],
    ['cargo', 1900, 700, 160, 60], ['cargo', 450, 900, 190, 60], ['cargo', 1250, 960, 200, 60],
    ['cargo', 1750, 1330, 180, 55], ['cargo', 700, 1380, 180, 55],
    ['wall', 820, 980, 18, 140], ['wall', 1600, 900, 18, 160],
    ['fence', 240, 650, 16, 180], ['fence', 2160, 650, 16, 180],
  ];
  const props: SceneryProp[] = [
    { kind: 'delivery_truck', x: 880, y: 620, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'pickup_truck', x: 1570, y: 860, rot: Math.PI / 2, scale: 1.0 },
    { kind: 'rowboat', x: 760, y: 92, rot: 0, scale: 0.9 },
    { kind: 'barrels', x: 1010, y: 1120, scale: 1.0, rot: 0 },
    { kind: 'crane', x: 2040, y: 900, scale: 1.05, rot: 0 },
    { kind: 'vending_machine', x: 1260, y: 390, rot: 0, scale: 0.8 },
    { kind: 'egg_nest', x: 1220, y: 835, rot: 0, scale: 1.5 },
    { kind: 'bed', x: 700, y: 500, rot: 0, scale: 0.8 },
    { kind: 'bedside_cabinet', x: 760, y: 420, rot: 0, scale: 0.55 },
    { kind: 'potted_flower', x: 355, y: 520, rot: 0, scale: 0.75 },
    // 腐叶区植被与孵化杂物
    { kind: 'nest_cluster', x: 1452, y: 642, rot: 0, scale: 1.05 },
    { kind: 'berry_bush', x: 830, y: 690, rot: 0, scale: 0.95 },
    { kind: 'berry_bush', x: 1652, y: 1186, rot: 0, scale: 1.0 },
    { kind: 'thorn_bush', x: 986, y: 1180, rot: 0, scale: 1.0 },
    { kind: 'crate_stack', x: 1836, y: 902, rot: 0, scale: 0.95 },
  ];
  return withBiomeArt(reframeMap({
    w, h, water, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[1180, 640], [1520, 1080], [820, 1300]]),
    floors: [
      ...rooms.floors,
      { name: '孵化中庭', type: 'concrete', x: 700, y: 600, w: 1200, h: 400 },
      { name: '鸭后孵化巢', type: 'wood', x: 960, y: 590, w: 520, h: 460 },
      { name: '西侧腐叶道', type: 'concrete', x: 110, y: 700, w: 420, h: 370 },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 85, 7)], trees: [], tracks: [],
    roads: [[80, 760, 2220, 760], [80, 1360, 2220, 1360], [880, 120, 880, 1500], [1600, 120, 1600, 1500], [1250, 760, 1250, 1060]],
    pads: [{ type: 'field', x: 900, y: 620, w: 500, h: 260 }, ...rooms.pads, { type: 'platform', x: 2100, y: 1420, w: 180, h: 110 }],
    containers: [
      ...rooms.containers,
      { type: 'crate', x: 780, y: 900 }, { type: 'medbox', x: 1120, y: 1060 }, { type: 'duffel', x: 1680, y: 1340 },
      { type: 'crate', x: 1000, y: 400, fixedItem: 'minigun' },
      { type: 'weaponcase', x: 1960, y: 1160, fixedItem: 'frostmp9' },
      { type: 'crate', x: 1280, y: 1300, fixedItem: 'rpg' },
      { type: 'treasure_chest', x: 1435, y: 960 },
      { type: 'vending', x: 1260, y: 390 }, { type: 'treasure_chest', x: 900, y: 1460 }, { type: 'coin_pile', x: 1900, y: 1450 },
    ],
    spawns: [
      { x: 110, y: 430, chick: [560, 760] }, { x: 1120, y: 120, chick: [1200, 600] },
      { x: 2200, y: 520, chick: [1850, 760] }, { x: 200, y: 1500, chick: [700, 1360] },
    ],
    extractions: [{ id: 'A', name: '北岸吊桥', x: 120, y: 220, r: 72 }, { id: 'B', name: '东侧排水门', x: 2160, y: 1430, r: 72 }],
    enemySpots: [
      { type: 'broodQueen', x: 1220, y: 790, n: 1 },
      { type: 'chicken', x: 980, y: 760, n: 4 }, { type: 'chicken', x: 1720, y: 880, n: 3 },
      { type: 'hen', x: 760, y: 900, n: 1 }, { type: 'hen', x: 1600, y: 980, n: 1 },
      { type: 'bandit', x: 700, y: 650, n: 1 }, { type: 'bandit', x: 1550, y: 700, n: 1 },
      { type: 'bandit', x: 1950, y: 880, n: 1 }, { type: 'armored', x: 1080, y: 960, n: 1 },
      { type: 'elite', x: 1750, y: 620, n: 1 }, { type: 'elite', x: 500, y: 1200, n: 1 },
      { type: 'shield', x: 1350, y: 1080, n: 1 }, { type: 'lookout', x: 2000, y: 1250, n: 1 },
      { type: 'bandit', x: 420, y: 500, n: 1 }, { type: 'armored', x: 1900, y: 1200, n: 1 },
    ],
    reinforce: [{ x: 150, y: 900 }, { x: 900, y: 150 }, { x: 2000, y: 220 }, { x: 2150, y: 900 }, { x: 400, y: 1480 }, { x: 1700, y: 1500 }, { x: 1150, y: 1400 }],
    zones: [
      { name: '北缘育雏棚', x: -350, y: -250, w: 3000, h: 500 },
      { name: '西侧育雏棚', x: -350, y: 250, w: 1200, h: 650 },
      { name: '中央孵化中庭', x: 850, y: 250, w: 900, h: 650 },
      { name: '鸭后蛋巢', x: 1750, y: 250, w: 900, h: 650 },
      { name: '南侧腐叶区', x: -350, y: 900, w: 3000, h: 950 },
    ],
  }, 350, 250, 3000, 2100), 'hatchery');
}

/** 霜锋哨站：两名首领分守冻土广场两端，冰湖把战场切成两条推进路线。 */
function buildOutpost(): GameMap {
  const w = 2600, h = 1700;
  const water = [
    { x: 900, y: 820, r: 0, w: 420, h: 220 },
    { x: 2250, y: 820, r: 0, w: 300, h: 200 },
  ];
  const rooms = buildRooms([
    { name: '冰封机库', x: 300, y: 300, w: 560, h: 380, floor: 'concrete', doors: [['s', 0.4], ['e', 0.6], ['n', 0.5]],
      racks: [[370, 360, 200, 24], [370, 430, 200, 24]], loot: [['crate', 0.15, 0.2], ['weaponcase', 0.8, 0.2], ['medbox', 0.5, 0.85]] },
    { name: '雷达站', x: 1100, y: 180, w: 380, h: 300, floor: 'tile', doors: [['s', 0.5], ['w', 0.5]],
      loot: [['pc', 0.18, 0.2], ['desktop', 0.38, 0.2], ['laptop', 0.55, 0.62], ['safe', 0.85, 0.25], ['toolbox', 0.3, 0.85]] },
    { name: '北兵营', x: 1750, y: 250, w: 420, h: 300, floor: 'wood', doors: [['s', 0.5], ['w', 0.6]],
      loot: [['duffel', 0.2, 0.25], ['crate', 0.8, 0.3], ['medbox', 0.5, 0.85]] },
    { name: '补给仓', x: 350, y: 1120, w: 380, h: 300, floor: 'concrete', doors: [['n', 0.5], ['e', 0.5]],
      racks: [[400, 1180, 180, 22], [400, 1250, 180, 22]], loot: [['weaponcase', 0.15, 0.2], ['safe', 0.85, 0.25], ['crate', 0.5, 0.85]] },
    { name: '指挥所', x: 1150, y: 1080, w: 440, h: 340, floor: 'concrete', doors: [['n', 0.4], ['w', 0.5], ['e', 0.5]],
      parts: [['v', 1330, 1140, 160, 20]], loot: [['pc', 0.15, 0.2], ['pc', 0.55, 0.2], ['laptop', 0.36, 0.62], ['safe', 0.85, 0.8]] },
    { name: '南机修库', x: 1900, y: 1150, w: 400, h: 300, floor: 'concrete', doors: [['n', 0.5], ['w', 0.5]],
      loot: [['weaponcase', 0.2, 0.2], ['crate', 0.8, 0.3], ['medbox', 0.5, 0.85]] },
  ]);
  const extraCover: Cover[] = [
    ['cargo', 550, 760, 200, 64], ['cargo', 1250, 760, 220, 64], ['cargo', 1650, 620, 180, 60],
    ['cargo', 2050, 760, 200, 60], ['cargo', 450, 950, 190, 58], ['cargo', 1000, 1250, 190, 58],
    ['cargo', 2100, 1350, 180, 58], ['wall', 1450, 720, 20, 140], ['wall', 1450, 960, 20, 140],
    ['wall', 2350, 500, 18, 160], ['fence', 250, 800, 16, 180], ['fence', 2480, 1050, 16, 180],
  ];
  const props: SceneryProp[] = [
    { kind: 'dump_truck', x: 700, y: 960, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'container_truck', x: 1450, y: 980, rot: 0, scale: 1.0 },
    { kind: 'pickup_truck', x: 2150, y: 560, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'rowboat', x: 880, y: 820, rot: 0, scale: 0.9 },
    { kind: 'barrels', x: 1180, y: 700, scale: 1.0, rot: 0 },
    { kind: 'crane', x: 2350, y: 1350, scale: 1.1, rot: 0 },
    { kind: 'vending_machine', x: 1780, y: 1450, rot: 0, scale: 0.8 },
    { kind: 'ice_beacon', x: 850, y: 520, rot: 0, scale: 1.15 },
    { kind: 'ice_beacon', x: 2060, y: 1080, rot: Math.PI / 4, scale: 1.1 },
    { kind: 'bed', x: 730, y: 560, rot: 0, scale: 0.78 },
    // 冻土广场的休整点、石阶与料箱
    { kind: 'stone_steps', x: 1260, y: 1010, rot: 0, scale: 0.9 },
    { kind: 'crate_stack', x: 1660, y: 1304, rot: 0, scale: 0.95 },
    { kind: 'metal_workbench', x: 1660, y: 1410, rot: Math.PI / 2, scale: 0.85 },
    { kind: 'wood_bench', x: 842, y: 1062, rot: 0, scale: 0.86 },
  ];
  return withBiomeArt(reframeMap({
    w, h, water, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[1180, 1000], [1620, 860], [2050, 1080], [600, 1320]]),
    floors: [
      ...rooms.floors,
      { name: '冰封中庭', type: 'concrete', x: 900, y: 700, w: 1100, h: 340 },
      { name: '霜羽元帅雪丘', type: 'concrete', x: 700, y: 430, w: 500, h: 380 },
      { name: '铁壁统领擂台', type: 'concrete', x: 1690, y: 840, w: 560, h: 440 },
      { name: '西侧冻土路', type: 'concrete', x: 120, y: 700, w: 400, h: 380 },
      { name: '东侧广场', type: 'concrete', x: 1900, y: 960, w: 560, h: 160 },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 95, 11)], trees: [], tracks: [],
    roads: [[80, 700, 2520, 700], [80, 1020, 2520, 1020], [850, 120, 850, 1580], [1650, 120, 1650, 1580], [2350, 300, 2350, 1450]],
    pads: [...rooms.pads, { type: 'platform', x: 2320, y: 180, w: 210, h: 130 }, { type: 'base', x: 900, y: 700, w: 1100, h: 340 }],
    containers: [
      ...rooms.containers,
      { type: 'crate', x: 760, y: 1050 }, { type: 'medbox', x: 1300, y: 1400 }, { type: 'duffel', x: 2200, y: 1000 },
      { type: 'weaponcase', x: 1360, y: 420, fixedItem: 'awmlegend' },
      { type: 'safe', x: 2100, y: 1270, fixedItem: 'm4legend' },
      { type: 'crate', x: 500, y: 1200, fixedItem: 'rpg' },
      { type: 'vending', x: 1780, y: 1450 }, { type: 'treasure_chest', x: 1220, y: 1450 }, { type: 'coin_pile', x: 900, y: 1460 },
    ],
    spawns: [
      { x: 110, y: 520, chick: [700, 800] }, { x: 1200, y: 100, chick: [1300, 600] },
      { x: 2500, y: 380, chick: [2100, 700] }, { x: 180, y: 1570, chick: [700, 1360] },
    ],
    extractions: [{ id: 'A', name: '北岭撤离台', x: 2430, y: 170, r: 76 }, { id: 'B', name: '南岭运输口', x: 2430, y: 1500, r: 76 }],
    enemySpots: [
      { type: 'frostMarshal', x: 980, y: 600, n: 1 }, { type: 'ironGuard', x: 1800, y: 1010, n: 1 },
      { type: 'chicken', x: 730, y: 810, n: 3 }, { type: 'chicken', x: 1900, y: 700, n: 3 },
      { type: 'bandit', x: 620, y: 700, n: 1 }, { type: 'bandit', x: 1300, y: 620, n: 1 },
      { type: 'bandit', x: 1650, y: 1080, n: 1 }, { type: 'bandit', x: 2200, y: 920, n: 1 },
      { type: 'elite', x: 1520, y: 880, n: 1 }, { type: 'elite', x: 2120, y: 1380, n: 1 },
      { type: 'armored', x: 1180, y: 900, n: 1 }, { type: 'armored', x: 1980, y: 1180, n: 1 },
      { type: 'shield', x: 1080, y: 1180, n: 1 }, { type: 'shield', x: 1720, y: 720, n: 1 },
      { type: 'hen', x: 1450, y: 1300, n: 1 }, { type: 'hen', x: 700, y: 1320, n: 1 },
      { type: 'lookout', x: 2150, y: 150, n: 1 }, { type: 'lookout', x: 2300, y: 1550, n: 1 },
    ],
    reinforce: [{ x: 150, y: 950 }, { x: 780, y: 120 }, { x: 1500, y: 150 }, { x: 2500, y: 700 }, { x: 2450, y: 1180 }, { x: 1000, y: 1580 }, { x: 1900, y: 1600 }],
    zones: [
      { name: '北缘雷达雪坡', x: -300, y: -250, w: 3200, h: 650 },
      { name: '西侧机库与元帅雪丘', x: -300, y: 400, w: 1200, h: 1050 },
      { name: '冻土中央走廊', x: 900, y: 400, w: 900, h: 1050 },
      { name: '铁壁擂台与东哨所', x: 1800, y: 400, w: 1100, h: 1050 },
      { name: '南侧运输坡', x: -300, y: 1450, w: 3200, h: 500 },
    ],
  }, 300, 250, 3200, 2200), 'outpost');
}

/** 鸭王陵寝：双宝库提供顶级装备，鸭王在大厅轮换四种招式。 */
function buildMausoleum(): GameMap {
  const w = 2800, h = 1800;
  const water = [
    { x: 1000, y: 250, r: 0, w: 260, h: 100 },
    { x: 1900, y: 900, r: 0, w: 200, h: 120 },
  ];
  const rooms = buildRooms([
    { name: '王座大厅', x: 1050, y: 650, w: 760, h: 560, floor: 'concrete',
      doors: [['n', 0.5], ['s', 0.5], ['w', 0.5], ['e', 0.5]],
      loot: [['safe', 0.15, 0.2], ['weaponcase', 0.85, 0.2], ['medbox', 0.5, 0.85]] },
    { name: '西宝库', x: 350, y: 350, w: 420, h: 340, floor: 'tile', doors: [['s', 0.5], ['e', 0.6]],
      loot: [['safe', 0.2, 0.2], ['pc', 0.8, 0.25], ['crate', 0.5, 0.85]] },
    { name: '东宝库', x: 2050, y: 350, w: 420, h: 340, floor: 'tile', doors: [['s', 0.5], ['w', 0.6]],
      loot: [['safe', 0.2, 0.2], ['pc', 0.8, 0.25], ['crate', 0.5, 0.85]] },
    { name: '禁卫营', x: 450, y: 1250, w: 500, h: 340, floor: 'concrete', doors: [['n', 0.5], ['e', 0.5]],
      racks: [[520, 1320, 200, 24], [520, 1400, 200, 24]], loot: [['weaponcase', 0.2, 0.2], ['crate', 0.8, 0.3], ['medbox', 0.5, 0.85]] },
    { name: '鸭王私人宝库', x: 1900, y: 1300, w: 560, h: 400, floor: 'tile', doors: [['n', 0.5], ['w', 0.5]],
      loot: [['safe', 0.17, 0.18], ['weaponcase', 0.83, 0.18], ['treasure_chest', 0.5, 0.5], ['safe', 0.18, 0.82], ['duffel', 0.82, 0.82]] },
    { name: '回廊哨', x: 1150, y: 140, w: 360, h: 280, floor: 'wood', doors: [['s', 0.5], ['e', 0.5]],
      loot: [['crate', 0.2, 0.2], ['toolbox', 0.8, 0.3]] },
    { name: '南库', x: 1350, y: 1400, w: 380, h: 260, floor: 'concrete', doors: [['n', 0.5], ['w', 0.5]],
      loot: [['weaponcase', 0.2, 0.2], ['duffel', 0.8, 0.3]] },
  ]);
  const extraCover: Cover[] = [
    ['wall', 1020, 600, 20, 180], ['wall', 1800, 600, 20, 180],
    ['wall', 1020, 1100, 20, 180], ['wall', 1800, 1100, 20, 180],
    ['wall', 900, 1400, 18, 180], ['wall', 2500, 800, 18, 200],
    ['cargo', 600, 800, 200, 60], ['cargo', 2050, 850, 200, 60], ['cargo', 1750, 1500, 190, 58],
    ['cargo', 650, 1600, 190, 58], ['cargo', 2300, 650, 170, 56],
    ['fence', 250, 850, 16, 240], ['fence', 2540, 1250, 16, 220],
  ];
  const props: SceneryProp[] = [
    { kind: 'container_truck', x: 2500, y: 1600, rot: 0, scale: 1.0 },
    { kind: 'dump_truck', x: 300, y: 1050, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'flatbed', x: 1600, y: 1650, rot: Math.PI / 2, scale: 1.0 },
    { kind: 'barrels', x: 900, y: 700, scale: 1.0, rot: 0 },
    { kind: 'crane', x: 2450, y: 250, scale: 1.1, rot: 0 },
    { kind: 'duck_king_statue', x: 1400, y: 500, rot: 0, scale: 1.0 },
    { kind: 'fountain', x: 1610, y: 500, rot: 0, scale: 0.95 },
    { kind: 'king_vault_gate', x: 2180, y: 1284, rot: 0, scale: 1.25 },
    { kind: 'table_map_cup', x: 1320, y: 320, rot: 0, scale: 0.9 },
    { kind: 'wood_chair', x: 1320, y: 386, rot: 0, scale: 0.78 },
    { kind: 'vending_machine', x: 2600, y: 1080, rot: 0, scale: 0.8 },
    // 王座大厅：鸭王宝座、神道石阶与侧厅陈设
    { kind: 'duck_throne', x: 1450, y: 758, rot: 0, scale: 1.18 },
    { kind: 'stone_steps', x: 1400, y: 598, rot: 0, scale: 0.9 },
    { kind: 'wood_table', x: 1156, y: 826, rot: 0, scale: 0.9 },
    { kind: 'crate_stack', x: 2058, y: 1602, rot: 0, scale: 0.95 },
  ];
  return withBiomeArt(reframeMap({
    w, h, water, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[1150, 580], [1780, 1180], [820, 1080], [2300, 1000]]),
    floors: [
      ...rooms.floors,
      { name: '王陵广场', type: 'concrete', x: 900, y: 600, w: 1000, h: 700 },
      { name: '王家秘库前厅', type: 'tile', x: 1850, y: 1280, w: 610, h: 430 },
      { name: '神道', type: 'tile', x: 1300, y: 80, w: 220, h: 560 },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 100, 13)], trees: [], tracks: [],
    roads: [[120, 1000, 2680, 1000], [120, 1550, 2680, 1550], [250, 120, 250, 1650], [1400, 100, 1400, 1700], [2550, 120, 2550, 1650]],
    pads: [...rooms.pads, { type: 'platform', x: 2450, y: 1550, w: 250, h: 140 }, { type: 'base', x: 1000, y: 650, w: 800, h: 600 }],
    containers: [
      ...rooms.containers,
      { type: 'medbox', x: 880, y: 1180 }, { type: 'crate', x: 2100, y: 1080 },
      { type: 'weaponcase', x: 500, y: 450, fixedItem: 'rpg' },
      { type: 'safe', x: 2250, y: 500, fixedItem: 'awmlegend' },
      { type: 'weaponcase', x: 2100, y: 1400, fixedItem: 'm4legend' },
      { type: 'crate', x: 1550, y: 250, fixedItem: 'minigun' },
      { type: 'safe', x: 1500, y: 1490, fixedItem: 'frostmp9' },
      { type: 'vending', x: 2600, y: 1080 }, { type: 'treasure_chest', x: 800, y: 520 }, { type: 'coin_pile', x: 1960, y: 520 },
      { type: 'treasure_chest', x: 2000, y: 1540 }, { type: 'coin_pile', x: 2340, y: 1540 },
    ],
    spawns: [
      { x: 110, y: 600, chick: [620, 800] }, { x: 1350, y: 100, chick: [1400, 520] },
      { x: 2680, y: 600, chick: [2350, 800] }, { x: 200, y: 1700, chick: [700, 1500] },
    ],
    extractions: [{ id: 'A', name: '西门神道', x: 130, y: 200, r: 78 }, { id: 'B', name: '东陵货运口', x: 2650, y: 1650, r: 78 }],
    enemySpots: [
      { type: 'duckKing', x: 1450, y: 930, n: 1 },
      { type: 'elite', x: 1180, y: 860, n: 1 }, { type: 'elite', x: 1900, y: 700, n: 1 },
      { type: 'elite', x: 620, y: 700, n: 1 }, { type: 'elite', x: 2350, y: 1250, n: 1 },
      { type: 'shield', x: 1120, y: 1120, n: 1 }, { type: 'shield', x: 1850, y: 1150, n: 1 },
      { type: 'shield', x: 2300, y: 900, n: 1 }, { type: 'armored', x: 850, y: 620, n: 1 },
      { type: 'armored', x: 2050, y: 1120, n: 1 }, { type: 'armored', x: 700, y: 1480, n: 1 },
      { type: 'hen', x: 1300, y: 1250, n: 1 }, { type: 'hen', x: 2200, y: 600, n: 1 },
      { type: 'hen', x: 600, y: 1000, n: 1 }, { type: 'lookout', x: 1300, y: 400, n: 1 },
      { type: 'lookout', x: 2500, y: 1450, n: 1 }, { type: 'bandit', x: 500, y: 1000, n: 1 },
      { type: 'bandit', x: 2000, y: 1050, n: 1 }, { type: 'chicken', x: 900, y: 1550, n: 4 },
    ],
    reinforce: [{ x: 150, y: 1050 }, { x: 1150, y: 120 }, { x: 2150, y: 180 }, { x: 2650, y: 900 }, { x: 2650, y: 1400 }, { x: 750, y: 1720 }, { x: 1800, y: 1720 }],
    zones: [
      { name: '北侧神道与殿廊', x: -300, y: -250, w: 3400, h: 700 },
      { name: '西侧禁卫与西宝库', x: -300, y: 450, w: 1200, h: 1000 },
      { name: '王座大厅', x: 900, y: 450, w: 900, h: 1000 },
      { name: '东侧王家秘库', x: 1800, y: 450, w: 1300, h: 1000 },
      { name: '南侧外陵与运输道', x: -300, y: 1450, w: 3400, h: 550 },
    ],
  }, 300, 250, 3400, 2300), 'mausoleum');
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
  containers.push({ type: 'vending', x: 2690, y: 340 });
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
  // 车辆与油桶已改为 scenery props 的纯视觉资产，不再生成简易 car/pump 碰撞体
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
    { type: 'shield', x: 2350, y: 860, n: 1 }, { type: 'shield', x: 900, y: 1720, n: 1 },
    { type: 'hen', x: 2050, y: 1600, n: 1 }, { type: 'hen', x: 600, y: 2050, n: 1 },
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

  const props: SceneryProp[] = [
    // 加油站区：原车辆/油泵点位，换成程序化载具与油桶
    { kind: 'delivery_truck', x: 2390, y: 678, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'pickup_truck', x: 2908, y: 530, rot: 0, scale: 1.05 },
    { kind: 'barrels', x: 2560, y: 542, scale: 1.0, rot: 0 },
    { kind: 'barrels', x: 2700, y: 542, scale: 1.0, rot: 0 },
    { kind: 'flatbed', x: 555, y: 1316, rot: Math.PI / 2, scale: 1.0 },
    // 农场区：湖畔小木船（水塘边，装饰）
    { kind: 'rowboat', x: 540, y: 400, rot: 0, scale: 0.9 },
    { kind: 'fountain', x: 1080, y: 1150, rot: 0, scale: 0.9 },
    { kind: 'billboard', x: 2240, y: 900, rot: 0, scale: 0.85 },
    { kind: 'vending_machine', x: 2690, y: 340, rot: 0, scale: 0.8 },
    { kind: 'bedside_cabinet', x: 900, y: 300, rot: 0, scale: 0.7 },
    { kind: 'table_map_cup', x: 1830, y: 290, rot: 0, scale: 0.85 },
    { kind: 'wood_chair', x: 1830, y: 355, rot: 0, scale: 0.75 },
    { kind: 'potted_flower', x: 1070, y: 280, rot: 0, scale: 0.75 },
    // 农舍外的院子：餐桌、长凳、草捆与浆果丛，补足生活气息
    { kind: 'wood_table', x: 1862, y: 476, rot: 0, scale: 0.92 },
    { kind: 'wood_bench', x: 1782, y: 546, rot: 0, scale: 0.86 },
    { kind: 'berry_bush', x: 1650, y: 500, rot: 0, scale: 0.95 },
    { kind: 'hay_bale', x: 2050, y: 480, rot: Math.PI / 2, scale: 0.9 },
    { kind: 'crate_stack', x: 1210, y: 640, rot: 0, scale: 0.95 },
    { kind: 'nest_cluster', x: 1120, y: 780, rot: 0, scale: 0.9 },
  ];
  return {
    w: MAP_W, h: MAP_H, solids, floors, decor, trees, water, roads, pads, containers,
    extractions, spawns, enemySpots, reinforce, zones, tracks: [2060, 2140], props,
  };
}
