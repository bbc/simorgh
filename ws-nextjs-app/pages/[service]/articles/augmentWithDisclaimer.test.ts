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

describe('augmentWithDisclaimer', () => {
  it('Should put the disclaimer after the timestamp if positionFromTimestamp is 1', () => {
    const transformedData = transformer({
      positionFromTimestamp: 1,
    })(buildPageDataFixture()) as Article;

    expect(transformedData.content.model.blocks[0].type).toEqual('timestamp');
    expect(transformedData.content.model.blocks[1].type).toEqual('disclaimer');
  });

  it('Should put the disclaimer before the timestamp if positionFromTimestamp is 0', () => {
    const transformedData = transformer({
      positionFromTimestamp: 0,
    })(buildPageDataFixture()) as Article;

    expect(transformedData.content.model.blocks[0].type).toEqual('disclaimer');
    expect(transformedData.content.model.blocks[1].type).toEqual('timestamp');
  });

  it('Should put the disclaimer as the first block if the page data has no timestamp', () => {
    const transformedData = transformer({
      positionFromTimestamp: 0,
    })(buildPageDataFixture([])) as Article;

    expect(transformedData.content.model.blocks[0].type).toEqual('disclaimer');
  });

  it('Should not add a disclaimer when the article is a SFV', () => {
    const sfvArticle = {
      ...buildPageDataFixture([{ type: 'timestamp' }]),
      metadata: { consumableAsSFV: true },
    } as Article;

    const transformedData = transformer({
      positionFromTimestamp: 0,
    })(sfvArticle) as Article;

    const blockTypes = transformedData.content.model.blocks.map(b => b.type);
    expect(blockTypes).not.toContain('disclaimer');
  });
});
