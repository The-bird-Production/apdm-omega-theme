import Hero from '../Hero';
import BlockContent from '../../../../components/BlockContent';

// The contact form below is decorative (no submit handler) exactly as it
// was before this theme was adapted — wiring it up to actually receive
// messages is a bigger, separate feature (form storage/notifications),
// not part of this pass. The contact details above it are page content,
// editable from /admin/page/edit/contact like any other page.
export default function ContactPage({ page }) {
  return (
    <>
      <Hero title={page.title} banner="banner4" />
      <section id="main" className="container py-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="card bg-light">
              <div className="card-body py-4">
                <BlockContent body={page.body} />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <form>
              <div className="mb-3">
                <label htmlFor="contactEmail" className="form-label">
                  Adresse e-mail
                </label>
                <input type="email" className="form-control" id="contactEmail" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="contactSubject" className="form-label">
                  Sujet
                </label>
                <input type="text" className="form-control" id="contactSubject" />
              </div>
              <div className="mb-3">
                <label htmlFor="contactPhone" className="form-label">
                  Téléphone
                </label>
                <input type="tel" className="form-control" id="contactPhone" />
              </div>
              <div className="mb-3">
                <label htmlFor="contactMessage" className="form-label">
                  Message
                </label>
                <textarea className="form-control" id="contactMessage" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-info">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
