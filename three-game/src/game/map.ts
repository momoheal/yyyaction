import { CONTAINER_DEFS, ENEMIES, MAP_H, MAP_W, type EnemyType } from './data';
import type { VehicleSpot } from './vehicles';

export const F_MOVE = 1;
export const F_BULLET = 2;
export const F_SIGHT = 4;
export const F_VEHICLE_BANK = 8;

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
interface DoorPassage { x: number; y: number; hw: number; hh: number }
export type HallTheme = 'air' | 'radar' | 'frost' | 'guard' | 'royal';
export interface Floor { x: number; y: number; w: number; h: number; type: FloorType; name: string; roofed: boolean; doors?: DoorPassage[]; wallInset?: number; theme?: HallTheme }
export const ROAD_EDGE_WIDTH = 69;
export const ROYAL_PLAZA_BORDER_WIDTH = 13;
const ROAD_SETBACK = ROAD_EDGE_WIDTH / 2 + .5;
export interface Decor { x: number; y: number; t: number; s: number; c: number; rot: number }
export interface Tree { x: number; y: number; r: number; v: number; solid: boolean; kind?: 'mushroom' | 'cedar' | 'broadleaf' }
export interface ContainerSpot { type: string; x: number; y: number; fixedItem?: string }
export interface ExtractDef { id: string; name: string; x: number; y: number; r: number }
export interface SpawnDef { x: number; y: number; chick: [number, number] }
export interface EnemySpot { type: EnemyType; x: number; y: number; n: number }
interface GauntletUnit { type: EnemyType; x: number; y: number }
interface GauntletStage {
  name: string;
  bosses: readonly EnemyType[];
  direction: string;
  entrance: { x: number; y: number };
  guards: readonly GauntletUnit[];
  reinforcements: Partial<Record<EnemyType, readonly GauntletUnit[]>>;
}
export interface Pad { type: string; x: number; y: number; w: number; h: number }
export interface Zone { name: string; x: number; y: number; w: number; h: number }

/** 俯视角场景道具：由程序化 Canvas 绘制，车头/船头默认朝上，rot 为顺时针旋转弧度。 */
export interface SceneryProp {
  kind: 'delivery_truck' | 'pickup_truck' | 'dump_truck' | 'container_truck'
      | 'rowboat' | 'fishing_boat' | 'speedboat' | 'flatbed'
      | 'barrels' | 'bollard' | 'crane'
      | 'water_bucket' | 'trash_bin' | 'mailbox' | 'bench_park' | 'wood_bridge'
      | 'fountain' | 'duck_king_statue' | 'billboard' | 'vending_machine'
      | 'bed' | 'table_map_cup' | 'table_field_kit' | 'wood_chair'
      | 'bedside_cabinet' | 'potted_flower' | 'egg_nest' | 'ice_beacon'
      | 'wood_table' | 'wood_bench' | 'bar_stool' | 'metal_workbench'
      | 'stone_steps' | 'wood_steps' | 'duck_throne' | 'nest_cluster'
      | 'berry_bush' | 'thorn_bush' | 'palace_topiary' | 'crate_stack' | 'hay_bale'
      | 'ice_block' | 'ice_crystal' | 'fighter_jet' | 'lava_pool' | 'lava_fissure' | 'basalt_spires' | 'steam_vent'
      | 'rope_coil' | 'buoy' | 'pipe_run' | 'cargo_net' | 'ingot_stack' | 'spore_pod' | 'cattail'
      | 'well' | 'bus_stop' | 'signpost' | 'laundry_line' | 'royal_lantern' | 'rune_pillar' | 'stone_lion'
      | 'royal_flagpole' | 'royal_flowerbed' | 'palace_fountain' | 'greek_column' | 'triumphal_arch'
      | 'castle_steps' | 'wall_rubble'
      | 'king_vault_gate' | 'checkpoint_gate' | 'water_barrier' | 'striped_barricade'
      | 'freight_boxcar' | 'freight_flatcar'
      | 'hangar' | 'fighter_jet_parked' | 'furnace_vent' | 'frost_pylon' | 'snow_drift'
      | 'stone_bridge' | 'radar_station' | 'missile_rack' | 'sandbag_wall' | 'fuel_tank'
      | 'antenna_mast' | 'street_lamp' | 'transport_plane' | 'parked_jeep' | 'outpost_tank'
      | 'outpost_aav' | 'outpost_btr' | 'range_howitzer' | 'range_antiair'
      | 'range_t90' | 'range_leopard2' | 'range_challenger2' | 'range_type99' | 'range_k2'
      | 'drive_f150' | 'drive_silverado' | 'drive_crown_vic' | 'drive_charger';
  x: number;
  y: number;
  rot: number;
  scale: number;
  len?: number;
  width?: number;
  /** Optional body paint for modular assets such as rail cars. */
  paint?: string;
  /** Explicit opt-out for scenery that must never become cover. */
  solid?: false;
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
  raidTime?: number;
  vehicleSpots?: readonly VehicleSpot[];
  gauntlet?: readonly GauntletStage[];
}

export type RaidMapId = 'island' | 'harbor' | 'foundry' | 'hatchery' | 'outpost' | 'mausoleum' | 'airbase' | 'vehicleRange';

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

function withDriveableVehicles(map: GameMap, spots: readonly VehicleSpot[]): GameMap {
  return { ...map, vehicleSpots: [...(map.vehicleSpots ?? []), ...spots] };
}

export const RAID_MAPS: readonly RaidMapDef[] = [
  { id: 'island', name: '鸭鸭岛', requiredExtracts: 0, theme: '农场与军事基地', loot: '通用补给、军械和保险箱', boss: 'goose', difficulty: '入门', build: () => withDriveableVehicles(buildMap(), [
    { kind: 'pickupF150', x: 1000, y: 1000, heading: 0, paint: '#456276' },
    { kind: 'sedanCrownVic', x: 2025, y: 675, heading: Math.PI, paint: '#c8cbc4' },
  ]) },
  { id: 'harbor', name: '盐雾货港', requiredExtracts: 1, theme: '水道、装卸场与集装箱', loot: '码头补给、武器箱和船长航海日志', boss: 'harborBoss', difficulty: '普通', build: () => withDriveableVehicles(buildHarbor(), [
    { kind: 'pickupSilverado', x: 675, y: 675, heading: -Math.PI / 2, paint: '#a69a7c' },
    { kind: 'sedanCharger', x: 525, y: 1525, heading: Math.PI, paint: '#5d4142' },
  ]) },
  { id: 'foundry', name: '赤炉工厂', requiredExtracts: 3, theme: '铸造线、炉前广场与控制室', loot: '控制室机箱、保险箱和封存炉芯', boss: 'foundryBoss', difficulty: '困难', build: () => withDriveableVehicles(buildFoundry(), [
    { kind: 'sedanCrownVic', x: 760, y: 1560, heading: 0, paint: '#8c8b81' },
    { kind: 'pickupF150', x: 2025, y: 775, heading: Math.PI, paint: '#6a5550' },
  ]) },
  { id: 'hatchery', name: '腐叶孵化场', requiredExtracts: 5, theme: '沼泽育雏棚、孵化控制室与巢穴', loot: '巢穴补给、冰风 MP9 与鸭后金蛋', boss: 'broodQueen', difficulty: '精英 · 持续召怪', build: () => withDriveableVehicles(buildHatchery(), [
    { kind: 'pickupSilverado', x: 200, y: 1240, heading: 0, paint: '#716b52' },
    { kind: 'pickupF150', x: 1800, y: 1960, heading: Math.PI, paint: '#5d624b' },
  ]) },
  { id: 'outpost', name: '霜锋哨站', requiredExtracts: 8, theme: '冰封机库、雷达站与冻土广场', loot: '军械库、传说枪械与双首领战利品', boss: 'frostMarshal', bosses: ['frostMarshal', 'ironGuard'], difficulty: '噩梦 · 双首领', build: () => withDriveableVehicles(buildOutpost(), [
    { kind: 'pickupF150', x: 120, y: 1320, heading: 0, paint: '#b9c3bd' },
    { kind: 'sedanCrownVic', x: 760, y: 120, heading: Math.PI / 2, paint: '#d6dad4' },
    // Perimeter pull-offs in world coordinates. Each arrival route has nearby armor.
    { kind: 'tank', x: 235, y: 685, heading: Math.PI / 2, paint: '#92a9a1' },
    { kind: 'range_type99', x: 1350, y: 335, heading: Math.PI, paint: '#9aaea9' },
    { kind: 'aav', x: 525, y: 1695, heading: Math.PI / 2, paint: '#869e90' },
    { kind: 'btr', x: 2950, y: 650, heading: Math.PI, paint: '#91a6a0' },
    { kind: 'tank', x: 2300, y: 1835, heading: Math.PI, hostile: true },
    // Fixed guns in open yards, set back from the vehicle lanes and room doors.
    { kind: 'howitzer', x: 1310, y: 670, heading: -Math.PI / 2, paint: '#92a9a1' },
    { kind: 'howitzer', x: 2060, y: 1450, heading: -3 * Math.PI / 4, paint: '#92a9a1' },
    { kind: 'howitzer', x: 2135, y: 1075, heading: -3 * Math.PI / 4, hostile: true },
  ]) },
  { id: 'airbase', name: '冰火空军基地', requiredExtracts: 10, theme: '熔岩焦土、冰霜雪原与中央跑道', loot: '机库军械、双传说保险箱与 RPG', boss: 'flameAce', bosses: ['flameAce', 'radarWarden'], difficulty: '噩梦 · 冰火双首领', build: () => withDriveableVehicles(buildAirbase(), [
    { kind: 'pickupSilverado', x: 840, y: 120, heading: 0, paint: '#59634f' },
    { kind: 'sedanCharger', x: 1880, y: 120, heading: Math.PI, paint: '#46575a' },
  ]) },
  { id: 'mausoleum', name: '鸭王陵寝', requiredExtracts: 12, theme: '四将军试炼、双王城堡与封印御花园', loot: '击败六名首领后开放王家宝库与御花园', boss: 'duckKing',
    bosses: ['frostMarshal', 'ironGuard', 'flameAce', 'radarWarden', 'broodQueen', 'duckKing'], difficulty: '地狱 · 六首领', build: buildMausoleum },
  { id: 'vehicleRange', name: '载具试验场', requiredExtracts: 0, theme: '装甲车、飞行与炮台操控试玩', loot: '自由练习 · 无装备消耗',
    boss: 'goose', difficulty: 'DEMO', build: buildVehicleRange },
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
  return withAssetCollisions({
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
      { x: 90, y: 200, w: 450, h: 360, type: 'concrete', name: '入口训练场', roofed: false },
      { x: 600, y: 200, w: 590, h: 360, type: 'wood', name: '军械室', roofed: true },
    ],
    decor: [], trees: [], water: [], roads: [], pads: [],
    // Crate 1 (armoury) gives a weapon, crate 2 gives supplies — handled in game.ts.
    containers: [{ type: 'weaponcase', x: 760, y: 300 }, { type: 'crate', x: 760, y: 500 }],
    extractions: [{ id: 'A', name: '训练出口', x: 1190, y: 380, r: 62 }],
    spawns: [{ x: 150, y: 380, chick: [400, 380] }],
    // starting chicken blocks the path to the armoury door
    enemySpots: [{ type: 'chicken', x: 400, y: 380, n: 2 }],
    reinforce: [], zones: [], tracks: [], props: [],
  });
}

type Cover = [kind: 'wall' | 'castle_wall' | 'cargo' | 'sandbag' | 'train' | 'rack' | 'car' | 'fence' | 'pump', x: number, y: number, w: number, h: number];

