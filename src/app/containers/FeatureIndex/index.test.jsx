import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import FeatureIndex from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

const defaultProps = {
  isAmp: false,
  pageType: 'article',
  service: 'news',
  pathname: '/pathname',
  status: 200,
};

jest.mock('../PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('../PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('../PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('../PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('../FeatureIndex', () => {
  const FeatureIndexMain = () => <div>FeatureIndexMain</div>;

  return FeatureIndexMain;
});

describe('FeatureIndex', () => {
  describe('Component', () => {
    describe('Composing the Feature Index Container using the page handlers', () => {
      shouldMatchSnapshot(
        'should compose FeatureIndex with the Page Handler in the correct order',
        <FeatureIndex {...defaultProps} />,
      );
    });
  });
});
