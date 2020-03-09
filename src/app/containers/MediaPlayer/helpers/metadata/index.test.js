import {
  mediaPlayerMetadata,
  getThumbnailUri,
  getMetadataBlock,
  getMetadata,
  getUploadDate,
} from '.';
import {
  validAresMediaVideoBlock,
  validAresMediaAudioBlock,
  validAresMetadataBlock,
  validAresMediaVideoLiveStreamBlock,
  validAresMediaLiveAudioBlock,
  missingAresMediaMetadataBlock,
  multipleAresMetadataBlock,
} from '../../fixtureData';
import { getType } from '#app/containers/ChartbeatAnalytics/utils';

const embedSource =
  'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';

describe('helper', () => {
  describe('mediaPlayerMetadata', () => {
    it('returns correct video metadata', () => {
      const aresMediaBlocks = validAresMediaVideoBlock.model.blocks;
      const metadata = mediaPlayerMetadata(aresMediaBlocks, embedSource);
      const output = {
        '@context': 'http://schema.org',
        '@type': 'VideoObject',
        description:
          'They may be tiny, but us humans could learn a thing or two from ants.',
        duration: 'PT3M11S',
        embedURL:
          'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB',
        name: 'Five things ants can teach us about management',
        thumbnailUrl:
          'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
        uploadDate: '2018-10-22T14:35:32.000Z',
      };
      expect(metadata).toEqual(output);
    });

    it('returns correct audio metadata', () => {
      const aresMediaBlocks = validAresMediaAudioBlock.model.blocks;
      const metadata = mediaPlayerMetadata(aresMediaBlocks, embedSource);
      const output = {
        '@context': 'http://schema.org',
        '@type': 'AudioObject',
        description: 'Some audio from a supermarket checkout in Birmingham',
        duration: 'PT2M7S',
        embedURL:
          'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB',
        name: 'Birmingham checkout',
        thumbnailUrl:
          'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01mt2kt.jpg',
        uploadDate: '2019-04-12T11:09:55.000Z',
      };
      expect(metadata).toEqual(output);
    });
  });

  describe('getThumbnailUri', () => {
    it('should return a valid thumbnail Uri', () => {
      expect(getThumbnailUri(validAresMetadataBlock)).toEqual(
        'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
      );
    });
  });

  it('should return a valid thumbnail Uri for video live stream assets', () => {
    expect(getThumbnailUri(validAresMediaVideoLiveStreamBlock)).toEqual(
      'https://b.files.bbci.co.uk/15E0C/test/_63721698_p01kx435.jpg',
    );
  });

  it('should return a valid thumbnail Uri for https assets', () => {
    const liveStreamBlockWithHttpsImageUrl = {
      ...validAresMediaVideoLiveStreamBlock,
      model: {
        ...{
          imageUrl:
            'https://b.files.bbci.co.uk/9F08/test/_63721704_testimage.jpg',
        },
      },
    };

    expect(getThumbnailUri(liveStreamBlockWithHttpsImageUrl)).toEqual(
      'https://b.files.bbci.co.uk/9F08/test/_63721704_testimage.jpg',
    );
  });

  it('should return a valid thumbnail Uri for live audio assets', () => {
    expect(getThumbnailUri(validAresMediaLiveAudioBlock)).toEqual(
      'https://b.files.bbci.co.uk/9F08/test/_63721704_testimage.jpg',
    );
  });

  describe('getUploadDate', () => {
    it('should return a valid upload date', () => {
      expect(getUploadDate(validAresMetadataBlock)).toEqual(
        '2018-10-22T14:35:32.000Z',
      );
    });
  });

  describe('getType', () => {
    it('should return a valid type', () => {
      expect(getType(validAresMetadataBlock)).toEqual(null);
    });
  });

  describe('getMetadata', () => {
    const output = {
      '@context': 'http://schema.org',
      '@type': 'VideoObject',
      description:
        'They may be tiny, but us humans could learn a thing or two from ants.',
      duration: 'PT3M11S',
      embedURL:
        'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB',
      name: 'Five things ants can teach us about management',
      thumbnailUrl:
        'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
      uploadDate: '2018-10-22T14:35:32.000Z',
    };
    it('should return a valid schema.org metadata', () => {
      expect(getMetadata({ ...validAresMetadataBlock, embedSource })).toEqual(
        output,
      );
    });
  });

  describe('getMetadataBlock', () => {
    it('should return a valid metadata block', () => {
      const aresMediaBlocks = validAresMediaVideoBlock.model.blocks;
      expect(getMetadataBlock(aresMediaBlocks)).toEqual(validAresMetadataBlock);
    });
  });

  it('should return undefined when aresMediaMetadata is not present', () => {
    const metadata = getMetadataBlock(
      missingAresMediaMetadataBlock.model.blocks,
    );
    expect(metadata).toEqual(undefined);
  });

  it('handles multiple aresMediaMetadata types being present', () => {
    const metadata = mediaPlayerMetadata(
      multipleAresMetadataBlock.model.blocks,
      embedSource,
    );
    const output = {
      '@context': 'http://schema.org',
      '@type': 'VideoObject',
      description:
        'They may be tiny, but us humans could learn a thing or two from ants.',
      duration: null,
      embedURL:
        'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB',
      name: 'Five things ants can teach us about management',
      thumbnailUrl:
        'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
      uploadDate: '1970-01-18T19:50:18.932Z',
    };
    expect(metadata).toEqual(output);
  });
});
