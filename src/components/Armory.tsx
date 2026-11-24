import { useState } from 'react';
import {
  ARMORS, ITEM_BANDAGE, ITEM_MEDKIT, RARITY_COLORS, RARITY_NAMES, THROWABLE_IDS, THROWABLES,
  UPGRADE_INFO, UPGRADE_MAX, WEAPONS, characterArmor, fmtMoney, getCharacter,
  weaponCategory, weaponItem, weaponTrait, upgradePrice, upgradeValue,
  type ItemDef, type UpgradeKey, type WeaponDef,
} from '../game/data';
import type { SaveData } from '../game/storage';
import {
  ARMOR_TUNE_DESCS, ARMOR_TUNE_LABELS, ARMOR_TUNE_TAGS, ARMOR_TUNE_TYPES, CONSUMABLE_LIMITS,
  TUNE_DESCS, TUNE_LABELS, TUNE_TAGS, armorModsOf, armorModSlots, armorValue, consumableCount,
  gearDef, gearLabel, gearMods, gearSellPrice, gunWithMods, modSlots, modsKey, normalizeConsumables,
  normalizeSupplies, sameGear, supplySellPrice, tuningPrice, tunesForWeapon,
  type ArmorTuneType, type GearItem, type SupplyKey, type TuneType,
} from '../game/warehouse';
import LobbyDialog from './LobbyDialog';
import { cn } from '../utils/cn';
import GearIcon from './GearIcon';

export type WarehouseAction =
  | { type: 'select'; slot: 'weapon' | 'armor'; gear?: GearItem }
  | { type: 'consumable'; key: SupplyKey; delta: number }
  | { type: 'buy'; id: string }
  | { type: 'sell'; target: { kind: 'gear'; gear: GearItem } | { kind: 'supply'; key: SupplyKey } }
  | { type: 'tune'; gear: GearItem; mod: TuneType }
  | { type: 'tuneArmor'; gear: GearItem; mod: ArmorTuneType }
  | { type: 'upgrade'; key: UpgradeKey };

const actionStyle = 'min-h-9 rounded-md border border-white/20 px-2.5 text-sm font-bold hover:bg-white/10 disabled:opacity-40';
// The iron warden's signature gun is a boss trophy, not a shop item.
const shopCatalog: ItemDef[] = [
  ...Object.keys(WEAPONS).filter((id) => id !== 'ironbreaker').map(weaponItem),
  ...ARMORS,
].sort((a, b) => a.value - b.value);
type Tab = 'owned' | 'supplies' | 'shop' | 'upgrade';
type SortBy = 'value' | 'rarity' | 'name';
const UPGRADE_KEYS: UpgradeKey[] = ['capacity', 'rollCd', 'speed'];
const CATEGORIES = ['全部', '手枪', '冲锋枪', '霰弹枪', '突击步枪', '精确射手', '狙击枪', '机枪', '发射器', '护甲'];
const SHOP_FILTERS = ['全部', '武器', '护甲'];

