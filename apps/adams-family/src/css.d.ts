/**
 * Typdeklaration fuer reine CSS-Importe (`import "./globals.css"`).
 *
 * Neuere TypeScript-Versionen im Editor pruefen Side-Effect-Imports und
 * melden sonst ts(2882), weil Next fuer globale `.css`-Dateien keine
 * Typen mitbringt (nur fuer `*.module.css`). Der Build ist davon nicht
 * betroffen.
 */
declare module "*.css";
