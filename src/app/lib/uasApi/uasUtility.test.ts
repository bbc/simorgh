import type { SaveArticlePageData } from '#app/lib/utilities/extractSaveArticleProps';
import { sanitiseMetadataString, buildCurrentMetadata } from './uasUtility';

const buildMockSaveArticlePageData = (
  promoImageAltText: string,
  headline = 'Test headline',
): SaveArticlePageData => ({
  canonicalUrl: 'https://www.bbc.com/hindi/articles/cwy0pz7qydzo',
  promoImage: 'https://ichef.test.bbci.co.uk/ace/ws/320/image.jpg',
  promoImageAltText,
  headline,
});

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
    const saveArticlePageData = buildMockSaveArticlePageData('शाहरुख़ ख़ान\n');

    const metadata = buildCurrentMetadata(saveArticlePageData, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.promoImageAltText).toBe('शाहरुख़ ख़ान');
  });

  it('collapses embedded newlines in promoImageAltText into a single space', () => {
    const saveArticlePageData = buildMockSaveArticlePageData(
      'Line one\nLine two\n',
    );

    const metadata = buildCurrentMetadata(saveArticlePageData, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.promoImageAltText).toBe('Line one Line two');
  });

  it('handles clean alt text without modification', () => {
    const saveArticlePageData = buildMockSaveArticlePageData('Clean alt text');

    const metadata = buildCurrentMetadata(saveArticlePageData, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.promoImageAltText).toBe('Clean alt text');
  });

  it('collapses whitespace in the title before sending to UAS', () => {
    const saveArticlePageData = buildMockSaveArticlePageData(
      'Image description',
      'Hindi\nArticle',
    );

    const metadata = buildCurrentMetadata(saveArticlePageData, {
      articleId: 'cwy0pz7qydzo',
      service: 'hindi',
    });

    expect(metadata.title).toBe('Hindi Article');
  });

  it('includes all expected metadata fields', () => {
    const saveArticlePageData =
      buildMockSaveArticlePageData('Image description');

    const metadata = buildCurrentMetadata(saveArticlePageData, {
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
