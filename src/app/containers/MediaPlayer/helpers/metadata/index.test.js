import mediaPlayerMetadata from '.';
import {
  validAresMediaVideoBlock,
  validAresMediaAudioBlock,
  missingAresMediaMetadataBlock,
  multipleAresMetadataBlock,
} from '../../fixtureData';

describe('mediaPlayerMetadata', () => {
  it('returns correct video metadata', () => {
    const metadata = mediaPlayerMetadata(validAresMediaVideoBlock);
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
              'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
            uploadDate: 1540218932000,
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });

  it('returns correct audio metadata', () => {
    const metadata = mediaPlayerMetadata(validAresMediaAudioBlock);
    const output = {
      video: {
        '@list': [
          {
            '@type': 'AudioObject',
            description: 'Some audio from a supermarket checkout in Birmingham',
            duration: 127,
            name: 'Birmingham checkout',
            thumbnailUrl:
              'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
            uploadDate: 1555067395000,
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });

  it('handles aresMediaMetadata type not being present', () => {
    const metadata = mediaPlayerMetadata(missingAresMediaMetadataBlock);
    expect(metadata).toEqual(null);
  });

  it('handles empty input', () => {
    const metadata = mediaPlayerMetadata([]);
    expect(metadata).toEqual(null);
  });

  it('handles multiple aresMediaMetadata types being present.', () => {
    const metadata = mediaPlayerMetadata(multipleAresMetadataBlock);
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
              'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
            uploadDate: 1540218932,
          },
          {
            '@type': 'VideoObject',
            name: 'Lorem ipsum is commonly used placeholder text.',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
            duration: 191,
            thumbnailUrl:
              'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
            uploadDate: 1540218932,
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });
});
