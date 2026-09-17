import Hero from '../Hero';
import BlockContent from '../../../../components/BlockContent';

// The booking widget URL is a fixed third-party integration (Amenitiz),
// not page content — change it here if you switch booking providers.
const BOOKING_WIDGET_URL = 'https://au-pied-du-morclan-chatel.amenitiz.io/fr/booking/room';

export default function BookPage({ page }) {
  return (
    <>
      <Hero
        title={page.title}
        subtitle="Réservez votre séjour et profitez des meilleurs tarifs sur notre plateforme sécurisée © Amenitiz"
        banner="banner4"
      />
      <section id="main" className="container py-5">
        <BlockContent body={page.body} />
        <div className="iframe mt-4">
          <iframe src={BOOKING_WIDGET_URL} title="Réservation" frameBorder="0" className="w-100 h-100" />
        </div>
      </section>
    </>
  );
}