interface RoomDef {
  theme?: HallTheme;
  doorWidth?: number;
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
function scatterDecor(w: number, h: number, count: number, seed: number, water: GameMap['water'] = []): Decor[] {
  const rnd = mulberry32(seed * 7919 + 13);
  const out: Decor[] = [];
  const inWater = (x: number, y: number) => water.some((p) => p.w && p.h
    ? x >= p.x - p.w / 2 && x <= p.x + p.w / 2 && y >= p.y - p.h / 2 && y <= p.y + p.h / 2
    : Math.hypot(x - p.x, y - p.y) <= p.r);
  for (let i = 0; i < count; i++) {
    let x = 0, y = 0;
    for (let attempt = 0; attempt < 8; attempt++) {
      x = 60 + rnd() * (w - 120);
      y = 60 + rnd() * (h - 120);
      if (!inWater(x, y)) break;
    }
    out.push({
      x, y,
      t: rnd() < 0.5 ? 2 : 0, // pebbles & tufts suit concrete/asphalt
      s: 3 + rnd() * 5,
      c: Math.floor(rnd() * 4),
      rot: rnd() * TAU_STATIC,
    });
  }
  return out;
}
const TAU_STATIC = Math.PI * 2;

type BiomeStyle = 'harbor' | 'foundry' | 'hatchery' | 'outpost' | 'mausoleum' | 'airbase';

/** Half-extents of each drawn asset in its local 128x128 canvas space. */
const PROP_FOOTPRINT: Partial<Record<SceneryProp['kind'], [number, number]>> = {
  delivery_truck: [34, 54], pickup_truck: [34, 52], dump_truck: [34, 54], container_truck: [36, 56], flatbed: [32, 48],
  rowboat: [32, 56], fishing_boat: [32, 58], speedboat: [32, 58],
  barrels: [36, 36], bollard: [28, 22], crane: [60, 30],
  fountain: [50, 36], duck_king_statue: [46, 56], royal_flowerbed: [54, 25], billboard: [46, 42], vending_machine: [28, 58],
  palace_fountain: [75, 55], greek_column: [24, 24], triumphal_arch: [126, 38],
  bed: [44, 50], table_map_cup: [40, 40], table_field_kit: [40, 40], wood_chair: [30, 34],
  bedside_cabinet: [30, 32], potted_flower: [30, 36], egg_nest: [30, 28], ice_beacon: [28, 52],
  wood_table: [54, 48], wood_bench: [52, 40], bar_stool: [34, 30], metal_workbench: [50, 44],
  stone_steps: [56, 50], wood_steps: [56, 50], duck_throne: [50, 46], nest_cluster: [58, 40],
  berry_bush: [52, 40], thorn_bush: [52, 40], crate_stack: [50, 46], hay_bale: [50, 36],
  ice_block: [30, 34], ice_crystal: [28, 42], fighter_jet: [56, 56],
  lava_pool: [70, 53], lava_fissure: [61, 28], basalt_spires: [32, 26], steam_vent: [21, 18], king_vault_gate: [52, 42],
  hangar: [70, 44], fighter_jet_parked: [56, 56], furnace_vent: [26, 26], frost_pylon: [26, 40],
  snow_drift: [40, 30], stone_bridge: [56, 40], radar_station: [44, 44], missile_rack: [30, 34],
  wood_bridge: [110, 32], water_bucket: [17, 17], trash_bin: [17, 17], mailbox: [14, 14], bench_park: [28, 18], signpost: [26, 9],
  sandbag_wall: [44, 30], fuel_tank: [36, 40], antenna_mast: [22, 22], street_lamp: [20, 20],
  transport_plane: [87, 82], parked_jeep: [36, 44],
  checkpoint_gate: [61, 13], water_barrier: [35, 13], striped_barricade: [32, 12],
  freight_boxcar: [83, 21], freight_flatcar: [83, 21],
};

function propBox(p: SceneryProp) {
  const f = p.kind === 'wood_bridge' || p.kind === 'castle_steps' || (p.kind === 'stone_bridge' && p.len !== undefined)
    ? [(p.len ?? 180) / 2, (p.width ?? 70) / 2]
    : PROP_FOOTPRINT[p.kind] ?? [50, 50];
  const c = Math.abs(Math.cos(p.rot)), s = Math.abs(Math.sin(p.rot));
  return {
    x: p.x, y: p.y,
    hw: (f[0] * c + f[1] * s) * p.scale,
    hh: (f[0] * s + f[1] * c) * p.scale,
  };
}

/** Physical half-extents for low-poly scenery; boats stay governed by water collision. */
const PROP_COLLISION_FOOTPRINT: Partial<Record<SceneryProp['kind'], [number, number]>> = {
  delivery_truck: [30, 62], pickup_truck: [28, 58], dump_truck: [30, 60], container_truck: [34, 64], flatbed: [31, 70],
  barrels: [26, 18], bollard: [7, 7], crane: [32, 20], fountain: [42, 36], duck_king_statue: [31, 31],
  billboard: [22, 16], vending_machine: [17, 16], bed: [29, 39], table_map_cup: [26, 20], table_field_kit: [26, 20],
  wood_chair: [21, 16], bedside_cabinet: [17, 16], potted_flower: [12, 12], egg_nest: [28, 25], ice_beacon: [13, 13],
  wood_table: [29, 18], wood_bench: [29, 19], bar_stool: [21, 16], metal_workbench: [29, 18],
  stone_steps: [30, 26], wood_steps: [30, 26], duck_throne: [29, 24], nest_cluster: [50, 36], berry_bush: [22, 18],
  thorn_bush: [22, 18], crate_stack: [38, 18], hay_bale: [36, 18], ice_block: [23, 20], ice_crystal: [16, 16],
  fighter_jet: [42, 55],
  hangar: [64, 40], fighter_jet_parked: [42, 55], furnace_vent: [16, 16], frost_pylon: [14, 14],
  radar_station: [28, 28], missile_rack: [20, 22],
  basalt_spires: [30, 23],
  sandbag_wall: [34, 20], fuel_tank: [24, 28], antenna_mast: [8, 8], street_lamp: [7, 7],
  transport_plane: [44, 60], parked_jeep: [28, 36],
  checkpoint_gate: [61, 13], water_barrier: [35, 13], striped_barricade: [32, 12],
  freight_boxcar: [77, 21], freight_flatcar: [77, 21],
  rope_coil: [18, 17],
  buoy: [12, 12],
  pipe_run: [44, 9],
  cargo_net: [25, 20],
  ingot_stack: [23, 17],
  spore_pod: [16, 15],
  well: [24, 24],
  bus_stop: [38, 18],
  signpost: [10, 8],
  laundry_line: [32, 7],
  water_bucket: [12, 12],
  trash_bin: [14, 14],
  mailbox: [14, 12],
  bench_park: [27, 13],
  royal_lantern: [9, 9],
  rune_pillar: [15, 15],
  stone_lion: [16, 25],
  royal_flagpole: [10, 10],
  palace_topiary: [14.5, 14.5],
};

function doorPassage(x: number, y: number, width: number, wallDepth: number, horizontal: boolean): DoorPassage {
  const halfWidth = width / 2;
  const halfDepth = wallDepth / 2 + 37;
  return { x, y, hw: horizontal ? halfWidth : halfDepth, hh: horizontal ? halfDepth : halfWidth };
}

function overlapsDoor(doors: readonly DoorPassage[], x: number, y: number, hw: number, hh: number) {
  return doors.some((door) => Math.abs(x - door.x) < hw + door.hw - .001 && Math.abs(y - door.y) < hh + door.hh - .001);
}

function withAssetCollisions(map: GameMap): GameMap {
  let solids = map.solids.filter((solid) => solid.kind !== 'container');
  // Bridges are scenery, so they never add a blocking collider. Carve their
  // deck area out of rectangular water colliders to preserve the Quick route.
  let carvedId = solids.reduce((max, solid) => Math.max(max, solid.id), -1) + 1;
  for (const bridge of map.props.filter((prop) => prop.kind === 'wood_bridge' || prop.kind === 'stone_bridge')) {
    const length = (bridge.len ?? 180) * bridge.scale;
    const width = (bridge.width ?? 70) * bridge.scale;
    const c = Math.abs(Math.cos(bridge.rot)), s = Math.abs(Math.sin(bridge.rot));
    const hw = length / 2 * c + width / 2 * s;
    const hh = length / 2 * s + width / 2 * c;
    const cut = { x: bridge.x - hw, y: bridge.y - hh, w: hw * 2, h: hh * 2 };
    const next: Solid[] = [];
    for (const solid of solids) {
      if (solid.kind !== 'water' || solid.t !== 0 || cut.x >= solid.x + solid.w || cut.x + cut.w <= solid.x ||
        cut.y >= solid.y + solid.h || cut.y + cut.h <= solid.y) {
        next.push(solid);
        continue;
      }
      const x0 = Math.max(solid.x, cut.x), x1 = Math.min(solid.x + solid.w, cut.x + cut.w);
      const y0 = Math.max(solid.y, cut.y), y1 = Math.min(solid.y + solid.h, cut.y + cut.h);
      const pieces = [
        { x: solid.x, y: solid.y, w: solid.w, h: y0 - solid.y },
        { x: solid.x, y: y1, w: solid.w, h: solid.y + solid.h - y1 },
        { x: solid.x, y: y0, w: x0 - solid.x, h: y1 - y0 },
        { x: x1, y: y0, w: solid.x + solid.w - x1, h: y1 - y0 },
      ].filter((piece) => piece.w > 0 && piece.h > 0);
      pieces.forEach((piece, index) => next.push({ ...solid, ...piece, id: index === 0 ? solid.id : carvedId++ }));
    }
    solids = next;
  }
  let nextId = solids.reduce((max, solid) => Math.max(max, solid.id), -1) + 1;
  const addRect = (x: number, y: number, hw: number, hh: number, kind: 'container' | 'asset', flags = F_MOVE) => {
    solids.push({ id: nextId++, t: 0, x: x - hw, y: y - hh, w: hw * 2, h: hh * 2, r: 0,
      f: flags, kind, v: 0, stamp: 0, dead: false, hp: 0 });
  };
  for (const container of map.containers) {
    const def = CONTAINER_DEFS[container.type];
    if (def) addRect(container.x, container.y, def.w / 2, def.h / 2, 'container');
  }

  const indoor = (x: number, y: number) => map.floors.find((floor) => floor.roofed &&
    x > floor.x && x < floor.x + floor.w && y > floor.y && y < floor.y + floor.h);
  const doors = map.floors.flatMap((floor) => floor.doors ?? []);
  const accessPoints = [
    ...map.spawns.map(({ x, y }) => ({ x, y, r: 32 })),
    ...map.spawns.map(({ chick: [x, y] }) => ({ x, y, r: 24 })),
    ...map.enemySpots.map(({ x, y }) => ({ x, y, r: 38 })),
    ...map.extractions.map(({ x, y }) => ({ x, y, r: 24 })),
    ...map.reinforce.map(({ x, y }) => ({ x, y, r: 25 })),
  ];
  const props = map.props.flatMap((prop) => {
    if (prop.solid === false) return [prop];
    const footprint = PROP_COLLISION_FOOTPRINT[prop.kind];
    if (!footprint) return [prop];
    const onRail = prop.kind === 'freight_boxcar' || prop.kind === 'freight_flatcar';
    // The container already supplies collision and interaction for the vending machine.
    if (prop.kind === 'vending_machine' && map.containers.some((container) =>
      container.type === 'vending' && container.x === prop.x && container.y === prop.y)) return [];
    const c = Math.abs(Math.cos(prop.rot)), s = Math.abs(Math.sin(prop.rot));
    const hw = (footprint[0] * c + footprint[1] * s) * prop.scale;
    const hh = (footprint[0] * s + footprint[1] * c) * prop.scale;
    const room = indoor(prop.x, prop.y);
    const fits = (x: number, y: number) => {
      const pad = 5;
      if (x - hw < pad || y - hh < pad || x + hw > map.w - pad || y + hh > map.h - pad ||
        indoor(x, y) !== room) return false;
      if (overlapsDoor(doors, x, y, hw, hh)) return false;
      const intersectsCircle = (cx: number, cy: number, r: number) =>
        Math.hypot(Math.max(0, Math.abs(cx - x) - hw), Math.max(0, Math.abs(cy - y) - hh)) < r + pad;
      if (accessPoints.some((point) => intersectsCircle(point.x, point.y, point.r))) return false;
      return !solids.some((solid) => (solid.f & F_MOVE) && (solid.t === 1
        ? intersectsCircle(solid.x, solid.y, solid.r)
        : x + hw + pad > solid.x && x - hw - pad < solid.x + solid.w &&
          y + hh + pad > solid.y && y - hh - pad < solid.y + solid.h));
    };
    let x = prop.x, y = prop.y;
    if (!fits(x, y)) {
      const candidates: { x: number; y: number; distance: number }[] = [];
      for (let dy = onRail ? 0 : -8; dy <= (onRail ? 0 : 8); dy++) {
        for (let dx = -8; dx <= 8; dx++) {
          if (dx * dx + dy * dy <= 64)
            candidates.push({ x: x + dx * 18, y: y + dy * 18, distance: dx * dx + dy * dy });
        }
      }
      candidates.sort((a, b) => a.distance - b.distance);
      const spot = candidates.find((candidate) => fits(candidate.x, candidate.y));
      if (!spot) return [];
      x = spot.x;
      y = spot.y;
    }
    addRect(x, y, hw, hh, 'asset', onRail ? F_MOVE | F_BULLET : F_MOVE);
    return [{ ...prop, x, y }];
  });
  return { ...map, props, solids };
}

function clearDoorCover(map: GameMap) {
  const doors = map.floors.flatMap((floor) => floor.doors ?? []);
  const movable = new Set(['tree', 'barrel', 'cargo', 'rack', 'sandbag', 'fence', 'hay']);
  const roomAt = (x: number, y: number) => map.floors.find((f) => f.roofed &&
    x > f.x && x < f.x + f.w && y > f.y && y < f.y + f.h);
  const points = [...map.spawns, ...map.extractions, ...map.enemySpots, ...map.reinforce];
  const offsets: { x: number; y: number }[] = [];
  for (let x = -12; x <= 12; x++) {
    for (let y = -12; y <= 12; y++) offsets.push({ x: x * 14, y: y * 14 });
  }
  offsets.sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y));
  for (const solid of map.solids) {
    if (!movable.has(solid.kind)) continue;
    const hw = solid.t === 0 ? solid.w / 2 : solid.r;
    const hh = solid.t === 0 ? solid.h / 2 : solid.r;
    const x = solid.x + (solid.t === 0 ? hw : 0), y = solid.y + (solid.t === 0 ? hh : 0);
    if (!overlapsDoor(doors, x, y, hw, hh)) continue;
    const room = roomAt(x, y);
    const offset = offsets.find((d) => {
      const nx = x + d.x, ny = y + d.y;
      if (nx - hw < 4 || ny - hh < 4 || nx + hw > map.w - 4 || ny + hh > map.h - 4 ||
        roomAt(nx, ny) !== room || overlapsDoor(doors, nx, ny, hw + 4, hh + 4)) return false;
      const distance = (px: number, py: number) =>
        Math.hypot(Math.max(0, Math.abs(px - nx) - hw), Math.max(0, Math.abs(py - ny) - hh));
      if (points.some((p) => distance(p.x, p.y) < 42)) return false;
      return !map.solids.some((s) => s !== solid && s.kind !== 'container' && (s.f & F_MOVE) &&
        (s.t === 1 ? distance(s.x, s.y) < s.r + 4 : nx + hw + 4 > s.x &&
          nx - hw - 4 < s.x + s.w && ny + hh + 4 > s.y && ny - hh - 4 < s.y + s.h));
    });
    if (!offset) continue;
    const tree = solid.kind === 'tree' ? map.trees.find((t) => t.x === solid.x && t.y === solid.y) : undefined;
    solid.x += offset.x; solid.y += offset.y;
    if (tree) { tree.x = solid.x; tree.y = solid.y; }
  }
}

const CARGO_NUDGE_OFFSETS = (() => {
  const offsets: { x: number; y: number; distance: number }[] = [];
  // Dense maps can have cargo boxed in by several road approaches; search far
  // enough to find a genuinely open shoulder while preserving collision and
  // landmark clearances in `clearCoverFromRoads`.
  for (let ring = 1; ring <= 24; ring++) {
    for (let dx = -ring; dx <= ring; dx++) for (let dy = -ring; dy <= ring; dy++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue;
      offsets.push({ x: dx * 20, y: dy * 20, distance: dx * dx + dy * dy });
    }
  }
  return offsets.sort((a, b) => a.distance - b.distance || a.y - b.y || a.x - b.x);
})();

function segmentIntersectsRect(ax: number, ay: number, bx: number, by: number,
  left: number, top: number, right: number, bottom: number) {
  const dx = bx - ax, dy = by - ay;
  let enter = 0, exit = 1;
  const clip = (p: number, q: number) => {
    if (Math.abs(p) < 1e-8) return q >= 0;
    const t = q / p;
    if (p < 0) { if (t > exit) return false; enter = Math.max(enter, t); }
    else { if (t < enter) return false; exit = Math.min(exit, t); }
    return enter <= exit;
  };
  return clip(-dx, ax - left) && clip(dx, right - ax) &&
    clip(-dy, ay - top) && clip(dy, bottom - ay);
}

