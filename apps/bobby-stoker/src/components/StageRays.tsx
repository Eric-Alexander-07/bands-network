/**
 * Dekorative Hintergrund-Ebene — der eigenstaendige Hintergrund-Effekt
 * fuer diese Band (jede VMP-Bandseite hat ihren eigenen: Spirit of Soul
 * und We Rock haben konzentrische Ringe, Groove Control ein Punktraster,
 * CoverSnake eine Schlangenhaut-Textur). Bei Bobby Stoker: Buehnennebel —
 * weiche, langsam driftende Blur-Flaechen in Violett.
 *
 * Die Bokeh-Lichtpunkte (goldener Winkel, trigonometrisch platziert)
 * wurden wieder entfernt: Math.cos/Math.sin liefern auf Server (Node)
 * und Client (Browser) nicht bitgenau denselben Float — React vergleicht
 * beim Hydrieren den exakten String, ein einziges abweichendes Nachkomma-
 * Bit reicht fuer eine Hydration-Mismatch-Warnung.
 */
interface Props {
  className?: string;
}

export default function StageRays({ className = "" }: Props) {
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
    </svg>
  );
}
