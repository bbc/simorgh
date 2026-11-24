# ArticlePreviewCard

Reusable article-preview content for the WS-3523 Option E prototype. It adapts
Option D's white editorial preview for the main slot inside Option B's grouped
onward area. The enclosing component owns the article-end heading, selection
controls, empty state and other onward sections.

Pass a verified `preview: ArticleEndPreview` and a unique `id` for this rendered
card. The article uses that ID and its headline uses `${id}-title`, allowing
multiple cards on the same page without duplicate accessibility IDs. Text comes
from the destination article; the card does not fetch, select or generate it.

The card displays an optional image, full serif headline, valid publication date
and reading time, up to two supplied non-empty paragraphs, and an ordinary link
to the full article. A promo summary is labelled using `summaryLabel`; opening
paragraphs use `previewLabel`. Missing images, excerpts or metadata leave no empty
reserved content. Reading time refers to the full destination article.

The layout stacks on mobile. Above the existing 600px breakpoint, a header row
places the photograph beside the headline and metadata in approximately 40% / 60%
columns. The image area matches the header height and contains the full image,
preserving text in graphics and avoiding cropped faces. The smaller `doublePica`
headline sits vertically centred beside it. The excerpt uses the available width
below, with natural left alignment rather than justified word spacing.

Flex sizing keeps carousel cards at a shared height. The compact destination link
and preview note sit at the bottom, so shorter excerpts leave separation before
the action rather than a blank block after it. No excerpt is faded, line-clamped
or hidden. The existing BBC Image, Heading, Paragraph and Chevron components are
reused with scoped SCSS Modules and theme tokens.

The destination link has one keyboard stop, a visible focus ring suitable for
the white surface, and the headline as its accessible description. The parent
must preserve keyboard access and correct selection when cards move offscreen;
it must not mark a card `aria-hidden` while its link remains focusable.

The component uses `translations.endOfArticlePreview`. View and click hooks use
the component name `article-preview-card` and the destination ID. These hooks do
not imply that a live experiment or research measurement configuration is ready.

This is an alpha prototype. No automated tests were added or run for this card;
accessibility documentation, acceptance-criteria review and swarm approval remain
incomplete in `metadata.json`.