/** Keep shipping containers and sandbag walls clear of paved lanes. */
function clearCoverFromRoads(map: GameMap) {
  const roadClearance = ROAD_EDGE_WIDTH / 2 + 8;
  const onRoad = (solid: Solid, x = solid.x, y = solid.y) => map.roads.some((road) => {
    for (let i = 0; i + 3 < road.length; i += 2) {
      if (segmentIntersectsRect(road[i], road[i + 1], road[i + 2], road[i + 3],
        x - roadClearance, y - roadClearance,
        x + solid.w + roadClearance, y + solid.h + roadClearance)) return true;
    }
    return false;
  });
  const occupied = (solid: Solid, x: number, y: number) => {
    if (x < 24 || y < 24 || x + solid.w > map.w - 24 || y + solid.h > map.h - 24) return true;
    if (map.floors.some((floor) => floor.roofed && x < floor.x + floor.w && x + solid.w > floor.x &&
      y < floor.y + floor.h && y + solid.h > floor.y)) return true;
    if (map.solids.some((other) => {
      if (other === solid || other.kind === 'bound' || !(other.f & F_MOVE)) return false;
      if (other.t === 0) return x < other.x + other.w + 8 && x + solid.w + 8 > other.x &&
        y < other.y + other.h + 8 && y + solid.h + 8 > other.y;
      const px = Math.max(x, Math.min(other.x, x + solid.w));
      const py = Math.max(y, Math.min(other.y, y + solid.h));
      return Math.hypot(px - other.x, py - other.y) < other.r + 8;
    })) return true;
    const hw = solid.w / 2, hh = solid.h / 2, cx = x + hw, cy = y + hh;
    if (map.spawns.some((spawn) => Math.hypot(cx - spawn.x, cy - spawn.y) < Math.max(hw, hh) + 62)) return true;
    if (map.extractions.some((extract) => Math.hypot(cx - extract.x, cy - extract.y) < extract.r + Math.max(hw, hh) + 12)) return true;
    if (map.enemySpots.some((spot) => Math.hypot(cx - spot.x, cy - spot.y) < Math.max(hw, hh) + 52)) return true;
    if (map.reinforce.some((point) => Math.hypot(cx - point.x, cy - point.y) < Math.max(hw, hh) + 36)) return true;
    if (map.props.some((prop) => {
      const box = propBox(prop);
      return Math.abs(cx - box.x) < hw + box.hw + 8 && Math.abs(cy - box.y) < hh + box.hh + 8;
    })) return true;
    if (map.containers.some((container) => {
      const def = CONTAINER_DEFS[container.type];
      return def && Math.abs(cx - container.x) < hw + def.w / 2 + 8 &&
        Math.abs(cy - container.y) < hh + def.h / 2 + 8;
    })) return true;
    return false;
  };

  for (const solid of map.solids) {
    if ((solid.kind !== 'cargo' && solid.kind !== 'sandbag') || solid.t !== 0 || !onRoad(solid)) continue;
    const offset = CARGO_NUDGE_OFFSETS.find(({ x, y }) => {
      const nx = solid.x + x, ny = solid.y + y;
      return !onRoad(solid, nx, ny) && !occupied(solid, nx, ny);
    });
    if (offset) { solid.x += offset.x; solid.y += offset.y; }
  }
}

/** Nudge searchable containers off drawn props; vending machines are intentionally co-located. */
function separateContainersFromProps(map: GameMap) {
  const pad = 9;
  const doors = map.floors.flatMap((floor) => floor.doors ?? []);
  const boxOverlap = (ax: number, ay: number, hw: number, hh: number, b: ReturnType<typeof propBox>) =>
    Math.abs(ax - b.x) < hw + b.hw + pad && Math.abs(ay - b.y) < hh + b.hh + pad;
  const inWater = (x: number, y: number, hw: number, hh: number) => map.water.some((w) => w.w && w.h
    ? Math.abs(x - w.x) < w.w / 2 + hw && Math.abs(y - w.y) < w.h / 2 + hh
    : Math.hypot(x - w.x, y - w.y) < w.r + Math.max(hw, hh));
  const inSolid = (x: number, y: number, hw: number, hh: number) => map.solids.some((s) => {
    // Containers register their own collider; water colliders are handled separately.
    if (s.kind === 'bound' || s.kind === 'container' || s.kind === 'water' || !(s.f & F_MOVE)) return false;
    if (s.t === 0) return x + hw > s.x - 4 && x - hw < s.x + s.w + 4 && y + hh > s.y - 4 && y - hh < s.y + s.h + 4;
    return Math.hypot(Math.max(0, Math.abs(x - s.x) - hw), Math.max(0, Math.abs(y - s.y) - hh)) < s.r + 4;
  });
  for (const c of map.containers) {
    const def = CONTAINER_DEFS[c.type];
    if (!def) continue;
    const hw = def.w / 2, hh = def.h / 2;
    const hitsDoor = (x: number, y: number) => overlapsDoor(doors, x, y, hw, hh);
    const machine = c.type === 'vending' ? map.props.find((p) => p.kind === 'vending_machine' && p.x === c.x && p.y === c.y) : undefined;
    // Matching vending art follows its searchable container if a doorway requires a move.
    if (machine && !hitsDoor(c.x, c.y)) continue;
    const clashes = (x: number, y: number) => map.containers.some((o) => o !== c && (() => {
      const od = CONTAINER_DEFS[o.type];
      return od && Math.abs(x - o.x) < hw + od.w / 2 + 12 && Math.abs(y - o.y) < hh + od.h / 2 + 12;
    })());
    const hits = (x: number, y: number) => map.props.some((p) => p !== machine && boxOverlap(x, y, hw, hh, propBox(p)));
    if (!hitsDoor(c.x, c.y) && !hits(c.x, c.y) && !clashes(c.x, c.y) && !inWater(c.x, c.y, hw, hh) && !inSolid(c.x, c.y, hw, hh)) continue;
    const originalFloor = map.floors.find((f) => c.x > f.x && c.x < f.x + f.w && c.y > f.y && c.y < f.y + f.h);
    const best: { x: number; y: number; score: number }[] = [];
    for (let r = 1; r <= 10; r++) {
      for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const nx = c.x + dx * 26, ny = c.y + dy * 26;
        if (nx < hw + 12 || ny < hh + 12 || nx > map.w - hw - 12 || ny > map.h - hh - 12) continue;
        if (hitsDoor(nx, ny) || hits(nx, ny) || clashes(nx, ny) || inWater(nx, ny, hw, hh) || inSolid(nx, ny, hw, hh)) continue;
        const sameFloor = originalFloor && nx > originalFloor.x && nx < originalFloor.x + originalFloor.w
          && ny > originalFloor.y && ny < originalFloor.y + originalFloor.h;
        const score = Math.hypot(dx, dy) + (sameFloor ? 0 : 6);
        if (!best.length || score < best[0].score) best.splice(0, 1, { x: nx, y: ny, score });
      }
      if (best.length) break;
    }
    if (best.length) {
      c.x = best[0].x; c.y = best[0].y;
      if (machine) { machine.x = c.x; machine.y = c.y; }
    }
  }
}

type RoadPoint = { x: number; y: number };

/** Start outside an exterior doorway and join the existing street via a clear, short route. */
function connectBuildingRoads(roads: number[][], floors: Floor[], water: GameMap['water'], solids: Solid[]): number[][] {
  const buildings = floors.filter(floor => floor.roofed);
  const bounds = buildings.map(floor => {
    const inset = floor.wallInset ?? 0;
    return { left: floor.x - inset, top: floor.y - inset,
      right: floor.x + floor.w + inset, bottom: floor.y + floor.h + inset };
  });
  const isClear = (a: RoadPoint, b: RoadPoint) => {
    const intersects = (left: number, top: number, right: number, bottom: number) => {
      let enter = 0, exit = 1;
      for (const [start, end, min, max] of [[a.x, b.x, left, right], [a.y, b.y, top, bottom]]) {
        const delta = end - start;
        if (Math.abs(delta) < .00001) {
          if (start <= min || start >= max) return false;
        } else {
          const t0 = (min - start) / delta, t1 = (max - start) / delta;
          enter = Math.max(enter, Math.min(t0, t1));
          exit = Math.min(exit, Math.max(t0, t1));
          if (enter >= exit) return false;
        }
      }
      return true;
    };
    if (bounds.some(r => intersects(r.left - ROAD_SETBACK, r.top - ROAD_SETBACK, r.right + ROAD_SETBACK, r.bottom + ROAD_SETBACK))) return false;
    if (water.some(p => intersects(p.x - (p.w ? p.w / 2 : p.r) - 14, p.y - (p.h ? p.h / 2 : p.r) - 14,
      p.x + (p.w ? p.w / 2 : p.r) + 14, p.y + (p.h ? p.h / 2 : p.r) + 14))) return false;
    return !solids.some(s => !s.dead && (s.f & F_MOVE) && s.t === 0 && s.kind !== 'bound' &&
      s.kind !== 'water' && s.kind !== 'container' && intersects(s.x - 13, s.y - 13, s.x + s.w + 13, s.y + s.h + 13));
  };
  const segments = roads.flatMap(road => Array.from({ length: road.length / 2 - 1 }, (_, i) => {
    const j = i * 2;
    return [{ x: road[j], y: road[j + 1] }, { x: road[j + 2], y: road[j + 3] }] as const;
  }));
  const result = [...roads];
  for (const [i, floor] of buildings.entries()) {
    const r = bounds[i];
    let best: { points: RoadPoint[]; score: number } | undefined;
    for (const door of floor.doors ?? []) {
      const sides = [
        { distance: Math.abs(door.y - r.top), point: { x: door.x, y: r.top - ROAD_SETBACK }, dx: 0, dy: -1 },
        { distance: Math.abs(door.y - r.bottom), point: { x: door.x, y: r.bottom + ROAD_SETBACK }, dx: 0, dy: 1 },
        { distance: Math.abs(door.x - r.left), point: { x: r.left - ROAD_SETBACK, y: door.y }, dx: -1, dy: 0 },
        { distance: Math.abs(door.x - r.right), point: { x: r.right + ROAD_SETBACK, y: door.y }, dx: 1, dy: 0 },
      ];
      const entry = sides.reduce((closest, side) => side.distance < closest.distance ? side : closest);
      if (entry.distance > 20) continue; // Partitions inside island buildings also have door records.
      const start = entry.point;
      const approach = { x: start.x + entry.dx * 34, y: start.y + entry.dy * 34 };
      for (const [a, b] of segments) {
        const dx = b.x - a.x, dy = b.y - a.y, lengthSquared = dx * dx + dy * dy;
        if (!lengthSquared) continue;
        const t = Math.max(0, Math.min(1, ((approach.x - a.x) * dx + (approach.y - a.y) * dy) / lengthSquared));
        const join = { x: a.x + dx * t, y: a.y + dy * t };
        const distance = Math.hypot(join.x - start.x, join.y - start.y);
        if (best && distance >= best.score) continue;
        const outward = (join.x - start.x) * entry.dx + (join.y - start.y) * entry.dy;
        if ((distance < .01 || (distance < 35 && outward > .01)) && isClear(start, join)) {
          best = { points: [start, join], score: distance };
          continue;
        }
        const turns = [{ x: join.x, y: approach.y }, { x: approach.x, y: join.y }];
        for (const turn of turns) {
          const points = [start, approach, turn, join].filter((p, j, list) =>
            !j || Math.hypot(p.x - list[j - 1].x, p.y - list[j - 1].y) > .01);
          const score = points.slice(1).reduce((sum, p, j) => sum + Math.hypot(p.x - points[j].x, p.y - points[j].y), 0);
          if ((!best || score < best.score) && points.slice(1).every((p, j) => isClear(points[j], p))) best = { points, score };
        }
      }
    }
    if (best && best.score > 1) result.push(best.points.flatMap(p => [p.x, p.y]));
  }
  return result;
}

