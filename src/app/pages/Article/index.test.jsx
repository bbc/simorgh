import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleContainer from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

const defaultProps = {
  isAmp: false,
  pageType: 'article',
  service: 'news',
  pathname: '/pathname',
  status: 200,
};

jest.mock('../../containers/PageHandlers/withVariant', () => Component => {
  const VariantContainer = props => (
    <div id="VariantContainer">
      <Component {...props} />
    </div>
  );

  return VariantContainer;
});

jest.mock('../../containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('../../containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('../../containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('../../containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('../../containers/ArticleMain', () => {
  const ArticleMain = () => <div>ArticleMain</div>;

  return ArticleMain;
});

describe('ArticleContainer', () => {
  describe('Component', () => {
    describe('Composing the Article Container using the page handlers', () => {
      shouldMatchSnapshot(
        'should compose articleContainer with the Page Handler in the correct order',
        <ArticleContainer {...defaultProps} />,
      );
    });
  });
});
