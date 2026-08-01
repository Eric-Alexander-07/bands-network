import { Fragment } from "react";

/**
 * Gibt einen Text aus und setzt Abschnitte zwischen **doppelten Sternchen**
 * fett. Damit lassen sich Hervorhebungen im Admin pflegen, ohne dass dort
 * HTML eingegeben werden muss.
 */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        // Ungerade Indizes stammen aus der Klammer-Gruppe -> hervorgehoben.
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
