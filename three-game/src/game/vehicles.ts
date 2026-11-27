import type { EnemyType } from './data';

export type VehicleKind = 'tank' | 'range_t90' | 'range_leopard2' | 'range_challenger2' | 'range_type99' | 'range_k2'
  | 'aav' | 'btr' | 'fighter' | 'transport' | 'howitzer' | 'antiair'
  | 'pickupF150' | 'pickupSilverado' | 'sedanCrownVic' | 'sedanCharger';

export type MainBattleTankKind = 'tank' | 'range_t90' | 'range_leopard2' | 'range_challenger2' | 'range_type99' | 'range_k2';

export const isMainBattleTank = (kind: VehicleKind): kind is MainBattleTankKind =>
  kind === 'tank' || kind === 'range_t90' || kind === 'range_leopard2'
  || kind === 'range_challenger2' || kind === 'range_type99' || kind === 'range_k2';

export interface VehicleSpot {
  kind: VehicleKind;
  x: number;
  y: number;
  heading: number;
  paint?: string;
  hostile?: boolean;
  startsOccupied?: boolean;
  unlockBoss?: EnemyType;
  approach?: { x: number; y: number };
  guardStage?: number;
}

export interface VehicleFragment {
  kind: 'turret' | 'wing';
  side: number;
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  yaw: number; tumble: number;
  landed: boolean;
}

export type TankPart = 'hull' | 'turret' | 'engine' | 'leftTrack' | 'rightTrack';

export interface TankCondition {
  armor: number;
  maxArmor: number;
  damage: Record<TankPart, number>;
}

export interface Vehicle extends VehicleSpot {
  aim: number;
  altitude: number;
  flying: boolean;
  throttle: number;
  shotCd: number;
  bombCd: number;
  propeller: number;
  hp: number;
  maxHp: number;
  tank?: TankCondition;
  airstrike?: { endX: number; endY: number; skill: 'strafe' | 'napalm'; damage: number; duration: number };
  wreck: { age: number; drift: number; piloted: boolean; fragments: VehicleFragment[] } | null;
}

export interface RangeDrone {
  x: number;
  y: number;
  heading: number;
  altitude: number;
  reset: number;
}

export const VEHICLES = {
  tank: { name: '赤隼重型坦克', movement: 'ground', hp: 320, radius: 51, speed: 175, rate: .72, muzzle: 82, height: 44, weapon: '炮弹' },
  range_t90: { name: '玄甲重型坦克', movement: 'ground', hp: 320, radius: 51, speed: 175, rate: .72, muzzle: 82, height: 44, weapon: '炮弹' },
  range_leopard2: { name: '猎风重型坦克', movement: 'ground', hp: 320, radius: 51, speed: 175, rate: .72, muzzle: 82, height: 44, weapon: '炮弹' },
  range_challenger2: { name: '壁垒重型坦克', movement: 'ground', hp: 320, radius: 51, speed: 175, rate: .72, muzzle: 82, height: 44, weapon: '炮弹' },
  range_type99: { name: '苍龙重型坦克', movement: 'ground', hp: 320, radius: 51, speed: 175, rate: .72, muzzle: 82, height: 44, weapon: '炮弹' },
  range_k2: { name: '黑曜重型坦克', movement: 'ground', hp: 320, radius: 51, speed: 175, rate: .72, muzzle: 82, height: 44, weapon: '炮弹' },
  aav: { name: '履带两栖装甲车', movement: 'ground', hp: 235, radius: 51, speed: 210, rate: .105, muzzle: 49, height: 47, weapon: '机枪' },
  btr: { name: '八轮装甲车', movement: 'ground', hp: 205, radius: 53, speed: 265, rate: .21, muzzle: 42, height: 39, weapon: '机炮' },
  fighter: { name: '战斗机', movement: 'air', hp: 130, radius: 53, speed: 510, rate: .075, muzzle: 52, height: 15, weapon: '扫射' },
  transport: { name: '螺旋桨运输机', movement: 'air', hp: 190, radius: 74, speed: 345, rate: 0, muzzle: 0, height: 26, weapon: '投弹' },
  howitzer: { name: '牵引式榴弹炮', movement: 'fixed', hp: 180, radius: 48, speed: 0, rate: 1.15, muzzle: 65, height: 49, weapon: '榴弹' },
  antiair: { name: '双管高射炮', movement: 'fixed', hp: 170, radius: 46, speed: 0, rate: .14, muzzle: 37, height: 49, weapon: '对空射击' },
  pickupF150: { name: '山虎机能皮卡', movement: 'ground', hp: 185, radius: 51, speed: 320, rate: 0, muzzle: 0, height: 28, weapon: '无武装' },
  pickupSilverado: { name: '荒原皮卡', movement: 'ground', hp: 205, radius: 52, speed: 298, rate: 0, muzzle: 0, height: 29, weapon: '无武装' },
  sedanCrownVic: { name: '巡卫轿车', movement: 'ground', hp: 155, radius: 44, speed: 345, rate: 0, muzzle: 0, height: 26, weapon: '无武装' },
  sedanCharger: { name: '迅影轿车', movement: 'ground', hp: 165, radius: 45, speed: 372, rate: 0, muzzle: 0, height: 25, weapon: '无武装' },
} as const;

export function tankPartAt(v: Vehicle, x: number, y: number, z?: number): TankPart {
  // Use the existing collision footprint, rotating the impact into hull space.
  if (z !== undefined && z - v.altitude >= VEHICLES[v.kind].height * .72) return 'turret';
  const dx = x - v.x, dy = y - v.y;
  const radius = Math.hypot(dx, dy);
  if (radius < VEHICLES[v.kind].radius * .35) return 'hull';
  const c = Math.cos(v.heading), s = Math.sin(v.heading);
  const forward = (dx * c + dy * s) / radius;
  const right = (-dx * s + dy * c) / radius;
  if (right < -.76) return 'leftTrack';
  if (right > .76) return 'rightTrack';
  if (forward < 0) return 'engine';
  return forward > .91 ? 'hull' : 'turret';
}
