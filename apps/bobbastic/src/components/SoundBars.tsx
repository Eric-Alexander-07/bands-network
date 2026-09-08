interface Props {
  className?: string;
}

/**
 * Dekoratives Hintergrundmotiv fuer BOBbastic — ein eingefrorenes Equalizer-
 * Bild (Musik/Rock-Energie statt der Ringe/Punkte/Schuppen der anderen
 * Band-Sites). Uebernimmt bewusst dieselbe Architektur wie
 * `ConcentricRings` bei We Rock/Spirit of Soul: statisches, zentriertes SVG,
 * per CSS-Maske weich ausgeblendet, ueber die `.bars-*`-Platzierungsklassen
 * in globals.css positioniert.
 *
 * Die Opazitaet der Balken faellt von der Mitte nach außen in denselben neun
 * Stufen ab wie bei den Ringen (0.75 → 0.05) — dieselbe Fade-Logik, nur auf
 * ein anderes Motiv uebertragen.
 */
const FALLOFF = [0.75, 0.66, 0.57, 0.48, 0.38, 0.28, 0.18, 0.1, 0.05];
const HEIGHTS = [55, 105, 75, 145, 90, 185, 125, 235, 170, 230, 130, 190, 95, 150, 70, 110, 60];
const BAR_W = 16;
const PITCH = 30;

export default function SoundBars({ className = "" }: Props) {
  const bars = HEIGHTS.map((h, i) => {
    const dx = (i - 8) * PITCH; // -8..+8 Balken um die Mitte (x = 300)
    const opacity = FALLOFF[Math.abs(i - 8)];
    const color = i % 2 === 0 ? "#ff5a36" : "#ffb238";
    return { x: 300 + dx - BAR_W / 2, h, opacity, color };
  });

  return (
    <svg
      className={`sound-bars-svg ${className}`}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={300 - b.h / 2}
            width={BAR_W}
            height={b.h}
            rx={BAR_W / 2}
            fill={b.color}
            fillOpacity={b.opacity}
          />
        ))}
      </g>
    </svg>
  );
}
