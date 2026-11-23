import { ARMORS, ITEM_BANDAGE, ITEM_MEDKIT, LOADOUTS, THROWABLE_IDS, THROWABLE_ITEMS, THROWABLES, WEAPONS, weaponItem, type ItemDef, type Loadout, type ThrowableId } from './data';

export type TuneType = 'stable' | 'damage' | 'velocity' | 'pierce';
export interface GearItem { id: string; tuned: boolean; mod?: TuneType }
export interface GearStack extends GearItem { count: number }
export interface ConsumableLoadout {
  bandages: number;
  medkits: number;
  throwables: Partial<Record<ThrowableId, number>>;
}
export interface RaidGear { weapon?: GearItem; armor?: GearItem; consumables?: ConsumableLoadout }
export interface Warehouse {
  items: GearStack[];
  selected: RaidGear;
}

export const CONSUMABLE_LIMITS = { bandages: 5, medkits: 3, perThrowable: 4, totalThrowables: 6 };

export function emptyConsumables(): ConsumableLoadout {
  return { bandages: 0, medkits: 0, throwables: {} };
}

/** Clamp saved or edited counts so a custom kit can never exceed its carry limits. */
export function normalizeConsumables(value: unknown): ConsumableLoadout {
  const raw = value && typeof value === 'object' ? value as Partial<ConsumableLoadout> : {};
  const whole = (n: unknown, max: number) => Number.isFinite(n) ? Math.max(0, Math.min(max, Math.floor(n as number))) : 0;
  const out = emptyConsumables();
  out.bandages = whole(raw.bandages, CONSUMABLE_LIMITS.bandages);
  out.medkits = whole(raw.medkits, CONSUMABLE_LIMITS.medkits);
  let budget = CONSUMABLE_LIMITS.totalThrowables;
  const src = raw.throwables && typeof raw.throwables === 'object' ? raw.throwables as Record<string, unknown> : {};
  for (const id of THROWABLE_IDS) {
    const n = Math.min(budget, whole(src[id], CONSUMABLE_LIMITS.perThrowable));
    if (n > 0) { out.throwables[id] = n; budget -= n; }
  }
  return out;
}

export function consumableCount(c: ConsumableLoadout | undefined): number {
  if (!c) return 0;
  return c.bandages + c.medkits + THROWABLE_IDS.reduce((sum, id) => sum + (c.throwables[id] ?? 0), 0);
}

export function consumableCost(c: ConsumableLoadout | undefined): number {
  if (!c) return 0;
  let total = c.bandages * ITEM_BANDAGE.value + c.medkits * ITEM_MEDKIT.value;
  for (const item of THROWABLE_ITEMS) total += (c.throwables[item.throwable!] ?? 0) * item.value;
  return total;
}

export const WAREHOUSE_KIT = 'warehouse';
export const TUNED_SPREAD = 0.8;
export const TUNED_DAMAGE = 1.25;
export const TUNED_VELOCITY = 1.3;
export const TUNED_PIERCE = 2;
export const TUNE_TYPES: TuneType[] = ['stable', 'damage', 'velocity', 'pierce'];

export const TUNE_LABELS: Record<TuneType, string> = {
  stable: '稳定型', damage: '高伤害', velocity: '高速弹', pierce: '穿甲型',
};
export const TUNE_DESCS: Record<TuneType, string> = {
  stable: '散布 −20%',
  damage: '伤害 +25%',
  velocity: '弹速 +30%',
  pierce: '穿透 +2',
};

/** Old saves stored `tuned: true` with no mod — that was the stable tune. */
export function gearMod(item: GearItem): TuneType {
  return item.mod ?? 'stable';
}

export function gearDef(id: string): ItemDef | undefined {
  const weaponId = id.startsWith('w_') ? id.slice(2) : '';
  if (Object.prototype.hasOwnProperty.call(WEAPONS, weaponId)) return weaponItem(weaponId);
  return ARMORS.find((item) => item.id === id);
}

