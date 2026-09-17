import Link from 'next/link';
import Hero from '../Hero';
import BlockContent from '../../../../components/BlockContent';

// Everything under the hero — text, photos — comes from this page's own
// block-editor content (page.body), edited the normal way from
// /admin/page/edit/<slug>. Nothing here is hardcoded except the "Contact"
// call-to-action, which is site chrome rather than page content.
export default function AboutUsPage({ page }) {
  return (
    <>
      <Hero title={page.title} banner="banner2" />
      <section id="main" className="container py-5">
        <BlockContent body={page.body} />
        <Link href="/contact" className="btn btn-info mt-3">
          Contactez-nous
        </Link>
      </section>
    </>
  );
}
