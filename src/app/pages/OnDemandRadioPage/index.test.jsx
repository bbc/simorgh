/* eslint-disable react/prop-types */
import React from 'react';
import clone from 'ramda/src/clone';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StaticRouter } from 'react-router-dom';
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

const Page = ({ pageData, service, isAmp = false }) => (
  <StaticRouter>
    <ToggleContextProvider
      service={service}
      origin="https://www.test.bbc.co.uk"
    >
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

const renderPage = async ({ pageData, service, isAmp = false }) => {
  let result;
  await act(async () => {
    result = await render(
      <Page pageData={pageData} service={service} isAmp={isAmp} />,
    );
  });

  return result;
};

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('OnDemand Radio Page ', () => {
  it('should match snapshot for Canonical', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData('some-ondemand-radio-path');

    await matchSnapshotAsync(<Page pageData={pageData} service="pashto" />);
  });

  it('should match snapshot for AMP', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData('some-ondemand-radio-path');

    await matchSnapshotAsync(
      <Page pageData={pageData} service="pashto" isAmp />,
    );
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = await renderPage({
      pageData: pageDataWithWithoutVideo,
      service: 'pashto',
    });

    expect(getByText('وروستي خبرونه')).toBeInTheDocument();
  });

  it('should show the episode title for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = await renderPage({
      pageData: pageDataWithWithoutVideo,
      service: 'pashto',
    });

    expect(getByText('04/02/2020 GMT')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(indonesiaPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData(
      'some-ondemand-radio-path',
    );
    const { getByText } = await renderPage({
      pageData: pageDataWithWithoutVideo,
      service: 'indonesia',
    });

    expect(
      getByText(
        'Berita terbaru dari seluruh dunia dan ulasan peristiwa dari Indonesia. Juga berita olahraga terbaru dan berbeda setiap harinya.',
      ),
    ).toBeInTheDocument();
  });

  it('should show the audio player on canonical', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableFrom = 1585727821683;
    clonedKoreanPageData.content.blocks[0].versions[0].availableUntil = 9999999999999;
    const koreanPageDataWithAvailableEpisode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container } = await renderPage({ pageData, service: 'korean' });
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/w3cszwcg/ko',
    );
  });

  it('should show the audio player on AMP', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableFrom = 1585727821683;
    clonedKoreanPageData.content.blocks[0].versions[0].availableUntil = 9999999999999;
    const koreanPageDataWithAvailableEpisode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container } = await renderPage({
      pageData,
      service: 'korean',
      isAmp: true,
    });
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/w3cszwcg/ko/amp',
    );
  });

  it('should show the expired content message if episode is expired', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableUntil = 1585727821683;
    const koreanPageDataWithExpiredEpisode = clonedKoreanPageData;
    fetch.mockResponse(JSON.stringify(koreanPageDataWithExpiredEpisode));
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container, getByText } = await renderPage({
      pageData,
      service: 'korean',
    });
    const audioPlayerIframeEl = container.querySelector('iframe');
    const expiredMessageEl = getByText('더 이상 이용할 수 없는 콘텐츠입니다.');

    expect(audioPlayerIframeEl).not.toBeInTheDocument();
    expect(expiredMessageEl).toBeInTheDocument();
    expect(expiredMessageEl).toMatchSnapshot();
  });

  it('should not show the audio player if it is not available yet', async () => {
    const clonedKoreanPageData = clone(koreanPageData);
    clonedKoreanPageData.content.blocks[0].versions[0].availableFrom = 9999999999999;
    const koreanPageDataWithNotYetAvailableEpisode = clonedKoreanPageData;
    fetch.mockResponse(
      JSON.stringify(koreanPageDataWithNotYetAvailableEpisode),
    );
    const { pageData } = await getInitialData('some-ondemand-radio-path');
    const { container } = await renderPage({ pageData, service: 'korean' });
    const audioPlayerIframeEl = container.querySelector('iframe');

    expect(audioPlayerIframeEl).not.toBeInTheDocument();
  });
});
