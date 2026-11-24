import {
  ITEM_BANDAGE, ITEM_MEDKIT, LOADOUTS, THROWABLE_IDS, THROWABLE_ITEMS, THROWABLES, WEAPONS,
  armorById, weaponItem, type ItemDef, type Loadout, type ThrowableId, type WeaponDef,
} from './data';

/** Weapon mods are now role-specific: a choke only fits a shotgun, blast tuning only fits a launcher. */
export type TuneType = 'stable' | 'damage' | 'velocity' | 'pierce' | 'mag' | 'rapid' | 'choke' | 'quick' | 'blast';
export type ArmorTuneType = 'regen' | 'cap' | 'plate' | 'aegis';
export type SupplyKey = 'bandages' | 'medkits' | ThrowableId;

export interface GearItem {
  id: string;
  tuned: boolean;
  mods?: TuneType[];
  armorMods?: ArmorTuneType[];
}
export interface GearStack extends GearItem { count: number }
export interface ConsumableLoadout {
  bandages: number;
  medkits: number;
  throwables: Partial<Record<ThrowableId, number>>;
}
/** Owned supplies live in the warehouse; the loadout below is how many of them are taken on a run. */
export type SupplyStock = ConsumableLoadout;
export interface RaidGear { weapon?: GearItem; armor?: GearItem; consumables?: ConsumableLoadout }
export interface Warehouse {
  items: GearStack[];
  supplies: SupplyStock;
  selected: RaidGear;
}

export const CONSUMABLE_LIMITS = { bandages: 5, medkits: 3, perThrowable: 4, totalThrowables: 6 };

export function emptyConsumables(): ConsumableLoadout {
  return { bandages: 0, medkits: 0, throwables: {} };
}

function normalizeCounts(value: unknown, bandMax: number, medMax: number, throwMax: number, throwBudget: number): ConsumableLoadout {
  const raw = value && typeof value === 'object' ? value as Partial<ConsumableLoadout> : {};
  const whole = (n: unknown, max: number) => Number.isFinite(n) ? Math.max(0, Math.min(max, Math.floor(n as number))) : 0;
  const out = emptyConsumables();
  out.bandages = whole(raw.bandages, bandMax);
  out.medkits = whole(raw.medkits, medMax);
  let budget = throwBudget;
  const src = raw.throwables && typeof raw.throwables === 'object' ? raw.throwables as Record<string, unknown> : {};
  for (const id of THROWABLE_IDS) {
    const n = Math.min(budget, whole(src[id], throwMax));
    if (n > 0) { out.throwables[id] = n; budget -= n; }
  }
  return out;
}

/** Clamp saved or edited counts so a custom kit can never exceed its carry limits. */
export function normalizeConsumables(value: unknown): ConsumableLoadout {
  return normalizeCounts(value, CONSUMABLE_LIMITS.bandages, CONSUMABLE_LIMITS.medkits, CONSUMABLE_LIMITS.perThrowable, CONSUMABLE_LIMITS.totalThrowables);
}

/** Stored supplies have no per-run cap, only a sanity ceiling for corrupted saves. */
export function normalizeSupplies(value: unknown): SupplyStock {
  return normalizeCounts(value, 9999, 9999, 9999, 9999);
}

/** A carried supply can never exceed what is actually in the warehouse. */
export function clampCarryToStock(carry: ConsumableLoadout, stock: SupplyStock): ConsumableLoadout {
  const out = emptyConsumables();
  out.bandages = Math.min(carry.bandages, stock.bandages);
  out.medkits = Math.min(carry.medkits, stock.medkits);
  let budget = CONSUMABLE_LIMITS.totalThrowables;
  for (const id of THROWABLE_IDS) {
    const n = Math.min(carry.throwables[id] ?? 0, stock.throwables[id] ?? 0, CONSUMABLE_LIMITS.perThrowable, budget);
    if (n > 0) { out.throwables[id] = n; budget -= n; }
  }
  return normalizeConsumables(out);
}

export function supplyDef(key: SupplyKey): ItemDef {
  if (key === 'bandages') return ITEM_BANDAGE;
  if (key === 'medkits') return ITEM_MEDKIT;
  return THROWABLE_ITEMS.find((item) => item.throwable === key) ?? ITEM_BANDAGE;
}

