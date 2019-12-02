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
} from '../../fixtureData';
import { getType } from '#app/containers/ChartbeatAnalytics/utils';

const embedSource =
  'https://www.test.bbc.com/ws/av-embeds/articles/c3wmq4d1y3wo/p01k6mtv/en-GB';

describe('helper', () => {
  describe('mediaPlayerMetadata', () => {
    it('returns correct video metadata', () => {
      const aresMediaBlocks = validAresMediaVideoBlock.model.blocks;
      const metadata = mediaPlayerMetadata(aresMediaBlocks);
      const output = {
        '@context': 'http://schema.org',
        '@type': 'VideoObject',
        description:
          'They may be tiny, but us humans could learn a thing or two from ants.',
        duration: 'PT3M11S',
        embedURL: null,
        name: 'Five things ants can teach us about management',
        thumbnailUrl:
          'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01k6mtv.jpg',
        uploadDate: '2018-10-22T14:35:32.000Z',
      };
      expect(metadata).toEqual(output);
    });

    it('returns correct audio metadata', () => {
      const aresMediaBlocks = validAresMediaAudioBlock.model.blocks;
      const metadata = mediaPlayerMetadata(aresMediaBlocks);
      const output = {
        '@context': 'http://schema.org',
        '@type': 'AudioObject',
        description: 'Some audio from a supermarket checkout in Birmingham',
        duration: 'PT2M7S',
        embedURL: null,
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
});
