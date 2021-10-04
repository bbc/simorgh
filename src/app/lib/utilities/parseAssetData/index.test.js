import { mergeDeepLeft } from 'ramda';
import {
  getHeadline,
  getFirstPublished,
  getLastPublished,
  getArticleSection,
  getLang,
  getSummary,
} from '.';
import { articleDataNews } from '#pages/ArticlePage/fixtureData';

describe('ArticleMain utils', () => {
  it('getHeadline › it should return the correct value', () => {
    const actual = getHeadline(articleDataNews);
    const expected = 'Article Headline for SEO';

    expect(actual).toEqual(expected);
  });

  it('getFirstPublished › it should return the correct value', () => {
    const actual = getFirstPublished(articleDataNews);
    const expected = '2018-01-01T12:01:00.000Z';

    expect(actual).toEqual(expected);
  });

  it('getLastPublished › it should return the correct value', () => {
    const actual = getLastPublished(articleDataNews);
    const expected = '2018-01-01T13:00:00.000Z';

    expect(actual).toEqual(expected);
  });

  it('getArticleSection › it should return the correct value', () => {
    const actual = getArticleSection(articleDataNews);
    const expected = null; // TODO

    expect(actual).toEqual(expected);
  });

  it('getLang › it should return the correct value', () => {
    const actual = getLang(articleDataNews);
    const expected = 'en-gb';

    expect(actual).toEqual(expected);
  });

  it('getSummary › it should return the correct value', () => {
    const actual = getSummary(articleDataNews);
    const expected = 'Article summary.';

    expect(actual).toEqual(expected);
  });

  it('getSummary old format › it should return undefined', () => {
    const articleDataNewsSummary = mergeDeepLeft(
      {
        promo: { summary: 'a summary ' },
      },
      articleDataNews,
    );
    const actual = getSummary(articleDataNewsSummary);
    const expected = undefined;

    expect(actual).toEqual(expected);
  });
});
