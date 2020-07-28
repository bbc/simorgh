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
import PhotoGalleryPage from '.';
import noOnwardJourneys from '#data/pidgin/cpsAssets/sport-23252855';
import someCpsOnwardJourneys from '#data/azeri/cpsAssets/azerbaijan-44208474.json';
import allCpsOnwardJourneys from '#data/pidgin/cpsAssets/tori-49221071.json';
import pglAboutData from '#data/afaanoromoo/cpsAssets/oduu-41217768';
import getInitialData from '#app/routes/cpsAsset/getInitialData';

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => <Component {...props} />;
});

jest.mock('#lib/config/toggles', () => ({
  local: {
    enableFetchingToggles: { enabled: false },
    mediaPlayer: {
      enabled: true,
    },
  },
}));

const createAssetPage = ({ pageData }, service) => (
  <StaticRouter>
    <PhotoGalleryPage
      service={service}
      pageData={pageData}
      bbcOrigin="https://www.test.bbc.co.uk"
      isAmp={false}
      pageType={pageData.metadata.type}
      pathname={pageData.metadata.locators.assetUri}
      status={200}
    />
  </StaticRouter>
);

describe('Photo Gallery Page', () => {
  describe('snapshots', () => {
    it('should match snapshot for PGL with no onward journeys', async () => {
      fetch.mockResponse(JSON.stringify(noOnwardJourneys));
      const { pageData } = await getInitialData('some-cps-pgl-path');
      const page = createAssetPage({ pageData }, 'pidgin');
      await matchSnapshotAsync(page);
    });

    it('should match snapshot for PGL with about tags', async () => {
      fetch.mockResponse(JSON.stringify(pglAboutData));
      const { pageData } = await getInitialData('some-cps-pgl-path');
      const page = createAssetPage({ pageData }, 'afaanoromoo');
      await matchSnapshotAsync(page);
    });

    it('should match snapshot for PGL with non-CPS onward journeys filtered', async () => {
      fetch.mockResponse(JSON.stringify(someCpsOnwardJourneys));
      const { pageData } = await getInitialData('some-cps-pgl-path');
      const page = createAssetPage({ pageData }, 'azeri');
      await matchSnapshotAsync(page);
    });

    it('should match snapshot for PGL with all CPS onward journeys', async () => {
      fetch.mockResponse(JSON.stringify(allCpsOnwardJourneys));
      const { pageData } = await getInitialData('some-cps-pgl-path');
      const page = createAssetPage({ pageData }, 'pidgin');
      await matchSnapshotAsync(page);
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetch.mockResponse(JSON.stringify(pglAboutData));
    const { pageData } = await getInitialData('some-cps-pgl-path');
    const { getByText } = render(createAssetPage({ pageData }, 'afaanoromoo'));
    expect(getByText('21 Fuulbaana 2017')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetch.mockResponse(JSON.stringify(pglAboutData));
    const { pageData } = await getInitialData('some-cps-pgl-path');
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
