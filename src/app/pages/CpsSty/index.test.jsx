/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import assocPath from 'ramda/src/assocPath';
import '@testing-library/jest-dom/extend-expect';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import CpsAssetPage from '.';
import pidginPageData from '#data/pidgin/cpsAssets/world-23252817';
import igboPageData from '#data/igbo/cpsAssets/afirika-23252735';
import fetchPageData from '#app/routes/fetchPageData';
import getInitialData from '#app/routes/cpsAsset/getInitialData';

jest.mock('#app/routes/fetchPageData');

const toggleState = {
  local: {
    mediaPlayer: {
      enabled: true,
    },
  },
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
  live: {
    mediaPlayer: {
      enabled: false,
    },
  },
};

const createAssetPage = ({ pageData }, service) => (
  <StaticRouter>
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: jest.fn() }}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType={pageData.metadata.type}
          pathname={pageData.metadata.locators.assetUri}
          service={service}
          statusCode={200}
        >
          <CpsAssetPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
  </StaticRouter>
);

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

jest.mock('../../containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

describe('CPS STY Page', () => {
  describe('snapshots', () => {
    it('should match snapshot for STY', async () => {
      fetchPageData.mockResolvedValue({
        status: 200,
        json: pidginPageData,
      });

      const { pageData } = await getInitialData();
      const page = createAssetPage({ pageData }, 'pidgin');
      await matchSnapshotAsync(page);
    });
  });
  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetchPageData.mockResolvedValue({
      status: 200,
      json: igboPageData,
    });

    const { pageData } = await getInitialData();
    const { getByText } = render(createAssetPage({ pageData }, 'igbo'));
    expect(getByText('23 Ọktọba 2019')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetchPageData.mockResolvedValue({
      status: 200,
      json: igboPageData,
    });

    const { pageData } = await getInitialData();
    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );

    const { asFragment } = render(
      createAssetPage({ pageData: pageDataWithHiddenTimestamp }, 'pidgin'),
    );

    expect(document.querySelector('main time')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
