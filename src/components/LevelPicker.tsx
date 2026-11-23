import { useEffect, useRef } from 'react';
import { ENEMIES } from '../game/data';
import { RAID_MAPS, type RaidMapDef, type RaidMapId } from '../game/map';
import { drawMapThumbnail } from '../game/render';
import { cn } from '../utils/cn';
import LobbyDialog from './LobbyDialog';
import Portrait from './Portrait';

function MapThumbnail({ level }: { level: RaidMapDef }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) drawMapThumbnail(canvas.current, level.build());
  }, [level]);
  return <canvas ref={canvas} width={360} height={250} aria-hidden="true" className="pointer-events-none block aspect-[36/25] w-full rounded-md border border-white/10" />;
}

export default function LevelPicker({ selected, extracts, debugMode, onPick, onClose }: { selected: RaidMapId; extracts: number; debugMode: boolean; onPick: (id: RaidMapId) => void; onClose: () => void }) {
  return (
    <LobbyDialog title="选择战区" onClose={onClose}>
      <div className="p-3 sm:p-5">
        <p className="mb-3 text-xs text-white/70">地图标记 · <span className="text-[#a1ffcb]">绿色为候选撤离点</span> · <span className="text-[#ff9b77]">橙色为首领驻地</span>{debugMode && <span className="ml-2 font-bold text-[#ffd376]">· 调试模式：全部战区已解锁</span>}</p>
        <ul className="grid gap-2 md:grid-cols-3 short:sm:grid-cols-3">
          {RAID_MAPS.map((level) => {
            const locked = !debugMode && extracts < level.requiredExtracts;
            return <li key={level.id}>
              <button
                type="button"
                disabled={locked}
                aria-pressed={selected === level.id}
                onClick={() => { onPick(level.id); onClose(); }}
                className={cn('grid h-full w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-2.5 rounded-lg border bg-black/20 p-2 text-left md:grid-cols-1 short:sm:grid-cols-1', selected === level.id ? 'border-[#ffcb60]' : 'border-white/15 enabled:hover:border-white/50', locked && 'opacity-65')}
              >
                <MapThumbnail level={level} />
                <span className="block min-w-0 space-y-1.5">
                  <span className="block font-black text-[#fff2c5]">{level.name}</span>
                  <span className="block text-xs leading-snug text-white/65">{level.theme}</span>
                  <span className="flex items-center gap-2">
                    {(level.bosses ?? [level.boss]).map((id) => <Portrait key={id} id={id} className="size-10" />)}
                    <span className="text-xs leading-tight text-white/85">
                      {(level.bosses ?? [level.boss]).map((id) => ENEMIES[id].name).join(' + ')}
                    </span>
                  </span>
                  <span className="block text-[11px] text-[#ff9b77]">{level.difficulty}</span>
                  <span className="block text-xs font-bold text-[#ffd376]">{locked ? `正式撤离 ${level.requiredExtracts} 次解锁` : selected === level.id ? '当前战区' : '选择战区'}</span>
                </span>
              </button>
            </li>;
          })}
        </ul>
      </div>
    </LobbyDialog>
  );
}
