import Hero from '../Hero';
import BlockContent from '../../../../components/BlockContent';
import { groupBlocksByHeading } from '../lib/blockGroups';

// The whole FAQ is editable content: add a Heading block for each
// question and whatever Paragraph/list/image blocks answer it
// underneath, from /admin/page/edit/faq — no separate "FAQ item" block
// needed, this groups the page's own headings into an accordion.
export default function FaqPage({ page }) {
  const { sections } = groupBlocksByHeading(page.body);

  return (
    <>
      <Hero title={page.title} banner="banner4" />
      <section id="main" className="container py-5">
        <div className="accordion" id="faqAccordion">
          {sections.map((section, index) => {
            const itemId = `faq-${index}`;
            return (
              <div className="accordion-item mb-2" key={itemId}>
                <h2 className="accordion-header" id={`heading-${itemId}`}>
                  <button
                    className="accordion-button collapsed fw-bold"
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
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${itemId}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    <BlockContent body={JSON.stringify(section.blocks)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
