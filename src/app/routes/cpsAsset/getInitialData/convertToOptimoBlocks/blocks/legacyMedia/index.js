import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

const getImageUrl = block =>
  pathOr('', ['image', 'href'], block).replace('http://', 'https://');

const generateVideoBlock = (block, json) => {
  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: {
      available: true,
      blockId: block.id,
      format: 'audio_video',
      imageUrl: getImageUrl(block),
      title: path(['promo', 'headlines', 'headline'], json),
      synopses: {
        short: path(['promo', 'headlines', 'shortHeadline'], json),
      },
      firstPublished: path(['metadata', 'firstPublished'], json),
    },
  };

  return generatedBlock;
};

const generateImageBlock = () => {
  return {
    type: 'image',
    model: {
      blocks: [
        {
          type: 'rawImage',
          model: {
            copyrightHolder: '',
            locator: `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/media_placeholder.png`,
            originCode: 'pips',
          },
        },
      ],
    },
  };
};

const convertMedia = (block, json) => {
  const convertedBlock = {
    type: 'legacyMedia',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [generateVideoBlock(block, json), generateImageBlock()],
          },
        },
      ],
    },
  };
  return convertedBlock;
};

export default convertMedia;
