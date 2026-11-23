import { useState } from 'react';
import {
  UPGRADE_INFO, UPGRADE_MAX, WEAPONS, upgradePrice, upgradeValue,
  RARITY_COLORS, RARITY_NAMES, characterArmor, fmtMoney, getCharacter, weaponItem,
  type UpgradeKey,
} from '../game/data';
import type { SaveData } from '../game/storage';
import { TUNE_DESCS, TUNE_LABELS, TUNE_TYPES, gearDef, gearMod, sameGear, tuningPrice, type GearItem, type TuneType } from '../game/warehouse';
import LobbyDialog from './LobbyDialog';
import { cn } from '../utils/cn';
import GearIcon from './GearIcon';

export type WarehouseAction =
  | { type: 'select'; slot: 'weapon' | 'armor'; gear?: GearItem }
  | { type: 'buy'; id: string }
  | { type: 'tune'; id: string; mod: TuneType }
  | { type: 'upgrade'; key: UpgradeKey };

const actionStyle = 'min-h-9 rounded-md border border-white/20 px-2.5 text-sm font-bold hover:bg-white/10 disabled:opacity-45';
const catalog = Object.keys(WEAPONS).map(weaponItem).sort((a, b) => a.value - b.value);
type Tab = 'owned' | 'shop' | 'upgrade';
const UPGRADE_KEYS: UpgradeKey[] = ['capacity', 'rollCd', 'speed'];

export default function Armory({ save, onAction, onClose }: { save: SaveData; onAction: (action: WarehouseAction) => void; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('owned');
  const { items, selected } = save.warehouse;
  const character = getCharacter(save.characterId);
  const gun = items.find((item) => sameGear(selected.weapon, item));
  const armor = items.find((item) => sameGear(selected.armor, item));
  const equippedSlots = [{ slot: 'weapon' as const, item: gun }, { slot: 'armor' as const, item: armor }];
  const tabs: { id: Tab; label: string }[] = [
    { id: 'owned', label: '拥有的装备' },
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
                卸下{gearDef(item.id)?.name}{item.tuned ? ` · ${TUNE_LABELS[gearMod(item)]}` : ''}
              </button>
            ) : null)}
            {!gun && !armor && <span className="text-sm text-white/65">选择拥有的枪或护甲，加入仓库配装。</span>}
          </div>
          <span className="font-num text-lg font-bold text-[#ffe183]" aria-label="可用余额">¥{fmtMoney(save.stash)}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} className={cn(actionStyle, tab === t.id && 'border-[#ffcd65] text-[#ffe183]')} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {tab === 'shop' ? (
          <ul className="grid max-h-[52vh] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {catalog.map((def) => (
              <li key={def.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/15 p-2.5">
                <span className="flex min-w-0 items-center gap-2"><GearIcon id={def.id} className="size-12" /><span><span className="block text-sm font-bold" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}</span><span className="text-xs text-white/65">{RARITY_NAMES[def.rarity]} · 伤 {WEAPONS[def.id.slice(2)].dmg} · 在库 {items.reduce((count, item) => count + (item.id === def.id ? item.count : 0), 0)}</span></span></span>
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
              const mod = item.tuned ? gearMod(item) : null;
              return (
                <li key={`${item.id}_${item.tuned ? gearMod(item) : 'base'}`} className={cn('space-y-2 rounded-lg border bg-black/15 p-2.5', equipped ? 'border-[#d9ad58]' : 'border-white/10')}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2"><GearIcon id={def.id} className="size-14" /><span className="min-w-0"><span className="block truncate text-sm font-black" style={{ color: RARITY_COLORS[def.rarity] }}>{def.name}{mod && <span className="ml-1 text-xs text-[#9fe6ff]">· {TUNE_LABELS[mod]}</span>}</span><span className="text-xs text-white/65">×{item.count}</span></span></span>
                  </div>
                  <p className="text-xs text-white/70">{RARITY_NAMES[def.rarity]}{slot === 'armor' ? ` · ${character.name}使用时护甲 ${characterArmor(character, def.armor ?? 0)}` : mod ? ` · ${TUNE_DESCS[mod]}` : ''}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button type="button" className={cn(actionStyle, equipped && 'border-[#d9ad58] text-[#ffe183]')} aria-pressed={equipped} onClick={() => onAction({ type: 'select', slot, gear: equipped ? undefined : item })}>{equipped ? '已配装 · 卸下' : '配装'}</button>
                  </div>
                  {slot === 'weapon' && (
                    <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-2">
                      {TUNE_TYPES.map((t) => {
                        const active = mod === t;
                        return (
                          <button key={t} type="button" title={TUNE_DESCS[t]} aria-pressed={active} disabled={active || save.stash < tuningPrice(def)}
                            className={cn('min-h-7 rounded border px-2 text-[11px] font-bold hover:bg-white/10 disabled:opacity-45', active ? 'border-[#9fe6ff] text-[#9fe6ff] opacity-100' : 'border-white/20 text-white/75')}
                            onClick={() => onAction({ type: 'tune', id: item.id, mod: t })}>
                            {TUNE_LABELS[t]} ¥{fmtMoney(tuningPrice(def))}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-lg border border-dashed border-white/20 px-3 py-6 text-center text-sm text-white/65">仓库还是空的。撤离时带回枪械和护甲，或在这里购买枪械。</p>
        )}
        <p className="text-xs leading-relaxed text-white/60">改造一次生效一种：稳定散布 −20%、高伤害 +25%、高速弹 +30%、穿甲 +2。再次改造会替换原有改造。仓库配装出击无装备费，带入的装备在成功撤离后归还，行动失败或放弃时丢失。</p>
      </div>
    </LobbyDialog>
  );
}
