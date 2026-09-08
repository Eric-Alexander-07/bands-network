/**
 * Dekorative Hintergrund-Ebene — der eigenstaendige Hintergrund-Effekt
 * fuer diese Band (jede VMP-Bandseite hat ihren eigenen: Spirit of Soul
 * und We Rock haben konzentrische Ringe, Groove Control ein Punktraster,
 * CoverSnake eine Schlangenhaut-Textur). Bei Bobby Stoker: Buehnennebel
 * (weiche, driftende Blur-Flaechen) mit einem gedaempften Equalizer davor.
 *
 * Der Equalizer bleibt bewusst zurueckhaltend, damit er neben dem Nebel
 * nicht "zu wild" wirkt: wenige Balken, geringe Amplitude
 * (scaleY 0.3–0.85 statt 0–1), gerundete Kanten, ein leichter Weichzeichner
 * und niedrige Deckkraft. Alle Werte sind deterministisch aus dem Index
 * berechnet (kein Math.random), sonst Hydration-Mismatch zwischen
 * Server- und Client-Rendering.
 *
 * Animiert wird per CSS-Keyframe (siehe globals.css, .stagefx-*) statt
 * per SMIL/JS, mit den Zeiten/Amplituden als CSS-Custom-Properties pro
 * Element — so bleibt eine einzige Keyframe-Definition fuer alle Balken
 * bzw. alle Nebel-Flaechen ausreichend.
 */
interface Props {
  className?: string;
}

const BAR_COUNT = 9;
const BAR_WIDTH = 12;
const BAR_GAP = 18;
const BAR_BASELINE_Y = 400; // Fusslinie der Balken, nah am Nebelkern statt am Rand der Maske
const BAR_HEIGHT = 90;

export default function StageRays({ className = "" }: Props) {
  const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const amp = 0.5 + (((i * 5) % 4) / 4) * 0.35; // 0.5–0.85: gedaempfte Range statt voller Ausschlag
    const duration = 2.6 + ((i * 3) % 5) * 0.35; // 2.6–4.2s, leicht gestaffelt statt synchron
    const delay = -(((i * 41) % 37) / 10); // negativer Delay: Balken starten "mitten drin", kein gemeinsames Einsetzen
    const dim = i % 2 === 0 ? 0.32 : 0.22; // wechselnde Deckkraft bricht die Reihen-Optik
    return { amp, duration, delay, dim };
  });

  const barsSpan = BAR_COUNT * BAR_WIDTH + (BAR_COUNT - 1) * BAR_GAP;
  const barsStartX = 300 - barsSpan / 2;

  return (
    <svg
      className={`stage-rays-svg ${className}`}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="stagefx-haze-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="42" />
        </filter>
        <filter id="stagefx-bar-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
      </defs>

      <g className="stagefx-haze" filter="url(#stagefx-haze-blur)">
        <circle
          className="stagefx-haze-blob"
          cx="190" cy="230" r="170"
          fill="#7A54AD" fillOpacity="0.55"
          style={{ ["--dx" as string]: "18px", ["--dy" as string]: "14px", animationDuration: "22s" }}
        />
        <circle
          className="stagefx-haze-blob"
          cx="420" cy="380" r="140"
          fill="#9B6FD6" fillOpacity="0.38"
          style={{ ["--dx" as string]: "-16px", ["--dy" as string]: "-18px", animationDuration: "27s", animationDelay: "-6s" }}
        />
        <circle
          className="stagefx-haze-blob"
          cx="320" cy="150" r="110"
          fill="#6A4A92" fillOpacity="0.3"
          style={{ ["--dx" as string]: "10px", ["--dy" as string]: "16px", animationDuration: "31s", animationDelay: "-14s" }}
        />
      </g>

      <g className="stagefx-bars" filter="url(#stagefx-bar-blur)">
        {bars.map((b, i) => (
          <rect
            key={i}
            className="stagefx-bar"
            x={barsStartX + i * (BAR_WIDTH + BAR_GAP)}
            y={BAR_BASELINE_Y - BAR_HEIGHT}
            width={BAR_WIDTH}
            height={BAR_HEIGHT}
            rx="4"
            fill="#B98CE8"
            fillOpacity={b.dim}
            style={{
              ["--amp" as string]: b.amp,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
