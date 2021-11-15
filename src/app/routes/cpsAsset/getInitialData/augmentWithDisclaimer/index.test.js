import transformer from '.';

const buildPageDataFixture = (blocks = [{ type: 'timestamp' }]) => ({
  content: {
    model: {
      blocks,
    },
  },
});

const buildTogglesFixture = (enabled = true) => ({
  disclaimer: {
    enabled,
  },
});

describe('augmentWithDisclaimer', () => {
  it('Should put the disclaimer after the timestamp', () => {
    const transformedData = transformer(buildTogglesFixture())(
      buildPageDataFixture(),
    );

    expect(transformedData.content.model.blocks[0].type).toEqual('timestamp');
    expect(transformedData.content.model.blocks[1].type).toEqual('disclaimer');
  });

  it('Should put the disclaimer as the first block if the page data has no timestamp', () => {
    const transformedData = transformer(buildTogglesFixture())(
      buildPageDataFixture([]),
    );

    expect(transformedData.content.model.blocks[0].type).toEqual('disclaimer');
  });

  it('Should not add a disclaimer when toggled off for that service', () => {
    const transformedData = transformer(buildTogglesFixture(false))(
      buildPageDataFixture([]),
    );

    expect(transformedData.content.model.blocks[0]).toBeUndefined();
  });
});
