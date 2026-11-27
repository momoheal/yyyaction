import { useEffect, useMemo, useRef, useState } from 'react';
import { ENEMIES } from '../game/data';
import { RAID_MAPS, type RaidMapDef, type RaidMapId } from '../game/map';
import { drawMapThumbnail } from '../game/render';
import Portrait from './Portrait';

function MapThumbnail({ level, markers }: { level: RaidMapDef; markers: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const map = useMemo(() => level.build(), [level]);
  useEffect(() => {
    if (canvas.current) drawMapThumbnail(canvas.current, map, markers);
  }, [map, markers]);
  return <canvas ref={canvas} width={360} height={250} aria-hidden="true" className="pointer-events-none block aspect-[36/25] w-full rounded-md border border-white/10" />;
}

export default function LevelPicker({ selected, extracts, debugMode, onPick }: { selected: RaidMapId; extracts: number; debugMode: boolean; onPick: (id: RaidMapId) => void }) {
  const zones = RAID_MAPS.filter((level) => level.id !== 'vehicleRange');
  const [markers, setMarkers] = useState(true);
  const active = zones.find((level) => level.id === selected) ?? zones[0];
  return (
    <div className="war-table">
      <section className="war-table-chart" aria-label={active.name}>
        <div className="radar-screen">
          <MapThumbnail level={active} markers={markers} />
          <span className="radar-crosshair" aria-hidden="true" />
        </div>
        <label className="radar-toggle"><input type="checkbox" role="switch" checked={markers}
          onChange={(event) => setMarkers(event.currentTarget.checked)} /><span>战术标记</span></label>
        <div className="war-table-intel">
          <div><strong>{active.name}</strong><p>{active.theme}</p></div>
          <div className="war-table-boss">
            {(active.bosses ?? [active.boss]).map((id) => (
              <Portrait key={id} id={id} className="size-8" />
            ))}
            <span>{(active.bosses ?? [active.boss]).map((id) => ENEMIES[id].name).join(' + ')}</span>
          </div>
        </div>
        <p className="lobby-caption">{active.difficulty}{markers && <> · <span className="text-[#a1ffcb]">绿色为候选撤离点</span> · <span className="text-[#ff9b77]">橙色为首领驻地</span></>}</p>
      </section>
      <ul className="war-table-roster">
        {zones.map((level) => {
          const locked = !debugMode && extracts < level.requiredExtracts;
          return <li key={level.id}>
            <button type="button" className="lobby-card" disabled={locked}
              aria-pressed={selected === level.id} onClick={() => onPick(level.id)}>
              <i aria-hidden="true" /><strong>{level.name}</strong>
              <span>{locked ? `正式撤离 ${level.requiredExtracts} 次解锁` : selected === level.id ? '当前战区' : '可出击'}</span>
            </button>
          </li>;
        })}
      </ul>
    </div>
  );
}
