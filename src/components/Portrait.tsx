import type { CharacterId, EnemyType } from '../game/data';
import { cn } from '../utils/cn';

const atlas = new URL('../assets/portraits.webp', import.meta.url).href;
const bossAtlas = new URL('../assets/boss-portraits.webp', import.meta.url).href;
const positions: Partial<Record<CharacterId | EnemyType, string>> = {
  duck: '0% 0%', tank: '50% 0%', scout: '100% 0%',
  goose: '0% 100%', harborBoss: '50% 100%', foundryBoss: '100% 100%',
};
const bossPositions: Partial<Record<EnemyType, string>> = {
  broodQueen: '0% 0%', frostMarshal: '100% 0%', ironGuard: '0% 100%', duckKing: '100% 100%',
};

export default function Portrait({ id, className }: { id: CharacterId | EnemyType; className?: string }) {
  const pos = positions[id];
  const bossPos = bossPositions[id as EnemyType];
  const background = pos ?? bossPos;
  // The original iron warden portrait is steel blue; tint it to match his black-red in-game palette.
  const ironTint = id === 'ironGuard' ? { backgroundColor: '#8a1a1e', backgroundBlendMode: 'multiply' as const } : {};
  return <span
    aria-hidden="true"
    className={cn('block shrink-0 rounded-lg border border-white/15 bg-[#252925] bg-no-repeat', className)}
    style={background
      ? { backgroundImage: `url("${bossPos ? bossAtlas : atlas}")`, backgroundSize: bossPos ? '200% 200%' : '300% 200%', backgroundPosition: background, backgroundOrigin: 'padding-box', backgroundClip: 'padding-box', ...ironTint }
      : { backgroundImage: 'radial-gradient(circle at 50% 35%, #4a4a4a, #171c1a)' }}
  />;
}
