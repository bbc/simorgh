import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import RadioPage from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';

const liveRadioScaffoldProps = {
  isAmp: false,
  pageType: 'media',
  service: 'amharic',
  pathname: '/pathname',
  match: {
    params: {
      serviceId: 'bbc_amharic_radio',
      mediaId: 'liveradio',
      pageData: amharicPageData,
    },
  },
  status: 200,
};

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

jest.mock('../../containers/RadioPageMain', () => {
  const RadioPageMain = () => <div>RadioPageMain</div>;

  return RadioPageMain;
});

describe('Radio Page', () => {
  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should match scaffold snapshot',
      <RadioPage {...liveRadioScaffoldProps} />,
    );
  });
});
