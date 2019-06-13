import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import FrontPageContainer from './index';

// explicitly ignore console.log errors for Article/index:getInitialProps() error logging
global.console.log = jest.fn();

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

jest.mock('../FrontPageMain', () => {
  const FrontPageMain = () => <div>FrontPageMain</div>;

  return FrontPageMain;
});

describe('FrontPageContainer', () => {
  describe('Component', () => {
    describe('Composing the Front Page Container using the page handlers', () => {
      shouldMatchSnapshot(
        'should compose frontPageContainer with the Page Handler in the correct order',
        <FrontPageContainer />,
      );
    });
  });
});
