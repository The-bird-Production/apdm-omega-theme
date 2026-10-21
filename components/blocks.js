// Blocs propres au thème Au Pied du Morclan (refonte 2026).
//
// Ils complètent les blocs « Gutenberg » du cœur d'Omega (cover, columns,
// accordion, gallery, buttons…) pour ce que ceux-ci ne savent pas faire :
//   - apdmHero     : bannière vidéo plein cadre (hiver) / photo (été),
//                    titre, atouts, moteur de dates, badge d'avis
//   - apdmFacts    : bande « fiche station » (chiffres clés)
//   - apdmBand     : conteneur qui peint ses enfants sur un fond pleine
//                    largeur (ciel / soleil / blanc)
//   - apdmSeason   : conteneur dont les enfants ne s'affichent qu'en
//                    hiver OU qu'en été (bouton ❄/☀ du header)
//   - apdmSteps    : étapes de réservation
//   - apdmReviews  : notes Airbnb / Google + cartes d'avis
//
// Tous les réglages sont des props texte, éditables directement dans
// l'éditeur (un petit formulaire s'affiche sous le bloc en mode édition).
// Les listes utilisent une syntaxe simple, une entrée par ligne, champs
// séparés par « | ». Préfixez une ligne par « h: » (hiver) ou « e: »
// (été) pour ne l'afficher que dans cette saison.
//
// Rappel (docs Omega) : une page qui utilise un bloc de thème est rendue
// côté client. Le render de chaque bloc doit donc fonctionner seul dans le
// navigateur, sans contexte fourni par le CMS — c'est le cas ici.

import { createReactBlockSpec } from '@blocknote/react';
import { useEffect } from 'react';

/* ------------------------------------------------------------------ */
/* Saison : même logique que le script du Header (doublée ici au cas où
   le header aurait été injecté sans exécuter son <script>, ex. après une
   navigation côté client). Idempotente. */
export function initSeason() {
  if (typeof window === 'undefined' || window.__apdmSeasonReady) return;
  window.__apdmSeasonReady = true;
  const root = document.documentElement;
  const apply = (s) => {
    if (s === 'ete') root.setAttribute('data-season', 'ete');
    else root.setAttribute('data-season', 'hiver');
    document.querySelectorAll('[data-apdm-season]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-apdm-season') === s));
    });
    document.querySelectorAll('.apdm-hero video').forEach((v) => {
      try {
        if (s === 'ete') v.pause();
        else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
      } catch (e) { /* lecture refusée : sans gravité */ }
    });
    try { localStorage.setItem('apdm-season', s); } catch (e) { /* stockage indisponible */ }
  };
  window.apdmSetSeason = apply;
  if (!root.getAttribute('data-season')) {
    let saved = null;
    try { saved = localStorage.getItem('apdm-season'); } catch (e) { /* idem */ }
    const m = new Date().getMonth();
    apply(saved || (m >= 4 && m <= 8 ? 'ete' : 'hiver'));
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('[data-apdm-season]');
    if (b) apply(b.getAttribute('data-apdm-season'));
  });
}

/* ------------------------------------------------------------------ */
/* Utilitaires */

// "h:Texte" -> { season: 'hiver', text }, "e:Texte" -> été, sinon toutes saisons
function parseLines(str) {
  return String(str || '')
    .split(/\n|;;/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      let season = null;
      if (/^h:/i.test(l)) { season = 'hiver'; l = l.slice(2).trim(); }
      else if (/^e:/i.test(l)) { season = 'ete'; l = l.slice(2).trim(); }
      return { season, parts: l.split('|').map((p) => p.trim()) };
    });
}
const seasonClass = (s) => (s === 'hiver' ? ' apdm-w' : s === 'ete' ? ' apdm-s' : '');

// *mot* -> <em>mot</em>
function withAccent(text) {
  const parts = String(text || '').split(/\*([^*]+)\*/);
  return parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p));
}

