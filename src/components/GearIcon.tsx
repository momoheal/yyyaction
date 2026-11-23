import { RARITY_COLORS, WEAPONS } from '../game/data';
import { weaponIconDataUrl } from '../game/gear-icons';
import { cn } from '../utils/cn';

const armorAtlas = new URL('../assets/armor-icons.webp', import.meta.url).href;
const armorPositions: Record<string, string> = { armor2: '0% 50%', armor4: '50% 50%', armor6: '100% 50%' };

export default function GearIcon({ id, className }: { id: string; className?: string }) {
  const weaponId = id.startsWith('w_') ? id.slice(2) : id;
  const weapon = WEAPONS[weaponId];
  const armorPosition = armorPositions[id];
  const rarity = weapon ? weapon.rarity : id === 'armor6' ? 4 : id === 'armor4' ? 3 : 1;
  const frame = { borderColor: `${RARITY_COLORS[rarity]}99`, boxShadow: `inset 0 0 16px ${RARITY_COLORS[rarity]}22, 0 0 12px ${RARITY_COLORS[rarity]}12` };

  return <span
    aria-hidden="true"
    className={cn('relative block shrink-0 overflow-hidden rounded-lg border bg-[#171d1a]', className)}
    style={armorPosition
      ? { ...frame, backgroundImage: `url("${armorAtlas}")`, backgroundSize: '300% 100%', backgroundPosition: armorPosition, backgroundRepeat: 'no-repeat' }
      : frame}
  >
    {weapon && <img className="absolute inset-0 h-full w-full object-contain p-0.5" src={weaponIconDataUrl(weaponId)} alt="" draggable={false} />}
  </span>;
}
