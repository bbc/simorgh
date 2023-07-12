import russianArticle from '#data/russian/articles/cjejv43ylr0o.json';
import addDisclaimer from './addDisclaimer';

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
});
