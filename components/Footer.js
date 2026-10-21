// Footer du thème Au Pied du Morclan — refonte 2026.
//
// Simples balises <a>, pas de next/link ni de hooks : le CMS rend ce
// composant en isolation (renderToStaticMarkup), voir loadCompiledComponent.js.
//
// Coordonnées et réseaux sont du « chrome » de site, pas du contenu de
// page : modifiez-les ici directement.

// Format international SANS le « + » ni le 0 initial (wa.me / api.whatsapp.com).
// L'ancienne valeur '767677333' n'incluait pas l'indicatif 33 : le lien ne
// fonctionnait pas.
const WHATSAPP_NUMBER = '33767677333';
const REGISTRATION = '74063000602SD';

export default function Footer() {
  return (
    <>
      <a
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="apdm-whatsapp"
        aria-label="Nous écrire sur WhatsApp"
      >
        <i className="bi bi-whatsapp" aria-hidden="true"></i>
        <span>WhatsApp</span>
      </a>

      <footer className="apdm-footer">
        <div className="container apdm-footer__grid">
          <div className="apdm-footer__brand">
            <img src="/themes/apdm/img/LogoSansBG.png" alt="Logo Au Pied du Morclan" className="apdm-footer__logo" />
            <p>
              Appartement de vacances 6 personnes, résidence Les Rhododendrons,
              41 chemin de sous le Crêt, 74390 Châtel.
            </p>
            <div className="apdm-footer__pay">
              <img src="/themes/apdm/img/CB.png" alt="Carte bancaire acceptée" />
              <img src="/themes/apdm/img/logo_ancv_CV_ptl.png" alt="Chèques-vacances ANCV acceptés" />
              <img src="/themes/apdm/img/Multipassoffert.png" alt="Multipass offert" />
            </div>
          </div>

          <div>
            <h3>Nous contacter</h3>
            <ul>
              <li><a href="mailto:contact@aupieddumorclan.fr">contact@aupieddumorclan.fr</a></li>
              <li><a href="tel:+33767677333">+33 (0)7 67 67 73 33</a></li>
              <li><a href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="https://goo.gl/maps/HQskL1znhDuLMiRo6" target="_blank" rel="noopener noreferrer">Itinéraire Google Maps</a></li>
            </ul>
          </div>

          <div>
            <h3>Liens utiles</h3>
            <ul>
              <li><a href="/book">Réservation</a></li>
              <li><a href="/lodge">Le logement</a></li>
              <li><a href="/webcam">Webcam du Morclan</a></li>
              <li><a href="https://www.portesdusoleil.com/en-hiver/plan-des-pistes" target="_blank" rel="noopener noreferrer">Plan des pistes</a></li>
              <li><a href="https://chatel.com" target="_blank" rel="noopener noreferrer">Office de tourisme</a></li>
              <li><a href="https://www.mairie-chatel.com/Francais" target="_blank" rel="noopener noreferrer">Mairie de Châtel</a></li>
            </ul>
          </div>

          <div>
            <h3>Suivez-nous</h3>
            <ul>
              <li><a href="https://instagram.com/aupieddumorclan/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" aria-hidden="true"></i> Instagram</a></li>
              <li><a href="https://www.facebook.com/aupieddumorclan/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" aria-hidden="true"></i> Facebook</a></li>
            </ul>
            <h3 className="mt-4">Mentions légales</h3>
            <ul>
              <li><a href="/themes/apdm/doc/cgv.pdf">Conditions générales de vente</a></li>
              <li><a href="/themes/apdm/doc/cgu.pdf">Conditions générales d&apos;utilisation</a></li>
            </ul>
          </div>
        </div>

        <div className="container apdm-footer__bottom">
          <span>© Au Pied du Morclan · N° d&apos;enregistrement {REGISTRATION}</span>
          <span>
            Site réalisé par <a href="https://thebirdproduction.fr/">The bird production</a> · Design Faustine Guillaume
          </span>
        </div>
      </footer>
    </>
  );
}