/** Add deterministic, non-blocking ground art without covering routes or combat landmarks. */
function withBiomeArt(map: GameMap, biome: BiomeStyle): GameMap {
  clearDoorCover(map);
  if (!map.gauntlet) map.roads = connectBuildingRoads(map.roads, map.floors, map.water, map.solids);
  clearCoverFromRoads(map);
  separateContainersFromProps(map);
  const settings: { seed: number; count: number } = {
    harbor: { seed: 31, count: 70 }, foundry: { seed: 47, count: 85 },
    hatchery: { seed: 59, count: 190 }, outpost: { seed: 71, count: 160 }, mausoleum: { seed: 83, count: 180 },
    airbase: { seed: 97, count: 120 },
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
  const blocked = (x: number, y: number, pad: number, allowDecorativeSurfaces = false) => {
    if (x < 36 || y < 36 || x > map.w - 36 || y > map.h - 36) return true;
    if (map.floors.some((f) => {
      if (allowDecorativeSurfaces && ['孵化中庭', '冰封中庭东场', '冰封中庭南岸', '冰霜雪原'].includes(f.name)) return false;
      const margin = pad + (allowDecorativeSurfaces ? f.wallInset ?? 0 : 0);
      return x > f.x - margin && x < f.x + f.w + margin && y > f.y - margin && y < f.y + f.h + margin;
    })) return true;
    if (map.pads.some((p) => {
      if (p.type === 'field' || (allowDecorativeSurfaces && (p.type === 'nest_ground' ||
        (biome === 'outpost' && p.type === 'base' && p.w === 780 && p.h === 340)))) return false;
      return x > p.x - pad && x < p.x + p.w + pad && y > p.y - pad && y < p.y + p.h + pad;
    })) return true;
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
    if (map.vehicleSpots?.some((v) => Math.hypot(x - v.x, y - v.y) < 85 + pad)) return true;
    if (map.vehicleSpots?.some((v) => v.approach && distToSegment(x, y, v.x, v.y, v.approach.x, v.approach.y) < 60 + pad)) return true;
    if (map.enemySpots.some((e) => Math.hypot(x - e.x, y - e.y) < 72 + pad)) return true;
    if (map.reinforce.some((r) => Math.hypot(x - r.x, y - r.y) < 48 + pad)) return true;
    if (map.containers.some((c) => Math.hypot(x - c.x, y - c.y) < 45 + pad)) return true;
    if (map.props.some((p) => Math.hypot(x - p.x, y - p.y) < 72 * p.scale + pad)) return true;
    if (biome === 'mausoleum' && map.trees.some(t => Math.hypot(x - t.x, y - t.y) < t.r * 1.25 + pad + 12)) return true;
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
    else if (biome === 'airbase') t = roll < 0.3 ? 2 : 0;
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
  const dressed = withAssetCollisions({ ...map, decor: [...map.decor, ...decor], trees });
  if (biome === 'harbor' || biome === 'foundry') return dressed;
  const hatchery = biome === 'hatchery';
  const passages = dressed.floors.flatMap((floor) => floor.doors ?? []);
  const featureBoxes = dressed.props.map(propBox);
  const planted: { x: number; y: number; spread: number }[] = [];
  let plantId = dressed.solids.reduce((max, solid) => Math.max(max, solid.id), -1) + 1;
  type PlantArea = (x: number, y: number, spread: number) => boolean;
  const existingTrees = [...dressed.trees];
  const bosses = dressed.enemySpots.filter(spot => ENEMIES[spot.type].boss);
  const placePlants = (count: number, minSize: number, maxSize: number,
    add: (x: number, y: number, size: number, variant: number) => number | void, area?: PlantArea) => {
    const attemptLimit = count * (area ? 380 : 90);
    for (let placed = 0, attempts = 0; placed < count && attempts < attemptLimit; attempts++) {
      const size = minSize + rnd() * (maxSize - minSize);
      const spread = size * 1.25;
      const margin = spread + 20;
      const x = margin + rnd() * (map.w - 2 * margin);
      const y = margin + rnd() * (map.h - 2 * margin);
      if (map.tracks.some((ty) => Math.abs(y - ty) < spread + 44)) continue;
      if (area && (!area(x, y, spread) ||
        bosses.some(b => Math.hypot(x - b.x, y - b.y) < spread + (hatchery ? 165 : 235)) ||
        existingTrees.some(t => Math.hypot(x - t.x, y - t.y) < spread + t.r * 1.2 + 12))) continue;
      if (blocked(x, y, spread, !!area) || overlapsDoor(passages, x, y, spread, spread)) continue;
      if (featureBoxes.some((box) => Math.abs(x - box.x) < box.hw + spread &&
        Math.abs(y - box.y) < box.hh + spread)) continue;
      if (planted.some((plant) => Math.hypot(x - plant.x, y - plant.y) < spread + plant.spread + 24)) continue;
      const radius = add(x, y, size, Math.floor(rnd() * 3));
      planted.push({ x, y, spread });
      if (radius !== undefined) dressed.solids.push({ id: plantId++, t: 1, x, y, r: radius, w: 0, h: 0, f: F_MOVE,
        kind: 'asset', v: 0, stamp: 0, dead: false, hp: 0 });
      placed++;
    }
  };
  if (hatchery || biome === 'mausoleum') {
    placePlants(hatchery ? 38 : 30, 29, 44, (x, y, size, variant) => {
      dressed.trees.push({ x, y, r: size, v: variant, solid: true });
      return size * (hatchery ? .24 : .23);
    });
    placePlants(hatchery ? 42 : 30, 23, 33, (x, y, size, variant) => {
      const kind = hatchery
        ? (variant === 0 ? 'thorn_bush' : 'berry_bush')
        : (variant === 0 ? 'berry_bush' : 'palace_topiary');
      dressed.props.push({ x, y, kind, rot: rnd() * TAU_STATIC, scale: size / 26 });
      return size * .56;
    });
  }
  const perimeter: PlantArea = (x, y) => Math.min(x, y, map.w - x, map.h - y) < 220;
  const addDecorativePlant = (kind: 'mushroom' | 'cedar') => (x: number, y: number, r: number, v: number) => {
    dressed.trees.push({ x, y, r, v, kind, solid: false });
  };
  if (hatchery) {
    const add = addDecorativePlant('mushroom');
    const nest = map.pads.find(p => p.type === 'nest_ground');
    if (nest) placePlants(23, 10, 18, add, (x, y) => {
      const edge = Math.max(Math.abs(x - (nest.x + nest.w / 2)) / (nest.w / 2),
        Math.abs(y - (nest.y + nest.h / 2)) / (nest.h / 2));
      return edge > .82 && edge < 1.53;
    });
    placePlants(46, 8, 17, add, perimeter);
  } else if (biome === 'outpost') {
    const add = addDecorativePlant('cedar');
    placePlants(16, 19, 32, add, (x, y) => waterDistance(x, y) < 200);
    placePlants(23, 23, 38, add, perimeter);
  } else if (biome === 'airbase') {
    const add = addDecorativePlant('cedar');
    const runway = map.pads.find(p => p.type === 'runway');
    if (runway) for (const side of [-1, 1]) {
      placePlants(8, 16, 29, add, (x, y) => {
        const distance = side * (y - (side < 0 ? runway.y : runway.y + runway.h));
        return distance > 47 && distance < 255 && x > runway.x && x < runway.x + runway.w;
      });
    }
    const snow = map.floors.find(f => f.name === '冰霜雪原');
    if (snow) placePlants(12, 22, 36, add, (x, y) =>
      x > snow.x - 55 && x < snow.x + snow.w + 55 && y > snow.y - 100 && y < snow.y + snow.h + 68);
    placePlants(15, 21, 34, add, (x, y, spread) =>
      perimeter(x, y, spread) && (x > map.w / 2 || y < map.h * .70));
  }
  return dressed;
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

  const wallKind = (kind?: string): Cover[0] => {
    if (kind === 'rack' || kind === 'castle_wall') return kind;
    return 'wall';
  };

  for (const room of rooms) {
    const { x, y, w, h } = room;
    const GAP = room.doorWidth ?? 104;
    const roomCoverStart = cover.length;
    const doors: DoorPassage[] = [];
    floors.push({ name: room.name, x: x + TH, y: y + TH, w: w - TH * 2, h: h - TH * 2, type: room.floor, roofed: true, doors, wallInset: TH, theme: room.theme });
    pads.push({ type: 'base', x: x + TH, y: y + TH, w: w - TH * 2, h: h - TH * 2 });

    const doorAt = (side: string) => (room.doors ?? []).filter((d) => d[0] === side).map((d) => d[1]);

    const horizontal = (side: 'n' | 's', yy: number) => {
      const gaps = doorAt(side).sort((a, b) => a - b);
      let cursor = x;
      for (const p of gaps) {
        const gx = x + w * p - GAP / 2;
        doors.push(doorPassage(gx + GAP / 2, yy + TH / 2, GAP, TH, true));
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
        doors.push(doorPassage(xx + TH / 2, gy + GAP / 2, GAP, TH, false));
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
      f: kind === 'car' || kind === 'pump' || kind === 'fence' || kind === 'sandbag' ? low : wall,
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
    props: map.props.map(point), floors: map.floors.map((floor) => ({ ...point(floor), doors: floor.doors?.map(point) })), decor: map.decor.map(point),
    trees: map.trees.map(point), water: map.water.map(point), roads: map.roads.map(shiftPolyline),
    pads: map.pads.map(point), containers: map.containers.map(point), extractions: map.extractions.map(point),
    spawns: map.spawns.map((s) => ({ ...s, x: s.x + dx, y: s.y + dy, chick: [s.chick[0] + dx, s.chick[1] + dy] })),
    enemySpots: map.enemySpots.map(point), reinforce: map.reinforce.map(point),
    vehicleSpots: map.vehicleSpots?.map(point),
    zones: map.zones.map(point), tracks: map.tracks.map((y) => y + dy),
  };
}

function buildHarbor(): GameMap {
  const w = 2400, h = 1664;
  // Open harbour water along the north edge. Land piers (gaps between the
  // rectangles) jut into the sea: the main quay and the boarding pier.
  const water = [
    { x: 575, y: 20, r: 0, w: 950, h: 300 },   // western basin (x100..1050)
    { x: 1700, y: 20, r: 0, w: 700, h: 300 },  // eastern basin (x1350..2050)
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
    ['sandbag', 560, 1007, 180, 26], ['cargo', 1080, 700, 70, 130], ['cargo', 1500, 1440, 170, 60],
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
    // Quick landmarks in local map coordinates.
    { kind: 'rope_coil', x: 1700, y: 470, rot: 0, scale: 1 },
    { kind: 'rope_coil', x: 470, y: 905, rot: .4, scale: 0.9 },
    { kind: 'buoy', x: 1560, y: 400, rot: 0, scale: 1 },
    { kind: 'buoy', x: 900, y: 390, rot: 0, scale: 0.9 },
    // Quick harbor service props.
    { kind: 'water_bucket', x: 1116, y: 504, rot: 0, scale: 1 },
    { kind: 'trash_bin', x: 532, y: 880, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 1180, y: 880, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 1948, y: 880, rot: 0, scale: 1 },
  ];
  return withBiomeArt({
    w, h, water, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[570, 828], [1117, 822], [1480, 714], [1770, 987], [2010, 710]]),
    floors: [
      ...rooms.floors,
      { name: '中央装卸场', type: 'concrete', x: 1180, y: 574, w: 770, h: 600, roofed: false },
      { name: '主码头引道', type: 'concrete', x: 1050, y: 190, w: 300, h: 240, roofed: false },
      { name: '登船码头', type: 'concrete', x: 2050, y: 190, w: 290, h: 220, roofed: false },
      { name: '南侧堆货区', type: 'concrete', x: 1150, y: 1450, w: 800, h: 160, roofed: false },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 90, 3, water)], trees: [], tracks: [],
    roads: [
      [100, 830, 2300, 830],
      [347, 785, 347, 830],
      [100, 1215, 1525, 1215],
      [1056, 1428, 2300, 1428],
      [520, 500, 520, 1215],
      [1056, 470, 1056, 1428],
      [1525, 190, 1525, 1428],
      [2200, 1428, 2200, 210],
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
    ['rack', 900, 1420, 230, 34], ['train', 1600, 1420, 200, 60], ['cargo', 640, 250, 180, 58],
    // northern service road — tanks and barriers
    ['cargo', 900, 120, 190, 56], ['cargo', 1320, 150, 160, 54], ['cargo', 2060, 120, 180, 56],
    ['wall', 240, 350, 20, 110], ['wall', 2280, 360, 20, 120],
    // southern slag yard — machinery & barriers
    ['sandbag', 400, 1536, 190, 26], ['cargo', 1620, 1540, 180, 58], ['cargo', 2140, 1520, 180, 58],
    ['wall', 980, 1520, 18, 120],
    // foundry dressing: safety rails (vehicles/tanks now rendered as scenery props)
    ['fence', 240, 620, 16, 200], ['fence', 2380, 620, 16, 200],
  ];
  const props: SceneryProp[] = [
    // 厂区车辆：复用旧 car 点位，横放 PI/2
    { kind: 'freight_boxcar', x: 430, y: 1398, rot: 0, scale: 1 },
    { kind: 'freight_flatcar', x: 620, y: 1398, rot: 0, scale: 1 },
    { kind: 'freight_boxcar', x: 2010, y: 1450, rot: 0, scale: 1 },
    { kind: 'dump_truck', x: 860, y: 1412, rot: Math.PI / 2, scale: 1.05 },
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
    // Quick landmarks in local map coordinates.
    { kind: 'furnace_vent', x: 1000, y: 760, rot: 0, scale: 1 },
    { kind: 'furnace_vent', x: 1880, y: 790, rot: 0, scale: 1 },
    { kind: 'pipe_run', x: 1430, y: 1150, rot: 0, scale: 1.1 },
    { kind: 'pipe_run', x: 2110, y: 820, rot: Math.PI/2, scale: 1 },
    { kind: 'cargo_net', x: 2010, y: 1395, rot: 0, scale: 0.9 },
    { kind: 'ingot_stack', x: 2100, y: 640, rot: 0, scale: 1 },
    { kind: 'ingot_stack', x: 1250, y: 1250, rot: 0, scale: 0.95 },
    { kind: 'fuel_tank', x: 2400, y: 1100, rot: Math.PI/2, scale: 1 },
    // Quick foundry service props.
    { kind: 'water_bucket', x: 1030, y: 440, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 1140, y: 430, rot: 0, scale: 1 },
    { kind: 'trash_bin', x: 1720, y: 420, rot: 0, scale: 1 },
  ];
  return withBiomeArt({
    w, h, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], [], [[830, 795], [1030, 985], [1245, 840], [1600, 1035], [1820, 845], [2150, 980], [760, 1300], [1880, 1180]]),
    floors: [
      ...rooms.floors,
      { name: '炉前广场', type: 'concrete', x: 1110, y: 530, w: 650, h: 660, roofed: false },
      { name: '北检修道', type: 'concrete', x: 200, y: 120, w: 1000, h: 160, roofed: false },
      { name: '南炉渣区', type: 'concrete', x: 1050, y: 1500, w: 900, h: 160, roofed: false },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 80, 5)], trees: [], water: [],
    roads: [
      [100, 345, 500, 345, 625, 345, 1290, 345, 1290, 360, 2460, 360],
      [100, 1420, 2460, 1420],
      [425, 345, 425, 1420],
      [1290, 360, 1290, 500, 1748, 500, 1748, 1420],
      [2330, 360, 2330, 1420],
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
    { name: '东北孵卵室', x: 1430, y: 150, w: 260, h: 220, floor: 'tile', doors: [['s', 0.5], ['w', 0.5]],
      racks: [[1460, 210, 150, 20]], loot: [['pc', 0.2, 0.2], ['medbox', 0.75, 0.3], ['weaponcase', 0.5, 0.8]] },
    { name: '南巢育成房', x: 620, y: 1400, w: 300, h: 170, floor: 'wood', doors: [['n', 0.5], ['e', 0.5]],
      loot: [['crate', 0.2, 0.25], ['duffel', 0.8, 0.3], ['medbox', 0.5, 0.8]] },
  ]);
  const extraCover: Cover[] = [
    ['cargo', 600, 720, 220, 68], ['cargo', 1000, 760, 180, 60], ['cargo', 1480, 700, 200, 70],
    ['cargo', 1900, 700, 160, 60], ['cargo', 450, 900, 190, 60], ['cargo', 1250, 960, 200, 60],
    ['sandbag', 1750, 1345, 180, 25], ['cargo', 700, 1380, 180, 55],
    ['wall', 820, 980, 18, 140], ['wall', 1600, 900, 18, 160],
    ['fence', 240, 650, 16, 180], ['fence', 2160, 650, 16, 180],
    ['wall', 900, 560, 18, 130], ['wall', 1500, 560, 18, 130],
    ['cargo', 1180, 1040, 180, 56], ['cargo', 1980, 960, 160, 56],
    ['fence', 700, 1160, 16, 140],
  ];
  const props: SceneryProp[] = [
    { kind: 'delivery_truck', x: 880, y: 620, rot: Math.PI / 2, scale: 1.05 },
    { kind: 'pickup_truck', x: 1570, y: 860, rot: Math.PI / 2, scale: 1.0 },
    { kind: 'rowboat', x: 960, y: 85, rot: 0, scale: 0.9 },
    { kind: 'barrels', x: 1010, y: 1120, scale: 1.0, rot: 0 },
    { kind: 'crane', x: 2040, y: 900, scale: 1.05, rot: 0 },
    { kind: 'vending_machine', x: 1260, y: 390, rot: 0, scale: 0.8 },
    { kind: 'egg_nest', x: 1150, y: 800, rot: 0, scale: 1.6 },
    { kind: 'bed', x: 700, y: 500, rot: 0, scale: 0.8 },
    { kind: 'bedside_cabinet', x: 760, y: 420, rot: 0, scale: 0.55 },
    { kind: 'potted_flower', x: 355, y: 520, rot: 0, scale: 0.75 },
    // 腐叶区植被与孵化杂物
    { kind: 'nest_cluster', x: 1040, y: 700, rot: 0, scale: 0.9 },
    { kind: 'nest_cluster', x: 1270, y: 700, rot: 0, scale: 0.9 },
    { kind: 'nest_cluster', x: 1040, y: 900, rot: 0, scale: 0.9 },
    { kind: 'nest_cluster', x: 1270, y: 900, rot: 0, scale: 0.9 },
    { kind: 'berry_bush', x: 830, y: 690, rot: 0, scale: 0.95 },
    { kind: 'berry_bush', x: 1652, y: 1186, rot: 0, scale: 1.0 },
    { kind: 'thorn_bush', x: 986, y: 1180, rot: 0, scale: 1.0 },
    { kind: 'crate_stack', x: 1836, y: 902, rot: 0, scale: 0.95 },
    { kind: 'nest_cluster', x: 1560, y: 320, rot: 0, scale: 1.0 },
    { kind: 'berry_bush', x: 2040, y: 420, rot: 0, scale: 0.9 },
    { kind: 'wood_steps', x: 760, y: 1480, rot: 0, scale: 0.85 },
    { kind: 'hay_bale', x: 1000, y: 1500, rot: 0, scale: 0.95 },
    // Quick landmarks in local map coordinates.
    { kind: 'spore_pod', x: 960, y: 660, rot: 0, scale: 0.8 },
    { kind: 'spore_pod', x: 1340, y: 950, rot: 0, scale: 0.8 },
    { kind: 'cattail', x: 640, y: 60, rot: 0, scale: 1 },
    { kind: 'cattail', x: 1180, y: 40, rot: 0, scale: 0.9 },
    { kind: 'cattail', x: 1720, y: 1500, rot: 0, scale: 1 },
    { kind: 'cattail', x: 2080, y: 1330, rot: 0, scale: 0.9 },
    { kind: 'well', x: 560, y: 1010, rot: 0, scale: 1 },
    { kind: 'laundry_line', x: 440, y: 1220, rot: 0, scale: 1 },
    { kind: 'bus_stop', x: 350, y: 660, rot: 0, scale: 1 },
    // Quick bridge decks and village utilities use local-map coordinates;
    // reframeMap below adds (+350,+250) to every prop.
    { kind: 'wood_bridge', x: 900, y: 80, rot: Math.PI / 2, scale: 1, len: 200, width: 64 },
    { kind: 'wood_bridge', x: 1950, y: 1450, rot: Math.PI / 2, scale: 1, len: 220, width: 64 },
    { kind: 'water_bucket', x: 640, y: 1060, rot: 0, scale: 1 },
    { kind: 'water_bucket', x: 490, y: 1070, rot: 0, scale: 0.9 },
    { kind: 'street_lamp', x: 760, y: 470, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 1540, y: 470, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 760, y: 1130, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 1540, y: 1130, rot: 0, scale: 1 },
    { kind: 'mailbox', x: 60, y: 700, rot: 0, scale: 1 },
    { kind: 'bench_park', x: 1270, y: 1210, rot: 0, scale: 1 },
    { kind: 'trash_bin', x: 1680, y: 870, rot: 0, scale: 1 },
  ];
  return withBiomeArt(reframeMap({
    w, h, water, props,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[1180, 640], [1520, 1080], [820, 1300]]),
    floors: [
      ...rooms.floors,
      { name: '孵化中庭', type: 'concrete', x: 700, y: 600, w: 1200, h: 400, roofed: false },
      { name: '西侧腐叶道', type: 'concrete', x: 110, y: 700, w: 420, h: 370, roofed: false },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 85, 7, water)], trees: [], tracks: [],
    roads: [[80, 760, 880, 760], [1600, 760, 2220, 760],
      [80, 1460, 540, 1460, 540, 1630, 1035, 1630, 1035, 1440, 2220, 1440],
      [880, 200, 880, 1330, 1035, 1330, 1035, 1440],
      [1710, 410, 1710, 650, 1600, 650, 1600, 1440],
      [470, 1085, 470, 1025, 300, 1025, 300, 760]],
    pads: [{ type: 'nest_ground', x: 909, y: 590, w: 650, h: 465 }, ...rooms.pads, { type: 'platform', x: 2100, y: 1420, w: 180, h: 110 }],
    containers: [
      ...rooms.containers,
      { type: 'crate', x: 780, y: 900 }, { type: 'medbox', x: 1120, y: 1060 }, { type: 'duffel', x: 1680, y: 1340 },
      { type: 'crate', x: 1000, y: 400, fixedItem: 'minigun' },
      { type: 'crate', x: 1280, y: 1300, fixedItem: 'rpg' },
      { type: 'treasure_chest', x: 1435, y: 960 },
      { type: 'vending', x: 1260, y: 390 },       { type: 'treasure_chest', x: 900, y: 1460 }, { type: 'coin_pile', x: 1900, y: 1450 },
      { type: 'weaponcase', x: 1560, y: 330, fixedItem: 'rpg' }, { type: 'medbox', x: 760, y: 1500 },
      { type: 'treasure_chest', x: 1040, y: 1520 },
    ],
    spawns: [
      { x: 110, y: 430, chick: [560, 760] }, { x: 560, y: 150, chick: [1200, 600] },
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
      { type: 'elite', x: 1560, y: 300, n: 1 }, { type: 'shield', x: 760, y: 1500, n: 1 },
      { type: 'hen', x: 2000, y: 420, n: 1 }, { type: 'bandit', x: 660, y: 1490, n: 1 },
    ],
    reinforce: [{ x: 150, y: 900 }, { x: 560, y: 150 }, { x: 2000, y: 220 }, { x: 2150, y: 900 }, { x: 400, y: 1480 }, { x: 1700, y: 1500 }, { x: 1150, y: 1400 }, { x: 1560, y: 300 }, { x: 780, y: 1530 }, { x: 2050, y: 420 }],
    zones: [
      { name: '北缘育雏棚', x: -350, y: -250, w: 3000, h: 500 },
      { name: '西侧育雏棚', x: -350, y: 250, w: 1200, h: 650 },
      { name: '中央孵化中庭', x: 850, y: 250, w: 900, h: 650 },
      { name: '鸭后蛋巢', x: 1750, y: 250, w: 900, h: 650 },
      { name: '南侧腐叶区', x: -350, y: 900, w: 3000, h: 950 },
      { name: '东北孵卵室', x: 1050, y: 150, w: 800, h: 500 },
      { name: '南巢育成区', x: 450, y: 1350, w: 900, h: 500 },
    ],
  }, 350, 250, 3000, 2100), 'hatchery');
}

