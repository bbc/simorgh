import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleContainer from './index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

describe('ArticleMetadata', () => {
  shouldMatchSnapshot(
    'should match snapshot for News & International',
    <ServiceContextProvider service="news">
      <ArticleContainer
        firstPublished={articleDataNews.metadata.firstPublished}
        lastPublished={articleDataNews.metadata.lastPublished}
        articleSection={articleDataNews.metadata.passport.genre}
        aboutTags={articleDataNews.metadata.tags.about}
        mentionsTags={articleDataNews.metadata.tags.mentions}
      />
    </ServiceContextProvider>,
  );

  shouldMatchSnapshot(
    'should match snapshot for Persian News & UK origin',
    <ServiceContextProvider service="persian">
      <ArticleContainer
        firstPublished={articleDataPersian.metadata.firstPublished}
        lastPublished={articleDataPersian.metadata.lastPublished}
        articleSection={articleDataPersian.metadata.passport.genre}
      />
    </ServiceContextProvider>,
  );
});
