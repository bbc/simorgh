# Recommendations carousel

Modal prototype displaying article recommendations as horizontally scrollable
portrait cards, with headline overlays and portrait video carousel navigation.
Selecting a card opens a modal containing its image, full headline and article
link, not a video player. Escape closes the modal and restores card focus.

The prototype renders only for canonical Mundo articles in local and test
environments, including Storybook. Normal article pages use
[`NonModalRecommendationsCarousel`](../NonModalRecommendationsCarousel/README.md)
instead. The full article prototype stories explicitly select `modal` or
`stacked` with `ArticlePage`'s `recommendationsVariant` prop.

The carousel appears after the expanded article, immediately before Topic
Discovery or related-topic tags. No additional data request is made. Images are
cropped to 9:16, with the service image as a fallback. Storybook uses 12 sample
promos from existing Mundo fixtures, without changing real article data.

## Stacked square variant

`StackedRecommendationsCarousel` shares the modal behaviour and navigation,
but displays square promos in columns of two. An odd final promo remains
visible. Square headlines show up to four lines; the modal shows the full title.

## Storybook

- **Components / RecommendationsCarousel / Default**: portrait modal cards.
- **Components / RecommendationsCarousel / Stacked Squares**: stacked modal cards.
- **Pages / Article Page / Mundo Article With Recommendations Carousel**:
  portrait modal prototype in a full article.
- **Pages / Article Page / Mundo Article With Stacked Recommendations Carousel**:
  stacked modal prototype in a full article.
- **Components / NonModalRecommendationsCarousel / Non-modal Mundo Carousel**:
  the separate direct-link component used by normal articles.
