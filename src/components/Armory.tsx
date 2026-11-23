import { useState } from 'react';
import {
  ITEM_BANDAGE, ITEM_MEDKIT, THROWABLE_IDS, THROWABLES, UPGRADE_INFO, UPGRADE_MAX, WEAPONS, upgradePrice, upgradeValue,
  RARITY_COLORS, RARITY_NAMES, characterArmor, fmtMoney, getCharacter, weaponItem,
  type ThrowableId, type UpgradeKey, type WeaponDef,
} from '../game/data';
import type { SaveData } from '../game/storage';
import {
  CONSUMABLE_LIMITS, TUNE_DESCS, TUNE_LABELS, TUNE_TAGS, TUNE_TYPES, consumableCost, consumableCount, gearDef, gearLabel, gearMods,
  gunWithMods, modSlots, modsKey, normalizeConsumables, sameGear, tuningPrice, type GearItem, type TuneType,
} from '../game/warehouse';
import LobbyDialog from './LobbyDialog';
import { cn } from '../utils/cn';
import GearIcon from './GearIcon';

export type WarehouseAction =
  | { type: 'select'; slot: 'weapon' | 'armor'; gear?: GearItem }
  | { type: 'consumable'; key: 'bandages' | 'medkits' | ThrowableId; delta: number }
  | { type: 'buy'; id: string }
  | { type: 'tune'; gear: GearItem; mod: TuneType }
  | { type: 'upgrade'; key: UpgradeKey };

const actionStyle = 'min-h-9 rounded-md border border-white/20 px-2.5 text-sm font-bold hover:bg-white/10 disabled:opacity-45';
const catalog = Object.keys(WEAPONS).map(weaponItem).sort((a, b) => a.value - b.value);
type Tab = 'owned' | 'supplies' | 'shop' | 'upgrade';
const UPGRADE_KEYS: UpgradeKey[] = ['capacity', 'rollCd', 'speed'];

