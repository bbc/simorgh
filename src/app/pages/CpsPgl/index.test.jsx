/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import assocPath from 'ramda/src/assocPath';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import CpsAssetPage from '.';
import noOnwardJourneys from '#data/pidgin/cpsAssets/sport-23252855';
import someCpsOnwardJourneys from '#data/azeri/cpsAssets/azerbaijan-44208474.json';
import allCpsOnwardJourneys from '#data/pidgin/cpsAssets/tori-49221071.json';
import pglAboutData from '#data/afaanoromoo/cpsAssets/oduu-41217768';
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

describe('CPS PGL Page', () => {
  describe('snapshots', () => {
    it('should match snapshot for PGL with no onward journeys', async () => {
      fetchPageData.mockResolvedValue({
        status: 200,
        json: noOnwardJourneys,
      });
      const { pageData } = await getInitialData();
      const page = createAssetPage({ pageData }, 'pidgin');
      await matchSnapshotAsync(page);
    });

    it('should match snapshot for PGL with about tags', async () => {
      fetchPageData.mockResolvedValue({
        status: 200,
        json: pglAboutData,
      });
      const { pageData } = await getInitialData();
      const page = createAssetPage({ pageData }, 'afaanoromoo');
      await matchSnapshotAsync(page);
    });

    it('should match snapshot for PGL with non-CPS onward journeys filtered', async () => {
      fetchPageData.mockResolvedValue({
        status: 200,
        json: someCpsOnwardJourneys,
      });
      const { pageData } = await getInitialData();
      const page = createAssetPage({ pageData }, 'azeri');
      await matchSnapshotAsync(page);
    });

    it('should match snapshot for PGL with all CPS onward journeys', async () => {
      fetchPageData.mockResolvedValue({
        status: 200,
        json: allCpsOnwardJourneys,
      });
      const { pageData } = await getInitialData();
      const page = createAssetPage({ pageData }, 'pidgin');
      await matchSnapshotAsync(page);
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetchPageData.mockResolvedValue({
      status: 200,
      json: pglAboutData,
    });
    const { pageData } = await getInitialData();
    const { getByText } = render(createAssetPage({ pageData }, 'afaanoromoo'));
    expect(getByText('21 Fuulbaana 2017')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetchPageData.mockResolvedValue({
      status: 200,
      json: pglAboutData,
    });
    const { pageData } = await getInitialData();
    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );
    const { asFragment } = render(
      createAssetPage({ pageData: pageDataWithHiddenTimestamp }, 'afaanoromoo'),
    );

    expect(document.querySelector('main time')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
