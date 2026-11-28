import { supplyIcon } from '../game/supply-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { CHARACTERS, KIT_STYLES, THROWABLE_IDS, THROWABLES, WEAPONS, budgetLoadout, findLoadout, RARITY_COLORS, RARITY_NAMES, RARITY_RGB, characterArmor, fmtMoney, fmtTime, getCharacter, type CharacterId, type Loadout } from '../game/data';
import { getRaidMap, type RaidMapId } from '../game/map';
import { availableGear, gearDef, gearMods, gunWithMods, hasWarehouseLoadout, WAREHOUSE_KIT } from '../game/warehouse';
import type { ScoreEntry, SaveData } from '../game/storage';
import type { RaidResult } from '../game/game';
import Armory, { type WarehouseAction } from './Armory';
import LevelPicker from './LevelPicker';
import LobbyDialog from './LobbyDialog';
import GearIcon from './GearIcon';
import GunPreview3D from './GunPreview3D';
import { weaponIconDataUrl } from '../game/gear-icons';
import { getLocale, setLocale, useLocale } from '../i18n';
import privacyPolicy from '../../../docs/release/taptap-privacy/index.html?raw';

const operatorArt: Record<CharacterId, string> = {
  duck: new URL('../assets/operator-duck.webp', import.meta.url).href,
  tank: new URL('../assets/operator-tank.webp', import.meta.url).href,
  scout: new URL('../assets/operator-scout.webp', import.meta.url).href,
};