/** Compact stat grid; values changed by a mod are highlighted. */
function WeaponStats({ base, tuned }: { base: WeaponDef; tuned: WeaponDef }) {
  const cells: { label: string; value: string; changed: boolean }[] = [
    { label: '伤害', value: `${Math.round(tuned.dmg)}`, changed: tuned.dmg !== base.dmg },
    { label: '射速', value: `${Math.round(tuned.rate * 60)} RPM`, changed: tuned.rate !== base.rate },
    { label: '弹匣', value: `${tuned.mag} 发`, changed: tuned.mag !== base.mag },
    { label: '散布', value: tuned.spread.toFixed(3), changed: tuned.spread !== base.spread },
    { label: '弹速', value: `${Math.round(tuned.speed)}`, changed: tuned.speed !== base.speed },
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
  const { items, selected } = save.warehouse;
  const character = getCharacter(save.characterId);
  const gun = items.find((item) => sameGear(selected.weapon, item));
  const armor = items.find((item) => sameGear(selected.armor, item));
  const equippedSlots = [{ slot: 'weapon' as const, item: gun }, { slot: 'armor' as const, item: armor }];
  const supplies = normalizeConsumables(selected.consumables);
  const throwableTotal = THROWABLE_IDS.reduce((sum, id) => sum + (supplies.throwables[id] ?? 0), 0);
  const supplyRows: { key: 'bandages' | 'medkits' | ThrowableId; name: string; icon: string; count: number; max: number; price: number; desc: string }[] = [
    { key: 'bandages', name: '绷带', icon: '🩹', count: supplies.bandages, max: CONSUMABLE_LIMITS.bandages, price: ITEM_BANDAGE.value, desc: '治疗 40 点生命' },
    { key: 'medkits', name: '急救针', icon: '💉', count: supplies.medkits, max: CONSUMABLE_LIMITS.medkits, price: ITEM_MEDKIT.value, desc: '治疗 90 点生命' },
    ...THROWABLE_IDS.map((id) => ({
      key: id, name: THROWABLES[id].name, icon: THROWABLES[id].icon,
      count: supplies.throwables[id] ?? 0, max: CONSUMABLE_LIMITS.perThrowable,
      price: THROWABLES[id].value, desc: THROWABLES[id].desc,
    })),
  ];
  const tabs: { id: Tab; label: string }[] = [
    { id: 'owned', label: '拥有的装备' },
    { id: 'supplies', label: '药品与投掷物' },
    { id: 'shop', label: '购买枪械' },
    { id: 'upgrade', label: '角色强化' },
  ];
  return (
    <LobbyDialog title="仓库" onClose={onClose}>
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {equippedSlots.map(({ slot, item }) => item ? (
              <button key={slot} type="button" className={actionStyle} onClick={() => onAction({ type: 'select', slot })}>
                卸下{gearDef(item.id)?.name}{gearMods(item).length ? ` · ${gearLabel(item)}` : ''}
              </button>
            ) : null)}
            {consumableCount(supplies) > 0 && <span className="text-xs font-bold text-[#9fe6ff]">药品/投掷物 ×{consumableCount(supplies)} · 装备费 ¥{fmtMoney(consumableCost(supplies))}</span>}
            {!gun && !armor && !consumableCount(supplies) && <span className="text-sm text-white/65">选择拥有的枪或护甲，或在「药品与投掷物」里配置携带量。</span>}
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
            <p className="text-xs leading-relaxed text-white/65">自定义携带量与武器、护甲同时生效。按件计价，出击时先扣费，成功撤离后返还装备费；投掷物总数上限 {CONSUMABLE_LIMITS.totalThrowables}。</p>
            <ul className="grid max-h-[46vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {supplyRows.map((row) => {
                const atMax = row.count >= row.max || (row.key !== 'bandages' && row.key !== 'medkits' && throwableTotal >= CONSUMABLE_LIMITS.totalThrowables);
                return (
                  <li key={row.key} className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/15 p-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded bg-white/5 text-xl">{row.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-[#ffe183]">{row.name} <span className="font-num text-white/70">×{row.count}</span></span>
                      <span className="block truncate text-[11px] text-white/60">{row.desc} · ¥{fmtMoney(row.price)}/件</span>
                    </span>
                    <span className="flex shrink-0 gap-1">
                      <button type="button" aria-label={`减少${row.name}`} className={cn(actionStyle, 'min-h-8 px-2')} disabled={row.count <= 0} onClick={() => onAction({ type: 'consumable', key: row.key, delta: -1 })}>−</button>
                      <button type="button" aria-label={`增加${row.name}`} className={cn(actionStyle, 'min-h-8 px-2')} disabled={atMax} onClick={() => onAction({ type: 'consumable', key: row.key, delta: 1 })}>+</button>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between rounded-lg border border-[#ffcf4a]/30 bg-black/25 px-3 py-2 text-sm">
              <span className="text-white/75">本次携带装备费</span>
              <span className="font-num font-bold text-[#ffe183]">¥{fmtMoney(consumableCost(supplies))}</span>
            </div>
          </div>
        ) : tab === 'shop' ? (
          <ul className="grid max-h-[52vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {catalog.map((def) => (
              <li key={def.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/15 p-2.5">
                <span className="flex min-w-0 items-center gap-2"><GearIcon id={def.id} className="size-12" /><span><span className="block text-sm font-bold" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}</span><span className="text-xs text-white/65">{RARITY_NAMES[def.rarity]} · 伤 {WEAPONS[def.id.slice(2)].dmg} · 射速 {Math.round(WEAPONS[def.id.slice(2)].rate * 60)} · 弹匣 {WEAPONS[def.id.slice(2)].mag} · 在库 {items.reduce((count, item) => count + (item.id === def.id ? item.count : 0), 0)}</span></span></span>
                <button type="button" aria-label={`购买 ${def.name} ¥${fmtMoney(def.value)}`} className={actionStyle} disabled={save.stash < def.value} onClick={() => onAction({ type: 'buy', id: def.id })}>¥{fmtMoney(def.value)}</button>
              </li>
            ))}
          </ul>
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
          <ul className="grid max-h-[52vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {items.map((item) => {
              const def = gearDef(item.id);
              if (def?.kind !== 'weapon' && def?.kind !== 'armor') return null;
              const slot = def.kind;
              const equipped = sameGear(selected[slot], item);
              const mods = gearMods(item);
              const slots = modSlots(item.id);
              const full = mods.length >= slots;
              const base = slot === 'weapon' ? WEAPONS[item.id.slice(2)] : undefined;
              return (
                <li key={`${item.id}_${modsKey(mods) || 'base'}`} className={cn('space-y-2 rounded-lg border bg-black/15 p-2.5', equipped ? 'border-[#d9ad58]' : 'border-white/10')}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2"><GearIcon id={def.id} className="size-14" /><span className="min-w-0"><span className="block truncate text-sm font-black" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}{mods.map((m) => <span key={m} className="ml-1 text-xs font-bold text-[#9fe6ff]">· {TUNE_LABELS[m]}</span>)}</span><span className="text-xs text-white/65">×{item.count}</span></span></span>
                  </div>
                  <p className="text-xs text-white/70">{RARITY_NAMES[def.rarity]}{slot === 'armor'
                    ? ` · ${character.name}使用时护甲 ${characterArmor(character, def.armor ?? 0)}`
                    : mods.length ? ` · ${mods.map((m) => TUNE_DESCS[m]).join(' / ')}` : ' · 未改装'}</p>
                  {base && <WeaponStats base={base} tuned={gunWithMods(item.id, mods) ?? base} />}
                  <div className="flex flex-wrap gap-1.5">
                    <button type="button" className={cn(actionStyle, equipped && 'border-[#d9ad58] text-[#ffe183]')} aria-pressed={equipped} onClick={() => onAction({ type: 'select', slot, gear: equipped ? undefined : item })}>{equipped ? '已配装 · 卸下' : '配装'}</button>
                  </div>
                  {slot === 'weapon' && (
                    <div className="space-y-1.5 border-t border-white/10 pt-2">
                      <div className="flex items-center gap-1 text-[11px] text-white/55">
                        <span>改装槽</span>
                        {Array.from({ length: slots }, (_, i) => (
                          <span key={i} className={cn('size-2 rounded-full', i < mods.length ? 'bg-[#9fe6ff]' : 'bg-white/20')} />
                        ))}
                        <span className="font-num">{mods.length}/{slots}</span>
                        {full && <span className="text-[#ffd376]">已满 · 同一改造不可重复</span>}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {TUNE_TYPES.map((t) => {
                          const active = mods.includes(t);
                          const disabled = active || full || save.stash < tuningPrice(def);
                          return (
                            <button key={t} type="button" title={TUNE_DESCS[t]} aria-pressed={active} disabled={disabled}
                              className={cn('min-h-7 rounded border px-2 text-[11px] font-bold hover:bg-white/10 disabled:opacity-45', active ? 'border-[#9fe6ff] text-[#9fe6ff] opacity-100' : 'border-white/20 text-white/75')}
                              onClick={() => onAction({ type: 'tune', gear: item, mod: t })}>
                              {TUNE_LABELS[t]} <span className="font-num text-white/50">{TUNE_TAGS[t]}</span> ¥{fmtMoney(tuningPrice(def))}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-lg border border-dashed border-white/20 px-3 py-6 text-center text-sm text-white/65">仓库还是空的。撤离时带回枪械和护甲，或在这里购买枪械。</p>
        )}
        <p className="text-xs leading-relaxed text-white/60">改造可并存叠加：普通枪 2 个改装槽、传说枪 3 个，同一改造不能重复。稳定（散布 −25%、后坐 −30%）、高伤害（+25%）、高速弹（弹速 +30%、射程 +10%）、穿甲（穿透 +2）、扩容弹匣（+50%）、轻量复进（射速 +20%）、收束器（散布 −45%，霰弹枪最明显）。武器和护甲免费借用；药品与投掷物按携带量收费，成功撤离后返还装备费，行动失败或放弃时全部损失。</p>
      </div>
    </LobbyDialog>
  );
}
