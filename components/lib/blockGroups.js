// Theme-local helpers for turning a page's block-editor content into an
// accordion (FAQ, equipment list...) or an image carousel — using nothing
// but the standard block types already in the CMS's editor (heading,
// paragraph, bullet list, image), so a client can edit these sections
// like any other page, no custom block/plugin required.

function extractText(block) {
  if (!Array.isArray(block.content)) return '';
  return block.content.map((c) => c.text || '').join('');
}

function parseBlocks(bodyJson) {
  try {
    const parsed = JSON.parse(bodyJson || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Every `heading` block starts a new section (its text becomes the
// section's title); every block after it, up to the next heading,
// belongs to that section. Anything before the first heading is the
// `intro` — render it above the accordion, or ignore it if unused.
export function groupBlocksByHeading(bodyJson) {
  const blocks = parseBlocks(bodyJson);
  const intro = [];
  const sections = [];
  let current = null;

  for (const block of blocks) {
    if (block.type === 'heading') {
      current = { title: extractText(block), blocks: [] };
      sections.push(current);
    } else if (current) {
      current.blocks.push(block);
    } else {
      intro.push(block);
    }
  }

  return { intro, sections };
}

// Every `image` block in a page's content, in order — feeds the lodge
// page's photo carousel. A client adds/removes/reorders photos from the
// editor like any other content.
export function extractImages(bodyJson) {
  const blocks = parseBlocks(bodyJson);
  return blocks
    .filter((block) => block.type === 'image' && block.props?.url)
    .map((block) => ({ url: block.props.url, caption: block.props.caption || '' }));
}
