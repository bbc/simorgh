/* eslint-disable react/prop-types */
import React from 'react';
import clone from 'ramda/src/clone';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import OnDemandRadioPage from '.';
import pashtoPageData from '#data/pashto/bbc_pashto_radio/w172x8nvf4bchz5';
import koreanPageData from '#data/korean/bbc_korean_radio/w3cszwcg';
import indonesiaPageData from '#data/indonesia/bbc_indonesian_radio/w172x6r5000f38s';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import getInitialData from '#app/routes/onDemandRadio/getInitialData';

const createAssetPage = ({ pageData, service, isAmp = false }) => (
  <StaticRouter>
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={isAmp}
          pageType="media"
          pathname="/pathname"
          service={service}
          statusCode={200}
        >
          <OnDemandRadioPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </StaticRouter>
);

fetch.mockResponse(JSON.stringify(pashtoPageData));

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('OnDemand Radio Page ', () => {
  it('should match snapshot for Canonical', async () => {
    const { pageData } = await getInitialData('some-ondemand-radio-path');

    await matchSnapshotAsync(
      <ToggleContextProvider>
        <ServiceContextProvider service="pashto">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp={false}
            pageType="media"
            pathname="/pathname"
            service="pashto"
            statusCode={200}
          >
            <BrowserRouter>
              <OnDemandRadioPage service="pashto" pageData={pageData} />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const { pageData } = await getInitialData('some-ondemand-radio-path');

    await matchSnapshotAsync(
      <ToggleContextProvider>
        <ServiceContextProvider service="pashto">
          <RequestContextProvider
            bbcOrigin="https://www.test.bbc.co.uk"
            isAmp
            pageType="media"
            pathname="/pathname"
            service="pashto"
            statusCode={200}
          >
            <BrowserRouter>
              <OnDemandRadioPage service="pashto" pageData={pageData} />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>,
    );
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));
    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = render(
      createAssetPage({
        pageData: pageDataWithWithoutVideo,
        service: 'pashto',
      }),
    );

    expect(getByText('وروستي خبرونه')).toBeInTheDocument();
  });

  it('should show the episode title for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));
    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = render(
      createAssetPage({
        pageData: pageDataWithWithoutVideo,
        service: 'pashto',
      }),
    );

    expect(getByText('04/02/2020 GMT')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(indonesiaPageData));
    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = render(
      createAssetPage({
        pageData: pageDataWithWithoutVideo,
        service: 'indonesia',
      }),
    );

    expect(
      getByText(
        'Berita terbaru dari seluruh dunia dan ulasan peristiwa dari Indonesia. Juga berita olahraga terbaru dan berbeda setiap harinya.',
      ),
    ).toBeInTheDocument();
  });

  it('should show the audio player on canonical', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableUntil = 9999999999999999999999999;
    const koreanPageDataWithAvailableEpisiode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisiode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container } = render(
      createAssetPage({ pageData, service: 'korean' }),
    );
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/w3cszwcg/ko',
    );
  });

  it('should show the audio player on AMP', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableUntil = 9999999999999999999999999;
    const koreanPageDataWithAvailableEpisiode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisiode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container } = render(
      createAssetPage({ pageData, service: 'korean', isAmp: true }),
    );
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/w3cszwcg/ko/amp',
    );
  });

  it('should show the expired content message if episode is expired', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableUntil = 15856595095250000;
    const koreanPageDataWithExpiredEpisiode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithExpiredEpisiode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container, getByText } = render(
      createAssetPage({ pageData, service: 'korean' }),
    );
    const audioPlayerIframeEl = container.querySelector('iframe');
    const expiredMessageEl = getByText('더 이상 이용할 수 없는 콘텐츠입니다.');

    expect(audioPlayerIframeEl).not.toBeInTheDocument();
    expect(expiredMessageEl).toBeInTheDocument();
  });

  it('should not show the audio player if it is not available yet', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableFrom = 9999999999999999999999999;
    const koreanPageDataWithExpiredEpisiode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithExpiredEpisiode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container } = render(
      createAssetPage({ pageData, service: 'korean' }),
    );
    const audioPlayerIframeEl = container.querySelector('iframe');

    expect(audioPlayerIframeEl).not.toBeInTheDocument();
  });
});
