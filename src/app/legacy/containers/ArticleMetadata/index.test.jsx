import React from 'react';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidginWithByline,
} from '#pages/ArticlePage/fixtureData';
import { getAuthorTwitterHandle } from '#components/Byline/utilities';
import {
  render,
  waitFor,
} from '#components/react-testing-library-with-providers';
import ArticleMetadata from './index';

const getISOStringDate = date => new Date(date).toISOString();

const propsForNewsInternational = {
  articleId: articleDataNews.metadata.id,
  title: articleDataNews.promo.headlines.seoHeadline,
  author: 'https://www.facebook.com/bbcnews',
  firstPublished: getISOStringDate(articleDataNews.metadata.firstPublished),
  lastPublished: getISOStringDate(articleDataNews.metadata.lastPublished),
  section: articleDataNews.metadata.passport.genre,
  aboutTags: articleDataNews.metadata.tags.about,
  mentionsTags: articleDataNews.metadata.tags.mentions,
  lang: articleDataNews.metadata.passport.language,
  description: articleDataNews.promo.headlines.seoHeadline,
};

const propsForNewsInternationalWithByline = {
  ...propsForNewsInternational,
  twitterHandle: getAuthorTwitterHandle(
    articleDataPidginWithByline.content.model.blocks,
  ),
};

it('should render the article tags', async () => {
  render(<ArticleMetadata {...propsForNewsInternational} />, {
    service: 'news',
  });

  const expected = [
    { content: 'Royal Wedding 2018', name: 'article:tag' },
    { content: 'Duchess of Sussex', name: 'article:tag' },
    { content: 'Queen Victoria', name: 'article:tag' },
    { content: 'https://www.facebook.com/bbcnews', name: 'article:author' },
    { content: '2018-01-01T13:00:00.000Z', name: 'article:modified_time' },
    { content: '2018-01-01T12:01:00.000Z', name: 'article:published_time' },
  ];

  await waitFor(() => {
    const actual = Array.from(
      document.querySelectorAll('head > meta[name^="article:"]'),
    ).map(tag => ({
      name: tag.getAttribute('name'),
      content: tag.getAttribute('content'),
    }));

    expect(actual).toEqual(expected);
  });
});

describe('ArticleMetadata get branded image', () => {
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
    process.env.SIMORGH_APP_ENV = 'test';
  });

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  it('should render og:image if image provided', async () => {
    render(
      <ArticleMetadata
        {...propsForNewsInternational}
        imageLocator="c34e/live/fea48140-27e5-11eb-a689-1f68cd2c5502.jpg"
        imageAltText="Mock Image Alt Text"
      />,
      { service: 'news' },
    );

    await waitFor(() => {
      expect(
        document
          .querySelector('head > meta[property="og:image"]')
          .getAttribute('content'),
      ).toEqual(
        'https://ichef.test.bbci.co.uk/news/1024/branded_news/c34e/live/fea48140-27e5-11eb-a689-1f68cd2c5502.jpg',
      );
    });
  });
});

it('should render the article section meta tag if section provided', async () => {
  render(
    <ArticleMetadata
      {...propsForNewsInternational}
      section="Mock Article Section"
    />,
    { service: 'news' },
  );

  await waitFor(() => {
    expect(
      document
        .querySelector('head > meta[name="article:section"]')
        .getAttribute('content'),
    ).toEqual('Mock Article Section');
  });
});

it("should render the twitter creator meta tag with the author's handle if provided in the byline", async () => {
  render(<ArticleMetadata {...propsForNewsInternationalWithByline} />, {
    service: 'news',
  });

  await waitFor(() => {
    expect(
      document
        .querySelector('meta[name="twitter:creator"]')
        .getAttribute('content'),
    ).toEqual('@mary_harper');
  });
});

it('should match snapshot for News & International', () => {
  const { container } = render(
    <ArticleMetadata {...propsForNewsInternational} />,
    { service: 'news' },
  );
  expect(container).toMatchSnapshot();
});

it('should match snapshot for Persian News & UK origin', () => {
  const { container } = render(
    <ArticleMetadata
      articleId={articleDataPersian.metadata.id}
      title={articleDataPersian.promo.headlines.seoHeadline}
      author="https://www.facebook.com/bbcnews"
      firstPublished={getISOStringDate(
        articleDataPersian.metadata.firstPublished,
      )}
      lastPublished={getISOStringDate(
        articleDataPersian.metadata.lastPublished,
      )}
      section={articleDataPersian.metadata.passport.genre}
      aboutTags={articleDataPersian.metadata.tags.about}
      mentionsTags={articleDataPersian.metadata.tags.mentions}
      lang={articleDataPersian.metadata.passport.language}
      description={articleDataPersian.promo.headlines.seoHeadline}
    />,
    { service: 'persian' },
  );
  expect(container).toMatchSnapshot();
});

it('should match snapshot for News article with provided author twitter handle', () => {
  const { container } = render(
    <ArticleMetadata {...propsForNewsInternationalWithByline} />,
    { service: 'news' },
  );
  expect(container).toMatchSnapshot();
});