/** 霜锋哨站：两名首领分守冻土广场两端，冰湖把战场切成两条推进路线。 */
function buildOutpost(): GameMap {
  const w = 2600, h = 1700;
  const armor: VehicleSpot[] = [
    { kind: 'tank', x: 340, y: 1025, heading: -Math.PI / 2, hostile: true },
    { kind: 'btr', x: 2010, y: 967, heading: Math.PI, hostile: true },
  ];
  const armorGuards: EnemySpot[] = [
    { type: 'armored', x: 185, y: 900, n: 1 }, { type: 'shield', x: 345, y: 900, n: 1 },
    { type: 'bandit', x: 445, y: 900, n: 1 }, { type: 'elite', x: 465, y: 1040, n: 1 },
    { type: 'bandit', x: 190, y: 1060, n: 1 }, { type: 'shield', x: 245, y: 1150, n: 1 },
    { type: 'elite', x: 520, y: 1090, n: 1 }, { type: 'armored', x: 175, y: 1190, n: 1 },
    { type: 'armored', x: 1945, y: 975, n: 1 }, { type: 'shield', x: 2055, y: 880, n: 1 },
    { type: 'bandit', x: 2175, y: 875, n: 1 }, { type: 'elite', x: 2130, y: 920, n: 1 },
    { type: 'bandit', x: 2180, y: 985, n: 1 }, { type: 'shield', x: 2155, y: 1085, n: 1 },
    { type: 'elite', x: 2105, y: 1120, n: 1 }, { type: 'armored', x: 2015, y: 1120, n: 1 },
  ];
  const water = [
    { x: 900, y: 820, r: 0, w: 420, h: 220 },
    { x: 2450, y: 820, r: 0, w: 300, h: 200 },
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
    { name: '冰塔观测所', x: 1500, y: 160, w: 220, h: 240, floor: 'tile', doors: [['s', 0.5], ['w', 0.5]],
      loot: [['pc', 0.2, 0.2], ['toolbox', 0.75, 0.3], ['safe', 0.5, 0.8]] },
    { name: '雪下军械库', x: 780, y: 1460, w: 320, h: 200, floor: 'concrete', doors: [['n', 0.5], ['e', 0.5]],
      racks: [[810, 1610, 160, 20]], loot: [['weaponcase', 0.2, 0.25], ['medbox', 0.8, 0.3], ['crate', 0.5, 0.8]] },
  ]);
  const extraCover: Cover[] = [
    ['cargo', 550, 760, 200, 64], ['cargo', 1250, 760, 220, 64], ['cargo', 1650, 620, 180, 60],
    ['cargo', 2050, 760, 200, 60], ['sandbag', 450, 966, 190, 26], ['cargo', 1000, 1250, 190, 58],
    ['cargo', 2100, 1350, 180, 58], ['wall', 1450, 720, 20, 140], ['wall', 1450, 960, 20, 140],
    ['wall', 2350, 500, 18, 160], ['fence', 250, 800, 16, 180], ['fence', 2480, 1050, 16, 180],
    ['wall', 1000, 620, 18, 120], ['wall', 1550, 620, 18, 120],
    ['cargo', 830, 1040, 170, 56], ['cargo', 2300, 620, 160, 56],
    ['fence', 1320, 1480, 16, 140], ['fence', 2480, 1400, 16, 140],
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
    { kind: 'ice_beacon', x: 1600, y: 280, rot: 0, scale: 1.0 },
    { kind: 'metal_workbench', x: 950, y: 1560, rot: Math.PI / 2, scale: 0.85 },
    { kind: 'crate_stack', x: 2280, y: 1360, rot: 0, scale: 0.95 },
    { kind: 'stone_steps', x: 1900, y: 1120, rot: 0, scale: 0.9 },
    { kind: 'wood_bench', x: 1000, y: 1500, rot: 0, scale: 0.86 },
    // 双首领战场的程序化氛围道具：冰块、冰晶、停机坪上的战机与熔岩裂隙
    { kind: 'fighter_jet', x: 2240, y: 320, rot: -0.12, scale: 0.95 },
    { kind: 'ice_block', x: 520, y: 1480, rot: 0.18, scale: 1.0 },
    { kind: 'ice_block', x: 240, y: 1320, rot: -0.24, scale: 0.9 },
    { kind: 'ice_crystal', x: 1320, y: 120, rot: 0.1, scale: 1.05 },
    // Quick landmarks in local map coordinates.
    { kind: 'frost_pylon', x: 1440, y: 560, rot: 0, scale: 1 },
    { kind: 'snow_drift', x: 1400, y: 1480, rot: -.16, scale: 1 },
    { kind: 'snow_drift', x: 2440, y: 200, rot: .1, scale: 1 },
    { kind: 'frost_pylon', x: 1950, y: 880, rot: 0, scale: 0.95 },
    { kind: 'frost_pylon', x: 2420, y: 1100, rot: 0, scale: 0.95 },
    { kind: 'radar_station', x: 1290, y: 330, rot: 0, scale: 1 },
    { kind: 'missile_rack', x: 2120, y: 1250, rot: 0, scale: 1 },
    { kind: 'missile_rack', x: 640, y: 1250, rot: 0, scale: 1 },
    { kind: 'sandbag_wall', x: 1698, y: 880, rot: 0, scale: 1 },
    { kind: 'checkpoint_gate', x: 1510, y: 1020, rot: Math.PI / 2, scale: 1 },
    { kind: 'water_barrier', x: 1510, y: 1130, rot: Math.PI / 2, scale: 1 },
    { kind: 'striped_barricade', x: 1810, y: 1060, rot: 0, scale: .9 },
  ];
  return withBiomeArt(reframeMap({
    w, h, water, props, vehicleSpots: armor,
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[1180, 1000], [1620, 860], [2050, 1080], [600, 1320]]),
    floors: [
      ...rooms.floors,
      { name: '冰封中庭东场', type: 'concrete', x: 1120, y: 700, w: 780, h: 340, roofed: false },
      { name: '冰封中庭南岸', type: 'concrete', x: 900, y: 950, w: 220, h: 90, roofed: false },
      { name: '霜羽元帅雪丘', type: 'concrete', x: 700, y: 430, w: 500, h: 280, roofed: false },
      { name: '铁壁统领擂台东场', type: 'concrete', x: 1950, y: 840, w: 300, h: 440, roofed: false },
      { name: '铁壁统领擂台南场', type: 'concrete', x: 1690, y: 940, w: 260, h: 340, roofed: false },
      { name: '西侧冻土路', type: 'concrete', x: 120, y: 700, w: 400, h: 380, roofed: false },
      { name: '东侧广场', type: 'concrete', x: 1900, y: 960, w: 560, h: 160, roofed: false },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 95, 11, water)], trees: [], tracks: [],
    roads: [[80, 720, 2520, 720], [80, 1020, 2520, 1020], [925, 120, 925, 1410],
      [1460, 535, 1650, 535, 1650, 1650], [2350, 300, 2350, 1450]],
    pads: [...rooms.pads, { type: 'platform', x: 2320, y: 180, w: 210, h: 130 }, { type: 'base', x: 1120, y: 700, w: 780, h: 340 }],
    containers: [
      ...rooms.containers,
      { type: 'crate', x: 760, y: 1050 }, { type: 'medbox', x: 1300, y: 1400 }, { type: 'duffel', x: 2200, y: 1000 },
      { type: 'weaponcase', x: 1360, y: 420, fixedItem: 'awmlegend' },
      { type: 'safe', x: 2100, y: 1270, fixedItem: 'm4legend' },
      { type: 'crate', x: 500, y: 1200, fixedItem: 'rpg' },
      { type: 'vending', x: 1780, y: 1450 }, { type: 'treasure_chest', x: 1220, y: 1450 }, { type: 'coin_pile', x: 900, y: 1460 },
      { type: 'weaponcase', x: 1600, y: 280, fixedItem: 'rpg' }, { type: 'medbox', x: 950, y: 1560 },
      { type: 'treasure_chest', x: 1100, y: 1600 },
    ],
    spawns: [
      { x: 110, y: 520, chick: [600, 960] }, { x: 1200, y: 100, chick: [1300, 600] },
      { x: 2500, y: 380, chick: [2100, 700] }, { x: 180, y: 1570, chick: [700, 1360] },
    ],
    extractions: [{ id: 'A', name: '北岭撤离台', x: 2430, y: 170, r: 76 }, { id: 'B', name: '南岭运输口', x: 2430, y: 1500, r: 76 }],
    enemySpots: [
      ...armorGuards,
      { type: 'frostMarshal', x: 980, y: 600, n: 1 }, { type: 'ironGuard', x: 1800, y: 1010, n: 1 },
      { type: 'chicken', x: 600, y: 960, n: 3 }, { type: 'chicken', x: 1900, y: 700, n: 3 },
      { type: 'bandit', x: 620, y: 700, n: 1 }, { type: 'bandit', x: 1300, y: 620, n: 1 },
      { type: 'bandit', x: 1650, y: 1080, n: 1 }, { type: 'bandit', x: 2200, y: 920, n: 1 },
      { type: 'elite', x: 1520, y: 880, n: 1 }, { type: 'elite', x: 2120, y: 1380, n: 1 },
      { type: 'armored', x: 1180, y: 900, n: 1 }, { type: 'armored', x: 1980, y: 1180, n: 1 },
      { type: 'shield', x: 1080, y: 1180, n: 1 }, { type: 'shield', x: 1720, y: 720, n: 1 },
      { type: 'hen', x: 1450, y: 1300, n: 1 }, { type: 'hen', x: 700, y: 1320, n: 1 },
      { type: 'lookout', x: 2150, y: 150, n: 1 }, { type: 'lookout', x: 2300, y: 1550, n: 1 },
      { type: 'elite', x: 1600, y: 300, n: 1 }, { type: 'shield', x: 900, y: 1560, n: 1 },
      { type: 'armored', x: 2200, y: 600, n: 1 }, { type: 'bandit', x: 1000, y: 1500, n: 1 },
    ],
    reinforce: [{ x: 150, y: 950 }, { x: 780, y: 120 }, { x: 1500, y: 150 }, { x: 2500, y: 700 }, { x: 2450, y: 1180 }, { x: 1000, y: 1580 }, { x: 1900, y: 1600 }, { x: 1600, y: 300 }, { x: 950, y: 1600 }, { x: 2250, y: 600 }],
    zones: [
      { name: '北缘雷达雪坡', x: -300, y: -250, w: 3200, h: 650 },
      { name: '西侧机库与元帅雪丘', x: -300, y: 400, w: 1200, h: 1050 },
      { name: '冻土中央走廊', x: 900, y: 400, w: 900, h: 1050 },
      { name: '铁壁擂台与东哨所', x: 1800, y: 400, w: 1100, h: 1050 },
      { name: '南侧运输坡', x: -300, y: 1450, w: 3200, h: 500 },
      { name: '冰塔观测哨', x: 1400, y: 150, w: 500, h: 500 },
      { name: '雪下军械库', x: 650, y: 1400, w: 650, h: 450 },
    ],
  }, 300, 250, 3200, 2200), 'outpost');
}

