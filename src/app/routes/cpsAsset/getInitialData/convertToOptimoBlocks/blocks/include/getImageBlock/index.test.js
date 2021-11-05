import getImageBlock from '.';

const supportedInclude = {
  required: false,
  tile: 'IDT2 Include',
  href: '/idt2/111-222-333-444-555',
  platform: 'highweb',
  type: 'include',
  idt2: {
    altText: 'image alt text',
    dimensions: {
      small: {
        href: '/idt2/111-222-333-444-555/image/350',
        width: 700,
        height: 1864,
      },
      medium: {
        href: '/idt2/111-222-333-444-555/image/470',
        width: 940,
        height: 1864,
      },
      large: {
        href: '/idt2/111-222-333-444-555/image/816',
        width: 1632,
        height: 1864,
      },
    },
    copyrightHolder: 'Source: BBC',
    published: 1550229370779,
  },
};
const unsupportedInclude = {
  required: false,
  tile: 'A quiz!',
  href: '/indepthtoolkit/quizzes/123-456',
  platform: 'highweb',
  type: 'include',
};

describe('getImageBlock', () => {
  const includesBaseUrl = 'https://foobar.com/includes';
  process.env.SIMORGH_INCLUDES_BASE_URL = includesBaseUrl;

  it('should not generate image block for an unsupported include type', () => {
    expect(getImageBlock('idt1', unsupportedInclude)).toEqual(null);
  });

  it('should generate image block with default image set to a medium sizes for an IDT2 include type on amp', () => {
    const isAmp = true;
    const expected = {
      alt: 'image alt text',
      height: 1864,
      layout: 'responsive',
      src: 'https://foobar.com/includes/idt2/111-222-333-444-555/image/470',
      srcset:
        'https://foobar.com/includes/idt2/111-222-333-444-555/image/350 350w,https://foobar.com/includes/idt2/111-222-333-444-555/image/470 470w',
      width: 940,
    };
    expect(getImageBlock('idt2', supportedInclude, isAmp)).toEqual(expected);
  });

  it('should generate image block with default image set to a large size for an IDT2 include type on canonical', () => {
    const isAmp = false;
    const expected = {
      alt: 'image alt text',
      height: 1864,
      layout: 'responsive',
      src: 'https://foobar.com/includes/idt2/111-222-333-444-555/image/816',
      srcset:
        'https://foobar.com/includes/idt2/111-222-333-444-555/image/470 470w,https://foobar.com/includes/idt2/111-222-333-444-555/image/816 816w',
      width: 1632,
    };
    expect(getImageBlock('idt2', supportedInclude, isAmp)).toEqual(expected);
  });

  it('should not generate image block when image data is not present on include block', () => {
    const includeBlock = supportedInclude;
    includeBlock.idt2 = null;

    expect(getImageBlock('idt2', includeBlock)).toEqual(null);
  });
});
