/**
 * Dekorative Lichtstrahlen als Hintergrund-Layer — der eigenstaendige
 * Hintergrund-Effekt fuer diese Band (jede VMP-Bandseite hat ihren eigenen:
 * Spirit of Soul und We Rock haben konzentrische Ringe, Groove Control ein
 * Punktraster, CoverSnake eine Schlangenhaut-Textur). Bei Bobby Stoker sind
 * es Scheinwerferstrahlen, die von einem Punkt ausgehen — direkt von den
 * echten Bühnenfotos abgeleitet, auf denen violette Lichtkegel das
 * "BOBBY STOKER"-Bühnenbackdrop durchqueren.
 */
interface Props {
  className?: string;
}

const RAY_COUNT = 14;

export default function StageRays({ className = "" }: Props) {
  const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
    const angle = (i / RAY_COUNT) * 360;
    // Unregelmaessige Deckkraft und Breite je Strahl — ein durchgehend
    // gleichmaessiger Kranz wirkt wie ein Raster, kein Lichtkegel.
    const opacity = 0.12 + ((i * 37) % 10) / 10 * 0.4;
    const width = 2.4 + ((i * 19) % 5);
    return { angle, opacity, width };
  });

  return (
    <svg
      className={`stage-rays-svg ${className}`}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(300,300)">
        {rays.map((r, i) => (
          <line
            key={i}
            x1="0" y1="0"
            x2="0" y2="-300"
            stroke="#9B6FD6"
            strokeWidth={r.width}
            strokeOpacity={r.opacity}
            strokeLinecap="round"
            transform={`rotate(${r.angle})`}
          />
        ))}
        <circle r="30" fill="#9B6FD6" fillOpacity="0.5" />
      </g>
    </svg>
  );
}