/**
 * 冰火空军基地（Quick 附加战区）：北侧机库与塔台、横贯全图的跑道、
 * 南侧熔岩焦土与冰霜雪原。三处候选撤离点当局启用两处，烈焰王牌与
 * 冰霜雷达官分守西南熔岩区和东南雪原，双首领同场、独立交战。
 */
function buildAirbase(): GameMap {
  const w = 2700, h = 1800;
  // 熔岩区融冰水池：中间留出石桥可通行的缺口
  const water = [
    { x: 870, y: 1500, r: 0, w: 140, h: 180 },
    { x: 1090, y: 1500, r: 0, w: 140, h: 180 },
  ];
  const rooms = buildRooms([
    { name: '西翼机库', x: 260, y: 260, w: 520, h: 340, floor: 'concrete', doors: [['s', 0.5], ['e', 0.6]],
      racks: [[320, 320, 200, 24]],
      loot: [['weaponcase', 0.2, 0.25], ['crate', 0.8, 0.25], ['medbox', 0.5, 0.85]] },
    { name: '塔台', x: 1180, y: 180, w: 300, h: 260, floor: 'tile', doors: [['s', 0.5], ['w', 0.5]],
      loot: [['pc', 0.2, 0.25], ['desktop', 0.5, 0.25], ['laptop', 0.4, 0.7], ['safe', 0.85, 0.3]] },
    { name: '东翼机库', x: 1900, y: 260, w: 520, h: 340, floor: 'concrete', doors: [['s', 0.5], ['w', 0.6]],
      racks: [[1960, 320, 200, 24]],
      loot: [['weaponcase', 0.2, 0.25], ['crate', 0.8, 0.25], ['medbox', 0.5, 0.85]] },
    { name: '熔岩油库', x: 360, y: 1140, w: 360, h: 260, floor: 'concrete', doors: [['n', 0.5], ['e', 0.5]],
      loot: [['crate', 0.2, 0.25], ['duffel', 0.8, 0.3], ['safe', 0.5, 0.85]] },
    { name: '冰封雷达站', x: 1980, y: 1140, w: 360, h: 260, floor: 'tile', doors: [['n', 0.5], ['w', 0.5]],
      loot: [['pc', 0.2, 0.25], ['toolbox', 0.8, 0.3], ['safe', 0.5, 0.85]] },
    { name: '指挥掩体', x: 1120, y: 1160, w: 440, h: 260, floor: 'concrete', doors: [['n', 0.5], ['w', 0.5], ['e', 0.5]],
      loot: [['safe', 0.15, 0.25], ['weaponcase', 0.85, 0.25], ['laptop', 0.5, 0.7]] },
  ]);
  const extraCover: Cover[] = [
    ['cargo', 880, 700, 200, 64], ['cargo', 1620, 700, 200, 64], ['wall', 1320, 600, 20, 160],
    ['cargo', 600, 900, 180, 58], ['cargo', 1900, 900, 180, 58], ['sandbag', 1200, 1015, 180, 26],
    ['fence', 200, 700, 16, 200], ['fence', 2480, 700, 16, 200],
    ['wall', 880, 1300, 18, 160], ['wall', 1820, 1300, 18, 160],
  ];
  const props: SceneryProp[] = [
    // 停机坪上的战机与滑行道残机
    { kind: 'fighter_jet_parked', x: 415, y: 453, rot: Math.PI, scale: 1.1 },
    { kind: 'fighter_jet_parked', x: 2260, y: 453, rot: Math.PI, scale: 1.1 },
    { kind: 'fighter_jet_parked', x: 635, y: 665, rot: 0, scale: 1.1 },
    { kind: 'fighter_jet_parked', x: 2280, y: 665, rot: 0, scale: 1.1 },
    { kind: 'fighter_jet_parked', x: 1080, y: 630, rot: 0, scale: 1.1 },
    { kind: 'fighter_jet_parked', x: 820, y: 980, rot: Math.PI, scale: 1 },
    { kind: 'fighter_jet_parked', x: 2250, y: 1000, rot: Math.PI, scale: 1 },
    // 西侧停机坪与中央停车场撤离点
    { kind: 'parked_jeep', x: 1790, y: 1060, rot: 0.4, scale: 1 },
    { kind: 'parked_jeep', x: 1950, y: 1210, rot: -0.6, scale: 1 },
    // 熔岩焦土：熔池、裂隙与排气口
    { kind: 'lava_pool', x: 222, y: 1550, rot: -.19, scale: 1.47 },
    { kind: 'lava_pool', x: 760, y: 1640, rot: .23, scale: 1.31 },
    { kind: 'lava_fissure', x: 560, y: 1460, rot: 0.3, scale: 1.1 },
    { kind: 'lava_fissure', x: 875, y: 1673, rot: -.3, scale: .95 },
    { kind: 'basalt_spires', x: 163, y: 1620, rot: .24, scale: 1.12 },
    { kind: 'basalt_spires', x: 555, y: 1660, rot: .63, scale: .98 },
    { kind: 'basalt_spires', x: 818, y: 1560, rot: -.25, scale: 1.13 },
    { kind: 'steam_vent', x: 642, y: 1515, rot: .4, scale: 1 },
    { kind: 'steam_vent', x: 198, y: 1482, rot: -.17, scale: .9 },
    { kind: 'furnace_vent', x: 840, y: 1080, rot: 0, scale: 1 },
    // 冰霜雪原：冰块、冰晶与冰柱
    { kind: 'ice_block', x: 2380, y: 1560, rot: 0, scale: 1.1 },
    { kind: 'ice_crystal', x: 1950, y: 1620, rot: 0, scale: 1.2 },
    { kind: 'frost_pylon', x: 2100, y: 1060, rot: 0, scale: 1 },
    { kind: 'snow_drift', x: 2420, y: 1460, rot: 0.1, scale: 1.1 },
    // 场地设施
    { kind: 'crate_stack', x: 780, y: 640, rot: 0, scale: 1 },
    { kind: 'crate_stack', x: 1920, y: 640, rot: 0, scale: 1 },
    { kind: 'barrels', x: 400, y: 700, rot: 0, scale: 1 },
    { kind: 'barrels', x: 2300, y: 700, rot: 0, scale: 1 },
    { kind: 'stone_bridge', x: 980, y: 1500, rot: Math.PI / 2, scale: 1 },
    { kind: 'radar_station', x: 1296, y: 554, rot: 0, scale: 1.1 },
    { kind: 'missile_rack', x: 900, y: 470, rot: 0, scale: 1 },
    { kind: 'missile_rack', x: 1780, y: 470, rot: 0, scale: 1 },
    { kind: 'sandbag_wall', x: 1150, y: 980, rot: 0, scale: 1 },
    { kind: 'sandbag_wall', x: 1550, y: 980, rot: 0, scale: 1 },
    { kind: 'fuel_tank', x: 2277, y: 1253, rot: 0, scale: 1 },
    { kind: 'antenna_mast', x: 1500, y: 250, rot: 0, scale: 1 },
    { kind: 'street_lamp', x: 1350, y: 920, rot: 0, scale: 1 },
    { kind: 'checkpoint_gate', x: 1430, y: 1110, rot: 0, scale: 1 },
    { kind: 'water_barrier', x: 1490, y: 1142, rot: 0, scale: 1 },
    { kind: 'water_barrier', x: 1570, y: 1142, rot: 0, scale: 1 },
    { kind: 'striped_barricade', x: 1120, y: 716, rot: 0, scale: 1 },
    { kind: 'striped_barricade', x: 1580, y: 716, rot: 0, scale: 1 },
  ];
  return withBiomeArt({
    w, h, water, props,
    vehicleSpots: [
      { kind: 'fighter', x: 355, y: 1700, heading: 0, unlockBoss: 'flameAce' },
      { kind: 'transport', x: 180, y: 1030, heading: 0 },
      { kind: 'antiair', x: 850, y: 365, heading: Math.PI / 2, hostile: true },
      { kind: 'antiair', x: 1725, y: 397, heading: Math.PI / 2, hostile: true },
      { kind: 'antiair', x: 690, y: 1720, heading: -Math.PI / 2, hostile: true },
      { kind: 'antiair', x: 2330, y: 1700, heading: -Math.PI / 2, hostile: true },
    ],
    solids: raidSolids(w, h, [...rooms.cover, ...extraCover], water, [[700, 760], [2000, 760], [1350, 1080], [620, 1500]]),
    floors: [
      ...rooms.floors,
      { name: '熔岩焦土', type: 'concrete', x: 120, y: 1450, w: 900, h: 260, roofed: false },
      { name: '冰霜雪原', type: 'concrete', x: 1700, y: 1450, w: 860, h: 260, roofed: false },
    ],
    decor: [...rooms.decor, ...scatterDecor(w, h, 90, 17, water)], trees: [], tracks: [],
    roads: [
      [1330, 475, 1330, 740], [1600, 900, 1600, 1700],
      [200, 1100, 2500, 1100], [310, 900, 310, 1700], [2400, 900, 2400, 1700],
      [520, 635, 520, 740], [2160, 635, 2160, 740],
    ],
    pads: [
      { type: 'runway', x: 200, y: 740, w: 2300, h: 160 },
      ...rooms.pads,
      { type: 'platform', x: 1250, y: 60, w: 200, h: 120 },
      { type: 'helipad', x: 2480, y: 80, w: 150, h: 150 },
    ],
    containers: [
      ...rooms.containers,
      { type: 'weaponcase', x: 1350, y: 640, fixedItem: 'rpg' },
      { type: 'safe', x: 460, y: 1660, fixedItem: 'm4legend' },
      { type: 'safe', x: 2240, y: 1660, fixedItem: 'awmlegend' },
      { type: 'crate', x: 900, y: 560 }, { type: 'crate', x: 1800, y: 560 },
      { type: 'medbox', x: 1350, y: 980 },
      { type: 'treasure_chest', x: 200, y: 1300 }, { type: 'treasure_chest', x: 2500, y: 1300 },
      { type: 'coin_pile', x: 1350, y: 1500 }, { type: 'vending', x: 1500, y: 460 },
    ],
    spawns: [
      { x: 120, y: 400, chick: [400, 500] }, { x: 2580, y: 900, chick: [2300, 800] },
      { x: 1350, y: 80, chick: [1350, 300] }, { x: 1350, y: 1720, chick: [1350, 1500] },
    ],
    extractions: [
      { id: 'A', name: '塔台直升机坪', x: 2555, y: 155, r: 78 },
      { id: 'B', name: '西侧停机坪', x: 470, y: 1030, r: 82 },
      { id: 'C', name: '中央停车场', x: 1870, y: 1150, r: 76 },
    ],
    enemySpots: [
      { type: 'flameAce', x: 420, y: 1580, n: 1 }, { type: 'radarWarden', x: 2300, y: 1580, n: 1 },
      { type: 'elite', x: 520, y: 600, n: 1 }, { type: 'elite', x: 2160, y: 600, n: 1 },
      { type: 'armored', x: 1350, y: 700, n: 1 },
      { type: 'shield', x: 1000, y: 960, n: 1 }, { type: 'shield', x: 1700, y: 960, n: 1 },
      { type: 'bandit', x: 300, y: 960, n: 1 }, { type: 'bandit', x: 2400, y: 960, n: 1 },
      { type: 'lookout', x: 1330, y: 300, n: 1 },
      { type: 'hen', x: 800, y: 1300, n: 1 }, { type: 'hen', x: 1900, y: 1300, n: 1 },
      { type: 'chicken', x: 1350, y: 1350, n: 4 },
      { type: 'armored', x: 400, y: 1300, n: 1 }, { type: 'armored', x: 2300, y: 1300, n: 1 },
    ],
    reinforce: [{ x: 120, y: 900 }, { x: 2580, y: 900 }, { x: 1350, y: 120 }, { x: 600, y: 1720 }, { x: 2100, y: 1720 }],
    zones: [
      { name: '西翼机库', x: 0, y: 0, w: 900, h: 700 },
      { name: '塔台', x: 900, y: 0, w: 900, h: 700 },
      { name: '东翼机库', x: 1800, y: 0, w: 900, h: 700 },
      { name: '中央跑道', x: 0, y: 700, w: 2700, h: 400 },
      { name: '熔岩焦土', x: 0, y: 1100, w: 1350, h: 700 },
      { name: '冰霜雪原', x: 1350, y: 1100, w: 1350, h: 700 },
    ],
  }, 'airbase');
}

