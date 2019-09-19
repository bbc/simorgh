import React from 'react';
import { string, node } from 'prop-types';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleMain from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import {
  articleDataNews,
  articleDataPersian,
  articleDataPidgin,
} from '../Article/fixtureData';

// temporary: will be removed with https://github.com/bbc/simorgh/issues/836
const articleDataNewsNoHeadline = JSON.parse(JSON.stringify(articleDataNews));
articleDataNewsNoHeadline.content.model.blocks.shift();

const Context = ({ service, children }) => (
  <ToggleContextProvider>
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pageType="article"
        pathname="/pathname"
        service={service}
      >
        {children}
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);
Context.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
};

describe('ArticleMain', () => {
  shouldMatchSnapshot(
    'should render a news article correctly',
    <Context service="news">
      <ArticleMain articleData={articleDataNews} />
    </Context>,
  );

  shouldMatchSnapshot(
    'should render a persian article correctly',
    <Context service="persian">
      <ArticleMain articleData={articleDataPersian} />
    </Context>,
  );

  shouldMatchSnapshot(
    'should render a pidgin article correctly (with navigation)',
    <Context service="pidgin">
      <ArticleMain articleData={articleDataPidgin} />
    </Context>,
  );
});
