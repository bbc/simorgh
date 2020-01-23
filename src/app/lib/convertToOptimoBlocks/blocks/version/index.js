import pick from 'ramda/src/pick';
import path from 'ramda/src/path';

const generateVideoBlock = block => {
  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: {
      ...pick(['embedding', 'id', 'subType', 'live'], block),
      format: block.format === 'video' ? 'audio_video' : block.format,
      title: block.caption,
      imageCopyright: path(['image', 'copyrightHolder'], block),
      imageUrl: path(['image', 'href'], block),
      synopses: {
        short: block.caption,
        medium: block.caption,
        long: block.caption,
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

const generateImageBlock = block => {
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

const withValidationCheck = convertedBlock => {
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

const convertVersion = block => {
  const convertedBlock = {
    type: 'version',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [generateVideoBlock(block), generateImageBlock(block)],
          },
        },
      ],
    },
  };

  return withValidationCheck(convertedBlock);
};

export default convertVersion;