const OUTCOME: Record<string, { label: string; cls: string }> = {
  extract: { label: '撤离', cls: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30' },
  dead: { label: '阵亡', cls: 'bg-red-500/15 text-red-300 ring-red-400/30' },
  mia: { label: '失踪', cls: 'bg-zinc-400/15 text-zinc-300 ring-zinc-400/30' },
};

const DEBUG_PASSWORD = 'DUCKOPS';

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

function LobbyGlyph({ kind }: { kind: 'bag' | 'settings' | 'sound' | 'muted' }) {
  const paths = {
    bag: 'M9 6V4h6v2 M7 6h10l2 5v9H5v-9z M8 13h8v4H8z',
    settings: 'M3 6h8m4 0h6M3 12h2m4 0h12M3 18h10m4 0h4 M11 3v6M7 9v6M15 15v6',
    sound: 'M3 9h4l5-4v14l-5-4H3z M16 8q4 4 0 8 M19 5q7 7 0 14',
    muted: 'M3 9h4l5-4v14l-5-4H3z M16 9l6 6m0-6-6 6',
  };
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d={paths[kind]} /></svg>;
}

function MuteButton({ muted, onMute }: { muted: boolean; onMute: () => void }) {
  return (
    <button type="button" onClick={onMute} className="lobby-button" aria-label="静音" aria-pressed={muted}>
      <LobbyGlyph kind={muted ? 'muted' : 'sound'} /><span>{muted ? '声音关' : '声音开'}</span>
    </button>
  );
}

function LanguageButton() {
  const locale = useLocale();
  return (
    <button
      type="button"
      onClick={() => setLocale(getLocale() === 'en' ? 'zh' : 'en')}
      className="grid h-10 min-w-10 place-items-center rounded-full border border-white/15 bg-black/40 px-2 text-xs font-black backdrop-blur transition hover:bg-white/10 active:scale-95"
      aria-label={locale === 'en' ? 'Switch language' : '切换语言'}
      title={locale === 'en' ? 'Switch language' : '切换语言'}
    >
      {locale === 'en' ? '简中' : 'EN'}
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
              {s.best ? <span style={{ color: RARITY_COLORS[s.bestR ?? 0] }}>{s.bestIcon?.startsWith('gear:') ? <GearIcon id={s.bestIcon.slice(5)} className="mr-1 inline-block size-4 align-middle" /> : supplyIcon(s.bestIcon) ? <img className="inline-block size-5 align-middle" src={supplyIcon(s.bestIcon)} alt="" /> : null} {s.best}</span> : '—'}
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

export function StartScreen({ save, kit: sel, mapId, onMap, onWarehouse, onUseWarehouse, onCharacter, onKit, onDeploy, onTraining, onDebugMode, muted, onMute }: {
  save: SaveData; kit: Loadout; mapId: RaidMapId; onMap: (id: RaidMapId) => void;
  onWarehouse: (action: WarehouseAction) => void; onUseWarehouse: () => void;
  onCharacter: (id: CharacterId) => void; onKit: (k: string) => void;
  onDeploy: () => void; onTraining: () => void; onDebugMode: (enabled: boolean) => void; muted: boolean; onMute: () => void;
}) {
  const [step, setStep] = useState<'home' | 'character' | 'equipment' | 'map'>('home');
  const [panel, setPanel] = useState<'warehouse' | 'loadout' | 'settings' | 'rank' | 'help' | 'debug' | 'privacy' | null>(null);
  const [debugError, setDebugError] = useState(false);
  const [training, setTraining] = useState(false);
  const titleTaps = useRef({ count: 0, lastAt: 0 });
  const stepBody = useRef<HTMLDivElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const openDebug = useCallback(() => { setDebugError(false); setPanel('debug'); }, []);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('debug') || window.location.hash === '#debug') openDebug();
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat || !event.shiftKey || !(event.ctrlKey || event.metaKey) || event.code !== 'KeyD') return;
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, [contenteditable]')) return;
      event.preventDefault();
      openDebug();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openDebug]);
  useEffect(() => {
    stepBody.current?.scrollTo(0, 0);
    if (step !== 'home') stepHeading.current?.focus();
  }, [step]);
  const onTitleTap = () => {
    const now = performance.now(), taps = titleTaps.current;
    if (now - taps.lastAt > 2000) taps.count = 0;
    taps.lastAt = now;
    if (++taps.count === 5) { taps.count = 0; openDebug(); }
  };
  const closePanel = () => setPanel(null);
  const canStartRaid = save.trainingCompleted || save.debugMode;
  const character = getCharacter(save.characterId);
  const map = getRaidMap(mapId);
  const others = CHARACTERS.filter((candidate) => candidate.id !== character.id);
  const gear = availableGear(save.warehouse);
  const hasCustom = hasWarehouseLoadout(gear);
  const equippedWeapon = sel.id === WAREHOUSE_KIT ? gear.weapon : undefined;
  const weaponId = (equippedWeapon && gearDef(equippedWeapon.id)?.weapon) || sel.primary || 'pistol';
  const weapon = WEAPONS[weaponId];
  const previewWeapon = equippedWeapon ? gunWithMods(weaponId, gearMods(equippedWeapon)) ?? weapon : weapon;
  // 拖动预算时武器会快速切换：3D 预览延迟 180ms 再换模，避免连续重建几何体导致掉帧/黑屏。
  const [previewWeaponId, setPreviewWeaponId] = useState(weaponId);
  useEffect(() => {
    if (previewWeaponId === weaponId) return;
    const timer = window.setTimeout(() => setPreviewWeaponId(weaponId), 180);
    return () => window.clearTimeout(timer);
  }, [weaponId, previewWeaponId]);
  const startPreparation = (isTraining: boolean) => {
    setTraining(isTraining);
    setStep('character');
  };
  const [kitStyle, setKitStyle] = useState(() => KIT_STYLES.find((style) => sel.id.startsWith(`budget-${style.id}-`))?.id ?? 'balanced');
  const [budget, setBudget] = useState(() => Math.max(35000, sel.cost));
  const sliderMax = Math.min(Math.floor(save.stash / 500) * 500, budgetLoadout(kitStyle, Infinity).cost);
  const shownBudget = Math.min(sliderMax, budget);
  const chooseBudget = (style: string, amount: number) => {
    setKitStyle(style);
    setBudget(amount);
    const nextKit = budgetLoadout(style, Math.min(save.stash, amount));
    if (nextKit.id !== sel.id) onKit(nextKit.id);
  };
  const supplies = [
    { key: 'bandages', name: '绷带', count: sel.bandages },
    { key: 'medkits', name: '急救针', count: sel.medkits },
    ...THROWABLE_IDS.map((id) => ({ key: id, name: THROWABLES[id].name, count: sel.throwables[id] ?? 0 })),
  ];
  const stepTitle = { character: '选择角色', equipment: '选择装备', map: '选择战区' } as const;
  const kitCost = sel.cost ? `¥${fmtMoney(sel.cost)}` : sel.id === WAREHOUSE_KIT ? '无装备费' : '免费部署';

  return (
    <main className="lobby" data-stage={step}>
      <div className="lobby-layout">
        <header className="lobby-header">
          {step === 'home'
            ? <h1 onClick={onTitleTap} className="title-font lobby-wordmark">鸭鸭鸭行动 3D</h1>
            : <h2 id="lobby-step" ref={stepHeading} tabIndex={-1}>{stepTitle[step]}</h2>}
          <nav className="lobby-tools" aria-label="大厅功能">
            {step !== 'home' && !training && (
                <ol className="lobby-progress" aria-label="出击准备">
                  {(['character', 'equipment', 'map'] as const).map((stage, i) => (
                    <li key={stage} aria-current={step === stage ? 'step' : undefined}>{i + 1}<span className="sr-only"> {stepTitle[stage]}</span></li>
                  ))}
                </ol>
              )}
            <button type="button" className="lobby-button" aria-haspopup="dialog" onClick={() => setPanel('warehouse')}><LobbyGlyph kind="bag" />背包</button>
            <button type="button" className="lobby-button" aria-haspopup="dialog" onClick={() => setPanel('settings')}><LobbyGlyph kind="settings" />设置</button>
            <MuteButton muted={muted} onMute={onMute} />
          </nav>
        </header>

        {step === 'home' ? (
          <div className="lobby-home scroll-y">
            <div className="lobby-home-actions">
              <button type="button" className="lobby-button lobby-primary" onClick={() => startPreparation(!canStartRaid)}>
                {canStartRaid ? '准备出击' : '新手行动'}
              </button>
              <button type="button" className="lobby-button" onClick={() => startPreparation(canStartRaid)}>
                {canStartRaid ? (save.trainingCompleted ? '重玩新手行动' : '新手行动') : '正式行动'}
              </button>
            </div>
          </div>
        ) : (
          <section className="lobby-preparation" aria-labelledby="lobby-step">
            <div ref={stepBody} className="lobby-step-body scroll-y">
              {step === 'character' && (
                <div className="operator-fan" role="group" aria-label="选择角色">
                  {[others[0], character, others[1]].map((candidate) => (
                    <button key={candidate.id} type="button" aria-pressed={candidate.id === character.id}
                      className="lobby-card lobby-operator" onClick={() => onCharacter(candidate.id)}>
                      <img src={operatorArt[candidate.id]} className="lobby-operator-art" alt="" draggable={false} />
                      <strong>{candidate.name}</strong>
                      <span className="operator-role">{candidate.role}</span>
                      <span className="lobby-caption">移速 {Math.round(100 * candidate.speed / CHARACTERS[0].speed)}%</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 'equipment' && (
                <div className="kit-console">
                  <section className="kit-preview">
                    <div className="kit-inspection" aria-live="polite">
                      <h3>{weapon.name}</h3>
                      <div className="kit-weapon-stage">
                        <img className="kit-weapon-fallback" alt="" src={weaponIconDataUrl(weapon.id)} draggable={false} />
                        <GunPreview3D weaponId={previewWeaponId} className="kit-weapon-3d" />
                      </div>
                      <dl className="kit-stats">
                        <div><dt>单发伤害</dt><dd>{previewWeapon.dmg}</dd></div>
                        <div><dt>射速</dt><dd>{Math.round(previewWeapon.rate * 60)} <small>RPM</small></dd></div>
                        <div><dt>护甲</dt><dd>{characterArmor(character, sel.armor)}</dd></div>
                      </dl>
                    </div>
                    <ul className="kit-supplies" aria-label="携带补给">
                      {supplies.map(({ key, count, name }) => (
                        <li key={key} title={name} data-empty={!count}>
                          <img src={supplyIcon(key)} alt={name} />
                          <b>{count}</b>
                        </li>
                      ))}
                    </ul>
                    <div className="kit-budget">
                      <label htmlFor="raid-budget">出击预算 <output>¥{fmtMoney(shownBudget)}</output></label>
                      <input id="raid-budget" type="range" min={0} max={sliderMax} step={500} disabled={!sliderMax}
                        value={shownBudget} onChange={(event) => chooseBudget(kitStyle, Number(event.currentTarget.value))} />
                      <span>可用余额 ¥{fmtMoney(save.stash)}</span>
                    </div>
                  </section>
                  <section className="kit-options" aria-label="选择配装">
                    <div className="kit-doctrines" role="group" aria-label="配装风格">
                      {[KIT_STYLES[1], KIT_STYLES[0], KIT_STYLES[2]].map((style) => (
                        <button key={style.id} type="button" className="kit-doctrine"
                          aria-pressed={sel.id !== WAREHOUSE_KIT && kitStyle === style.id}
                          onClick={() => chooseBudget(style.id, shownBudget)}>
                          <span className="lobby-pack" data-level={style.pack} aria-hidden="true" />
                          <span className="kit-doctrine-copy"><strong>{style.name}</strong><small>{style.note}</small></span>
                        </button>
                      ))}
                    </div>
                    <div className="kit-custom">
                      <div className="kit-fee" aria-live="polite">
                        <span>实际装备费</span><strong>{kitCost}</strong>
                      </div>
                      <div className="lobby-custom">
                        <button type="button" className="lobby-button" aria-haspopup="dialog" onClick={() => setPanel('loadout')}>自定义配装</button>
                        {hasCustom && (
                          <button type="button" className="lobby-button" aria-pressed={sel.id === WAREHOUSE_KIT} onClick={onUseWarehouse}>
                            {sel.id === WAREHOUSE_KIT ? '已选自定义配装' : '使用自定义配装'}
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {step === 'map' && (
                <LevelPicker selected={mapId} extracts={save.extracts} debugMode={save.debugMode} onPick={onMap} />
              )}
            </div>
            <footer className="lobby-step-actions">
              <button type="button" className="lobby-button" onClick={() => setStep(step === 'map' ? 'equipment' : step === 'equipment' ? 'character' : 'home')}>返回</button>
              <button type="button" className="lobby-button lobby-primary" onClick={
                step === 'map' ? onDeploy
                  : step === 'equipment' ? () => setStep('map')
                    : training ? onTraining : () => setStep('equipment')
              }>
                {step === 'map' ? '开始行动' : step === 'equipment' ? '下一步：选择战区' : training ? '进入新手行动' : '下一步：选择装备'}
              </button>
              {step === 'map' && <p className="lobby-caption">{map.name} · {sel.name} · {kitCost}</p>}
            </footer>
          </section>
        )}
      </div>
      {(panel === 'warehouse' || panel === 'loadout') && (
        <Armory key={panel} mode={panel === 'loadout' ? 'loadout' : 'inventory'} save={save} onAction={onWarehouse} onClose={closePanel} />
      )}
      {panel === 'settings' && (
        <LobbyDialog title="设置" onClose={closePanel}>
          <div className="lobby-settings">
            <div className="lobby-setting"><span>语言</span><LanguageButton /></div>
            <button type="button" className="lobby-button" onClick={() => setPanel('help')}>操作与规则</button>
            <button type="button" className="lobby-button" onClick={() => setPanel('rank')}>本地排行榜</button>
            <button type="button" className="lobby-button" onClick={() => setPanel('privacy')}>隐私政策</button>
          </div>
        </LobbyDialog>
      )}
      {panel === 'privacy' && (
        <LobbyDialog title="隐私政策" onClose={() => setPanel('settings')}>
          <iframe title="隐私政策" srcDoc={privacyPolicy} sandbox="allow-top-navigation-to-custom-protocols" className="block h-[min(68dvh,550px)] w-full border-0 bg-[#fafaf7]" />
        </LobbyDialog>
      )}
      {panel === 'debug' && (
        <LobbyDialog title="调试模式" onClose={() => setPanel(null)}>
          {save.debugMode ? (
            <div className="space-y-4 p-4 sm:p-5">
              <p className="font-black text-emerald-200">调试模式已开启</p>
              <p className="text-sm text-white/70">全部正式战区可以进入。调试状态保存在本机。</p>
              <button type="button" onClick={() => { onDebugMode(false); setPanel(null); }} className="min-h-11 rounded-lg border border-white/20 px-4 font-bold text-white/85 hover:bg-white/10">关闭调试模式</button>
            </div>
          ) : (
            <form className="space-y-3 p-4 sm:p-5" onSubmit={(event) => {
              event.preventDefault();
              const password = new FormData(event.currentTarget).get('password');
              if (typeof password !== 'string' || password.trim().normalize('NFKC').toUpperCase() !== DEBUG_PASSWORD) {
                setDebugError(true);
                return;
              }
              setDebugError(false);
              onDebugMode(true);
            }}>
              <label htmlFor="debug-password" className="block text-sm font-bold text-white/80">输入调试密码</label>
              <input id="debug-password" name="password" type="password" autoComplete="off" maxLength={64} onChange={() => setDebugError(false)} className="min-h-11 w-full rounded-lg border border-white/20 bg-black/40 px-3 text-white outline-none focus:border-[#ffd23f]" />
              {debugError && <p role="alert" className="text-sm font-bold text-red-300">密码不正确，请重试。</p>}
              <button type="submit" className="min-h-11 rounded-lg bg-[#ffd23f] px-4 font-black text-[#1d1500] hover:bg-[#ffe27d]">进入调试模式</button>
            </form>
          )}
        </LobbyDialog>
      )}
      {(panel === 'rank' || panel === 'help') && (
        <LobbyDialog title={panel === 'rank' ? '本地排行榜' : '操作与规则'} onClose={() => setPanel('settings')}>
          <div className="scroll-y max-h-[70vh] overflow-y-auto">{panel === 'rank' ? <ScoreTable scores={save.scores} /> : <Help />}</div>
        </LobbyDialog>
      )}
    </main>
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
  const kitName = r.kit === WAREHOUSE_KIT ? '仓库配装' : findLoadout(r.kit)?.name ?? '跑刀';
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
              ['战斗得分', `+${fmtMoney(ok ? r.killScore : Math.floor(r.killScore * 0.3))}`, 'text-white'],
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
                    {supplyIcon(it.icon) ? <img className="size-12" src={supplyIcon(it.icon)} alt="" /> : it.icon.startsWith('gear:') ? <GearIcon id={it.icon.slice(5)} className="size-12" /> : <span className="text-2xl leading-none">{it.icon === 'GUN' ? '🔫' : it.icon}</span>}
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
          <div className="border-b border-white/10 px-4 py-2.5 text-sm font-bold text-[#ffd23f]">本地排行榜</div>
          <ScoreTable scores={scores} highlight={rank} compact />
        </div>
      </div>
    </div>
  );
}
