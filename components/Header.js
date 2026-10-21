// Header du thème Au Pied du Morclan — refonte 2026.
//
// Composant strictement serveur (rendu isolé en HTML statique par le CMS,
// voir docs/plugin-and-theme-development.md) : pas de hooks, pas de
// next/link, uniquement des <a>. Les liens viennent du menu "main"
// (/admin/menu).
//
// Le bouton ❄ Hiver / ☀ Été bascule tout le site d'une ambiance à l'autre
// (couleurs, bannière, contenus saisonniers) en posant data-season sur
// <html>. Le petit script ci-dessous fait le travail ; il est inclus ici
// (dans le HTML initial de la page) pour s'appliquer avant l'affichage
// des blocs. Les blocs du thème (components/blocks.js) embarquent la même
// logique, idempotente, au cas où ce script ne serait pas exécuté.
//
// Le menu mobile utilise l'offcanvas de Bootstrap (JS chargé globalement
// par le CMS, via data-bs-toggle).

const BOOKING_URL = 'https://au-pied-du-morclan-chatel.amenitiz.io/fr/booking/room';

const SEASON_SCRIPT = `(function(){
  if (window.__apdmSeasonReady) return; window.__apdmSeasonReady = true;
  var root = document.documentElement;
  function apply(s){
    root.setAttribute('data-season', s === 'ete' ? 'ete' : 'hiver');
    var btns = document.querySelectorAll('[data-apdm-season]');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', String(btns[i].getAttribute('data-apdm-season') === s));
    var vids = document.querySelectorAll('.apdm-hero video');
    for (var j = 0; j < vids.length; j++) { try { if (s === 'ete') vids[j].pause(); else { var p = vids[j].play(); if (p && p.catch) p.catch(function(){}); } } catch(e){} }
    try { localStorage.setItem('apdm-season', s); } catch(e){}
  }
  window.apdmSetSeason = apply;
  var saved = null; try { saved = localStorage.getItem('apdm-season'); } catch(e){}
  var m = new Date().getMonth();
  apply(saved || (m >= 4 && m <= 8 ? 'ete' : 'hiver'));
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-apdm-season]');
    if (b) apply(b.getAttribute('data-apdm-season'));
  });
  document.addEventListener('DOMContentLoaded', function(){ apply(root.getAttribute('data-season')); });
})();`;

function SeasonSwitch() {
  return (
    <div className="apdm-season-switch" role="group" aria-label="Ambiance du site">
      <button type="button" data-apdm-season="hiver" aria-pressed="true">
        <span aria-hidden="true">❄</span> <span className="apdm-season-switch__lbl">Hiver</span>
      </button>
      <button type="button" data-apdm-season="ete" aria-pressed="false">
        <span aria-hidden="true">☀</span> <span className="apdm-season-switch__lbl">Été</span>
      </button>
    </div>
  );
}

export default function Header({ menu = [], pathname = '/' }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SEASON_SCRIPT }} />
      <nav className="navbar navbar-expand-xxl apdm-nav">
        <div className="container-fluid apdm-nav__inner">
          <a href="/" className="navbar-brand apdm-brand" aria-label="Au Pied du Morclan, accueil">
            <img src="/themes/apdm/img/LogoSansBG.png" alt="" className="apdm-brand__logo" />
            <span className="apdm-brand__text">
              <b>Au Pied du Morclan</b>
              <small>Châtel · Haute-Savoie</small>
            </span>
          </a>

          <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbarNav" aria-label="Menu">
            <div className="offcanvas-header">
              <span className="apdm-brand__text"><b>Au Pied du Morclan</b></span>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Fermer"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav apdm-nav__links">
                {menu.map((item) => (
                  <li className="nav-item" key={item.id}>
                    <a
                      href={item.url}
                      target={item.target || undefined}
                      className={`nav-link${item.url === pathname ? ' active' : ''}`}
                      aria-current={item.url === pathname ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="apdm-nav__actions">
            <SeasonSwitch />
            <a className="btn btn-primary apdm-nav__book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Réserver
            </a>
            <button
              className="navbar-toggler apdm-nav__toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-label="Ouvrir le menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
