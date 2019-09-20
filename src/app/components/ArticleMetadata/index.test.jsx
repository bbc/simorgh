import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleMetadata from './index';
import {
  articleDataNews,
  articleDataPersian,
} from '../../containers/Article/fixtureData';

const getISOStringDate = date => new Date(date).toISOString();

describe('ArticleMetadata', () => {
  shouldMatchSnapshot(
    'should match snapshot for News & International',
    <ArticleMetadata
      author="https://www.facebook.com/bbcnews"
      firstPublished={getISOStringDate(articleDataNews.metadata.firstPublished)}
      lastPublished={getISOStringDate(articleDataNews.metadata.lastPublished)}
      section={articleDataNews.metadata.passport.genre}
      aboutTags={articleDataNews.metadata.tags.about}
      mentionsTags={articleDataNews.metadata.tags.mentions}
    />,
  );

  shouldMatchSnapshot(
    'should match snapshot for Persian News & UK origin',
    <ArticleMetadata
      author="https://www.facebook.com/bbcnews"
      firstPublished={getISOStringDate(
        articleDataPersian.metadata.firstPublished,
      )}
      lastPublished={getISOStringDate(
        articleDataPersian.metadata.lastPublished,
      )}
      section={articleDataPersian.metadata.passport.genre}
    />,
  );
});