export function stockOf(stock: SupplyStock | undefined, key: SupplyKey): number {
  if (!stock) return 0;
  if (key === 'bandages') return stock.bandages;
  if (key === 'medkits') return stock.medkits;
  return stock.throwables[key] ?? 0;
}

export function changeSupply(stock: SupplyStock, key: SupplyKey, delta: number): SupplyStock {
  const next = normalizeSupplies(stock);
  const value = Math.max(0, stockOf(next, key) + delta);
  if (key === 'bandages') next.bandages = value;
  else if (key === 'medkits') next.medkits = value;
  else if (value > 0) next.throwables[key] = value;
  else delete next.throwables[key];
  return next;
}

/** Reserve carried supplies when deploying, and give them back on a successful extraction. */
export function moveSupplies(stock: SupplyStock, carry: ConsumableLoadout, sign: 1 | -1): SupplyStock {
  let next = changeSupply(stock, 'bandages', sign * carry.bandages);
  next = changeSupply(next, 'medkits', sign * carry.medkits);
  for (const id of THROWABLE_IDS) next = changeSupply(next, id, sign * (carry.throwables[id] ?? 0));
  return next;
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
export const TUNE_TYPES: TuneType[] = ['stable', 'damage', 'velocity', 'pierce', 'mag', 'rapid', 'choke', 'quick', 'blast'];

export const TUNE_LABELS: Record<TuneType, string> = {
  stable: '稳定枪机', damage: '高装药', velocity: '高速弹', pierce: '穿甲弹', mag: '扩容弹匣',
  rapid: '轻量复进', choke: '收束器', quick: '快速弹夹', blast: '高爆战斗部',
};
export const TUNE_DESCS: Record<TuneType, string> = {
  stable: '后坐 −35% · 枪口上跳 −20%（不加散布）',
  damage: '伤害 +25% · 爆炸伤害 +25%',
  velocity: '弹速 +30% · 射程 +10%',
  pierce: '穿透 +2',
  mag: '弹匣容量 +50%',
  rapid: '射速 +20%',
  choke: '散布 −45%（仅霰弹枪）',
  quick: '装填时间 −40%',
  blast: '爆炸伤害 +40% · 范围 +15%（仅火箭筒）',
};
export const TUNE_TAGS: Record<TuneType, string> = {
  stable: '后坐−35%', damage: '伤害+25%', velocity: '弹速+30%', pierce: '穿透+2',
  mag: '弹匣+50%', rapid: '射速+20%', choke: '散布−45%', quick: '装填−40%', blast: '爆炸+40%',
};

export const ARMOR_TUNE_TYPES: ArmorTuneType[] = ['regen', 'cap', 'plate', 'aegis'];
export const ARMOR_TUNE_LABELS: Record<ArmorTuneType, string> = {
  regen: '自修复涂层', cap: '强化框架', plate: '复合插板', aegis: '破甲应急',
};
export const ARMOR_TUNE_DESCS: Record<ArmorTuneType, string> = {
  regen: '脱战 4 秒后每秒恢复 5 点护甲',
  cap: '护甲上限 +25%',
  plate: '护甲吸收比例 60% → 78%',
  aegis: '护甲打空时免疫伤害 1.2 秒（CD 10 秒）',
};
export const ARMOR_TUNE_TAGS: Record<ArmorTuneType, string> = {
  regen: '自动回甲', cap: '上限+25%', plate: '吸收78%', aegis: '破甲无敌',
};

const weaponId = (id: string) => id.startsWith('w_') ? id.slice(2) : id;

/** Only mods that make sense for this gun are offered or kept in old saves. */
export function tunesForWeapon(id: string): TuneType[] {
  const w = WEAPONS[weaponId(id)];
  if (!w) return [];
  const out: TuneType[] = ['damage', 'mag', 'quick'];
  if (w.blast) out.push('blast');
  else {
    if (w.pellets > 1) out.push('choke', 'velocity');
    else {
      out.push('stable', 'velocity');
      if (w.rate >= 4) out.push('rapid');
      if (w.pierce || w.rate >= 7 || w.mag >= 60) out.push('pierce');
    }
  }
  return out;
}

/** Every weapon can take two mods; legendary guns get a third slot. */
export function modSlots(id: string): number {
  const def = WEAPONS[weaponId(id)];
  return def && def.rarity >= 5 ? 3 : 2;
}

/** Higher armour tiers get a third modification slot. */
export function armorModSlots(id: string): number {
  return /armor[56]$/.test(id) ? 3 : 2;
}

/** Older saves stored a single `mod`; everything now reads through this. */
export function gearMods(item: GearItem | undefined): TuneType[] {
  if (!item) return [];
  const def = WEAPONS[weaponId(item.id)];
  if (!def) return [];
  const legacy = (item as GearItem & { mod?: TuneType }).mod;
  const allowed = tunesForWeapon(item.id);
  const list = Array.isArray(item.mods) ? item.mods : legacy ? [legacy] : [];
  return list.filter((mod, i) => allowed.includes(mod) && list.indexOf(mod) === i).slice(0, modSlots(item.id));
}

export function armorModsOf(item: GearItem | undefined): ArmorTuneType[] {
  if (!item || !armorById(item.id)) return [];
  const list = Array.isArray(item.armorMods) ? item.armorMods : [];
  return list.filter((mod, i) => ARMOR_TUNE_TYPES.includes(mod) && list.indexOf(mod) === i).slice(0, armorModSlots(item.id));
}

function listKey(list: readonly string[] | undefined): string {
  return [...(list ?? [])].sort().join('+');
}

export function modsKey(mods: TuneType[] | undefined): string {
  return listKey(mods);
}

export function gearLabel(item: GearItem | undefined): string {
  if (!item) return '';
  return [...gearMods(item).map((mod) => TUNE_LABELS[mod]), ...armorModsOf(item).map((mod) => ARMOR_TUNE_LABELS[mod])].join(' · ');
}

export function modWeapon(base: WeaponDef, mods: TuneType[]): WeaponDef {
  const def: WeaponDef = { ...base, blast: base.blast ? { ...base.blast } : undefined };
  for (const mod of mods) {
    if (mod === 'stable') { def.kick *= 0.65; def.shake *= 0.8; }
    else if (mod === 'damage') { def.dmg *= 1.25; if (def.blast) def.blast.dmg *= 1.25; }
    else if (mod === 'velocity') { def.speed *= 1.3; def.range *= 1.1; }
    else if (mod === 'pierce') def.pierce += 2;
    else if (mod === 'mag') def.mag = Math.round(def.mag * 1.5);
    else if (mod === 'rapid') def.rate *= 1.2;
    else if (mod === 'choke') def.spread *= 0.55;
    else if (mod === 'quick') def.reload *= 0.6;
    else if (mod === 'blast' && def.blast) { def.blast.dmg *= 1.4; def.blast.radius *= 1.15; }
  }
  return def;
}

/** Weapon with the given mods applied, or the untouched definition. */
export function gunWithMods(id: string, mods: TuneType[]): WeaponDef | undefined {
  const base = WEAPONS[weaponId(id)];
  return base ? modWeapon(base, mods) : undefined;
}

/** Raw armour rating after the cap mod, before character scaling. */
export function armorValue(base: number, mods: ArmorTuneType[]): number {
  return mods.includes('cap') ? Math.round(base * 1.25) : base;
}

/** Combat-only armour traits; applied to the player at raid start. */
export function armorCombatStats(mods: ArmorTuneType[]) {
  return {
    regen: mods.includes('regen') ? 5 : 0,
    absorb: mods.includes('plate') ? 0.78 : 0.6,
    aegis: mods.includes('aegis') ? 1.2 : 0,
  };
}

export function gearDef(id: string): ItemDef | undefined {
  const weapon = weaponId(id);
  if (id.startsWith('w_') && WEAPONS[weapon]) return weaponItem(weapon);
  return armorById(id);
}

export function sameGear(a: GearItem | undefined, b: GearItem) {
  return a?.id === b.id && a.tuned === b.tuned
    && listKey(gearMods(a)) === listKey(gearMods(b))
    && listKey(armorModsOf(a)) === listKey(armorModsOf(b));
}

export function availableGear(warehouse: Warehouse): RaidGear {
  const { items, supplies, selected } = warehouse;
  const armed = raidGearItems(selected).every((gear) => items.some((item) => sameGear(gear, item)));
  const consumables = clampCarryToStock(normalizeConsumables(selected.consumables), normalizeSupplies(supplies));
  if (armed) return { ...selected, consumables };
  // A lost weapon must not silently erase the consumable part of a custom kit.
  return consumableCount(consumables) > 0 ? { consumables } : {};
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
  const armorGear = gear.armor;
  const baseArmor = armorGear ? gearDef(armorGear.id)?.armor ?? 0 : 0;
  return {
    ...LOADOUTS[0], id: WAREHOUSE_KIT, name: '自定义配装',
    tag: '仓库', desc: parts.length ? parts.join(' · ') : '仅携带入库装备',
    // Consumables are bought into the warehouse; taking them on a raid is free.
    cost: 0,
    primary: weapon && weapon !== 'pistol' ? weapon : null,
    armor: armorGear ? armorValue(baseArmor, armorModsOf(armorGear)) : 0,
    bandages: c.bandages, medkits: c.medkits, throwables: c.throwables,
  };
}

export function hasWarehouseLoadout(gear: RaidGear) {
  return raidGearItems(gear).length > 0 || consumableCount(gear.consumables) > 0;
}

export function changeStock(items: GearStack[], gear: GearItem, delta: number): GearStack[] {
  const existing = items.find((item) => sameGear(gear, item));
  const mods = gearMods(gear), armorMods = armorModsOf(gear);
  const entry: GearItem = {
    id: gear.id, tuned: mods.length > 0 || armorMods.length > 0,
    ...(mods.length ? { mods } : {}), ...(armorMods.length ? { armorMods } : {}),
  };
  if (!existing) return delta > 0 ? [...items, { ...entry, count: delta }] : items;
  const count = existing.count + delta;
  return items.flatMap((item) => item !== existing ? [item] : count > 0 ? [{ ...item, count }] : []);
}

export function tuningPrice(item: ItemDef) {
  return Math.max(2000, Math.ceil(item.value * 0.3 / 100) * 100);
}

/** Selling recoups half of the item plus half of the tuning invested in it. */
export function gearSellPrice(gear: GearItem): number {
  const def = gearDef(gear.id);
  if (!def) return 0;
  const mods = gearMods(gear).length + armorModsOf(gear).length;
  return Math.round((def.value + mods * tuningPrice(def)) * 0.5);
}

export function supplySellPrice(key: SupplyKey): number {
  return Math.round(supplyDef(key).value * 0.5);
}

function readGear(value: unknown): GearItem | undefined {
  if (!value || typeof value !== 'object') return;
  const gear = value as Partial<GearItem> & { mod?: TuneType };
  if (typeof gear.id !== 'string' || typeof gear.tuned !== 'boolean') return;
  const def = gearDef(gear.id);
  if (!def) return;
  const mods = gearMods(gear as GearItem), armorMods = armorModsOf(gear as GearItem);
  return {
    id: gear.id, tuned: mods.length > 0 || armorMods.length > 0,
    ...(mods.length ? { mods } : {}), ...(armorMods.length ? { armorMods } : {}),
  };
}

export function readWarehouse(value: unknown): Warehouse {
  const raw = value && typeof value === 'object' ? value as Partial<Warehouse> : {};
  let items: GearStack[] = [];
  for (const row of Array.isArray(raw.items) ? raw.items : []) {
    const item = readGear(row);
    if (item && Number.isSafeInteger(row.count) && row.count > 0) items = changeStock(items, item, row.count);
  }
  // Old saves have no supply field; seed a small starter kit so the buy/carry loop works.
  const supplies = raw.supplies === undefined ? starterSupplies() : normalizeSupplies(raw.supplies);
  const weapon = readGear(raw.selected?.weapon), armor = readGear(raw.selected?.armor);
  const consumables = clampCarryToStock(normalizeConsumables(raw.selected?.consumables), supplies);
  return {
    items,
    supplies,
    selected: {
      weapon: weapon && gearDef(weapon.id)?.kind === 'weapon' ? weapon : undefined,
      armor: armor && gearDef(armor.id)?.kind === 'armor' ? armor : undefined,
      consumables,
    },
  };
}

/** Starter supply stock so the buy/sell loop is usable before the first successful raid. */
export function starterSupplies(): SupplyStock {
  return { bandages: 3, medkits: 1, throwables: { grenade: 2 } };
}
