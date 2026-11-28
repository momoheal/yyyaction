import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { CHARACTERS, characterArmor, characterMoveSpeed, fmtMoney, type CharacterDef, type CharacterId } from '../game/data';

const operatorArt: Record<CharacterId, string> = {
  duck: new URL('../assets/operator-duck.webp', import.meta.url).href,
  tank: new URL('../assets/operator-tank.webp', import.meta.url).href,
  scout: new URL('../assets/operator-scout.webp', import.meta.url).href,
};

function motionReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function vibrate(ms: number) {
  if (!navigator.userActivation || navigator.userActivation.hasBeenActive) navigator.vibrate?.(ms);
}

export function tacticalClick(event: MouseEvent<HTMLElement>) {
  const target = (event.target as Element).closest<HTMLButtonElement>('button');
  if (!target || target.disabled || target.hasAttribute('data-operator')) return;
  vibrate(8);
  if (motionReduced()) return;
  const bounds = target.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'fx-ripple';
  ripple.style.left = `${event.detail ? event.clientX - bounds.left : bounds.width / 2}px`;
  ripple.style.top = `${event.detail ? event.clientY - bounds.top : bounds.height / 2}px`;
  target.querySelector('.fx-ripple')?.remove();
  target.append(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  target.animate([{ scale: '.97' }, { scale: '1' }], { duration: 180, easing: 'ease-out' });
}

export function OperatorCarousel({ character, onSelect }: { character: CharacterDef; onSelect: (id: CharacterId) => void }) {
  const index = CHARACTERS.findIndex((candidate) => candidate.id === character.id);
  const track = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  function select(next: CharacterDef) {
    if (next.id === character.id) return;
    vibrate(18);
    if (!motionReduced()) {
      track.current?.animate(
        [{ translate: '0' }, { translate: '-4px 0' }, { translate: '3px 0' }, { translate: '0' }],
        { duration: 240, easing: 'ease-out' },
      );
    }
    onSelect(next.id);
  }

  function cycle(direction: number) {
    select(CHARACTERS[(index + direction + CHARACTERS.length) % CHARACTERS.length]);
  }

  function tilt(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'touch' || motionReduced()) return;
    const card = event.currentTarget;
    if (card.dataset.position !== '0') return;
    const bounds = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 10}deg`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 14}deg`);
  }

  function clearTilt(card: HTMLButtonElement) {
    for (const prop of ['--mx', '--my', '--tilt-x', '--tilt-y']) card.style.removeProperty(prop);
  }

  return (
    <div className="operator-layout">
      <div className="carousel-shell stagger-in" role="group" aria-label="选择角色"
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          cycle(event.key === 'ArrowLeft' ? -1 : 1);
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          pointer.current = { x: event.clientX, y: event.clientY };
          swiped.current = false;
        }}
        onPointerCancel={() => { pointer.current = null; }}
        onPointerUp={(event) => {
          const start = pointer.current;
          pointer.current = null;
          if (!start || Math.abs(event.clientX - start.x) < Math.max(34, Math.abs(event.clientY - start.y))) return;
          swiped.current = true;
          cycle(event.clientX < start.x ? 1 : -1);
        }}
        onClickCapture={(event) => {
          if (swiped.current && event.detail) { event.stopPropagation(); swiped.current = false; }
        }}>
        <div ref={track} className="carousel-track">
          {CHARACTERS.map((candidate, i) => {
            const position = (i - index + CHARACTERS.length + 1) % CHARACTERS.length - 1;
            const active = position === 0;
            const speed = Math.round(characterMoveSpeed(candidate) / CHARACTERS[0].speed * 100);
            const armor = characterArmor(candidate, 60);
            return (
              <button type="button" className="tactical-char" key={candidate.id} data-operator
                data-position={position} aria-pressed={active} onClick={() => select(candidate)}
                onPointerMove={tilt} onPointerLeave={(event) => clearTilt(event.currentTarget)}>
                <img src={operatorArt[candidate.id]} alt="" draggable={false} />
                <span className="char-holo-glare" aria-hidden="true" />
                <span className="tactical-char-copy">
                  <span>{candidate.role}</span><strong>{candidate.name}</strong>
                  <span className="char-bars">
                    <span>移速 {speed}%<meter min={0} max={130} value={speed} aria-label="移速" /></span>
                    <span>护甲 {armor}<meter min={0} max={105} value={armor} aria-label="护甲" /></span>
                  </span>
                  <span className="char-card-perks">{candidate.specialty.categories.join(' / ')} · {candidate.trait.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <aside className="glass-panel operator-dossier stagger-in" aria-live="polite">
        <h3>{character.name}</h3>
        <div><span>武器专精</span><strong>{character.specialty.description}</strong></div>
        <div><span>人物特性</span><strong>{character.trait.description}</strong></div>
        <small>护甲按二级甲计算</small>
      </aside>
    </div>
  );
}

export function BudgetCrown({ amount, max, balance, onChange }: {
  amount: number; max: number; balance: number; onChange: (amount: number) => void;
}) {
  const [displayed, setDisplayed] = useState(amount);
  const number = useRef(amount);
  const pointer = useRef<{ x: number; amount: number } | null>(null);
  const detent = useRef<number | null>(null);

  useEffect(() => {
    if (motionReduced()) { number.current = amount; setDisplayed(amount); return; }
    const start = performance.now(), from = number.current;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / 155);
      number.current = Math.round(from + (amount - from) * (1 - (1 - t) ** 3));
      setDisplayed(number.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [amount]);

  function update(value: number) {
    const band = Math.floor(value / 10000);
    if (detent.current !== null && band !== detent.current) vibrate(6);
    detent.current = band;
    onChange(value);
  }

  return (
    <div className="kit-budget">
      <div className="watch-dial-shell" aria-hidden="true"
        onPointerDown={(event) => {
          if (!max || !event.isPrimary || event.button !== 0) return;
          pointer.current = { x: event.clientX, amount };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const start = pointer.current;
          if (!start) return;
          const value = start.amount + (event.clientX - start.x) / 160 * max;
          update(Math.max(0, Math.min(max, Math.round(value / 500) * 500)));
        }}
        onLostPointerCapture={() => { pointer.current = null; }}>
        <span className="watch-dial-ticks" style={{ rotate: `${max ? amount / max * 270 : 0}deg` }} />
      </div>
      <div className="budget-readout">
        <label htmlFor="raid-budget">出击预算 <output htmlFor="raid-budget" aria-live="off">¥{fmtMoney(displayed)}</output></label>
        <input id="raid-budget" type="range" min={0} max={max} step={500} disabled={!max}
          value={amount} onChange={(event) => update(Number(event.currentTarget.value))} />
        <span>可用余额 ¥{fmtMoney(balance)}</span>
      </div>
    </div>
  );
}
