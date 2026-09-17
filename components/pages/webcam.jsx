import Hero from '../Hero';
import BlockContent from '../../../../components/BlockContent';

const WEBCAM_URL = 'https://app.webcam-hd.com/chatel/morclan';

export default function WebcamPage({ page }) {
  return (
    <>
      <Hero title={page.title} banner="banner4" />
      <section id="main" className="container py-5">
        <BlockContent body={page.body} />
        <div className="row">
          <div className="col-12 webcam mt-3">
            <iframe src={WEBCAM_URL} title="Webcam" className="embed-responsive-item webcam" frameBorder="0" />
          </div>
        </div>
      </section>
    </>
  );
}