/** 鸭王陵寝：双宝库提供顶级装备，鸭王在大厅轮换四种招式。 */
function buildMausoleum(): GameMap {
  const w = 3400, h = 3200, center = w / 2;
  const entry = { x: center, y: 2620 };
  const ambushTanks = ['range_t90', 'range_leopard2', 'range_challenger2', 'range_k2'] as const;
  const approaches = [
    [1290, 2040, 1290, 2390], [1510, 2010, 1470, 2320],
    [1890, 2010, 1930, 2320], [2110, 2040, 2110, 2390],
    [970, 2450, 1265, 2545], [2430, 2450, 2135, 2545],
    [940, 2920, 1290, 2745], [2460, 2920, 2110, 2745],
    [1090, 3000, 1440, 2860], [2310, 3000, 1960, 2860],
  ];
  const vehicleSpots: VehicleSpot[] = [
    { kind: 'range_type99', ...entry, heading: -Math.PI / 2, startsOccupied: true },
    ...approaches.map(([x, y, approachX, approachY], i): VehicleSpot => ({
      kind: ambushTanks[i % ambushTanks.length], x, y,
      heading: Math.atan2(approachY - y, approachX - x), hostile: true, approach: { x: approachX, y: approachY },
    })),
  ];
  const plaza = { x: 940, y: 1350, w: 1520, h: 1060 };
  const plazaMidY = plaza.y + plaza.h / 2;
  // Rounded road caps meet the outer edge of the plaza's border.
  const plazaRoadOffset = (ROAD_EDGE_WIDTH + ROYAL_PLAZA_BORDER_WIDTH) / 2;
  const plazaWestApproach = plaza.x - plazaRoadOffset;
  const plazaEastApproach = plaza.x + plaza.w + plazaRoadOffset;
  const sideDoorWidth = 152;
  const names = ['寒晶议事厅', '铁壁军械厅', '烈焰机库', '雷达指挥厅', '王座大厅'];
  const halls: RoomDef[] = [
    { name: names[0], x: 200, y: 2125, w: 680, h: 530, floor: 'tile', theme: 'frost', doorWidth: sideDoorWidth, doors: [['s', .5]] },
    { name: names[1], x: 2520, y: 2100, w: 680, h: 540, floor: 'concrete', theme: 'guard', doorWidth: sideDoorWidth, doors: [['s', .5]] },
    { name: names[2], x: 2550, y: 1320, w: 650, h: 550, floor: 'concrete', theme: 'air', doorWidth: sideDoorWidth, doors: [['s', .5]] },
    { name: names[3], x: 200, y: 1100, w: 650, h: 520, floor: 'tile', theme: 'radar', doorWidth: sideDoorWidth, doors: [['s', .5]] },
    { name: names[4], x: 975, y: 560, w: 1450, h: 595, floor: 'tile', theme: 'royal',
      kind: 'castle_wall', doorWidth: 216, doors: [['s', .5], ['n', .5]] },
    { name: '王家西宝库', x: 225, y: 166, w: 650, h: 304, floor: 'tile', theme: 'royal',
      doors: [['e', .55]], loot: [['safe', .18, .2], ['treasure_chest', .4, .72], ['coin_pile', .68, .23]] },
    { name: '王家东宝库', x: 2525, y: 166, w: 650, h: 304, floor: 'tile', theme: 'royal',
      doors: [['w', .55]], loot: [['safe', .8, .2], ['treasure_chest', .58, .73], ['coin_pile', .35, .23]] },
  ];
  const rooms = buildRooms(halls);
  const unit = (type: EnemyType, x: number, y: number): GauntletUnit => ({ type, x, y });
  const encounters: Omit<GauntletStage, 'name' | 'entrance'>[] = [
    { bosses: ['frostMarshal'], direction: '旗庭西南 · 从南门进入',
      guards: [unit('armored', 424, 2316), unit('shield', 630, 2394), unit('bandit', 744, 2340)],
      reinforcements: { frostMarshal: [unit('bandit', 425, 2177), unit('bandit', 634, 2177)] } },
    { bosses: ['ironGuard'], direction: '旗庭东南 · 从南门进入',
      guards: [unit('armored', 2720, 2392), unit('shield', 2830, 2492), unit('bandit', 3032, 2344)],
      reinforcements: { ironGuard: [unit('bandit', 2632, 2168), unit('bandit', 2976, 2200)] } },
    { bosses: ['flameAce'], direction: '沿旗庭东侧向北 · 从南门进入',
      guards: [unit('armored', 2724, 1632), unit('shield', 2800, 1760), unit('bandit', 3050, 1582)],
      reinforcements: { flameAce: [unit('bandit', 2829, 1410), unit('hen', 3090, 1785)] } },
    { bosses: ['radarWarden'], direction: '旗庭西北 · 从南门进入',
      guards: [unit('armored', 423, 1420), unit('shield', 529, 1490), unit('bandit', 691, 1345)],
      reinforcements: { radarWarden: [unit('bandit', 446, 1172), unit('bandit', 628, 1216)] } },
    { bosses: ['broodQueen', 'duckKing'], direction: '旗庭正北 · 登宫殿金阶',
      guards: [
        unit('shield', 1565, 1038), unit('shield', 1835, 1038), unit('shield', 1700, 856),
        unit('armored', 1355, 962), unit('armored', 2045, 962), unit('armored', 1580, 810), unit('armored', 1820, 810),
        unit('bandit', 1136, 976), unit('bandit', 2264, 976), unit('bandit', 1136, 731), unit('bandit', 2264, 731),
        unit('hen', 1700, 682),
      ],
      reinforcements: {
        broodQueen: [unit('bandit', 1160, 638), unit('hen', 1400, 752), unit('bandit', 1510, 926)],
        duckKing: [unit('bandit', 2240, 638), unit('bandit', 2000, 752), unit('bandit', 1890, 926)],
      } },
  ];
  const southDoors = rooms.floors.slice(0, encounters.length)
    .map(floor => floor.doors!.find(door => door.y > floor.y + floor.h / 2)!);
  const gauntlet: GauntletStage[] = encounters.map((encounter, i) => {
    const door = southDoors[i];
    return { ...encounter, name: names[i], entrance: { x: door.x, y: door.y + (i === 4 ? 125 : 70) } };
  });
  for (const [guardStage, door] of southDoors.entries()) {
    const palace = guardStage === southDoors.length - 1;
    for (const side of [-1, 1]) {
      vehicleSpots.push({ kind: ambushTanks[(guardStage * 2 + (side === 1 ? 1 : 0)) % ambushTanks.length],
        x: door.x + side * (palace ? 570 : 185), y: door.y + (palace ? 125 : 100),
        heading: Math.PI / 2, hostile: true, guardStage });
    }
  }
  const palaceStage = gauntlet.length - 1;
  vehicleSpots.push(
    { kind: 'howitzer', x: 1345, y: 1355, heading: Math.PI / 2, hostile: true, guardStage: palaceStage },
    { kind: 'howitzer', x: 2055, y: 1355, heading: Math.PI / 2, hostile: true, guardStage: palaceStage },
    { kind: 'howitzer', x: 1950, y: 1500, heading: Math.PI / 2, hostile: true, guardStage: palaceStage },
    { kind: 'antiair', x: 1160, y: 1445, heading: Math.PI / 2, hostile: true, guardStage: palaceStage },
    { kind: 'antiair', x: 2215, y: 1410, heading: Math.PI / 2, hostile: true, guardStage: palaceStage },
  );
  const perimeterLeft = 90, perimeterRight = 3286;
  const breachTop = 1890, breachBottom = 2068;
  const cover: Cover[] = [
    ['wall', perimeterLeft, 92, 3220, 26], ['wall', perimeterLeft, 3080, 3220, 26],
    ...[perimeterLeft, perimeterRight].flatMap((x): Cover[] => [
      ['wall', x, 118, 24, breachTop - 118], ['wall', x, breachBottom, 24, 3080 - breachBottom],
    ]),
    // Extend the castle's north wall to both map edges. The north gate is the only way to the rewards.
    ['castle_wall', -4, 560, 979, 18], ['castle_wall', 2425, 560, w - 2421, 18],
    ['wall', 340, 2250, 30, 107], ['wall', 524, 2480, 114, 27],
    ['cargo', 2720, 2230, 96, 45], ['cargo', 2900, 2470, 130, 47],
    ['cargo', 2710, 1440, 105, 44], ['rack', 2915, 1715, 99, 36],
    ['wall', 364, 1250, 30, 110], ['rack', 592, 1440, 94, 30],
    ['castle_wall', 1225, 808, 24, 113], ['castle_wall', 2151, 808, 24, 113],
  ];
  const water = [{ x: center, y: 280, r: 0, w: 440, h: 120 }];
  const solids = raidSolids(w, h, [...rooms.cover, ...cover], water, []);
  const gate = (stage: number, x: number, y: number, width: number, height: number) => {
    solids.push({ id: solids.length, kind: 'raid_gate', t: 0, x, y, w: width, h: height,
      r: 0, f: F_MOVE | F_BULLET | F_SIGHT, v: stage, stamp: 0, dead: false, hp: 0 });
  };
  // Each defeated general opens the next side hall. After the fourth, the castle opens.
  for (let i = 1; i < gauntlet.length; i++) {
    const door = southDoors[i];
    const width = halls[i].doorWidth!;
    const wallDepth = rooms.floors[i].wallInset!;
    gate(i - 1, door.x - width / 2, door.y - wallDepth / 2, width, wallDepth);
  }
  gate(4, center - 108, 560, 216, 18);

  const props: SceneryProp[] = [];
  const scenic = (kind: SceneryProp['kind'], x: number, y: number, scale = 1, rot = 0) => {
    props.push({ kind, x, y, scale, rot, solid: false });
  };
  scenic('frost_pylon', 320, 2200, 1.25);
  scenic('ice_crystal', 692, 2220, 1.1);
  scenic('ice_block', 712, 2480, 1.15);
  scenic('ice_beacon', 305, 2510, 1.15);
  scenic('metal_workbench', 3085, 2560, 1.12);
  scenic('sandbag_wall', 2880, 2155, 1.1);
  scenic('fighter_jet_parked', 3065, 1475, 1.05, .42);
  scenic('furnace_vent', 2635, 1785, 1.08);
  scenic('fuel_tank', 3095, 1690, 1.07, Math.PI / 2);
  scenic('street_lamp', 2597, 1405, .86);
  scenic('radar_station', 296, 1175, 1.1);
  scenic('ice_beacon', 735, 1213, 1.15);
  scenic('antenna_mast', 715, 1510, .92);
  scenic('missile_rack', 303, 1490, .96);

  // Island-style canopies flank the halls without closing their south approaches.
  const broadleafTrees: Tree[] = [
    [325, 2056, 30], [719, 2055, 31], [328, 2746, 41],
    [2710, 2049, 26], [3062, 2049, 26], [3080, 2731, 41],
    [2670, 1223, 39], [3076, 1207, 44], [2415, 1277, 38],
    [298, 996, 38], [613, 979, 44], [934, 1240, 40],
  ].map(([x, y, r], i) => ({ x, y, r, v: i % 3, kind: 'broadleaf', solid: false }));

  for (const side of [-1, 1]) {
    const wallX = side < 0 ? perimeterLeft + 12 : perimeterRight + 12;
    scenic('wall_rubble', wallX, breachTop + 21, .96, Math.PI / 2);
    scenic('wall_rubble', wallX, breachBottom - 21, 1.14, -Math.PI / 2);
    scenic('street_lamp', wallX - side * 65, 1980, .92);
    scenic('stone_lion', center + side * 143, 1190, 1.15);
    scenic('duck_king_statue', center + side * 266, 1210, 1.62);
    scenic('royal_lantern', center + side * 350, 1250, 1.1);
    // Mirror the gardens around the palace axis, clear of the stairs and crosswalk.
    scenic('royal_flowerbed', center + side * 495, 1225, 1.23);
    scenic('royal_flowerbed', center + side * 590, 1460, 1.28);
    scenic('royal_flowerbed', center + side * 215, 380, 1.1);
    scenic('royal_flowerbed', center + side * 530, 263, 1.16);
    for (const [offset, y, r, v] of [
      [475, 1320, 36, 0], [645, 1380, 38, 2],
      [287, 242, 32, 1], [530, 189, 40, 2],
    ]) {
      broadleafTrees.push({ x: center + side * offset, y, r, v, kind: 'broadleaf', solid: false });
    }
    scenic('royal_lantern', center + side * 526, 650, 1.1);
    scenic('fountain', center + side * 374, 316, 1.17);
    scenic('duck_king_statue', center + side * 322, 150, 1.16);
    scenic('palace_topiary', center + side * 329, 431, 1.1);
    scenic('palace_topiary', center + side * 655, 1820, .95);
    scenic('bench_park', center + side * 565, 1960, 1.0);
    scenic('royal_flagpole', center + side * 59, plazaMidY, 1.17);
    scenic('palace_fountain', center + side * 350, plazaMidY + 18, 1.42);
    scenic('greek_column', center + side * 215, plazaMidY - 147, 1.15);
    scenic('royal_flowerbed', center + side * 350, plazaMidY - 140, 1.15);
    scenic('royal_flowerbed', center + side * 350, plazaMidY + 176, 1.18);
    scenic('royal_flagpole', center + side * 147, 2860, .96);
  }
  scenic('royal_flagpole', center, plazaMidY - 35, 1.32);
  scenic('triumphal_arch', center, plaza.y + plaza.h + 100);
  scenic('duck_throne', 1970, 677, 1.4);
  scenic('egg_nest', 1440, 690, 1.4);
  scenic('nest_cluster', 1300, 697, 1.05);
  scenic('nest_cluster', 1550, 687, 1.05);
  props.push({ kind: 'castle_steps', x: center, y: 1202, rot: Math.PI / 2, scale: 1, len: 96, width: 174, paint: '#d4a143', solid: false },
    { kind: 'stone_bridge', x: center, y: 280, rot: Math.PI / 2, scale: 1, len: 163, width: 125 });
  return withBiomeArt({
    w, h, solids, props, floors: rooms.floors, water, tracks: [], gauntlet, vehicleSpots, raidTime: 780,
    trees: broadleafTrees, decor: rooms.decor,
    roads: [
      [730, 2890, 1110, 2890, 1440, 2655, center, 2615, center, plaza.y + plaza.h + plazaRoadOffset],
      [2670, 2890, 2290, 2890, 1960, 2655, center, 2615],
      [540, 2691, 540, 2755, 958, 2755, 1110, 2890],
      [2860, 2676, 2860, 2760, 2445, 2760, 2290, 2890],
      [2875, 1906, 2875, 1979], [525, 1656, 525, 1979],
      [center, 1285, center, plaza.y - plazaRoadOffset],
      [110, 1979, 780, 1979, plazaWestApproach, plazaMidY],
      [3298, 1979, 2555, 1979, plazaEastApproach, 1938, plazaEastApproach, plazaMidY],
      [931, 333, 1080, 333, 1150, 400], [2469, 333, 2320, 333, 2250, 400],
    ],
    pads: [...rooms.pads,
      { type: 'royal_plaza', ...plaza },
      { type: 'royal_garden', x: 1025, y: 125, w: 1350, h: 393 },
      { type: 'platform', x: 640, y: 2860, w: 182, h: 140 },
      { type: 'platform', x: 2578, y: 2860, w: 182, h: 140 },
    ],
    containers: [
      ...rooms.containers,
      { type: 'weaponcase', x: 674, y: 2943, fixedItem: 'rifle' },
      { type: 'weaponcase', x: 2726, y: 2943, fixedItem: 'rifle' },
      { type: 'medbox', x: 780, y: 2940 }, { type: 'medbox', x: 2620, y: 2940 },
      { type: 'medbox', x: 1190, y: 2205 }, { type: 'medbox', x: 2210, y: 2205 },
      { type: 'medbox', x: 1170, y: 1600 }, { type: 'medbox', x: 2220, y: 1540 },
      { type: 'weaponcase', x: 1700, y: 1560, fixedItem: 'lmg' },
      { type: 'safe', x: 450, y: 285, fixedItem: 'awmlegend' },
      { type: 'weaponcase', x: 2946, y: 293, fixedItem: 'm4legend' },
    ],
    spawns: [{ ...entry, chick: [entry.x, entry.y] }],
    extractions: [{ id: 'A', name: '西侧塌墙', x: 102, y: 1979, r: 67 },
      { id: 'B', name: '东侧塌墙', x: 3298, y: 1979, r: 67 }],
    enemySpots: [
      { type: 'frostMarshal', x: 523, y: 2353, n: 1 },
      { type: 'ironGuard', x: 2890, y: 2352, n: 1 },
      { type: 'flameAce', x: 2880, y: 1582, n: 1 },
      { type: 'radarWarden', x: 500, y: 1366, n: 1 },
      { type: 'broodQueen', x: 1451, y: 838, n: 1 },
      { type: 'duckKing', x: 1950, y: 838, n: 1 },
    ],
    reinforce: [],
    zones: [
      ...halls.map(hall => ({ name: hall.name, x: hall.x, y: hall.y, w: hall.w, h: hall.h })),
      { name: '御花园', x: 1025, y: 125, w: 1350, h: 393 },
      { name: '中央旗庭', ...plaza },
      { name: '南侧集结营地', x: 0, y: 2810, w, h: 390 },
    ],
  }, 'mausoleum');
}

