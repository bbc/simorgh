import {
  createImageSources,
  createSrcSet,
  ichefLoader,
  POC_IMAGE_WIDTHS,
  withJpegFallback,
  withWebp,
} from './imagePoc';

const template = 'https://ichef.bbci.co.uk/ace/ws/{width}/image.jpg';

describe('image PoC preparation', () => {
  it('replaces the iChef width token in the custom loader', () => {
    expect(ichefLoader({ src: template, width: 624 })).toBe(
      'https://ichef.bbci.co.uk/ace/ws/624/image.jpg',
    );
  });

  // The source policy belongs to the custom loader, not Next.js remotePatterns.
  it.each([
    'http://ichef.bbci.co.uk/ace/ws/{width}/image.jpg',
    'https://example.com/ace/ws/{width}/image.jpg',
    'https://ichef.bbci.co.uk/ace/ws/624/image.jpg',
    'https://user@ichef.bbci.co.uk/ace/ws/{width}/image.jpg',
    `${template}?redirect=elsewhere`,
  ])('rejects an unsupported loader source: %s', src => {
    expect(() => ichefLoader({ src, width: 624 })).toThrow(TypeError);
  });

  it.each([0, -1, 1.5, NaN])('rejects an invalid width: %s', width => {
    expect(() => ichefLoader({ src: template, width })).toThrow(TypeError);
  });

  it('preserves WebP and creates a JPEG fallback URL', () => {
    expect(withWebp(template)).toBe(`${template}.webp`);
    expect(withWebp(withWebp(template))).toBe(`${template}.webp`);
    expect(withJpegFallback(withWebp(template))).toBe(template);
  });

  it('generates the expected responsive candidates', () => {
    expect(createSrcSet(template, [240, 624])).toBe(
      'https://ichef.bbci.co.uk/ace/ws/240/image.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/image.jpg 624w',
    );
  });

  it('keeps the PoC sources aligned with its declared ladder', () => {
    const sources = createImageSources(template);

    expect(sources.src).toBe(
      'https://ichef.bbci.co.uk/ace/ws/624/image.jpg.webp',
    );
    expect(sources.primaryTemplate).toBe(withWebp(template));
    expect(sources.primarySrcSet).toBe(
      createSrcSet(withWebp(template), POC_IMAGE_WIDTHS),
    );
    expect(sources.fallbackSrcSet).toBe(
      createSrcSet(template, POC_IMAGE_WIDTHS),
    );
  });
});
