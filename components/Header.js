// Nav links come from the "main" menu, managed at /admin/menu — nothing
// hardcoded here. Add them once after installing this theme (Accueil /,
// Qui sommes nous /about-us, Le logement /lodge, Réserver /book, FAQ
// /faq, Contact /contact, Webcam /webcam — plus a Blog link to /article
// if you want one).
//
// This is a plain server component — the host app resolves the active
// theme's Header/Footer once, server-side, and renders it with the
// current menu and pathname already fetched (see MainLayout.js). It
// takes no client-side data of its own to fetch, and needs none: the
// mobile offcanvas toggle below works from Bootstrap's own vanilla-JS
// event delegation (data-bs-toggle), loaded once globally by the host
// app, not by this theme.
//
// Plain <a> tags on purpose, not next/link: the host renders this
// component in complete isolation from its own React tree (a genuine
// runtime import + renderToStaticMarkup, see loadCompiledComponent.js in
// the CMS repo), so next/link's internal hooks have no router context to
// attach to here.
//
// The routes below all render a full-height Hero banner (see
// components/pages/*.jsx), so the nav overlays it transparently, like
// on the original site. Everything else (article pages, and any page
// created without picking one of this theme's templates) has no
// banner to sit on, so the nav gets a solid background there instead.
const HERO_ROUTES = ['/', '/about-us', '/lodge', '/book', '/faq', '/contact', '/webcam'];

export default function Header({ menu = [], pathname = '/' }) {
  const isOverlay = HERO_ROUTES.includes(pathname);

  return (
    <nav className={`navbar navbar-expand-lg ${isOverlay ? 'navbar-overlay' : 'navbar-solid'}`}>
      <div className="container-fluid flex-nowrap">
        <button
          className="navbar-toggler navbar-dark border-0 p-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white navbar-light"></span>
        </button>
        <a
          href="/"
          className="navbar-brand m-0 d-flex justify-content-end justify-lg-left flex-nowrap justify-content-lg-start"
        >
          <img src="/themes/apdm/img/LogoSansBG.png" alt="Logo Au pied du Morclan" className="logo" />
        </a>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="navbarNav"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header justify-content-end py-5">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body justify-content-lg-end">
            <ul className="navbar-nav">
              {menu.map((item) => (
                <li className="nav-item" key={item.id}>
                  <a href={item.url} target={item.target || undefined} className="nav-link text-black text-lg-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