/** Compact stat grid; values changed by a mod are highlighted. */
function WeaponStats({ base, tuned }: { base: WeaponDef; tuned: WeaponDef }) {
  const cells: { label: string; value: string; changed: boolean }[] = [
    { label: '伤害', value: `${Math.round(tuned.dmg)}`, changed: tuned.dmg !== base.dmg },
    { label: '射速', value: `${Math.round(tuned.rate * 60)} RPM`, changed: tuned.rate !== base.rate },
    { label: '弹匣', value: `${tuned.mag} 发`, changed: tuned.mag !== base.mag },
    { label: '散布', value: tuned.spread.toFixed(3), changed: tuned.spread !== base.spread },
    { label: '装填', value: `${tuned.reload.toFixed(1)} 秒`, changed: tuned.reload !== base.reload },
    { label: '穿透', value: `${tuned.pierce}`, changed: tuned.pierce !== base.pierce },
  ];
  return (
    <dl className="grid grid-cols-3 gap-1" aria-label="武器属性">
      {cells.map((cell) => (
        <div key={cell.label} className="rounded bg-white/5 px-1.5 py-1">
          <dt className="text-[10px] leading-tight text-white/50">{cell.label}</dt>
          <dd className={cn('font-num text-[12px] font-bold leading-tight', cell.changed ? 'text-[#9fe6ff]' : 'text-white/85')}>{cell.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Armory({ save, onAction, onClose }: { save: SaveData; onAction: (action: WarehouseAction) => void; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('owned');
  const [category, setCategory] = useState('全部');
  const [shopFilter, setShopFilter] = useState('全部');
  const [sort, setSort] = useState<SortBy>('value');
  const { items, selected } = save.warehouse;
  const supplies = normalizeSupplies(save.warehouse.supplies);
  const character = getCharacter(save.characterId);
  const gun = items.find((item) => sameGear(selected.weapon, item));
  const armor = items.find((item) => sameGear(selected.armor, item));
  const equippedSlots = [{ slot: 'weapon' as const, item: gun }, { slot: 'armor' as const, item: armor }];
  const carrying = normalizeConsumables(selected.consumables);
  const throwableTotal = THROWABLE_IDS.reduce((sum, id) => sum + (carrying.throwables[id] ?? 0), 0);
  const supplyRows: { key: SupplyKey; name: string; icon: string; count: number; carried: number; max: number; price: number; desc: string }[] = [
    { key: 'bandages', name: '绷带', icon: '🩹', count: supplies.bandages, carried: carrying.bandages, max: CONSUMABLE_LIMITS.bandages, price: ITEM_BANDAGE.value, desc: '治疗 40 点生命' },
    { key: 'medkits', name: '急救针', icon: '💉', count: supplies.medkits, carried: carrying.medkits, max: CONSUMABLE_LIMITS.medkits, price: ITEM_MEDKIT.value, desc: '治疗 90 点生命' },
    ...THROWABLE_IDS.map((id) => ({
      key: id as SupplyKey, name: THROWABLES[id].name, icon: THROWABLES[id].icon,
      count: supplies.throwables[id] ?? 0, carried: carrying.throwables[id] ?? 0,
      max: CONSUMABLE_LIMITS.perThrowable, price: THROWABLES[id].value, desc: THROWABLES[id].desc,
    })),
  ];
  const tabs: { id: Tab; label: string }[] = [
    { id: 'owned', label: '拥有的装备' },
    { id: 'supplies', label: '药品与投掷物' },
    { id: 'shop', label: '购买装备' },
    { id: 'upgrade', label: '角色强化' },
  ];

  const ownedRows = items.filter((item) => {
    const def = gearDef(item.id);
    if (!def) return false;
    const c = def.kind === 'armor' ? '护甲' : weaponCategory(def.weapon ?? '');
    return category === '全部' || c === category;
  }).sort((a, b) => {
    const da = gearDef(a.id)!, db = gearDef(b.id)!;
    if (sort === 'name') return da.name.localeCompare(db.name, 'zh');
    if (sort === 'rarity') return db.rarity - da.rarity || db.value - da.value;
    return db.value - da.value;
  });
  const groups = CATEGORIES.slice(1).map((c) => ({
    name: c,
    rows: ownedRows.filter((item) => {
      const def = gearDef(item.id)!;
      return (def.kind === 'armor' ? '护甲' : weaponCategory(def.weapon ?? '')) === c;
    }),
  })).filter((g) => g.rows.length);

  const shopRows = shopCatalog.filter((def) => {
    if (shopFilter === '全部') return true;
    return shopFilter === '护甲' ? def.kind === 'armor' : def.kind !== 'armor';
  });

  return (
    <LobbyDialog title="仓库" onClose={onClose}>
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {equippedSlots.map(({ slot, item }) => item ? (
              <button key={slot} type="button" className={actionStyle} onClick={() => onAction({ type: 'select', slot })}>
                卸下{gearDef(item.id)?.name}{gearLabel(item) ? ` · ${gearLabel(item)}` : ''}
              </button>
            ) : null)}
            {consumableCount(carrying) > 0 && <span className="text-xs font-bold text-[#9fe6ff]">携带药品/投掷物 ×{consumableCount(carrying)}</span>}
            {!gun && !armor && !consumableCount(carrying) && <span className="text-sm text-white/65">选择已拥有的枪或护甲，或在「药品与投掷物」里配置携带量。</span>}
          </div>
          <span className="font-num text-lg font-bold text-[#ffe183]" aria-label="可用余额">¥{fmtMoney(save.stash)}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} className={cn(actionStyle, tab === t.id && 'border-[#ffcd65] text-[#ffe183]')} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {tab === 'supplies' ? (
          <div className="space-y-2">
            <p className="text-xs leading-relaxed text-white/65">先在仓库买入并持有药品/投掷物，再勾选本次携带量；出击时从库存扣除，成功撤离后归还并加上路上搜到的补给。投掷物携带总数上限 {CONSUMABLE_LIMITS.totalThrowables}，库存无上限。</p>
            <ul className="grid max-h-[46vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {supplyRows.map((row) => {
                const noStock = row.count <= row.carried;
                const atMax = row.carried >= row.max || (row.key !== 'bandages' && row.key !== 'medkits' && throwableTotal >= CONSUMABLE_LIMITS.totalThrowables);
                return (
                  <li key={row.key} className="space-y-2 rounded-lg border border-white/10 bg-black/15 p-2.5">
                    <div className="flex items-center gap-2">
                      <span className="grid size-9 shrink-0 place-items-center rounded bg-white/5 text-xl">{row.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-[#ffe183]">{row.name} <span className="font-num text-xs text-white/60">库存 {row.count} · 携带 {row.carried}</span></span>
                        <span className="block truncate text-[11px] text-white/60">{row.desc} · 单价 ¥{fmtMoney(row.price)}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button type="button" className={cn(actionStyle, 'min-h-8 px-2 text-[11px]')} disabled={save.stash < row.price} onClick={() => onAction({ type: 'buy', id: row.key })}>买入 ¥{fmtMoney(row.price)}</button>
                      <button type="button" className={cn(actionStyle, 'min-h-8 px-2 text-[11px]')} disabled={row.count <= 0} onClick={() => onAction({ type: 'sell', target: { kind: 'supply', key: row.key } })}>卖出 ¥{fmtMoney(supplySellPrice(row.key))}</button>
                      <span className="ml-auto flex items-center gap-1">
                        <button type="button" aria-label={`减少携带${row.name}`} className={cn(actionStyle, 'min-h-8 px-2')} disabled={row.carried <= 0} onClick={() => onAction({ type: 'consumable', key: row.key, delta: -1 })}>−</button>
                        <button type="button" aria-label={`增加携带${row.name}`} className={cn(actionStyle, 'min-h-8 px-2')} disabled={noStock || atMax} onClick={() => onAction({ type: 'consumable', key: row.key, delta: 1 })}>+</button>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : tab === 'shop' ? (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {SHOP_FILTERS.map((f) => (
                <button key={f} type="button" aria-pressed={shopFilter === f} className={cn(actionStyle, 'min-h-8 text-xs', shopFilter === f && 'border-[#ffcd65] text-[#ffe183]')} onClick={() => setShopFilter(f)}>{f}</button>
              ))}
            </div>
            <ul className="grid max-h-[48vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {shopRows.map((def) => {
                const wid = def.weapon;
                const w = wid ? WEAPONS[wid] : undefined;
                const owned = items.reduce((count, item) => count + (item.id === def.id ? item.count : 0), 0);
                return (
                  <li key={def.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/15 p-2.5">
                    <span className="flex min-w-0 items-center gap-2">
                      <GearIcon id={def.id} className="size-12" />
                      <span>
                        <span className="block text-sm font-bold" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}</span>
                        <span className="block text-xs text-white/65">
                          {RARITY_NAMES[def.rarity]} · {w ? `伤 ${w.dmg} · ${Math.round(w.rate * 60)}RPM · 弹匣 ${w.mag}` : `护甲 ${def.armor}`} · 在库 {owned}
                        </span>
                      </span>
                    </span>
                    <button type="button" aria-label={`购买 ${def.name} ¥${fmtMoney(def.value)}`} className={actionStyle} disabled={save.stash < def.value} onClick={() => onAction({ type: 'buy', id: def.id })}>¥{fmtMoney(def.value)}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : tab === 'upgrade' ? (
          <div className="space-y-2">
            <p className="text-xs text-white/65">永久强化，对所有角色生效。等级越高，升级费用越贵。</p>
            <ul className="grid gap-2 sm:grid-cols-3">
              {UPGRADE_KEYS.map((key) => {
                const info = UPGRADE_INFO[key];
                const level = save.upgrades[key];
                const maxed = level >= UPGRADE_MAX;
                const cost = upgradePrice(key, level);
                return (
                  <li key={key} className="space-y-2 rounded-lg border border-white/10 bg-black/15 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{info.icon}</span>
                      <div>
                        <div className="text-sm font-black text-[#ffe183]">{info.name}</div>
                        <div className="text-[11px] text-white/60">{info.desc}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/85">当前 <b className="font-num text-[#9fe6ff]">{upgradeValue(key, level)}</b>{!maxed && <> → <span className="font-num">{upgradeValue(key, level + 1)}</span></>}</div>
                    <div className="flex items-center gap-1.5" aria-label={`${info.name}等级 ${level} / ${UPGRADE_MAX}`}>
                      {Array.from({ length: UPGRADE_MAX }, (_, i) => (
                        <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < level ? 'bg-[#ffcd65]' : 'bg-white/15')} />
                      ))}
                      <span className="ml-1 text-[11px] text-white/55">{level}/{UPGRADE_MAX}</span>
                    </div>
                    <button type="button" className={cn(actionStyle, 'w-full')} disabled={maxed || save.stash < cost} onClick={() => onAction({ type: 'upgrade', key })}>
                      {maxed ? '已满级' : `升级 ¥${fmtMoney(cost)}`}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : items.length ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((c) => (
                <button key={c} type="button" aria-pressed={category === c} className={cn(actionStyle, 'min-h-8 text-[11px]', category === c && 'border-[#ffcd65] text-[#ffe183]')} onClick={() => setCategory(c)}>{c}</button>
              ))}
              <select aria-label="排序方式" value={sort} onChange={(e) => setSort(e.target.value as SortBy)} className="ml-auto min-h-8 rounded-md border border-white/20 bg-[#171b20] px-2 text-xs text-white/80">
                <option value="value">按价值</option>
                <option value="rarity">按稀有度</option>
                <option value="name">按名称</option>
              </select>
            </div>
            {groups.length ? groups.map((group) => (
              <div key={group.name} className="space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#ffd98a]">
                  {group.name}<span className="font-num text-white/45">{group.rows.reduce((n, item) => n + item.count, 0)} 件</span>
                  <span className="h-px flex-1 bg-white/10" />
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {group.rows.map((item) => {
                    const def = gearDef(item.id)!;
                    const slot: 'weapon' | 'armor' = def.kind === 'armor' ? 'armor' : 'weapon';
                    const equipped = sameGear(selected[slot], item);
                    const mods = gearMods(item);
                    const aMods = armorModsOf(item);
                    const availableMods = slot === 'weapon' ? tunesForWeapon(item.id!) : ARMOR_TUNE_TYPES;
                    const slots = slot === 'weapon' ? modSlots(item.id) : armorModSlots(item.id);
                    const activeCount = mods.length + aMods.length;
                    const full = activeCount >= slots;
                    const base = slot === 'weapon' ? WEAPONS[def.weapon!] : undefined;
                    const price = tuningPrice(def);
                    const sell = gearSellPrice(item);
                    return (
                      <li key={`${item.id}_${modsKey(mods) || 'base'}_${aMods.slice().sort().join('+') || 'plain'}`} className={cn('space-y-2 rounded-lg border bg-black/15 p-2.5', equipped ? 'border-[#d9ad58]' : 'border-white/10')}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex min-w-0 items-center gap-2">
                            <GearIcon id={def.id} className="size-14" />
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-black" style={{ color: RARITY_COLORS[def.rarity] }}>
                                {def.name} <span className="font-num text-xs text-white/80">×{item.count}</span>
                              </span>
                              {gearLabel(item) && <span className="block truncate text-[11px] font-bold text-[#9fe6ff]">{gearLabel(item)}</span>}
                              <span className="block truncate text-xs text-white/65">
                                {RARITY_NAMES[def.rarity]}{slot === 'armor'
                                  ? ` · 护甲 ${characterArmor(character, armorValue(def.armor ?? 0, aMods))}`
                                  : ` · ${weaponCategory(def.weapon ?? '')} · ${weaponTrait(def.weapon ?? '')}`}
                              </span>
                            </span>
                          </span>
                        </div>
                        {base && <WeaponStats base={base} tuned={gunWithMods(def.weapon!, mods) ?? base} />}
                        <div className="flex flex-wrap gap-1.5">
                          <button type="button" className={cn(actionStyle, 'min-h-8 text-xs', equipped && 'border-[#d9ad58] text-[#ffe183]')} aria-pressed={equipped} onClick={() => onAction({ type: 'select', slot, gear: equipped ? undefined : item })}>{equipped ? '已配装 · 卸下' : '配装'}</button>
                          <button type="button" className={cn(actionStyle, 'min-h-8 text-xs')} disabled={equipped} title={equipped ? '已配装的物品无法卖出' : '卖出一件'} onClick={() => onAction({ type: 'sell', target: { kind: 'gear', gear: item } })}>卖出 ¥{fmtMoney(sell)}</button>
                        </div>
                        <div className="space-y-1.5 border-t border-white/10 pt-2">
                          <div className="flex items-center gap-1 text-[11px] text-white/55">
                            <span>{slot === 'weapon' ? '改造槽' : '护甲改装'}</span>
                            {Array.from({ length: slots }, (_, i) => (
                              <span key={i} className={cn('size-2 rounded-full', i < activeCount ? 'bg-[#9fe6ff]' : 'bg-white/20')} />
                            ))}
                            <span className="font-num">{activeCount}/{slots}</span>
                            {full && <span className="text-[#ffd376]">已满 · 同类改造不可重复</span>}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {slot === 'weapon' ? (availableMods as TuneType[]).map((t) => {
                              const active = mods.includes(t);
                              const disabled = active || full || save.stash < price;
                              return (
                                <button key={t} type="button" title={TUNE_DESCS[t]} aria-pressed={active} disabled={disabled}
                                  className={cn('min-h-7 rounded border px-2 text-[11px] font-bold hover:bg-white/10 disabled:opacity-40', active ? 'border-[#9fe6ff] text-[#9fe6ff] opacity-100' : 'border-white/20 text-white/75')}
                                  onClick={() => onAction({ type: 'tune', gear: item, mod: t })}>
                                  {TUNE_LABELS[t]} <span className="font-num text-white/50">{TUNE_TAGS[t]}</span> ¥{fmtMoney(price)}
                                </button>
                              );
                            }) : (availableMods as ArmorTuneType[]).map((t) => {
                              const active = aMods.includes(t);
                              const disabled = active || full || save.stash < price;
                              return (
                                <button key={t} type="button" title={ARMOR_TUNE_DESCS[t]} aria-pressed={active} disabled={disabled}
                                  className={cn('min-h-7 rounded border px-2 text-[11px] font-bold hover:bg-white/10 disabled:opacity-40', active ? 'border-[#9fe6ff] text-[#9fe6ff] opacity-100' : 'border-white/20 text-white/75')}
                                  onClick={() => onAction({ type: 'tuneArmor', gear: item, mod: t })}>
                                  {ARMOR_TUNE_LABELS[t]} <span className="font-num text-white/50">{ARMOR_TUNE_TAGS[t]}</span> ¥{fmtMoney(price)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )) : <p className="rounded-lg border border-dashed border-white/15 px-3 py-5 text-center text-sm text-white/60">这个分类还没有装备，去商店买一件吧。</p>}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-white/20 px-3 py-6 text-center text-sm text-white/65">仓库还是空的。撤离时带回枪械和护甲，或在商店购买。</p>
        )}
        <p className="text-xs leading-relaxed text-white/60">武器改造按枪种开放：霰弹枪才有收束器、火箭筒才有高爆战斗部、快速弹夹全枪种可用，普通枪 2 槽、传说枪 3 槽。护甲 1–6 级可选，五/六级甲有 3 个改装槽（自动回甲、上限 +25%、吸收 78%、破甲 1.2 秒无敌）。已配装物品不可卖出；药品与投掷物在仓库买入后按携带量带入行动。</p>
      </div>
    </LobbyDialog>
  );
}
