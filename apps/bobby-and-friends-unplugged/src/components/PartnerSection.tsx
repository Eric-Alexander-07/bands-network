import { band } from "@/config/band";
import {
  VMP_URL,
  MEDIA_PROFESSIONALS,
  ARTIST_POOL,
  hostLabel,
  type PartnerLink,
} from "@/lib/partners";
import Rich from "@/components/Rich";
import type { Content } from "@/lib/content";
import type { PartnerGruppeWithEintraege } from "@/lib/data";

/** Eine Gruppe in einheitlicher Form — egal ob aus der Datenbank oder aus dem Code. */
interface Group {
  title: string;
  description?: string;
  items: PartnerLink[];
}

/** One card in a partner grid — a link when a URL exists, plain otherwise. */
function PartnerCard({ item, c }: { item: PartnerLink; c: Content }) {
  const isCurrent = item.name === band.name;

  if (isCurrent) {
    return (
      <div className="partner-card partner-card--current">
        <span className="partner-card-name">{item.name}</span>
        <span className="partner-card-meta">{c.partner_card_current}</span>
      </div>
    );
  }

  if (!item.url) {
    return (
      <div className="partner-card partner-card--plain">
        <span className="partner-card-name">{item.name}</span>
        <span className="partner-card-meta">{c.partner_card_plain}</span>
      </div>
    );
  }

  return (
    <a className="partner-card" href={item.url} target="_blank" rel="noopener noreferrer">
      <span className="partner-card-name">{item.name}</span>
      <span className="partner-card-meta">{hostLabel(item.url)}</span>
      <span className="partner-card-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

function PartnerBlock({ title, groups, c }: { title: string; groups: Group[]; c: Content }) {
  return (
    <div className="partner-block">
      <h3 className="partner-block-title">{title}</h3>
      <div className="partner-groups">
        {groups.map((grp) => (
          <div key={grp.title} className="partner-group" data-animate="fade-up">
            <div className="partner-group-head">
              <h4 className="partner-group-title">{grp.title}</h4>
              {grp.description && <p className="partner-group-desc">{grp.description}</p>}
            </div>
            <div className="partner-grid">
              {grp.items.map((p) => (
                <PartnerCard key={p.name} item={p} c={c} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  c: Content;
  /** Partnergruppen aus der Datenbank; leer = Rueckfall auf `@/lib/partners`. */
  gruppen?: PartnerGruppeWithEintraege[];
}

/**
 * Partner / Künstlerpool block — rendered at the bottom of the Referenzen page
 * (no own hero or CTA; those belong to the surrounding page).
 */
export default function PartnerSection({ c, gruppen = [] }: Props) {
  const fromDb = (kind: "media" | "band"): Group[] =>
    gruppen
      .filter(g => g.kind === kind)
      .map(g => ({
        title: g.name,
        description: g.beschreibung ?? undefined,
        items: g.partner_eintraege.map(e => ({ name: e.name, url: e.url })),
      }));

  const mediaGroups: Group[] = gruppen.length
    ? fromDb("media")
    : MEDIA_PROFESSIONALS.map(g => ({ title: g.title, items: g.people }));

  const poolGroups: Group[] = gruppen.length
    ? fromDb("band")
    : ARTIST_POOL.map(g => ({ title: g.category, description: g.description, items: g.bands }));

  return (
    <section className="section partner-section-block">
      <div className="container">
        <span className="eyebrow" data-animate="fade-up">Vivid Music Productions</span>
        <h2 className="section-title" data-animate="fade-up" data-delay="100">
          {c.partner_title}
        </h2>
        <p className="partner-section-intro" data-animate="fade-up" data-delay="200">
          {c.partner_text}
        </p>

        <div className="partner-vmp-note" data-animate="fade-up">
          <p>
            <Rich text={c.partner_vmp_text} />
          </p>
          <a href={c.partner_vmp_url || VMP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Vivid Music Productions →
          </a>
        </div>

        <PartnerBlock title={c.partner_media_title} groups={mediaGroups} c={c} />
        <PartnerBlock title={c.partner_pool_title} groups={poolGroups} c={c} />
      </div>
    </section>
  );
}
