import { OptimoBlock } from '#app/models/types/optimo';
import isPortraitVideo from '.';

const mediaBlockWithPV: OptimoBlock[] = [
  {
    id: '326c14fc',
    type: 'aresMedia',
    model: {
      blocks: [
        {
          id: 'b6ceabfb',
          blockId: 'urn:bbc:ares::clip:p0l0sm0w',
          type: 'aresMediaMetadata',
          model: {
            id: 'p0l0sm0w',
            subType: 'clip',
            format: 'video',
            title: 'test',
            synopses: {
              short: 'test',
              long: 'test',
              medium: 'test',
            },
            imageUrl: 'test',
            embedding: true,
            advertising: true,
            versions: [
              {
                versionId: 'p0l0sm10',
                types: ['Portrait'],
                duration: 88,
                durationISO8601: 'PT1M28S',
                warnings: {},
                availableTerritories: {
                  uk: true,
                  nonUk: true,
                },
                availableFrom: 1743098855000,
              },
            ],
            syndication: {
              destinations: ['default'],
            },
            smpKind: 'programme',
            webcastVersions: [],
          },
          position: [2, 2, 1],
        },
      ],
    },
    position: [2, 2],
  },
];

const mediaBlockWithoutPV: OptimoBlock[] = [
  {
    id: '326c14fc',
    type: 'aresMedia',
    model: {
      blocks: [
        {
          id: 'b6ceabfb',
          blockId: 'urn:bbc:ares::clip:p0l0sm0w',
          type: 'aresMediaMetadata',
          model: {
            id: 'p0l0sm0w',
            subType: 'clip',
            format: 'video',
            title: 'test',
            synopses: {
              short: 'test',
              long: 'test',
              medium: 'test',
            },
            imageUrl: 'test',
            embedding: true,
            advertising: true,
            versions: [
              {
                versionId: 'p0l0sm10',
                types: ['Original'],
                duration: 88,
                durationISO8601: 'PT1M28S',
                warnings: {},
                availableTerritories: {
                  uk: true,
                  nonUk: true,
                },
                availableFrom: 1743098855000,
              },
            ],
            syndication: {
              destinations: ['default'],
            },
            smpKind: 'programme',
            webcastVersions: [],
          },
          position: [2, 2, 1],
        },
      ],
    },
    position: [2, 2],
  },
];

describe('isPortraitVideo', () => {
  it('Should return true if media block includes a portrait video', () => {
    expect(isPortraitVideo(mediaBlockWithPV)).toBe(true);
  });

  it('Should return false if media block does not include a portrait video', () => {
    expect(isPortraitVideo(mediaBlockWithoutPV)).toBe(false);
  });

  it('Should return false if media block does not include an Ares media block', () => {
    expect(isPortraitVideo([])).toBe(false);
  });
});
