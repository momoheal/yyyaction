import type { CharacterId, EnemyType } from '../game/data';
import { cn } from '../utils/cn';

const atlas = new URL('../assets/portraits.webp', import.meta.url).href;
const bossAtlas = new URL('../assets/boss-portraits.webp', import.meta.url).href;
const flameAce = new URL('../assets/flameace.webp', import.meta.url).href;
const radarWarden = new URL('../assets/radarwarden.webp', import.meta.url).href;
const positions: Partial<Record<CharacterId | EnemyType, string>> = {
  duck: '0% 0%', tank: '50% 0%', scout: '100% 0%',
  goose: '0% 100%', harborBoss: '50% 100%', foundryBoss: '100% 100%',
};
const bossPositions: Partial<Record<EnemyType, string>> = {
  broodQueen: '0% 0%', frostMarshal: '100% 0%', ironGuard: '0% 100%', duckKing: '100% 100%',
};
// 空军基地双首领使用与其他首领同画风的独立头像。
const singleImages: Partial<Record<EnemyType, string>> = {
  flameAce, radarWarden,
};

export default function Portrait({ id, className }: { id: CharacterId | EnemyType; className?: string }) {
  const pos = positions[id];
  const bossPos = bossPositions[id as EnemyType];
  const single = singleImages[id as EnemyType];
  const background = pos ?? bossPos;
  return <span
    aria-hidden="true"
    className={cn('block shrink-0 rounded-lg border border-white/15 bg-[#252925] bg-no-repeat bg-cover', className)}
    style={single
      ? { backgroundImage: `url("${single}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : background
        ? { backgroundImage: `url("${bossPos ? bossAtlas : atlas}")`, backgroundSize: bossPos ? '200% 200%' : '300% 200%', backgroundPosition: background, backgroundOrigin: 'padding-box', backgroundClip: 'padding-box' }
        : { backgroundImage: 'radial-gradient(circle at 50% 35%, #4a4a4a, #171c1a)' }}
  />;
}
