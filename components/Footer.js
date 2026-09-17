import Link from 'next/link';

// Contact details/social links are site-wide chrome, not per-page content
// — edit them here directly (same as before) rather than through the
// admin. If you'd rather make them admin-editable later, the "Contact"
// nav menu already links to a page whose content *is* editable — these
// footer specifics could move there as a first step.
const WHATSAPP_NUMBER = '767677333';

export default function Footer() {
  return (
    <>
      <a
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button float my-float"
      >
        <i className="bi bi-whatsapp fs-2 m-2 mx-3 d-block"></i>
      </a>
      <footer className="footer">
        <section className="footer">
          <div className="bg-dark text-white px-5 py-3 list-unstyled">
            <div className="d-flex flex-wrap flex-column flex-lg-row justify-content-lg-between">
              <div className="footer-item">
                <h3>Liens utiles</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/book">Réservation</Link>
                  </li>
                  <li>
                    <Link href="/lodge">Le logement</Link>
                  </li>
                  <li>
                    <a href="https://www.portesdusoleil.com/en-hiver/plan-des-pistes" target="_blank" rel="noopener noreferrer">
                      Plan des pistes
                    </a>
                  </li>
                  <li>
                    <a href="https://chatel.com" target="_blank" rel="noopener noreferrer">
                      Office de tourisme de Châtel
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mairie-chatel.com/Francais" target="_blank" rel="noopener noreferrer">
                      Mairie de Châtel
                    </a>
                  </li>
                  <li>
                    <a href="mailto:maleville.etienne@gmail.com">Signaler un bug</a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3>Mentions légales</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="/themes/apdm/doc/cgu.pdf">Conditions générales d&apos;utilisation</a>
                  </li>
                  <li>
                    <a href="/themes/apdm/doc/cgv.pdf">Conditions générales de vente</a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3>Nous contacter</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="mailto:contact@aupieddumorclan.fr">contact@aupieddumorclan.fr</a>
                  </li>
                  <li>
                    <a href="tel:+33767677333">+33 (0)7 67 67 73 33</a>
                  </li>
                  <li>
                    <a href="https://goo.gl/maps/HQskL1znhDuLMiRo6" target="_blank" rel="noopener noreferrer">
                      41 chemin de sous le Crêt 74390 Châtel
                    </a>
                  </li>
                  <li>
                    <a href="mailto:maleville.etienne@gmail.com">Signaler un bug</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="reseaux d-lg-flex justify-content-lg-between align-items-lg-center p-lg-2">
              <div className="icon py-2 text-center">
                <a href="https://instagram.com/aupieddumorclan/" className="text-white m-2" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.facebook.com/aupieddumorclan/" className="text-white" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
              </div>
              <div className="icon-image py-2 mx-auto d-flex justify-content-around d-lg-inline-block mx-lg-0">
                <img src="/themes/apdm/img/CB.png" alt="Logo carte bleue" className="footericon" />
                <img src="/themes/apdm/img/logo_ancv_CV_ptl.png" alt="Logo ANCV" className="footericon" />
                <img src="/themes/apdm/img/Multipassoffert.png" alt="Logo Multipass offert" className="footericon" />
              </div>
            </div>
          </div>

          <div className="bottom bg-black text-light text-center">
            <p className="text-center mb-0">Made with Au pied du Morclan</p>
            <p className="text-center">
              By <a href="https://thebirdproduction.fr/">The bird production</a>, Design by Faustine Guillaume
            </p>
          </div>
        </section>
      </footer>
    </>
  );
}
