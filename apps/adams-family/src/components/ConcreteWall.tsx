import type { CSSProperties } from "react";

/**
 * Dekorative Betonwand als Hintergrund-Layer (ersetzt das fruehere Punktraster).
 *
 * Nachgebildet ist Sichtbeton nach Brettschalung. Fuenf Ebenen, von oben
 * nach unten (die erste Angabe in `background-image` liegt obenauf):
 *   1. Ankerloecher an den Fugenkreuzen,
 *   2. senkrechte Schalungsfugen,
 *   3. waagerechte Schalungsfugen,
 *   4. feine Koernung (Zuschlag),
 *   5. grosse wolkige Marmorierung (der gegossene Charakter).
 *
 * Bewusst KEINE Client-Komponente und kein Canvas: alles entsteht aus
 * CSS-Verlaeufen und zwei SVG-Rauschbildern als Data-URI. Das spart den
 * Canvas-Code, das ResizeObserver-Nachzeichnen und rund 2 kB JavaScript.
 *
 * Zwei Details, die beim Bauen jeweils dazu gefuehrt haben, dass die Textur
 * unsichtbar blieb — nicht ohne Not aendern:
 *
 * - Das Rauschen wird als weisse Flaeche mit Rausch-ALPHA gebaut
 *   (`feColorMatrix` setzt RGB auf 1 und uebernimmt den Rotkanal als Alpha).
 *   Ein Blendmodus wie `soft-light` waere hier falsch: gegen den fast
 *   schwarzen Grund (#0B0B0C) ergibt er praktisch keine Aufhellung.
 * - Ankerloecher liegen auf `circle at 0 0`, also in der Kachelecke. Vier
 *   Viertel benachbarter Kacheln bilden zusammen ein volles Loch auf jedem
 *   Fugenkreuz. Ein Kern, der dunkler als der Grund ist, bleibt auf dunklem
 *   Grund unsichtbar — die Form traegt der helle Saum.
 *
 * `stitchTiles="stitch"` laesst das Rauschen nahtlos kacheln, sonst waeren
 * an den Kanten der 512-px-Flaeche harte Spruenge zu sehen.
 */

interface Props {
  /**
   * `wall` — gleichmaessig ueber die ganze Flaeche.
   * `edge` — blendet aus einer Ecke ein und verschwindet zur Mitte, damit
   *          Text auf ruhigem Grund steht.
   */
  variant?: "wall" | "edge";
  /** Ecke, aus der bei `edge` eingeblendet wird. */
  from?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "right" | "left";
  /**
   * Deckkraft der gesamten Ebene (0–1). Bewusst niedrig: liegt Text darueber,
   * konkurriert eine kraeftige Textur mit der Schrift. Ab etwa 0.9 wirkt es
   * wie eine echte Wand und nicht mehr wie ein Hintergrund.
   */
  intensity?: number;
  className?: string;
}

/** Plattenmass der Schalung. Bestimmt Fugenraster und Lage der Ankerloecher. */
const PANEL_W = 260;
const PANEL_H = 176;

/**
 * Weisse Flaeche, deren Deckkraft aus fraktalem Rauschen kommt.
 * `slope` skaliert die Spitzendeckkraft (0–1).
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

const GROB = mottle("0.011", 5, 11, 0.25);
const FEIN = mottle("0.045", 3, 5, 0.08);

const LAYERS = [
  // Ankerloecher — dunkler Kern, heller Saum.
  "radial-gradient(circle at 0 0, rgba(0,0,0,0.55) 0 2.2px, rgba(255,255,255,0.16) 2.2px 3.4px, transparent 3.8px)",
  // Schalungsfugen als Nut: dunkle Kante mit Lichtkante daneben.
  `repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0 1px, rgba(255,255,255,0.09) 1px 2px, transparent 2px ${PANEL_W}px)`,
  `repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0 1px, rgba(255,255,255,0.09) 1px 2px, transparent 2px ${PANEL_H}px)`,
  FEIN,
  GROB,
].join(", ");

const SIZES = [
  `${PANEL_W}px ${PANEL_H}px`,
  `${PANEL_W}px ${PANEL_H}px`,
  `${PANEL_W}px ${PANEL_H}px`,
  "240px 240px",
  "512px 512px",
].join(", ");

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
 * abrupt und zeichnet die Naht nach, statt sie zu kaschieren — gemessen
 * waren das 13 bis 25 Graustufen Sprung an jeder Abschnittsgrenze. Jede
 * Maske ist deshalb senkrecht so begrenzt, dass sie beide Kanten mit Null
 * erreicht. Waagerecht darf sie auslaufen: links und rechts liegt der
 * Fensterrand, keine Naht. Einzige Ausnahme ist `left` — im Hero grenzt die
 * Textspalte rechts an das Foto, dort muss die Textur ebenfalls auf Null.
 */
const MASKS: Record<NonNullable<Props["from"]>, string> = {
  "top-right":    `radial-gradient(52% 44% at 88% 38%, ${STOPS})`,
  "top-left":     `radial-gradient(52% 44% at 12% 38%, ${STOPS})`,
  "bottom-right": `radial-gradient(52% 44% at 88% 62%, ${STOPS})`,
  "bottom-left":  `radial-gradient(52% 44% at 12% 62%, ${STOPS})`,
  "right":        `radial-gradient(46% 56% at 85% 50%, ${STOPS})`,
  /**
   * Fuer Spalten, die rechts an einer harten Layoutkante enden — etwa die
   * Textspalte des Heros neben dem Foto. Die Wand steht links und ist an der
   * rechten Kante auf null. Ohne das endet die Textur dort abrupt und
   * zeichnet die Kante nach, statt sie zu kaschieren (gemessen: 26 Graustufen
   * Sprung genau auf der Naht).
   */
  "left":         `radial-gradient(96% 56% at 0% 50%, ${STOPS})`,
};

export default function ConcreteWall({
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

  return <div className={`concrete-wall ${className}`} style={style} aria-hidden="true" />;
}
