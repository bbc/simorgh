import type { Article } from '#app/models/types/optimo';
import extractSaveArticleProps from './extractSaveArticleProps';

const buildTextChain = (text: string) => ({
  blocks: [
    {
      type: 'text',
      model: { blocks: [{ type: 'paragraph', model: { text } }] },
    },
  ],
});

const buildHeadlineBlock = (text: string) => ({
  type: 'headline',
  model: buildTextChain(text),
});

const buildImageBlock = (locator: string, altText: string) => ({
  type: 'image',
  model: {
    blocks: [
      { type: 'rawImage', model: { locator, originCode: 'mpv' } },
      { type: 'altText', model: buildTextChain(altText) },
    ],
  },
});

const buildNestedMediaImageBlock = (locator: string, altText: string) => ({
  type: 'video',
  model: {
    blocks: [
      {
        type: 'aresMedia',
        model: { blocks: [buildImageBlock(locator, altText)] },
      },
    ],
  },
});

const buildArticle = (contentBlocks: unknown[]): Article =>
  ({
    content: { model: { blocks: contentBlocks } },
    metadata: {
      locators: { canonicalUrl: 'https://www.bbc.com/pidgin/articles/abc123' },
    },
    promo: { headlines: { seoHeadline: 'Fallback seo headline' } },
  }) as unknown as Article;

const IMAGE_LOCATOR = 'ichef.test.bbci.co.uk/images/ic/$widthxn/image.jpg';
const EXPECTED_PROMO_IMAGE =
  'https://ichef.test.bbci.co.uk/images/ic/320xn/image.jpg.webp';

describe('extractSaveArticleProps', () => {
  it.each([
    {
      contentId: 'urn:bbc:topcat:curie:asset:example',
      isTC2Asset: true,
    },
    {
      contentId: 'urn:bbc:optimo:asset:c1l97706v5mo',
      isTC2Asset: false,
    },
    {
      contentId: 'urn:bbc:optimo:asset:topcat-example',
      isTC2Asset: false,
    },
    { contentId: undefined, isTC2Asset: false },
  ])(
    'sets isTC2Asset to $isTC2Asset for content ID $contentId',
    ({ contentId, isTC2Asset }) => {
      const article = buildArticle([]);
      const articleWithContentId = {
        ...article,
        metadata: {
          ...article.metadata,
          analyticsLabels: contentId
            ? { producer: 'hindi', contentId }
            : undefined,
        },
      };

      expect(extractSaveArticleProps(articleWithContentId)).toMatchObject({
        isTC2Asset,
      });
    },
  );

  it('extracts promo image from a top-level image block', () => {
    const article = buildArticle([
      buildHeadlineBlock('Top-level headline'),
      buildImageBlock(IMAGE_LOCATOR, 'Top-level alt text'),
    ]);

    expect(extractSaveArticleProps(article)).toMatchObject({
      promoImage: EXPECTED_PROMO_IMAGE,
      promoImageAltText: 'Top-level alt text',
      headline: 'Top-level headline',
    });
  });

  it('falls back to the image nested in an audio/video block’s aresMedia block', () => {
    const article = buildArticle([
      buildHeadlineBlock('Media article headline'),
      buildNestedMediaImageBlock(IMAGE_LOCATOR, 'Nested alt text'),
    ]);

    expect(extractSaveArticleProps(article)).toMatchObject({
      promoImage: EXPECTED_PROMO_IMAGE,
      promoImageAltText: 'Nested alt text',
      headline: 'Media article headline',
    });
  });

  it('prefers the nested media image over a later top-level image block', () => {
    const article = buildArticle([
      buildHeadlineBlock('Media article headline'),
      buildNestedMediaImageBlock(IMAGE_LOCATOR, 'Nested alt text'),
      buildImageBlock(
        'ichef.test.bbci.co.uk/images/ic/$widthxn/body-image.jpg',
        'Body image alt text',
      ),
    ]);

    expect(extractSaveArticleProps(article)).toMatchObject({
      promoImage: EXPECTED_PROMO_IMAGE,
      promoImageAltText: 'Nested alt text',
      headline: 'Media article headline',
    });
  });

  it('falls back to promo.headlines.seoHeadline when there is no headline block', () => {
    expect(extractSaveArticleProps(buildArticle([]))).toMatchObject({
      headline: 'Fallback seo headline',
      promoImage: '',
      promoImageAltText: '',
    });
  });
});
