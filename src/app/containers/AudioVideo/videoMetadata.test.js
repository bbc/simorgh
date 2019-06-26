import videoMetadata from './videoMetadata';
import {
  noAresMediaMetadata,
  multipleAresMetadata,
  videoClipGlobalGuidanceBlock,
} from './helpers/fixtures';

describe('videoMetadata', () => {
  it('returns correct video metadata', () => {
    const metadata = videoMetadata(videoClipGlobalGuidanceBlock);
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
            uploadDate: null,
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });

  it('handles aresMediaMetadata type not being present', () => {
    const metadata = videoMetadata(noAresMediaMetadata);
    expect(metadata).toEqual(null);
  });

  it('handles empty input', () => {
    const metadata = videoMetadata([]);
    expect(metadata).toEqual(null);
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
            uploadDate: 1540218932,
          },
          {
            '@type': 'VideoObject',
            name: 'Lorem ipsum is commonly used placeholder text.',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
            duration: 191,
            thumbnailUrl:
              'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
            uploadDate: 1540218932,
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });
});
