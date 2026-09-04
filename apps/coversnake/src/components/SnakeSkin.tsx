import type { CSSProperties } from "react";

/**
 * Dekorative Schlangenhaut als Hintergrund-Layer.
 *
 * Das Gegenstueck zu `ConcreteWall` bei The Adams Family, `DotGrid` bei
 * Groove Control und `ConcentricRings` bei Spirit of Soul: jede Band im
 * Netzwerk traegt ihr eigenes Muster, damit die Seiten trotz gemeinsamer
 * Bausteine nicht wie Klone wirken.
 *
 * Nachgebildet sind ueberlappende Schuppen (Imbrikation). Vier Ebenen, von
 * oben nach unten (die erste Angabe in `background-image` liegt obenauf):
 *   1. Lichtkante jeder Schuppe (der Keratin-Glanz),
 *   2. Schuppennaht als dunkle Linie,
 *   3. feine Koernung,
 *   4. grosse wolkige Marmorierung (Haut ist nie gleichmaessig).
 *
 * Bewusst KEINE Client-Komponente und kein Canvas: alles entsteht aus SVG-
 * Data-URIs und CSS. Kein JavaScript im Bundle, kein ResizeObserver.
 *
 * Drei Details, die beim Bauen jeweils dazu gefuehrt haben, dass das Muster
 * unbrauchbar wurde — nicht ohne Not aendern:
 *
 * - Die Kachel ist genau `2*SCALE_W` breit und `2*ROW_H` hoch. Nur so faellt
 *   der Zeilenversatz (jede zweite Reihe um eine halbe Schuppe verschoben)
 *   am Kachelrand wieder zusammen. Bei einer Kachel von `1*ROW_H` Hoehe
 *   entsteht eine sichtbare Naht in jeder zweiten Zeile.
 * - Die Boegen werden ueber die Kachelkante hinaus gezeichnet (`-SCALE_W` bis
 *   `w + SCALE_W`). Ohne diesen Ueberstand enden die Boegen an der Kante
 *   abrupt statt in der Nachbarkachel weiterzulaufen.
 * - Die Lichtkante liegt 1.3 px UNTER der Naht, nicht darueber. Eine Schuppe
 *   wird von oben beleuchtet: die Naht ist der Schatten, direkt darunter
 *   sitzt der Glanz der naechsten Schuppe. Vertauscht wirkt die Flaeche
 *   eingedellt statt geschuppt.
 */

interface Props {
  /**
   * `skin` — gleichmaessig ueber die ganze Flaeche.
   * `edge` — blendet aus einer Ecke ein und verschwindet zur Mitte, damit
   *          Text auf ruhigem Grund steht.
   */
  variant?: "skin" | "edge";
  /** Ecke, aus der bei `edge` eingeblendet wird. */
  from?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "right" | "left";
  /**
   * Deckkraft der gesamten Ebene (0–1). Bewusst niedrig: liegt Text darueber,
   * konkurriert eine kraeftige Textur mit der Schrift.
   */
  intensity?: number;
  className?: string;
}

/** Schuppenmass. Bestimmt Raster und Bogentiefe. */
const SCALE_W = 38;
const ROW_H = 22;
/**
 * Y-Wert des Kontrollpunkts der quadratischen Bezierkurve. Die tatsaechliche
 * Bogentiefe ist die HAELFTE davon (bei t=0.5 gilt y = 0.5 * ctrl), hier also
 * 23 px bei 22 px Zeilenhoehe. Der Bogen reicht damit knapp in die naechste
 * Reihe — genau das erzeugt die Ueberlappung echter Schuppen. Ein Wert unter
 * `2 * ROW_H` laesst die Reihen auseinanderfallen, ein deutlich groesserer
 * macht daraus spitze Zacken.
 */
const ARC_CTRL = 46;

/** Eine Reihe Schuppenboegen auf Hoehe `y`, um `offset` seitlich versetzt. */
function row(y: number, offset: number, width: number): string {
  let d = "";
  for (let x = -SCALE_W + offset; x <= width + SCALE_W; x += SCALE_W) {
    d += `M${x},${y} q${SCALE_W / 2},${ARC_CTRL} ${SCALE_W},0 `;
  }
  return d;
}

