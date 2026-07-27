import Link from "next/link";
import { band } from "@/config/band";

/** Maximale Anzahl Namen in der Leiste — mehr sprengt das Layout auf Mobil. */
const MAX_CLIENTS = 6;

type Props = {
  /**
   * Referenzen aus der Datenbank (dieselbe Quelle wie /referenzen).
   * Wird nichts übergeben oder ist die Liste leer, greift die statische
   * Liste aus band.ts als Fallback — so bleibt die Leiste auch ohne
   * Supabase-Konfiguration (z. B. lokal) gefüllt.
   */
  dbRefs?: { name: string }[];
};

export default function ClientsStrip({ dbRefs = [] }: Props) {
  // Doppelte Namen entfernen: /referenzen kann denselben Kunden mehrfach
  // mit unterschiedlichem Event-Typ führen, in der Leiste soll er einmal stehen.
  const fromDb = Array.from(
    new Set(dbRefs.map((r) => r.name?.trim()).filter(Boolean) as string[])
  );

  const clients = (fromDb.length > 0 ? fromDb : band.clients).slice(0, MAX_CLIENTS);

  if (clients.length === 0) return null;

  return (
    <div className="clients-strip">
      <div className="container">
        <p className="clients-label">Bekannte Veranstalter</p>
        <div className="clients-list">
          {clients.map((client, i) => (
            <span key={i} className="client-name">
              {client}
            </span>
          ))}
        </div>
        <div className="clients-cta">
          <Link href="/referenzen" className="btn btn-primary">
            Alle Referenzen ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}
