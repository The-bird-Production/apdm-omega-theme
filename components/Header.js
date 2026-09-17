'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getMenu } from '../../../../lib/menu';

// Nav links come from the "main" menu, managed at /admin/menu — nothing
// hardcoded here. Add them once after installing this theme (Accueil /,
// Qui sommes nous /about-us, Le logement /lodge, Réserver /book, FAQ
// /faq, Contact /contact, Webcam /webcam — plus a Blog link to /article
// if you want one).
//
// The routes below all render a full-height Hero banner (see
// components/pages/*.jsx), so the nav overlays it transparently, like
// on the original site. Everything else (article pages, and any page
// created without picking one of this theme's templates) has no
// banner to sit on, so the nav gets a solid background there instead.
const HERO_ROUTES = ['/', '/about-us', '/lodge', '/book', '/faq', '/contact', '/webcam'];

export default function Header() {
  const pathname = usePathname();
  const [items, setItems] = useState([]);
  const isOverlay = HERO_ROUTES.includes(pathname);

  useEffect(() => {
    require('../../../../public/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    getMenu('main').then(setItems);
  }, []);

  useEffect(() => {
    const fixScroll = () => {
      document.body.style.overflow = 'auto';
      document.body.removeAttribute('data-bs-overflow');
      document.body.classList.remove('modal-open');
      document.querySelectorAll('.offcanvas-backdrop').forEach((el) => el.remove());
    };

    const handleRouteChange = () => {
      fixScroll();
      document.querySelectorAll('.offcanvas.show').forEach((offcanvas) => {
        offcanvas.classList.remove('show');
        offcanvas.removeAttribute('aria-modal');
        offcanvas.removeAttribute('role');
      });
    };

    document.addEventListener('hidden.bs.offcanvas', fixScroll);
    handleRouteChange();

    return () => {
      document.removeEventListener('hidden.bs.offcanvas', fixScroll);
    };
  }, [pathname]);

  return (
    <>
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
          <Link
            href="/"
            className="navbar-brand m-0 d-flex justify-content-end justify-lg-left flex-nowrap justify-content-lg-start"
          >
            <img src="/themes/apdm/img/LogoSansBG.png" alt="Logo Au pied du Morclan" className="logo" />
          </Link>
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
                {items.map((item) => (
                  <li className="nav-item" key={item.id}>
                    <Link href={item.url} target={item.target || undefined} className="nav-link text-black text-lg-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
