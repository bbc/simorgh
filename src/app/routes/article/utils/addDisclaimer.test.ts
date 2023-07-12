import russianArticle from '#data/russian/articles/cjejv43ylr0o.json';
import addDisclaimer from './addDisclaimer';
import augmentWithDisclaimer from '../../cpsAsset/getInitialData/augmentWithDisclaimer';

const fetchDataSpy = jest
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .spyOn(augmentWithDisclaimer, 'default')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .mockImplementation(() => Promise.resolve(123));

const disclaimerBlock = {
  type: 'disclaimer',
  model: {},
};

const buildTogglesFixture = (enabled = true) => ({
  disclaimer: {
    enabled,
  },
});

describe('addDisclaimer', () => {
  it('should add disclaimer to articles pages where toggles are enabled', async () => {
    const actual = await addDisclaimer(
      russianArticle.data.article,
      buildTogglesFixture(),
      false,
    );
    expect(actual.content.model.blocks).toContainEqual(disclaimerBlock);
  });
  it('should not add disclaimer to articles pages where toggles are disabled', async () => {
    const actual = await addDisclaimer(
      russianArticle.data.article,
      buildTogglesFixture(false),
      false,
    );
    expect(actual.content.model.blocks).toEqual(
      russianArticle.data.article.content.model.blocks,
    );
  });
  it('should not add disclaimer to SFV pages where toggles are enabled', async () => {
    const actual = await addDisclaimer(
      russianArticle.data.article,
      buildTogglesFixture(),
      true,
    );
    expect(actual.content.model.blocks).toEqual(
      russianArticle.data.article.content.model.blocks,
    );
  });
  it('should not add disclaimer to SFV pages where toggles are disabled', async () => {
    const actual = await addDisclaimer(
      russianArticle.data.article,
      buildTogglesFixture(false),
      true,
    );
    expect(actual.content.model.blocks).toEqual(
      russianArticle.data.article.content.model.blocks,
    );
  });
  it('should return page data unchanged if there is an error with the function', async () => {
    const actual = await addDisclaimer(
      russianArticle.data.article,
      buildTogglesFixture(false),
      true,
    );
    expect(actual.content.model.blocks).toEqual(
      russianArticle.data.article.content.model.blocks,
    );
  });
});