// Formulaire d'édition générique : un champ par prop, visible seulement
// dans l'éditeur.
function PropFields({ block, editor, fields }) {
  if (!editor.isEditable) return null;
  return (
    <div className="apdm-fields" contentEditable={false}>
      {fields.map(([key, label, type]) => (
        <label key={key} className="apdm-field">
          <span>{label}</span>
          {type === 'textarea' ? (
            <textarea
              rows={4}
              defaultValue={block.props[key]}
              onBlur={(e) => editor.updateBlock(block, { props: { [key]: e.target.value } })}
            />
          ) : Array.isArray(type) ? (
            <select
              defaultValue={block.props[key]}
              onChange={(e) => editor.updateBlock(block, { props: { [key]: e.target.value } })}
            >
              {type.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input
              type="text"
              defaultValue={block.props[key]}
              onBlur={(e) => editor.updateBlock(block, { props: { [key]: e.target.value } })}
            />
          )}
        </label>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* apdmHero */

const BOOKING_URL = 'https://au-pied-du-morclan-chatel.amenitiz.io/fr/booking/room';

function Hero({ block, editor }) {
  const p = block.props;
  const editable = editor.isEditable;
  const isFirst = !editable && editor.document[0]?.id === block.id;
  useEffect(() => { initSeason(); }, []);

  const facts = parseLines(p.facts);
  const onSubmit = (e) => {
    e.preventDefault();
    window.open(p.bookingUrl || BOOKING_URL, '_blank', 'noopener');
  };

  return (
    <div className={`apdm-hero${isFirst ? ' apdm-hero--first' : ''}`}>
      <div className="apdm-hero__bg" aria-hidden="true">
        {p.posterUrl && <img className="apdm-w" src={p.posterUrl} alt="" />}
        {p.videoUrl && (
          <video className="apdm-w" autoPlay muted loop playsInline poster={p.posterUrl || undefined}>
            <source src={p.videoUrl} type={p.videoUrl.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
          </video>
        )}
        {p.summerImageUrl && <img className="apdm-s" src={p.summerImageUrl} alt="" />}
      </div>
      <div className="apdm-hero__inner">
        <div className="apdm-hero__text">
          {p.eyebrow && <p className="apdm-eyebrow apdm-hero__eyebrow">{p.eyebrow}</p>}
          <h1 className="apdm-hero__title apdm-w">{withAccent(p.titleWinter)}</h1>
          <h1 className="apdm-hero__title apdm-s">{withAccent(p.titleSummer || p.titleWinter)}</h1>
          <p className="apdm-hero__sub apdm-w">{p.subWinter}</p>
          <p className="apdm-hero__sub apdm-s">{p.subSummer || p.subWinter}</p>
          {facts.length > 0 && (
            <ul className="apdm-chips">
              {facts.map((f, i) => <li key={i} className={seasonClass(f.season).trim() || undefined}>{f.parts[0]}</li>)}
            </ul>
          )}
          <form className="apdm-booker" onSubmit={onSubmit} aria-label="Vérifier les disponibilités">
            <label>Arrivée<input type="date" name="arrivee" /></label>
            <label>Départ<input type="date" name="depart" /></label>
            <label>Voyageurs
              <select name="voyageurs" defaultValue="4">
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <button type="submit" className="btn btn-primary">Voir les disponibilités</button>
            {p.bookingNote && <p className="apdm-booker__note">{p.bookingNote}</p>}
          </form>
        </div>
        {p.ratingValue && (
          <a className="apdm-rating" href="#avis">
            <span className="apdm-stars" aria-hidden="true">★★★★★</span>
            <b>{p.ratingValue}</b>
            <span>{p.ratingLabel}</span>
          </a>
        )}
      </div>
      <PropFields
        block={block}
        editor={editor}
        fields={[
          ['eyebrow', 'Surtitre'],
          ['titleWinter', 'Titre hiver (*mot* = couleur)'],
          ['titleSummer', 'Titre été'],
          ['subWinter', 'Sous-titre hiver', 'textarea'],
          ['subSummer', 'Sous-titre été', 'textarea'],
          ['facts', 'Atouts (un par ligne, h:/e: pour une saison)', 'textarea'],
          ['videoUrl', 'Vidéo hiver (URL .webm/.mp4)'],
          ['posterUrl', 'Image hiver / poster vidéo'],
          ['summerImageUrl', 'Image été'],
          ['bookingUrl', 'Lien de réservation'],
          ['bookingNote', 'Note sous le formulaire'],
          ['ratingValue', 'Note (ex. 4,96 / 5)'],
          ['ratingLabel', 'Légende de la note'],
        ]}
      />
    </div>
  );
}

const apdmHero = createReactBlockSpec(
  {
    type: 'apdmHero',
    propSchema: {
      eyebrow: { default: '▲ 1 200 m · Portes du Soleil · Résidence Les Rhododendrons' },
      titleWinter: { default: 'Ski aux pieds, *au cœur* de Châtel' },
      titleSummer: { default: "L'été en terrasse, *au cœur* de Châtel" },
      subWinter: { default: '' },
      subSummer: { default: '' },
      facts: { default: '' },
      videoUrl: { default: '/themes/apdm/video/fond.webm' },
      posterUrl: { default: '/themes/apdm/img/2026/poster.jpg' },
      summerImageUrl: { default: '/themes/apdm/img/2026/ete.jpg' },
      bookingUrl: { default: BOOKING_URL },
      bookingNote: { default: '' },
      ratingValue: { default: '' },
      ratingLabel: { default: '' },
    },
    content: 'none',
  },
  { render: (props) => <Hero {...props} /> }
);

/* ------------------------------------------------------------------ */
/* apdmFacts : "valeur|libellé" par ligne */

const apdmFacts = createReactBlockSpec(
  { type: 'apdmFacts', propSchema: { items: { default: '' } }, content: 'none' },
  {
    render: ({ block, editor }) => {
      const items = parseLines(block.props.items);
      return (
        <div className="apdm-facts">
          <div className="apdm-facts__row">
            {items.map((f, i) => (
              <div key={i} className={`apdm-facts__item${seasonClass(f.season)}`}>
                <b>{f.parts[0]}</b>
                <span>{f.parts[1]}</span>
              </div>
            ))}
          </div>
          <PropFields block={block} editor={editor} fields={[['items', 'Chiffres (valeur|libellé, un par ligne, h:/e:)', 'textarea']]} />
        </div>
      );
    },
  }
);

/* ------------------------------------------------------------------ */
/* apdmBand : conteneur à fond pleine largeur. Ses enfants (n'importe
   quels blocs) sont rendus par BlockNote comme un groupe frère : c'est le
   CSS du thème (sélecteurs :has) qui peint le fond, voir style.css. */

const apdmBand = createReactBlockSpec(
  {
    type: 'apdmBand',
    propSchema: { tone: { default: 'sky' }, anchor: { default: '' } },
    content: 'none',
  },
  {
    render: ({ block, editor }) => (
      <div className="apdm-band" data-tone={block.props.tone} id={block.props.anchor || undefined}>
        {editor.isEditable && <span className="apdm-band__label">Bande de fond « {block.props.tone} » : placez les blocs en enfants (Tab)</span>}
        <PropFields block={block} editor={editor} fields={[['tone', 'Fond', ['sky', 'sun', 'paper']], ['anchor', 'Ancre (ex. avis)']]} />
      </div>
    ),
  }
);

/* ------------------------------------------------------------------ */
/* apdmSeason : n'affiche ses enfants qu'en hiver ou qu'en été */

function SeasonBlock({ block, editor }) {
  useEffect(() => { initSeason(); }, []);
  return (
    <div className="apdm-season" data-only={block.props.only}>
      {editor.isEditable && <span className="apdm-band__label">Visible seulement en {block.props.only === 'ete' ? 'été' : 'hiver'} : blocs en enfants (Tab)</span>}
      <PropFields block={block} editor={editor} fields={[['only', 'Saison', ['hiver', 'ete']]]} />
    </div>
  );
}

const apdmSeason = createReactBlockSpec(
  { type: 'apdmSeason', propSchema: { only: { default: 'hiver' } }, content: 'none' },
  { render: (props) => <SeasonBlock {...props} /> }
);

/* ------------------------------------------------------------------ */
/* apdmSteps : "étiquette|titre|texte" par ligne */

const apdmSteps = createReactBlockSpec(
  { type: 'apdmSteps', propSchema: { steps: { default: '' } }, content: 'none' },
  {
    render: ({ block, editor }) => (
      <div>
        <ol className="apdm-steps">
          {parseLines(block.props.steps).map((s, i) => (
            <li key={i} className={seasonClass(s.season).trim() || undefined}>
              <span className="apdm-steps__label">{s.parts[0]}</span>
              <b>{s.parts[1]}</b>
              <span>{s.parts[2]}</span>
            </li>
          ))}
        </ol>
        <PropFields block={block} editor={editor} fields={[['steps', 'Étapes (étiquette|titre|texte, une par ligne)', 'textarea']]} />
      </div>
    ),
  }
);

/* ------------------------------------------------------------------ */
/* apdmReviews
   scores  : "Source|note|nombre d'avis|URL|badge|détails"  (détails : "Précision 5,0, Propreté 4,9…")
   reviews : "Source|date|nom|texte" ; préfixez la ligne par « * » pour la mettre en avant */

const apdmReviews = createReactBlockSpec(
  { type: 'apdmReviews', propSchema: { scores: { default: '' }, reviews: { default: '' } }, content: 'none' },
  {
    render: ({ block, editor }) => {
      const scores = parseLines(block.props.scores);
      const reviews = parseLines(block.props.reviews);
      return (
        <div>
          <div className="apdm-reviews">
            <div className="apdm-reviews__scores">
              {scores.map((s, i) => {
                const [source, note, count, url, badge, details] = s.parts;
                return (
                  <div key={i} className="apdm-score">
                    {badge && <span className="apdm-score__badge">{badge}</span>}
                    <span className="apdm-src">{source}</span>
                    <b className="apdm-score__note">{note}</b>
                    <span className="apdm-stars" aria-hidden="true">★★★★★</span>
                    <p>{count}</p>
                    {details && (
                      <dl className="apdm-score__details">
                        {details.split(',').map((d, j) => {
                          const m = d.trim().match(/^(.*)\s([\d,.]+)$/);
                          return m ? [<dt key={`t${j}`}>{m[1]}</dt>, <dd key={`d${j}`}>{m[2]}</dd>] : null;
                        })}
                      </dl>
                    )}
                    {url && <a className="btn btn-outline-primary" href={url} target="_blank" rel="noopener noreferrer">Lire sur {source}</a>}
                  </div>
                );
              })}
            </div>
            <div className="apdm-reviews__list">
              {reviews.map((r, i) => {
                let [source, date, name, text] = r.parts;
                const featured = source && source.startsWith('*');
                if (featured) source = source.slice(1).trim();
                return (
                  <figure key={i} className={`apdm-review${featured ? ' apdm-review--featured' : ''}`}>
                    <span className="apdm-src">{source}{date ? ` · ${date}` : ''}</span>
                    <blockquote>« {text} »</blockquote>
                    <figcaption><b>{name}</b><span className="apdm-stars" aria-hidden="true">★★★★★</span></figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
          <PropFields
            block={block}
            editor={editor}
            fields={[
              ['scores', 'Notes (Source|note|nb avis|URL|badge|détails)', 'textarea'],
              ['reviews', 'Avis (Source|date|nom|texte, * devant = mis en avant)', 'textarea'],
            ]}
          />
        </div>
      );
    },
  }
);

export default {
  apdmHero: apdmHero(),
  apdmFacts: apdmFacts(),
  apdmBand: apdmBand(),
  apdmSeason: apdmSeason(),
  apdmSteps: apdmSteps(),
  apdmReviews: apdmReviews(),
};