function buildVehicleRange(): GameMap {
  const w = 2820, h = 2150;
  const water = [{ x: 420, y: 1170, r: 0, w: 400, h: 302 }];
  const cover: Cover[] = [
    ['cargo', 250, 159, 146, 62], ['cargo', 425, 159, 146, 62], ['rack', 2320, 165, 183, 44],
    ['cargo', 670, 1670, 150, 67], ['wall', 245, 1560, 330, 20],
    ['wall', 2420, 780, 270, 18], ['wall', 2670, 880, 18, 405],
    ['sandbag', 1810, 960, 128, 25], ['cargo', 2390, 1180, 115, 48],
  ];
  const solids = raidSolids(w, h, cover, water, []);
  for (const solid of solids) if (solid.kind !== 'water') solid.f |= F_VEHICLE_BANK;
  for (const [x, y] of [[1990, 920], [2150, 920], [2320, 920], [2010, 1080], [2200, 1080], [2540, 1050]]) {
    solids.push({ id: solids.length, t: 1, x, y, w: 0, h: 0, r: 24, f: F_BULLET, kind: 'range_target', v: 0, stamp: 0, dead: false, hp: 0 });
  }
  return {
    w, h, water, solids,
    props: [
      { kind: 'antenna_mast', x: 2530, y: 208, scale: 1.1, rot: 0 },
      { kind: 'fuel_tank', x: 649, y: 195, scale: 1, rot: 0 },
      { kind: 'street_lamp', x: 760, y: 1454, scale: 1, rot: 0 },
      { kind: 'street_lamp', x: 1690, y: 1454, scale: 1, rot: 0 },
    ],
    vehicleSpots: [
      { kind: 'tank', x: 1210, y: 1620, heading: -Math.PI / 2 },
      { kind: 'range_t90', x: 220, y: 1925, heading: -Math.PI / 2, paint: '#526744' },
      { kind: 'range_leopard2', x: 430, y: 1925, heading: -Math.PI / 2, paint: '#b39b63' },
      { kind: 'range_challenger2', x: 640, y: 1925, heading: -Math.PI / 2, paint: '#58654a' },
      { kind: 'range_type99', x: 850, y: 1925, heading: -Math.PI / 2, paint: '#64754d' },
      { kind: 'range_k2', x: 1060, y: 1925, heading: -Math.PI / 2, paint: '#77714f' },
      { kind: 'aav', x: 940, y: 1620, heading: -Math.PI / 2 },
      { kind: 'btr', x: 1480, y: 1620, heading: -Math.PI / 2 },
      { kind: 'fighter', x: 1050, y: 754, heading: -Math.PI / 2 },
      { kind: 'transport', x: 1440, y: 754, heading: -Math.PI / 2 },
      { kind: 'howitzer', x: 1980, y: 1510, heading: -Math.PI / 2 },
      { kind: 'antiair', x: 2300, y: 1510, heading: -Math.PI / 2 },
      { kind: 'pickupF150', x: 760, y: 1280, heading: Math.PI / 2, paint: '#496579' },
      { kind: 'pickupSilverado', x: 1760, y: 1890, heading: Math.PI / 2, paint: '#7c6b50' },
      { kind: 'sedanCrownVic', x: 2110, y: 1870, heading: Math.PI / 2, paint: '#d0d0c4' },
      { kind: 'sedanCharger', x: 2450, y: 1870, heading: Math.PI / 2, paint: '#6c4844' },
    ],
    pads: [
      { type: 'runway', x: 220, y: 355, w: 2350, h: 248 },
      { type: 'platform', x: 875, y: 648, w: 720, h: 210 },
      { type: 'platform', x: 833, y: 1472, w: 770, h: 247 },
      { type: 'platform', x: 1865, y: 1400, w: 555, h: 202 },
      { type: 'platform', x: 1960, y: 880, w: 465, h: 266 },
      { type: 'platform', x: 100, y: 1760, w: 1050, h: 330 },
    ],
    floors: [], decor: [], trees: [], tracks: [], containers: [], reinforce: [], extractions: [], enemySpots: [],
    roads: [[1210, 1930, 1210, 1755], [720, 1399, 1210, 1399, 1680, 1399, 1800, 1320], [1210, 1399, 1210, 902]],
    spawns: [{ x: 1210, y: 1710, chick: [0, 0] }],
    zones: [
      { name: '装甲车场', x: 825, y: 1435, w: 780, h: 370 },
      { name: '各国主战坦克展示区', x: 100, y: 1760, w: 1050, h: 330 },
      { name: '飞行区', x: 220, y: 355, w: 2350, h: 512 },
      { name: '火炮阵地', x: 1820, y: 1340, w: 680, h: 320 },
      { name: '靶区', x: 1770, y: 828, w: 900, h: 482 },
      { name: '两栖试车池', x: 170, y: 936, w: 500, h: 455 },
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

  const hWall = (x0: number, x1: number, y: number, gaps: [number, number][], doors: DoorPassage[]) => {
    const cuts = gaps.map(([p, gw]) => [x0 + (x1 - x0) * p - gw / 2, x0 + (x1 - x0) * p + gw / 2]).sort((a, b) => a[0] - b[0]);
    let cx = x0;
    for (const [a, b] of cuts) {
      doors.push(doorPassage((a + b) / 2, y + T / 2, b - a, T, true));
      if (a - cx > 2) addRect(cx, y, a - cx, T, WALL, 'wall');
      cx = b;
    }
    if (x1 - cx > 2) addRect(cx, y, x1 - cx, T, WALL, 'wall');
  };
  const vWall = (y0: number, y1: number, x: number, gaps: [number, number][], doors: DoorPassage[]) => {
    const cuts = gaps.map(([p, gw]) => [y0 + (y1 - y0) * p - gw / 2, y0 + (y1 - y0) * p + gw / 2]).sort((a, b) => a[0] - b[0]);
    let cy = y0;
    for (const [a, b] of cuts) {
      doors.push(doorPassage(x + T / 2, (a + b) / 2, b - a, T, false));
      if (a - cy > 2) addRect(x, cy, T, a - cy, WALL, 'wall');
      cy = b;
    }
    if (y1 - cy > 2) addRect(x, cy, T, y1 - cy, WALL, 'wall');
  };

  for (const b of BUILDINGS) {
    const { x, y, w, h } = b;
    const doors: DoorPassage[] = [];
    floors.push({ x, y, w, h, type: b.floor, name: b.name, roofed: true, doors });
    const g = (side: string) => b.doors.filter((d) => d[0] === side).map((d) => [d[1], d[2]] as [number, number]);
    hWall(x, x + w, y, g('n'), doors);
    hWall(x, x + w, y + h - T, g('s'), doors);
    vWall(y + T, y + h - T, x, g('w'), doors);
    vWall(y + T, y + h - T, x + w - T, g('e'), doors);
    for (const [axis, p, gp, gw] of b.parts || []) {
      if (axis === 'v') vWall(y + T, y + h - T, x + w * p - T / 2, [[gp, gw]], doors);
      else hWall(x + T, x + w - T, y + h * p - T / 2, [[gp, gw]], doors);
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

  const tracks = [2060, 2140];
  const roads = connectBuildingRoads([
    [-50, 830, 600, 842, 1150, 830, 2170, 830, 2700, 820, 3250, 832],
    [-50, 1720, 1150, 1720, 2170, 1720, 3250, 1714],
    [1150, -50, 1150, 830, 1150, 1720, 1150, 1990],
    [2170, -50, 2170, 830, 2170, 1720, 2170, 1990],
    [1150, 1240, 1250, 1240], [2050, 1240, 2170, 1240], [1650, 830, 1650, 870], [1650, 1610, 1650, 1720],
    [1610, 1720, 1610, 1795], [2170, 600, 2420, 610],
  ], floors, water, solids);

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
    for (const ty of tracks) if (Math.abs(y - ty) < 68 + pad) return false;
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
    if (Math.abs(y - tracks[0]) < 75 || Math.abs(y - tracks[1]) < 75) continue;
    trees.push({ x: R(-40, -10), y, r: R(38, 52), v: Math.floor(rnd() * 3), solid: false });
    trees.push({ x: MAP_W + R(10, 40), y, r: R(38, 52), v: Math.floor(rnd() * 3), solid: false });
  }
  // 铁路两侧的装饰树：留出轨道净空，南北各一排。
  const railTree = (x: number, y: number) => {
    const r = R(30, 42);
    if (y < 80 || y > MAP_H - 80) return;
    if (!isFree(x, y, r + 8)) return;
    if (trees.some((t) => Math.hypot(t.x - x, t.y - y) < r + t.r + 18)) return;
    trees.push({ x, y, r, v: Math.floor(rnd() * 3), solid: true });
    addCircle(x, y, 13, LOW, 'tree');
  };
  for (let x = 90; x < MAP_W - 90; x += R(130, 180)) {
    railTree(x + R(-18, 18), 1950 + R(-12, 12));
    railTree(x + R(-18, 18), 2265 + R(-10, 18));
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
    { kind: 'freight_boxcar', x: 720, y: 2140, rot: 0, scale: 1 },
    { kind: 'freight_flatcar', x: 910, y: 2140, rot: 0, scale: 1 },
    { kind: 'freight_boxcar', x: 2550, y: 2140, rot: 0, scale: 1 },
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
    // 鸭岛道路设施：公交站与指路牌，沿两条主干道分布
    { kind: 'bus_stop', x: 300, y: 782, rot: 0, scale: 0.95 },
    { kind: 'bus_stop', x: 1010, y: 782, rot: 0, scale: 0.95 },
    { kind: 'bus_stop', x: 1800, y: 782, rot: 0, scale: 0.95 },
    { kind: 'bus_stop', x: 2640, y: 782, rot: 0, scale: 0.95 },
    { kind: 'bus_stop', x: 700, y: 1672, rot: 0, scale: 0.95 },
    { kind: 'bus_stop', x: 1850, y: 1672, rot: 0, scale: 0.95 },
    { kind: 'signpost', x: 520, y: 892, rot: 0, scale: 1 },
    { kind: 'signpost', x: 1060, y: 892, rot: Math.PI / 2, scale: 1 },
    { kind: 'signpost', x: 1560, y: 892, rot: 0, scale: 1 },
    { kind: 'signpost', x: 2300, y: 892, rot: Math.PI / 2, scale: 1 },
    { kind: 'signpost', x: 380, y: 1772, rot: 0, scale: 1 },
    { kind: 'signpost', x: 1240, y: 1772, rot: Math.PI / 2, scale: 1 },
    { kind: 'signpost', x: 2100, y: 1772, rot: 0, scale: 1 },
    { kind: 'signpost', x: 2820, y: 1772, rot: Math.PI / 2, scale: 1 },
  ];
  const map: GameMap = {
    w: MAP_W, h: MAP_H, solids, floors, decor, trees, water, roads, pads, containers,
    extractions, spawns, enemySpots, reinforce, zones, tracks, props,
  };
  clearDoorCover(map);
  clearCoverFromRoads(map);
  separateContainersFromProps(map);
  return withAssetCollisions(map);
}
