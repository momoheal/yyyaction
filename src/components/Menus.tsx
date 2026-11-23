import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { CHARACTERS, ENEMIES, LOADOUTS, RARITY_COLORS, RARITY_NAMES, RARITY_RGB, characterArmor, fmtMoney, fmtTime, getCharacter, type CharacterId, type Loadout } from '../game/data';
import { getRaidMap, type RaidMapId } from '../game/map';
import { availableGear, gearDef, gearLabel, raidGearItems, WAREHOUSE_KIT } from '../game/warehouse';
import type { ScoreEntry, SaveData } from '../game/storage';
import type { RaidResult } from '../game/game';
import Armory, { type WarehouseAction } from './Armory';
import LevelPicker from './LevelPicker';
import LobbyDialog from './LobbyDialog';
import Portrait from './Portrait';
import GearIcon from './GearIcon';

const OUTCOME: Record<string, { label: string; cls: string }> = {
  extract: { label: '撤离', cls: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30' },
  dead: { label: '阵亡', cls: 'bg-red-500/15 text-red-300 ring-red-400/30' },
  mia: { label: '失踪', cls: 'bg-zinc-400/15 text-zinc-300 ring-zinc-400/30' },
};

// Client-side convenience gate for development only; this is not a server-side secret.
const DEBUG_PASSWORD = 'DUCK-OPS-DEV-2026';

function useCountUp(target: number, dur = 1.2, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const k = Math.max(0, Math.min(1, (now - t0) / (dur * 1000)));
      const e = 1 - Math.pow(1 - k, 3);
      setV(Math.round(target * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, dur, delay]);
  return v;
}

function Key({ children }: { children: React.ReactNode }) {
  return <kbd className="inline-flex min-w-[1.6em] items-center justify-center rounded-md border border-white/20 border-b-2 bg-white/10 px-1.5 py-0.5 font-num text-[11px] font-bold leading-none text-white/90">{children}</kbd>;
}

function MuteButton({ muted, onMute }: { muted: boolean; onMute: () => void }) {
  return (
    <button onClick={onMute} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/40 text-lg backdrop-blur transition hover:bg-white/10 active:scale-95" aria-label="切换声音">
      {muted ? '🔇' : '🔊'}
    </button>
  );
}

export function ScoreTable({ scores, highlight = -1, compact = false }: { scores: ScoreEntry[]; highlight?: number; compact?: boolean }) {
  if (!scores.length) return <div className="px-4 py-10 text-center text-sm text-white/40">暂无记录<br />完成一次撤离来登上排行榜！</div>;
  const list = compact ? scores.slice(0, 5) : scores;
  return (
    <ol className="divide-y divide-white/5">
      {list.map((s, i) => (
        <li key={`${s.date}-${i}`} className={cn('flex items-center gap-3 px-3 py-2', i === highlight && 'anim-glow bg-[#ffd23f]/15')}>
          <span className={cn('w-6 text-center font-num text-lg font-bold', i === 0 ? 'text-[#ffd23f]' : i === 1 ? 'text-zinc-200' : i === 2 ? 'text-amber-600' : 'text-white/35')}>{i + 1}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-num text-[17px] font-bold leading-tight text-white">{fmtMoney(s.score)}</span>
              {(s.mapId || s.characterId) && <span className="block text-xs text-white/60">
                {s.mapId && getRaidMap(s.mapId).name}{s.mapId && s.characterId && ' · '}{s.characterId && getCharacter(s.characterId).name}
              </span>}
            <span className="block truncate text-[11px] text-white/45">
              {s.best ? <span style={{ color: RARITY_COLORS[s.bestR ?? 0] }}>{s.bestIcon?.startsWith('gear:') ? <GearIcon id={s.bestIcon.slice(5)} className="mr-1 inline-block size-4 align-middle" /> : s.bestIcon === 'GUN' ? '🔫' : s.bestIcon} {s.best}</span> : '—'}
              <span className="ml-2">{s.kills}杀 · {fmtTime(s.time)}</span>
            </span>
          </span>
          <span className={cn('rounded-md px-1.5 py-0.5 text-[11px] font-bold ring-1', OUTCOME[s.outcome]?.cls)}>{OUTCOME[s.outcome]?.label}</span>
        </li>
      ))}
    </ol>
  );
}

function RarityChips() {
  return (
    <div className="flex flex-wrap gap-1">
      {RARITY_NAMES.map((n, i) => (
        <span key={n} className="rounded px-1.5 py-0.5 text-[11px] font-bold" style={{ color: RARITY_COLORS[i], background: `rgba(${RARITY_RGB[i]},0.14)` }}>{n}</span>
      ))}
    </div>
  );
}

function Help() {
  const rows: [React.ReactNode, string][] = [
    [<><Key>W</Key><Key>A</Key><Key>S</Key><Key>D</Key></>, '移动'],
    [<Key>鼠标</Key>, '瞄准 · 左键射击'],
    [<><Key>空格</Key><Key>右键</Key></>, '翻滚（无敌闪避）'],
    [<><Key>E</Key></>, '搜索容器 / 尸体'],
    [<><Key>R</Key><Key>G</Key><Key>T</Key><Key>H</Key></>, '换弹 · 投掷 · 切雷 · 治疗'],
    [<><Key>Q</Key><Key>1</Key><Key>2</Key></>, '切换武器'],
    [<><Key>B</Key><Key>V</Key></>, '背包 · 丢弃最低价值'],
    [<><Key>Esc</Key><Key>M</Key></>, '暂停 · 静音'],
  ];
  return (
    <div className="space-y-4 p-4 text-sm text-white/75">
      <div>
        <div className="mb-2 text-xs font-bold tracking-widest text-[#ffd23f]">键鼠操作</div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1.5">
          {rows.map(([k, d], i) => (<div key={i} className="contents"><div className="flex gap-1">{k}</div><div>{d}</div></div>))}
        </div>
      </div>
      <div>
        <div className="mb-1 text-xs font-bold tracking-widest text-[#ffd23f]">触屏操作</div>
        <p className="leading-relaxed">左半屏拖动移动；右半屏拖动瞄准并<b className="text-white">自动开火</b>（带吸附、预判和子弹微调）；右下按钮翻滚 / 换弹 / 投掷 / 切雷 / 背包 / 治疗 / 切枪；靠近容器点击「搜索」。</p>
      </div>
      <div>
        <div className="mb-1 text-xs font-bold tracking-widest text-[#ffd23f]">规则</div>
        <ul className="list-disc space-y-1 pl-4 leading-relaxed">
          <li>搜刮物资放入背包（默认 20 格，可在仓库强化扩容）。捡到更好的枪械/护甲会立即自动装备；点「背包」可查看物资，点带绿点的枪/甲可直接换装，点其他物品则丢弃，也能一键丢弃最低价值物品。</li>
          <li>进入<b className="text-emerald-300">绿色撤离点</b>停留 6 秒即可撤离。带出的枪械、护甲入库，其余物资折现。</li>
          <li>阵亡或 6 分钟超时：背包物资与出击装备<b className="text-red-300">全部丢失</b>。</li>
          <li>鹅老大镇守军事基地，击败它可获得顶级物资。</li>
        </ul>
        <div className="mt-2"><RarityChips /></div>
      </div>
    </div>
  );
}

export function StartScreen({ save, kit: sel, mapId, onMap, onWarehouse, onUseWarehouse, onCharacter, onKit, onDeploy, onTraining, onDebugMode, onDebugMoney, muted, onMute }: {
  save: SaveData; kit: Loadout; mapId: RaidMapId; onMap: (id: RaidMapId) => void;
  onWarehouse: (action: WarehouseAction) => void; onUseWarehouse: () => void;
  onCharacter: (id: CharacterId) => void; onKit: (k: string) => void;
  onDeploy: () => void; onTraining: () => void; onDebugMode: (enabled: boolean) => void; onDebugMoney: () => void; muted: boolean; onMute: () => void;
}) {
  const [tab, setTab] = useState<'rank' | 'help'>(save.firstRun ? 'help' : 'rank');
  const [panel, setPanel] = useState<'warehouse' | 'maps' | 'rank' | 'help' | 'debug' | null>(null);
  const [debugPassword, setDebugPassword] = useState('');
  const [debugError, setDebugError] = useState(false);
  const rate = save.raids ? Math.round((save.extracts / save.raids) * 100) : 0;
  const map = getRaidMap(mapId);
  const prepared = raidGearItems(availableGear(save.warehouse));
  const stockCount = save.warehouse.items.reduce((count, item) => count + item.count, 0);
  return (
    <div className="scroll-y absolute inset-0 z-10">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-r from-[#0b0d10]/95 via-[#0b0d10]/75 to-[#0b0d10]/30" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,210,63,0.12),transparent_55%)]" />
      <div className="fixed right-4 top-4 z-20"><MuteButton muted={muted} onMute={onMute} /></div>
      <div className="relative mx-auto flex min-h-full max-w-6xl flex-col gap-3 px-4 py-4 sm:gap-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:gap-12 short:flex-row short:items-center short:gap-5 short:py-3">
        <div className="anim-rise flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd23f]/30 bg-[#ffd23f]/10 px-3 py-1 font-num text-xs font-bold tracking-[0.25em] text-[#ffd23f]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffd23f]" /> 搜 · 打 · 撤
          </div>
          <h1 className="title-font mt-1.5 text-[44px] leading-none text-[#ffd23f] sm:mt-3 sm:text-[96px] short:mt-1.5 short:text-[46px]">鸭鸭鸭行动</h1>
          <p className="mt-3 hidden max-w-md text-[15px] leading-relaxed text-white/70 sm:block short:hidden">
            搜刮物资，挑战各战区的首领，在倒计时结束前<span className="font-bold text-emerald-300">活着撤离</span>。带回的物资会存入仓库。
          </p>

          <div className="mt-2 flex flex-wrap items-stretch gap-2 sm:mt-5 sm:gap-3 short:hidden">
            <div className="min-w-[30%] flex-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur sm:rounded-xl sm:px-4 sm:py-2.5">
              <div className="text-[10px] tracking-widest text-white/45 sm:text-[11px]">仓库余额</div>
              <div className="font-num text-base font-bold text-[#ffcf4a] sm:text-2xl">¥{fmtMoney(save.stash)}</div>
            </div>
            <div className="min-w-[30%] flex-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur sm:rounded-xl sm:px-4 sm:py-2.5">
              <div className="text-[10px] tracking-widest text-white/45 sm:text-[11px]">出击/撤离</div>
              <div className="font-num text-base font-bold text-white sm:text-2xl">{save.raids}<span className="ml-1.5 text-xs text-emerald-300 sm:ml-2 sm:text-base">{rate}%</span></div>
            </div>
            <div className="min-w-[30%] flex-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur sm:rounded-xl sm:px-4 sm:py-2.5">
              <div className="text-[10px] tracking-widest text-white/45 sm:text-[11px]">最高分</div>
              <div className="font-num text-base font-bold text-white sm:text-2xl">{fmtMoney(save.scores[0]?.score ?? 0)}</div>
            </div>
          </div>

          <div role="group" aria-labelledby="character-label" className="mt-3 max-w-xl sm:mt-5 short:mt-2">
            <div id="character-label" className="mb-1.5 text-xs font-bold tracking-widest text-white/60">选择角色</div>
            <div className="grid grid-cols-3 gap-2">
              {CHARACTERS.map((character) => {
                const selected = save.characterId === character.id;
                return (
                  <button
                    key={character.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onCharacter(character.id)}
                    className={cn('flex min-w-0 flex-col items-center gap-1.5 rounded-lg border px-1.5 py-1.5 text-center sm:flex-row sm:text-left short:flex-row short:text-left', selected ? 'border-[#ffd23f] bg-[#ffd23f]/12' : 'border-white/15 bg-black/40 hover:bg-white/10')}
                  >
                    <Portrait id={character.id} className="pointer-events-none size-10 shrink-0 short:size-9" />
                    <span className="min-w-0">
                      <span className="block whitespace-nowrap text-sm font-black leading-tight" style={{ color: character.feathers[0] }}>{character.name} <span className="text-[11px] font-normal text-white/60">{character.role}</span></span>
                      <span className="block whitespace-nowrap text-[11px] leading-snug text-white/75">移速 {Math.round(100 * character.speed / CHARACTERS[0].speed)}% · 甲 {characterArmor(character, sel.armor)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 sm:mt-5 short:mt-2">
            <div className="mb-1.5 flex max-w-xl items-center justify-between gap-2 sm:mb-2 short:mb-1.5">
              <span className="text-xs font-bold tracking-widest text-white/60">选择出击装备</span>
              <button type="button" onClick={() => setPanel('warehouse')} className="min-h-9 rounded-md border border-[#ffcf4a]/35 bg-black/35 px-2.5 text-sm font-bold text-[#ffe183] hover:bg-white/10">仓库 · {stockCount} 件</button>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-2">
              {LOADOUTS.map((l) => {
                const locked = save.stash < l.cost;
                const selected = l.id === sel.id;
                return (
                  <button
                    key={l.id}
                    disabled={locked}
                    onClick={() => onKit(l.id)}
                    className={cn(
                      'rounded-lg border p-2 text-left transition active:scale-[0.98] sm:rounded-xl sm:p-3 short:py-1.5',
                      selected ? 'border-[#ffd23f] bg-[#ffd23f]/12 shadow-[0_0_24px_-6px_rgba(255,210,63,0.6)]' : 'border-white/10 bg-black/40 hover:border-white/25 hover:bg-white/5',
                      locked && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-base font-black text-white">{l.name}</span>
                      <span className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70 sm:inline">{l.tag}</span>
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-white/55 short:hidden">{l.desc}</div>
                    <div className={cn('mt-1.5 font-num text-sm font-bold', l.cost ? 'text-[#ffcf4a]' : 'text-emerald-300')}>{l.cost ? `¥${fmtMoney(l.cost)}` : '免费'}</div>
                  </button>
                );
              })}
            </div>
            {!!prepared.length && (
              <button type="button" onClick={onUseWarehouse} aria-pressed={sel.id === WAREHOUSE_KIT} className={cn('mt-2 block w-full max-w-xl rounded-md border px-2.5 py-1.5 text-left text-xs font-bold', sel.id === WAREHOUSE_KIT ? 'border-[#ffd23f] bg-[#ffd23f]/12 text-[#ffe183]' : 'border-white/20 bg-black/40 text-white/85')}>
                仓库配装 · {prepared.map((gear) => `${gearDef(gear.id)?.name}${gear.tuned ? `（${gearLabel(gear)}）` : ''}`).join(' · ')}
              </button>
            )}
          </div>

          <div className="mt-2.5 max-w-xl sm:mt-4 short:mt-2">
            <button type="button" onClick={() => setPanel('maps')} className="flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-white/20 bg-[#1b1e23] px-2.5 py-1.5 text-left text-sm font-bold text-white hover:border-white/45">
              <span className="flex items-center gap-2"><Portrait id={map.boss} className="size-8" /><span>{map.name}<span className="ml-2 text-xs font-normal text-white/65">{ENEMIES[map.boss].name}</span></span></span>
              <span className="shrink-0 text-[#ffe183]">选择战区</span>
            </button>
            <p className="mt-1 text-xs leading-relaxed text-white/65 short:hidden">物资 {map.loot}</p>
          </div>

          <button
            onClick={save.trainingCompleted ? onDeploy : onTraining}
            className="deploy-btn group mt-3 flex w-full max-w-xl items-center justify-between rounded-2xl px-5 py-3 text-left transition active:scale-[0.98] sm:mt-6 sm:px-6 sm:py-4 short:mt-3 short:py-2.5"
          >
            <span>
              <span className="block text-2xl font-black tracking-wide text-[#1d1500] sm:text-3xl short:text-xl">{save.trainingCompleted ? '开始行动' : '新手行动'}</span>
              <span className="block text-xs font-bold text-[#1d1500]/70">{save.trainingCompleted ? (sel.id === WAREHOUSE_KIT ? '仓库配装 · 无装备费' : sel.cost ? `装备费 ¥${fmtMoney(sel.cost)}` : '免费部署') : '免费训练 · 搜箱、射击、撤离'}</span>
            </span>
            <span className="text-4xl transition group-hover:translate-x-1">🦆</span>
          </button>
          <button onClick={save.trainingCompleted ? onTraining : onDeploy} className="mt-2 min-h-10 rounded-lg border border-white/20 bg-black/40 px-4 text-sm font-bold text-white/85 active:scale-[0.98]">
            {save.trainingCompleted ? '重玩新手行动' : '直接开始正式行动'}
          </button>
          <button type="button" onClick={() => { setDebugPassword(''); setDebugError(false); setPanel('debug'); }} className="ml-2 min-h-10 rounded-lg border border-white/10 bg-black/25 px-3 text-xs font-bold text-white/55 hover:border-white/25 hover:text-white/80">
            {save.debugMode ? '🛠 调试模式已开启' : '🛠 调试入口'}
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2 lg:hidden">
            <button type="button" onClick={() => { setTab('rank'); setPanel('rank'); }} className="min-h-10 rounded-lg border border-white/20 bg-black/40 text-sm font-bold text-white/85 active:scale-[0.98]">🏆 排行榜</button>
            <button type="button" onClick={() => { setTab('help'); setPanel('help'); }} className="min-h-10 rounded-lg border border-white/20 bg-black/40 text-sm font-bold text-white/85 active:scale-[0.98]">🎮 操作与规则</button>
          </div>
        </div>

        <div className="anim-rise hidden w-full overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md lg:block lg:w-[390px] short:block short:w-[300px] short:shrink-0" style={{ animationDelay: '120ms' }}>
          <div className="flex border-b border-white/10">
            {(['rank', 'help'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn('flex-1 py-3 text-sm font-bold transition', tab === t ? 'bg-white/5 text-[#ffd23f]' : 'text-white/50 hover:text-white/80')}>
                {t === 'rank' ? '🏆 本地排行榜' : '🎮 操作与规则'}
              </button>
            ))}
          </div>
          <div className="max-h-[52vh] overflow-y-auto scroll-y short:max-h-[70vh]">{tab === 'rank' ? <ScoreTable scores={save.scores} /> : <Help />}</div>
        </div>
      </div>
      {panel === 'warehouse' && <Armory save={save} onAction={onWarehouse} onClose={() => setPanel(null)} />}
      {panel === 'maps' && <LevelPicker selected={mapId} extracts={save.extracts} debugMode={save.debugMode} onPick={onMap} onClose={() => setPanel(null)} />}
      {panel === 'debug' && (
        <LobbyDialog title="调试模式" onClose={() => setPanel(null)}>
          {save.debugMode ? (
            <div className="space-y-4 p-4 sm:p-5">
              <div className="rounded-xl border border-emerald-300/25 bg-emerald-400/10 p-3">
                <div className="font-black text-emerald-200">调试模式已开启</div>
                <p className="mt-1 text-sm text-white/70">全部战区可以进入。调试模式保存在本机存档中。</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={onDebugMoney} className="min-h-11 rounded-lg bg-[#ffd23f] px-4 font-black text-[#1d1500] hover:bg-[#ffe27d]">增加 ¥1,000,000</button>
                <button type="button" onClick={() => { onDebugMode(false); setPanel(null); }} className="min-h-11 rounded-lg border border-white/20 px-4 font-bold text-white/85 hover:bg-white/10">关闭调试模式</button>
              </div>
              <p className="text-xs text-white/45">关闭后余额保留；战区重新按正常撤离次数限制。</p>
            </div>
          ) : (
            <form onSubmit={(event) => {
              event.preventDefault();
              if (debugPassword.trim() === DEBUG_PASSWORD) {
                onDebugMode(true);
                setDebugPassword('');
                setDebugError(false);
              } else setDebugError(true);
            }} className="space-y-3 p-4 sm:p-5">
              <label htmlFor="debug-password" className="block text-sm font-bold text-white/80">输入调试密码</label>
              <input id="debug-password" type="password" autoComplete="off" maxLength={64} value={debugPassword} onChange={(event) => { setDebugPassword(event.target.value); setDebugError(false); }} className="min-h-11 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-white outline-none focus:border-[#ffd23f]" placeholder="调试密码" />
              {debugError && <p role="alert" className="text-sm font-bold text-red-300">密码不正确，请重试。</p>}
              <button type="submit" className="min-h-11 rounded-lg bg-[#ffd23f] px-4 font-black text-[#1d1500] hover:bg-[#ffe27d]">进入调试模式</button>
            </form>
          )}
        </LobbyDialog>
      )}
      {(panel === 'rank' || panel === 'help') && (
        <LobbyDialog title={tab === 'rank' ? '🏆 本地排行榜' : '🎮 操作与规则'} onClose={() => setPanel(null)}>
          <div className="scroll-y max-h-[70vh] overflow-y-auto">{tab === 'rank' ? <ScoreTable scores={save.scores} /> : <Help />}</div>
        </LobbyDialog>
      )}
    </div>
  );
}

export function PauseMenu({ training, stats, onResume, onRestart, onQuit, muted, onMute }: {
  training: boolean; stats: { time: number; value: number; kills: number; items: number }; onResume: () => void; onRestart: () => void; onQuit: () => void; muted: boolean; onMute: () => void;
}) {
  return (
    <div className="scroll-y absolute inset-0 z-20 bg-black/55 backdrop-blur-sm">
      <div className="grid min-h-full place-items-center p-4 short:p-2">
      <div className="anim-pop w-full max-w-sm rounded-2xl border border-white/10 bg-[#121418]/95 p-6 shadow-2xl short:p-4">
        <div className="flex items-center justify-between">
          <h2 className="title-font text-4xl text-[#ffd23f]">行动暂停</h2>
          <MuteButton muted={muted} onMute={onMute} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[['剩余时间', fmtTime(stats.time)], ['背包价值', `¥${fmtMoney(stats.value)}`], ['击杀', `${stats.kills}`]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/5 py-2">
              <div className="text-[11px] text-white/45">{k}</div>
              <div className="font-num text-lg font-bold text-white">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 short:mt-3">
          <button onClick={onResume} className="deploy-btn flex w-full items-center justify-between rounded-xl px-4 py-3 font-black text-[#1d1500] active:scale-[0.98]">继续行动 <Key>Esc</Key></button>
          <button onClick={onRestart} className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10 active:scale-[0.98]">{training ? '重开训练' : '重新部署'}</button>
          <button onClick={onQuit} className="flex w-full items-center justify-between rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 font-bold text-red-200 transition hover:bg-red-500/20 active:scale-[0.98]">放弃行动 · 返回大厅</button>
        </div>
        <p className="mt-3 text-center text-[11px] text-white/40 short:hidden">{training ? '新手行动免费，可以随时重开' : '放弃或重新部署将损失本局背包物资与出击装备'}</p>
      </div>
      </div>
    </div>
  );
}

export interface GameOverData { r: RaidResult; rank: number; stashBefore: number; stashAfter: number }

export function GameOverScreen({ data, scores, onRetry, onMenu, canRetryKit }: {
  data: GameOverData; scores: ScoreEntry[]; onRetry: () => void; onMenu: () => void; canRetryKit: boolean;
}) {
  const { r, rank } = data;
  const ok = r.outcome === 'extract';
  const score = useCountUp(r.score, 1.3, 0.35);
  const value = useCountUp(r.value, 1.0, 0.2);
  if (r.training) {
    const reward = data.stashAfter - data.stashBefore;
    return (
      <div className="scroll-y absolute inset-0 z-20 bg-black/65 backdrop-blur-sm">
        <div className="grid min-h-full place-items-center p-4">
          <section className="anim-pop w-full max-w-md rounded-2xl border border-white/15 bg-[#121418] p-5">
            <h2 className="title-font text-4xl text-[#ffd23f]">{ok ? '新手行动完成' : '新手行动结束'}</h2>
            <p className="mt-3 text-sm text-white/75">
              {ok ? (reward ? `成功带回${r.best?.name}，仓库增加 ¥${fmtMoney(reward)}。` : '成功带回训练物资。首通奖励已领取。') : (r.outcome === 'mia' ? '训练时间结束，可以免费再试一次。' : '可以免费再试一次。')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={onRetry} className="deploy-btn min-h-11 rounded-xl px-4 font-black text-[#1d1500]">{ok ? `开始正式行动${canRetryKit ? '' : '（跑刀）'}` : '再练一次'} <Key>Enter</Key></button>
              <button onClick={onMenu} className="min-h-11 rounded-xl border border-white/20 px-4 font-bold text-white">返回大厅 <Key>Esc</Key></button>
            </div>
          </section>
        </div>
      </div>
    );
  }
  const title = ok ? '撤离成功' : r.outcome === 'dead' ? '行动失败 · 阵亡' : '行动失败 · 失踪';
  const kitName = r.kit === WAREHOUSE_KIT ? '仓库配装' : LOADOUTS.find((l) => l.id === r.kit)?.name ?? '跑刀';
  const counts = [0, 0, 0, 0, 0, 0];
  for (const it of r.items) counts[it.rarity]++;
  return (
    <div className="scroll-y absolute inset-0 z-20 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center gap-4 p-4 sm:p-6 short:p-2">
        <div className={cn('anim-pop relative overflow-hidden rounded-2xl border p-5 sm:p-6', ok ? 'border-emerald-400/30 bg-gradient-to-br from-emerald-900/70 to-[#101317]/95' : 'border-red-400/25 bg-gradient-to-br from-red-950/70 to-[#101317]/95')}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className={cn('font-num text-xs font-bold tracking-[0.3em]', ok ? 'text-emerald-300' : 'text-red-300')}>{ok ? 'EXTRACTED' : r.outcome === 'dead' ? 'KILLED IN ACTION' : 'MISSING IN ACTION'}</div>
              <h2 className={cn('title-font text-5xl sm:text-6xl short:text-4xl', ok ? 'text-emerald-300' : 'text-red-300')}>{title}</h2>
              <div className="mt-1 text-sm text-white/60">{getRaidMap(r.mapId).name} · {getCharacter(r.characterId).name} · 存活 {fmtTime(r.time)} · 击杀 {r.kills} · 装备「{kitName}」{ok ? '已带回' : r.kitCost || r.usedGear.length ? '已丢失' : ''}</div>
            </div>
            <div className="text-right">
              <div className="text-xs tracking-widest text-white/50">本局得分</div>
              <div className="font-num text-5xl font-bold leading-none text-white sm:text-6xl">{fmtMoney(score)}</div>
              {rank === 0 && r.score > 0 ? <div className="anim-glow mt-1 inline-block rounded-md bg-[#ffd23f] px-2 py-0.5 text-xs font-black text-[#1d1500]">★ 新纪录！</div>
                : rank > 0 ? <div className="mt-1 text-xs font-bold text-[#ffd23f]">排行榜第 {rank + 1} 名</div> : null}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['带出物资', ok ? `¥${fmtMoney(value)}` : `¥0`, ok ? 'text-[#ffcf4a]' : 'text-white/40'],
              ['击杀奖励', `+${fmtMoney(ok ? r.killScore : Math.floor(r.killScore * 0.3))}`, 'text-white'],
              ['损失物资', ok ? '¥0' : `¥${fmtMoney(r.value)}`, ok ? 'text-white/40' : 'text-red-300'],
              ['仓库余额', `¥${fmtMoney(data.stashAfter)}`, 'text-emerald-200'],
            ].map(([k, v, c]) => (
              <div key={k} className="rounded-xl bg-black/30 px-3 py-2">
                <div className="text-[11px] text-white/45">{k}</div>
                <div className={cn('font-num text-xl font-bold', c)}>{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            {ok && !!r.foundGear.length && <p className="mb-2 text-sm font-bold text-emerald-200">{r.foundGear.length} 件枪械或护甲已入库 · 其余物资折现 ¥{fmtMoney(r.cashValue)}</p>}
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-white/50">
              <span className="font-bold tracking-widest">{ok ? '带出物资' : '丢失物资'} · {r.items.length} 件</span>
              {counts.map((n, i) => n > 0 && i >= 2 ? <span key={i} className="rounded px-1.5 py-0.5 font-bold" style={{ color: RARITY_COLORS[i], background: `rgba(${RARITY_RGB[i]},0.15)` }}>{RARITY_NAMES[i]}×{n}</span> : null)}
            </div>
            {r.items.length ? (
              <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
                {r.items.map((it, i) => (
                  <div key={i} className="anim-pop relative flex flex-col items-center rounded-lg border px-1 py-1.5" style={{ borderColor: RARITY_COLORS[it.rarity], background: `linear-gradient(180deg, rgba(${RARITY_RGB[it.rarity]},0.06), rgba(${RARITY_RGB[it.rarity]},0.35))`, animationDelay: `${300 + i * 45}ms` }}>
                    {it.icon.startsWith('gear:') ? <GearIcon id={it.icon.slice(5)} className="size-12" /> : <span className="text-2xl leading-none">{it.icon === 'GUN' ? '🔫' : it.icon}</span>}
                    <span className="mt-1 w-full truncate text-center text-[10px] text-white/85">{it.name}</span>
                    <span className="font-num text-[10px] font-bold text-[#ffcf4a]">{it.value >= 10000 ? `${(it.value / 10000).toFixed(1)}万` : fmtMoney(it.value)}</span>
                    {!ok && <div className="absolute inset-0 grid place-items-center rounded-lg bg-black/60 text-[10px] font-black text-red-300">已丢失</div>}
                  </div>
                ))}
              </div>
            ) : <div className="rounded-xl bg-black/25 py-4 text-center text-sm text-white/40">背包空空如也</div>}
          </div>

          <div className="sticky bottom-2 z-10 mt-5 flex flex-col gap-2 rounded-xl sm:flex-row short:flex-row">
            <button onClick={onRetry} className="deploy-btn flex flex-1 items-center justify-between rounded-xl px-5 py-3.5 text-lg font-black text-[#1d1500] active:scale-[0.98]">
              再次部署{!canRetryKit ? '（跑刀）' : ''} <span className="flex gap-1"><Key>Enter</Key><Key>R</Key></span>
            </button>
            <button onClick={onMenu} className="flex items-center justify-between gap-6 rounded-xl border border-white/15 bg-[#1b1e23]/95 px-5 py-3.5 font-bold text-white transition hover:bg-[#262a31] active:scale-[0.98]">返回大厅 <Key>Esc</Key></button>
          </div>
        </div>

        <div className="anim-rise overflow-hidden rounded-2xl border border-white/10 bg-black/55 backdrop-blur" style={{ animationDelay: '250ms' }}>
          <div className="border-b border-white/10 px-4 py-2.5 text-sm font-bold text-[#ffd23f]">🏆 本地排行榜</div>
          <ScoreTable scores={scores} highlight={rank} compact />
        </div>
      </div>
    </div>
  );
}
