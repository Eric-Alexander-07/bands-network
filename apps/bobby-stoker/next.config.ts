import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Nur fuer den Entwicklungsserver relevant.
   *
   * Wird die Seite ueber einen Tunnel (Cloudflare Quick Tunnel) von aussen
   * aufgerufen, kommen die Anfragen von einer fremden Herkunft. Next blockt
   * die internen Dev-Endpunkte (HMR, Fehleroverlay) dann als Cross-Origin.
   * Diese Liste erlaubt genau die Tunnel-Domains — im Produktionsbuild hat
   * die Einstellung keinerlei Wirkung.
   */
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.app", "*.loca.lt"],
};

export default nextConfig;