export function sameGear(a: GearItem | undefined, b: GearItem) {
  return a?.id === b.id && a.tuned === b.tuned && (a.tuned === false || gearMod(a) === gearMod(b));
}

export function availableGear(warehouse: Warehouse): RaidGear {
  const { items, selected } = warehouse;
  const armed = raidGearItems(selected).every((gear) => items.some((item) => sameGear(gear, item)));
  if (armed) return selected;
  // A lost weapon must not silently erase the consumable part of a custom kit.
  return selected.consumables ? { consumables: normalizeConsumables(selected.consumables) } : {};
}

export function raidGearItems(gear: RaidGear): GearItem[] {
  return [gear.weapon, gear.armor].filter((item): item is GearItem => !!item);
}

export function warehouseLoadout(gear: RaidGear): Loadout {
  const weapon = gear.weapon ? gearDef(gear.weapon.id)?.weapon : undefined;
  const c = normalizeConsumables(gear.consumables);
  const parts: string[] = [];
  if (c.bandages) parts.push(`绷带×${c.bandages}`);
  if (c.medkits) parts.push(`急救针×${c.medkits}`);
  for (const id of THROWABLE_IDS) if (c.throwables[id]) parts.push(`${THROWABLES[id].name}×${c.throwables[id]}`);
  return {
    ...LOADOUTS[0], id: WAREHOUSE_KIT, name: '自定义配装',
    tag: '仓库', desc: parts.length ? parts.join(' · ') : '仅携带入库装备',
    cost: consumableCost(c),
    primary: weapon && weapon !== 'pistol' ? weapon : null,
    armor: gear.armor ? gearDef(gear.armor.id)?.armor ?? 0 : 0,
    bandages: c.bandages, medkits: c.medkits, throwables: c.throwables,
  };
}

export function hasWarehouseLoadout(gear: RaidGear) {
  return raidGearItems(gear).length > 0 || consumableCount(gear.consumables) > 0;
}

export function changeStock(items: GearStack[], gear: GearItem, delta: number): GearStack[] {
  const existing = items.find((item) => sameGear(gear, item));
  if (!existing) return delta > 0 ? [...items, { id: gear.id, tuned: gear.tuned, ...(gear.tuned ? { mod: gearMod(gear) } : {}), count: delta }] : items;
  const count = existing.count + delta;
  return items.flatMap((item) => item !== existing ? [item] : count > 0 ? [{ ...item, count }] : []);
}

export function tuningPrice(item: ItemDef) {
  return Math.max(2000, Math.ceil(item.value * 0.3 / 100) * 100);
}

function readGear(value: unknown): GearItem | undefined {
  if (!value || typeof value !== 'object') return;
  const gear = value as Partial<GearItem>;
  if (typeof gear.id !== 'string' || typeof gear.tuned !== 'boolean') return;
  const def = gearDef(gear.id);
  if (!def || (gear.tuned && def.kind !== 'weapon')) return;
  const mod = TUNE_TYPES.includes(gear.mod as TuneType) ? gear.mod as TuneType : undefined;
  return { id: gear.id, tuned: gear.tuned, ...(gear.tuned ? { mod: mod ?? 'stable' } : {}) };
}

export function readWarehouse(value: unknown): Warehouse {
  const raw = value && typeof value === 'object' ? value as Partial<Warehouse> : {};
  let items: GearStack[] = [];
  for (const row of Array.isArray(raw.items) ? raw.items : []) {
    const item = readGear(row);
    if (item && Number.isSafeInteger(row.count) && row.count > 0) items = changeStock(items, item, row.count);
  }
  const weapon = readGear(raw.selected?.weapon), armor = readGear(raw.selected?.armor);
  return {
    items,
    selected: {
      weapon: weapon && gearDef(weapon.id)?.kind === 'weapon' ? weapon : undefined,
      armor: armor && gearDef(armor.id)?.kind === 'armor' ? armor : undefined,
      consumables: normalizeConsumables(raw.selected?.consumables),
    },
  };
}
