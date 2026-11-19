# Recommendations carousel

Displays the article's existing recommendations as horizontally scrollable
portrait cards, with headline overlays and the portrait video carousel's
navigation controls. Selecting a card opens a modal containing the image,
headline and a link to read the article; it does not play video. The modal
supports Escape to close, traps focus and returns focus to the selected card.

Available only on canonical Mundo article pages in local and test environments,
including Storybook. It appears after the article body, immediately before topic
discovery, and is hidden while the article is collapsed. Existing mid-article
recommendations are unchanged. No additional data request is made.

The standalone and full Mundo article Storybook examples use 12 sample promos
from existing Mundo fixture data. This Storybook-only dataset does not change
recommendations on real article pages; the carousel displays all supplied promos
without a four-item limit.

Images are cropped to 9:16. Recommendations without images use the service's
default image. Headlines remain visible in full, including for longer titles.

## Stacked square variant

`StackedRecommendationsCarousel` shares the same recommendations, styling,
navigation and modal behaviour, but shows square promos in columns of two.
An odd number of recommendations leaves the final column with one promo.
Square-card headlines are limited to four visible lines; the modal shows the
full headline.

Preview it in Storybook under **Components / RecommendationsCarousel / Stacked
Squares**, or in a full Mundo article under **Pages / Article Page / Mundo
Article With Stacked Recommendations Carousel**. The stacked article story shows
the carousel after the article body and before topic discovery. Normal article
pages continue to use the portrait layout.
Displays the existing article recommendations as horizontally scrollable,
portrait (9:16) image cards with overlaid headlines. Cards link to articles;
they do not play videos. Landscape recommendation images are centre-cropped.

`Recommendations` selects this layout only for Mundo canonical article pages.
`ArticlePage` moves it below the article, immediately above Topic Discovery.
Its existing feature toggle, Most Read
availability, translated heading, skip links and experiment tracking still apply.
AMP, Lite, other page types and other services retain the original layout.

The carousel reuses the portrait video carousel's navigation and recommendation
image handling. Article links remain keyboard-accessible and usable without
JavaScript. Images are lazy-loaded, and long headlines are not truncated.

| Prop                | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `data`              | Existing `Recommendation[]` data, without reordering or transformation. |
| `title`             | Localised recommendations heading.                                      |
| `eventTrackingData` | Existing recommendations analytics and experiment data.                 |

## Previewing

Run `yarn storybook`, then open:

- **Components / RecommendationsCarousel / Non-modal Mundo Carousel** for the
  standalone component using the same Mundo recommendations as the article
  story. Cards link directly to articles without opening a modal.
- **Components / RecommendationsCarousel / Multiple Items** or **Single Item**
  for smaller generic examples.
- **Pages / Article Page / Article Page With Recommendations Carousel** for a
  Mundo article with the carousel immediately above Topic Discovery.

The article story enables the required recommendation and Topic Discovery
toggles and uses the existing Mundo article fixture. The same article is
available in the local app at `/mundo/articles/cddylv9g8z0o`.
