import transformer from '.';

const fixtureData = (blocks = [{ type: 'timestamp' }]) => ({
  metadata: {
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    type: 'article',
  },
  content: {
    model: {
      blocks,
    },
  },
});

describe('augmentWithDisclaimer', () => {
  it('Should put the disclaimer after the timestamp', () => {
    const transformedData = transformer(fixtureData());

    expect(transformedData.content.model.blocks[0].type).toEqual('timestamp');
    expect(transformedData.content.model.blocks[1].type).toEqual('disclaimer');
  });

  it('Should put the disclaimer as the first block if the page data has no timestamp', () => {
    const transformedData = transformer(fixtureData([]));

    expect(transformedData.content.model.blocks[0].type).toEqual('disclaimer');
  });
});
