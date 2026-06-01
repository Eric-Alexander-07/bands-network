"use client";

import { band } from "@/config/band";

type RefItem = { client: string; type: string };

function MarqueeCol({
  items,
  reverse = false,
  duration = 28,
}: {
  items: RefItem[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="refs-col">
      <div
        className={`refs-col-track${reverse ? " refs-col-reverse" : ""}`}
        style={{ "--col-dur": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <div key={i} className="ref-chip">
            <span className="ref-chip-type">{item.type}</span>
            <span className="ref-chip-name">{item.client}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReferencesMarquee() {
  const refs = band.references as RefItem[];
  const q = Math.ceil(refs.length / 4);
  const col1 = refs.slice(0,q);
  const col2 = refs.slice(q,        q * 2);
  const col3 = refs.slice(q * 2,    q * 3);
  const col4 = refs.slice(q * 3);

  return (
    <div className="refs-scene">
      <div className="refs-scene-inner">
        <MarqueeCol items={col1} duration={30} />
        <MarqueeCol items={col2} reverse duration={26} />
        <MarqueeCol items={col3} duration={32} />
        <MarqueeCol items={col4} reverse duration={28} />
      </div>
    </div>
  );
}
