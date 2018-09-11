import React from 'react';
import Article from './index';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const amp = false;
const articleAuthor = 'https://www.facebook.com/bbcnews';
const articleSection = 'Politics';
const canonicalLink = 'https://www.bbc.com/news/articles/c0000000001o';
const defaultImage =
  'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1';
const defaultImageAltText = 'BBC News';
const description = 'Here is the article description.';
const lang = 'en-GB';
const locale = 'en_GB';
const metaTags = [];
const opengraphSiteName = 'BBC News';
const timeFirstPublished = 1;
const timeLastUpdated = 1;
const title = 'This is a title!';
const twitterCreator = '@BBCNews';
const twitterSite = '@BBCNews';
const type = 'article';

describe('Article', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Article
      amp={amp}
      articleAuthor={articleAuthor}
      articleSection={articleSection}
      canonicalLink={canonicalLink}
      defaultImage={defaultImage}
      defaultImageAltText={defaultImageAltText}
      description={description}
      lang={lang}
      locale={locale}
      metaTags={metaTags}
      opengraphSiteName={opengraphSiteName}
      timeFirstPublished={timeFirstPublished}
      timeLastUpdated={timeLastUpdated}
      title={title}
      twitterCreator={twitterCreator}
      twitterSite={twitterSite}
      type={type}
    />,
  );
});
