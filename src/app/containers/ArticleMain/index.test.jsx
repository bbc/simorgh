import React from 'react';
import { node } from 'prop-types';
import ArticleMain from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

const Context = ({ children }) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    id="c0000000000o"
    isAmp={false}
    pageType="article"
    service="news"
  >
    {children}
  </RequestContextProvider>
);
Context.propTypes = {
  children: node.isRequired,
};

describe('ArticleMain', () => {
  shouldShallowMatchSnapshot(
    'should render a news article correctly',
    <Context>
      <ArticleMain service="news" articleData={articleDataNews} />
    </Context>,
  );

  shouldShallowMatchSnapshot(
    'should render a persian article correctly',
    <Context>
      <ArticleMain service="persian" articleData={articleDataPersian} />
    </Context>,
  );
});
