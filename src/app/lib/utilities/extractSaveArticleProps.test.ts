import type { Article } from '#app/models/types/optimo';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
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

const buildNestedMediaImageBlock = (
  locator: string,
  altText: string,
  type = 'video',
) => ({
  type,
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

  it.each(['audio', 'video'])(
    'extracts the nested %s image for media articles',
    type => {
      const article = buildArticle([
        buildHeadlineBlock('Media article headline'),
        buildNestedMediaImageBlock(IMAGE_LOCATOR, 'Nested alt text', type),
      ]);

      expect(
        extractSaveArticleProps(article, MEDIA_ARTICLE_PAGE),
      ).toMatchObject({
        promoImage: EXPECTED_PROMO_IMAGE,
        promoImageAltText: 'Nested alt text',
        headline: 'Media article headline',
      });
    },
  );

  it('prefers the nested media image over a later top-level image block', () => {
    const article = buildArticle([
      buildHeadlineBlock('Media article headline'),
      buildNestedMediaImageBlock(IMAGE_LOCATOR, 'Nested alt text'),
      buildImageBlock(
        'ichef.test.bbci.co.uk/images/ic/$widthxn/body-image.jpg',
        'Body image alt text',
      ),
    ]);

    expect(extractSaveArticleProps(article, MEDIA_ARTICLE_PAGE)).toMatchObject({
      promoImage: EXPECTED_PROMO_IMAGE,
      promoImageAltText: 'Nested alt text',
      headline: 'Media article headline',
    });
  });

  it.each(['audio', 'video'])(
    'uses the lead image for a normal article containing embedded %s',
    type => {
      const article = buildArticle([
        buildHeadlineBlock('Normal article headline'),
        buildImageBlock(IMAGE_LOCATOR, 'Lead image alt text'),
        buildNestedMediaImageBlock(
          'ichef.test.bbci.co.uk/images/ic/$widthxn/embedded-media.jpg',
          'Embedded media alt text',
          type,
        ),
      ]);

      expect(extractSaveArticleProps(article)).toMatchObject({
        promoImage: EXPECTED_PROMO_IMAGE,
        promoImageAltText: 'Lead image alt text',
      });
    },
  );

  it('uses the top-level image when a media article has no nested image', () => {
    const article = buildArticle([
      { type: 'video', model: { blocks: [] } },
      buildImageBlock(IMAGE_LOCATOR, 'Top-level alt text'),
    ]);

    expect(extractSaveArticleProps(article, MEDIA_ARTICLE_PAGE)).toMatchObject({
      promoImage: EXPECTED_PROMO_IMAGE,
      promoImageAltText: 'Top-level alt text',
    });
  });

  it('does not use embedded media as the promo for a normal article without an image', () => {
    const article = buildArticle([
      buildNestedMediaImageBlock(IMAGE_LOCATOR, 'Embedded media alt text'),
    ]);

    expect(extractSaveArticleProps(article)).toMatchObject({
      promoImage: '',
      promoImageAltText: '',
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
