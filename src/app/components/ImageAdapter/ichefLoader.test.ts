import { ichefLoader, isImageAdapterSource } from './ichefLoader';

const TEMPLATE =
  'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/cc66/live/5b34d420-b382-11e9-b6fd-e3056fffd1f1.jpg';

describe('ImageAdapter iChef loader', () => {
  it.each([
    TEMPLATE,
    `${TEMPLATE}.webp`,
    'https://ichef.test.bbci.co.uk/ace/standard/{width}/cpsdevpb/AD8A/test/_63662444_000011330-1.jpg',
  ])('accepts an iChef ace width template: %s', src => {
    expect(isImageAdapterSource(src)).toBe(true);
  });

  it.each([
    undefined,
    '',
    'not a url',
    'http://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/image.jpg',
    'https://example.com/ace/ws/{width}/cpsprodpb/image.jpg',
    'https://ichef.bbci.co.uk.example.com/ace/ws/{width}/cpsprodpb/image.jpg',
    'https://ichef.bbci.co.uk:8443/ace/ws/{width}/cpsprodpb/image.jpg',
    'https://user:pass@ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/image.jpg',
    'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/image.jpg?w=1',
    'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/image.jpg#x',
    'https://ichef.bbci.co.uk/ace/ws/660/cpsprodpb/image.jpg',
    'https://ichef.bbci.co.uk/images/ic/{width}xn/p01k6mtv.jpg',
    'https://ichef.bbci.co.uk/news/{width}/cpsprodpb/image.jpg',
  ])('rejects unsupported source: %s', src => {
    expect(isImageAdapterSource(src)).toBe(false);
  });

  it('resolves the requested width', () => {
    expect(ichefLoader({ src: TEMPLATE, width: 325 })).toBe(
      TEMPLATE.replace('{width}', '325'),
    );
  });

  it.each([0, -1, 1.5])('throws for invalid width %s', width => {
    expect(() => ichefLoader({ src: TEMPLATE, width })).toThrow(TypeError);
  });

  it('throws for unsupported sources', () => {
    expect(() =>
      ichefLoader({ src: 'https://example.com/{width}/a.jpg', width: 240 }),
    ).toThrow(TypeError);
  });
});
