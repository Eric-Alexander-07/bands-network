import Link from "next/link";
import { band } from "@/config/band";

export default function ClientsStrip() {
  return (
    <div className="clients-strip">
      <div className="container">
        <p className="clients-label">Bekannte Veranstalter</p>
        <div className="clients-list">
          {band.clients.map((client, i) => (
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
