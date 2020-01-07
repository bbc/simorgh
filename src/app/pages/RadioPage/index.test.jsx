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

jest.mock('../../Containers/RadioPageMain', () => {
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