/** Die Schuppenkachel als Data-URI. `dy` verschiebt die Linie senkrecht. */
function scales(dy: number, stroke: string, strokeWidth: number): string {
  const w = SCALE_W * 2;
  const h = ROW_H * 2;
  const d =
    row(dy, 0, w) + row(ROW_H + dy, SCALE_W / 2, w) + row(2 * ROW_H + dy, 0, w);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<path d='${d}' fill='none' stroke='${stroke}' stroke-width='${strokeWidth}'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Weisse Flaeche, deren Deckkraft aus fraktalem Rauschen kommt.
 * `feColorMatrix` setzt RGB auf 1 und uebernimmt den Rotkanal als Alpha —
 * ein Blendmodus wie `soft-light` waere hier falsch: gegen den fast schwarzen
 * Grund (#08080A) ergaebe er praktisch keine Aufhellung.
 * `stitchTiles="stitch"` laesst das Rauschen nahtlos kacheln.
 */
function mottle(baseFrequency: string, octaves: number, seed: number, slope: number): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'>` +
    `<filter id='c' x='0' y='0' width='100%' height='100%'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${octaves}' seed='${seed}' stitchTiles='stitch'/>` +
    `<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0'/>` +
    `<feComponentTransfer><feFuncA type='linear' slope='${slope}'/></feComponentTransfer>` +
    `</filter><rect width='512' height='512' filter='url(#c)'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const GROB = mottle("0.010", 5, 23, 0.22);
const FEIN = mottle("0.050", 3, 7, 0.07);

const LAYERS = [
  // Lichtkante der Schuppe — silbrig, liegt unter der Naht.
  scales(1.3, "rgba(214,216,221,0.14)", 0.9),
  // Schuppennaht — der Schatten zwischen zwei Schuppen.
  scales(0, "rgba(0,0,0,0.60)", 1.1),
  FEIN,
  GROB,
].join(", ");

const TILE = `${SCALE_W * 2}px ${ROW_H * 2}px`;
const SIZES = [TILE, TILE, "240px 240px", "512px 512px"].join(", ");

/**
 * Farbverlauf jeder Maske. Der letzte Stopp ist entscheidend: ab 86 % des
 * Radius ist die Maske vollstaendig transparent. Alle Radien unten sind so
 * gewaehlt, dass dieser Punkt VOR der Ober- und Unterkante des Abschnitts
 * liegt.
 */
const STOPS = "#000 0%, rgba(0,0,0,0.5) 42%, transparent 86%";

/**
 * Die senkrechte Ausdehnung ist der springende Punkt.
 *
 * Ober- und Unterkante eines Abschnitts sind die Nahtstellen zu den
 * Nachbarabschnitten. Beruehrt die Textur sie mit Deckkraft, endet sie dort
 * abrupt und zeichnet die Naht nach, statt sie zu kaschieren. Jede Maske ist
 * deshalb senkrecht so begrenzt, dass sie beide Kanten mit Null erreicht.
 * Waagerecht darf sie auslaufen: links und rechts liegt der Fensterrand,
 * keine Naht. Einzige Ausnahme ist `left` — im Hero grenzt die Textspalte
 * rechts an das Foto, dort muss die Textur ebenfalls auf Null.
 */
const MASKS: Record<NonNullable<Props["from"]>, string> = {
  "top-right": `radial-gradient(52% 44% at 88% 38%, ${STOPS})`,
  "top-left": `radial-gradient(52% 44% at 12% 38%, ${STOPS})`,
  "bottom-right": `radial-gradient(52% 44% at 88% 62%, ${STOPS})`,
  "bottom-left": `radial-gradient(52% 44% at 12% 62%, ${STOPS})`,
  "right": `radial-gradient(46% 56% at 85% 50%, ${STOPS})`,
  "left": `radial-gradient(218% 56% at 0% 50%, ${STOPS})`,
};

export default function SnakeSkin({
  variant = "edge",
  from = "top-right",
  intensity = 0.7,
  className = "",
}: Props) {
  const mask = variant === "edge" ? MASKS[from] : undefined;

  const style: CSSProperties = {
    opacity: intensity,
    backgroundImage: LAYERS,
    backgroundSize: SIZES,
    ...(mask ? { WebkitMaskImage: mask, maskImage: mask } : {}),
  };

  return <div className={`snake-skin ${className}`} style={style} aria-hidden="true" />;
}
