import type { Article } from '#app/models/types/optimo';
import { sanitiseMetadataString, buildCurrentMetadata } from './uasUtility';

jest.mock('#app/lib/utilities/ichefURL', () =>
  jest.fn(() => 'https://ichef.test.bbci.co.uk/ace/ws/320/image.jpg'),
);

const buildMockArticleWithAltText = (altText: string): Article =>
  ({
    metadata: {
      locators: {
        canonicalUrl: 'https://www.bbc.com/hindi/articles/cwy0pz7qydzo',
      },
    },
    content: {
      model: {
        blocks: [
          {
            type: 'headline',
            model: {
              blocks: [
                {
                  model: {
                    blocks: [{ model: { text: 'Test headline' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    promo: {
      images: {
        defaultPromoImage: {
          blocks: [
            {
              type: 'altText',
              model: {
                blocks: [
                  {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: { text: altText },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              type: 'rawImage',
              model: {
                locator: '5bde/live/e4af80b0-6f4c-11f0-8dbd-f3d32ebd3327.jpg',
                originCode: 'cpsprodpb',
                width: 1024,
                height: 576,
              },
            },
          ],
        },
      },
    },
  }) as unknown as Article;

describe('sanitiseMetadataString', () => {
  it('removes a trailing newline', () => {
    expect(sanitiseMetadataString('शाहरुख़ ख़ान\n')).toBe('शाहरुख़ ख़ान');
  });

  it('removes a trailing carriage return + newline', () => {
    expect(sanitiseMetadataString('Some text\r\n')).toBe('Some text');
  });

  it('collapses embedded newlines into a single space', () => {
    expect(sanitiseMetadataString('Line one\nLine two')).toBe(
      'Line one Line two',
    );
  });

  it('trims leading and trailing whitespace', () => {
    expect(sanitiseMetadataString('  hello  ')).toBe('hello');
  });

  it('returns an empty string for undefined input', () => {
    expect(sanitiseMetadataString(undefined)).toBe('');
  });

  it('returns an empty string for an empty string input', () => {
    expect(sanitiseMetadataString('')).toBe('');
  });

  it('leaves clean strings unchanged', () => {
    expect(sanitiseMetadataString('Normal alt text')).toBe('Normal alt text');
  });
});

describe('buildCurrentMetadata', () => {
  it('strips trailing newline from promoImageAltText before sending to UAS', () => {
    const article = buildMockArticleWithAltText('शाहरुख़ ख़ान\n');

    const metadata = buildCurrentMetadata(article, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.promoImageAltText).toBe('शाहरुख़ ख़ान');
  });

  it('collapses embedded newlines in promoImageAltText into a single space', () => {
    const article = buildMockArticleWithAltText('Line one\nLine two\n');

    const metadata = buildCurrentMetadata(article, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.promoImageAltText).toBe('Line one Line two');
  });

  it('handles clean alt text without modification', () => {
    const article = buildMockArticleWithAltText('Clean alt text');

    const metadata = buildCurrentMetadata(article, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.promoImageAltText).toBe('Clean alt text');
  });

  it('includes all expected metadata fields', () => {
    const article = buildMockArticleWithAltText('Image description');

    const metadata = buildCurrentMetadata(article, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata).toMatchObject({
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
      title: 'Test headline',
      locatorUrl: 'https://www.bbc.com/hindi/articles/cwy0pz7qydzo',
      promoImageAltText: 'Image description',
    });
  });
});
