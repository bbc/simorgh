import React from 'react';
import ArticleMain from '.';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

describe('ArticleMain', () => {
  shouldMatchSnapshot(
    'should render a news article correctly',
    <ArticleMain service="news" articleData={articleDataNews} />,
  );

  shouldMatchSnapshot(
    'should render a persian article correctly',
    <ArticleMain service="persian" articleData={articleDataPersian} />,
  );

  shouldMatchSnapshot(
    'should render null if no headline block',
    <ArticleMain service="news" articleData={articleDataNewsNoHeadline} />,
  );
});
