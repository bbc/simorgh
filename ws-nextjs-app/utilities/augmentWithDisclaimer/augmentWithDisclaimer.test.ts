import { Article } from '#app/models/types/optimo';
import transformer from './augmentWithDisclaimer';

const buildPageDataFixture = (blocks = [{ type: 'timestamp' }]) =>
  ({
    content: {
      model: {
        blocks,
      },
    },
  }) as Article;

const buildTogglesFixture = (enabled = true) => ({
  disclaimer: {
    enabled,
  },
});

describe('augmentWithDisclaimer', () => {
  it('Should put the disclaimer after the timestamp if positionFromTimestamp is 1', () => {
    const transformedData = transformer({
      toggles: buildTogglesFixture(),
      positionFromTimestamp: 1,
    })(buildPageDataFixture()) as Article;

    expect(transformedData.content.model.blocks[0].type).toEqual('timestamp');
    expect(transformedData.content.model.blocks[1].type).toEqual('disclaimer');
  });

  it('Should put the disclaimer before the timestamp if positionFromTimestamp is 0', () => {
    const transformedData = transformer({
      toggles: buildTogglesFixture(),
      positionFromTimestamp: 0,
    })(buildPageDataFixture()) as Article;

    expect(transformedData.content.model.blocks[0].type).toEqual('disclaimer');
    expect(transformedData.content.model.blocks[1].type).toEqual('timestamp');
  });

  it('Should put the disclaimer as the first block if the page data has no timestamp', () => {
    const transformedData = transformer({
      toggles: buildTogglesFixture(),
      positionFromTimestamp: 0,
    })(buildPageDataFixture([])) as Article;

    expect(transformedData.content.model.blocks[0].type).toEqual('disclaimer');
  });

  it('Should not add a disclaimer when toggled off for that service', () => {
    const transformedData = transformer({
      toggles: buildTogglesFixture(false),
      positionFromTimestamp: 0,
    })(buildPageDataFixture([])) as Article;

    expect(transformedData.content.model.blocks[0]).toBeUndefined();
  });

  it('Should not add a disclaimer when the article is a SFV', () => {
    const sfvArticle = {
      ...buildPageDataFixture([{ type: 'timestamp' }]),
      metadata: { consumableAsSFV: true },
    } as Article;

    const transformedData = transformer({
      toggles: buildTogglesFixture(true),
      positionFromTimestamp: 0,
    })(sfvArticle) as Article;

    const blockTypes = transformedData.content.model.blocks.map(b => b.type);
    expect(blockTypes).not.toContain('disclaimer');
  });
});
