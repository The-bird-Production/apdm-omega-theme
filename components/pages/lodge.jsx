import Link from 'next/link';
import Hero from '../Hero';
import BlockContent from '../../../../components/BlockContent';
import { groupBlocksByHeading, extractImages } from '../lib/blockGroups';

// Photos: add Image blocks anywhere in this page's content and they show
// up in the carousel below, in the order you placed them — no gallery
// plugin needed. Text: the paragraph(s) before your first Heading block
// are the intro; each Heading after that (e.g. "Cuisine", "Salon"...)
// becomes an accordion section for its equipment list — same trick as
// the FAQ page.
export default function LodgePage({ page }) {
  const { intro, sections } = groupBlocksByHeading(page.body);
  const introText = intro.filter((block) => block.type !== 'image');
  const images = extractImages(page.body);

  return (
    <>
      <Hero title={page.title} banner="banner3" />
      <section id="main" className="container py-5">
        <div className="row">
          {images.length > 0 && (
            <div className="col-12 col-lg-6">
              <div id="lodgeCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  {images.map((image, index) => (
                    <button
                      key={image.url}
                      type="button"
                      data-bs-target="#lodgeCarousel"
                      data-bs-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                      aria-current={index === 0 ? 'true' : undefined}
                      aria-label={`Photo ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="carousel-inner">
                  {images.map((image, index) => (
                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={image.url}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.url} alt={image.caption || 'Au pied du Morclan'} className="d-block w-100" />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#lodgeCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Précédent</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#lodgeCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Suivant</span>
                </button>
              </div>
            </div>
          )}
          <div className={images.length > 0 ? 'col-12 p-3 p-lg-0 px-lg-5 col-lg-6' : 'col-12'}>
            <BlockContent body={JSON.stringify(introText)} />
            <a href="https://youtu.be/5-kNZr2hkbI?si=aqXeK8dEIHvWoSvA" className="btn btn-info me-2" target="_blank" rel="noopener noreferrer">
              Visite virtuelle
            </a>
            <Link href="/book" className="btn btn-info">
              Réserver
            </Link>
          </div>
          {sections.length > 0 && (
            <div className="col-12 pt-4">
              <h2 className="card-title text-uppercase text-dark">Équipement</h2>
              <div className="accordion pt-3" id="equipmentAccordion">
                {sections.map((section, index) => {
                  const itemId = `equip-${index}`;
                  return (
                    <div className="accordion-item" key={itemId}>
                      <h2 className="accordion-header" id={`heading-${itemId}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${itemId}`}
                          aria-expanded="false"
                          aria-controls={`collapse-${itemId}`}
                        >
                          {section.title}
                        </button>
                      </h2>
                      <div
                        id={`collapse-${itemId}`}
                        className="accordion-collapse collapse bg-light"
                        aria-labelledby={`heading-${itemId}`}
                        data-bs-parent="#equipmentAccordion"
                      >
                        <div className="accordion-body">
                          <BlockContent body={JSON.stringify(section.blocks)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
