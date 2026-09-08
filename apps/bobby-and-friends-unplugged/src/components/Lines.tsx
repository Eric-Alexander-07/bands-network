import { Fragment } from "react";

/**
 * Gibt einen Text aus, bei dem jeder Zeilenumbruch (\n) zu einem <br /> wird.
 *
 * Damit lassen sich mehrzeilige Ueberschriften im Admin pflegen, ohne dass
 * dort HTML eingegeben werden muss.
 */
export default function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}
