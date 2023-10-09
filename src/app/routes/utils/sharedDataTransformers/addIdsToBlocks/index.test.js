import cpsAsset from '#data/news/cpsAssets/business-55345826.json';
import addIdsToBlocks from '.';

jest.mock('uuid', () => ({
  v4: () => 'mockId',
}));

describe('addIdsToBlocks rule', () => {
  it('should recursively add ids to blocks in cps asset data', () => {
    const formattedAsset = {
      ...cpsAsset,
      content: {
        ...cpsAsset.content,
        model: {
          blocks: cpsAsset.content.blocks,
        },
      },
    };

    const actual = addIdsToBlocks(formattedAsset);

    expect(actual.content.model.blocks[1].id).toEqual('mockId');
  });

  it('should return the same object if content cannot be found', () => {
    const noContentFixture = {
      blah: [],
    };
    const actual = addIdsToBlocks(noContentFixture);

    expect(actual).toEqual(noContentFixture);
  });

  it('should return the same object if blocks cannot be found', () => {
    const noBlocksFixture = {
      content: {
        model: {
          blah: [],
        },
      },
    };
    const actual = addIdsToBlocks(noBlocksFixture);

    expect(actual).toEqual(noBlocksFixture);
  });
});
