import pick from 'ramda/src/pick';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isNil from 'ramda/src/isNil';

const generateVideoBlock = (block, json) => {
  const headline = pathOr(
    block.caption,
    ['promo', 'headlines', 'headline'],
    json,
  );

  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: {
      ...pick(['embedding', 'id', 'subType', 'live'], block),
      // If available is undefined, the video is available
      available: isNil(block.available) ? true : block.available,
      format: block.format === 'video' ? 'audio_video' : block.format,
      title: headline,
      imageCopyright: path(['image', 'copyrightHolder'], block),
      imageUrl: path(['image', 'href'], block),
      synopses: {
        short: headline,
        medium: headline,
        long: headline,
      },
      versions: [
        {
          kind: 'programme',
          live: true,
          versionId: block.externalId,
        },
      ],
    },
  };

  return generatedBlock;
};

const generateImageBlock = (block) => {
  return {
    type: 'image',
    model: {
      blocks: [
        {
          type: 'rawImage',
          model: {
            copyrightHolder: path(['image', 'copyrightHolder'], block),
            locator: path(['image', 'href'], block),
            originCode: 'pips',
          },
        },
      ],
    },
  };
};

const withValidationCheck = (convertedBlock) => {
  const aresMediaMetadata = path(
    ['model', 'blocks', 0, 'model', 'blocks', 0, 'model'],
    convertedBlock,
  );

  const imageBlock = path(
    ['model', 'blocks', 0, 'model', 'blocks', 1, 'model', 'blocks', 0, 'model'],
    convertedBlock,
  );

  const checks = [
    path(['type'], convertedBlock),
    aresMediaMetadata,
    path(['format'], aresMediaMetadata),
    path(['id'], aresMediaMetadata),
    path(['imageUrl'], aresMediaMetadata),
    path(['versions', 0, 'versionId'], aresMediaMetadata),
    imageBlock,
    path(['locator'], imageBlock),
  ];

  return checks.every(Boolean) && convertedBlock;
};

const convertVersion = (block, json) => {
  const convertedBlock = {
    type: 'version',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [
              generateVideoBlock(block, json),
              generateImageBlock(block),
            ],
          },
        },
      ],
    },
  };

  return withValidationCheck(convertedBlock);
};

export default convertVersion;
