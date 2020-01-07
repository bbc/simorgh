import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ArticleContainer from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

const defaultProps = {
  isAmp: false,
  pageType: 'error',
  status: 404,
  service: 'news',
  pathname: '/pathname',
};

jest.mock('../../Containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('../../Containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('../../Containers/PageHandlers/withContexts', () => Component => {
  const ErrorContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});
jest.mock('../../Containers/ErrorMain', () => {
  const ErrorMain = () => <div>ErrorMain</div>;

  return ErrorMain;
});

describe('ErrorContainer', () => {
  shouldMatchSnapshot(
    'should compose ErrorContainer with the Page Handler in the correct order',
    <ArticleContainer {...defaultProps} />,
  );
});
