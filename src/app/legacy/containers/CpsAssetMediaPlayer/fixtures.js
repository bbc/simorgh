import { singleTextBlock } from '#models/blocks';

const imageBlock = {
  model: {
    blocks: [
      {
        model: {
          copyrightHolder: 'BBC',
          height: 1080,
          locator: 'ichef.test.bbci.co.uk/images/ic/$widthxn/p01kx435.jpg',
          originCode: 'pips',
          width: 1920,
        },
        type: 'rawImage',
        id: '6b325d89-52d3-482d-a796-5a938cb98515',
        position: [2, 1, 2, 1],
      },
      {
        model: {
          blocks: [singleTextBlock('Ants', 'mock-id-2')],
        },
        type: 'altText',
      },
    ],
  },
  type: 'image',
  id: '581054d8-7876-4f4c-acbe-61ebff7094e3',
  position: [2, 1, 2],
};

export default {
  model: {
    blocks: [
      {
        blockId: 'urn:bbc:ares::clip:p01kx42s',
        model: {
          advertising: true,
          embedding: true,
          format: 'video',
          id: 'p01kx42s',
          imageCopyright: 'BBC',
          imageUrl: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01kx435.jpg',
          subType: 'clip',
          syndication: {
            destinations: [],
          },
          synopses: {
            short: 'short',
          },
          title: 'alt-text world service clip',
          versions: [
            {
              availableFrom: 1545304011000,
              availableTerritories: {
                nonUk: true,
                uk: true,
                world: false,
              },
              duration: 5,
              durationISO8601: 'PT5S',
              types: ['Original'],
              versionId: 'p01kx42v',
              warnings: {},
            },
          ],
        },
        type: 'aresMediaMetadata',
      },
      imageBlock,
    ],
  },
  type: 'aresMedia',
};
