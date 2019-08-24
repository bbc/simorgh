import React from 'react';
import MediaPage from '.';
import { shouldMatchSnapshot } from '../../../testHelpers';
import amharicPageData from '../../../../data/amharic/bbc_amharic_radio/liveradio';

const liveRadioScaffoldProps = {
  isAmp: false,
  pageType: 'media',
  service: 'amharic',
  dials: {},
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
      pageData: amharicPageData,
    },
  },
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

jest.mock('../MediaPageMain', () => {
  const MediaPageMain = () => <div>MediaPageMain</div>;

  return MediaPageMain;
});

describe('Media Page', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <MediaPage {...liveRadioScaffoldProps} />,
    );
  });
});
