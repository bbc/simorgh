import videoMetadata from './videoMetadata';
import {
  aresMediaBlock,
  noAresMediaMetadata,
  multipleAresMetadata,
} from './fixtureData';

describe('videoMetadata', () => {
  it('returns correct video metadata', () => {
    const metadata = videoMetadata(aresMediaBlock);
    const output = {
      video: {
        '@list': [
          {
            '@type': 'VideoObject',
            name: 'Five things ants can teach us about management',
            description:
              'They may be tiny, but us humans could learn a thing or two from ants.',
            duration: 191,
            thumbnailUrl:
              'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });

  it('handles aresMediaMetadata type not being present', () => {
    const metadata = videoMetadata(noAresMediaMetadata);
    expect(metadata).toEqual(undefined);
  });

  it('handles empty input', () => {
    const metadata = videoMetadata([]);
    expect(metadata).toEqual(undefined);
  });

  it('handles multiple aresMediaMetadata types being present.', () => {
    const metadata = videoMetadata(multipleAresMetadata);
    const output = {
      video: {
        '@list': [
          {
            '@type': 'VideoObject',
            name: 'Five things ants can teach us about management',
            description:
              'They may be tiny, but us humans could learn a thing or two from ants.',
            duration: 191,
            thumbnailUrl:
              'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
          },
          {
            '@type': 'VideoObject',
            name: 'Lorem ipsum is commonly used placeholder text.',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
            duration: 191,
            thumbnailUrl:
              'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });
});
