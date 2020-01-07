import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import CpsMapPage from '.';
import pidginPageData from '#data/pidgin/cpsAssets/tori-49450859';

const cpsAssetScaffoldProps = {
  isAmp: false,
  pageType: 'MAP',
  service: 'pidgin',
  pathname: '/pidgin/tori-49450859',
  match: {
    params: {
      assetUri: 'tori-49450859',
      pageData: pidginPageData,
    },
  },
  status: 200,
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

jest.mock('../../Containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('../../Containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('../../Containers/CpsAssetPageMain', () => {
  const CpsAssetPageMain = () => <div>CpsAssetPageMain</div>;

  return CpsAssetPageMain;
});

describe('CpsMapPage', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <CpsMapPage {...cpsAssetScaffoldProps} />,
    );
  });
});
