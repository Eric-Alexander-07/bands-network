"use client";

import { band } from "@/config/band";

type RefItem = { client: string; type: string };

function MarqueeRow({
  items,
  reverse = false,
  duration = 40,
}: {
  items: RefItem[];
  reverse?: boolean;
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="mq-row">
      <div
        className={`mq-track${reverse ? " mq-reverse" : ""}`}
        style={{ "--mq-dur": `${duration}s` } as React.CSSProperties}
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
  const refs = band.references;
  const third = Math.ceil(refs.length / 3);
  const row1 = refs.slice(0, third);
  const row2 = refs.slice(third, third * 2);
  const row3 = refs.slice(third * 2);

  return (
    <div className="refs-scene">
      <div className="refs-scene-inner">
        <MarqueeRow items={row1} duration={42} />
        <MarqueeRow items={row2} reverse duration={48} />
        <MarqueeRow items={row3} duration={38} />
      </div>
    </div>
  );
}
