/* eslint-disable react/prop-types */
import React from 'react';
import assocPath from 'ramda/src/assocPath';
import { render, act } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import OnDemandRadioPage from '.';
import pashtoPageData from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import koreanPageData from '#data/korean/bbc_korean_radio/w3ct0kn5';
import zhongwenPageData from '#data/zhongwen/bbc_cantonese_radio/w172xf3r5x8hw4v';
import indonesiaPageData from '#data/indonesia/bbc_indonesian_radio/w172xh267fpn19l';
import afaanoromooPageData from '#data/afaanoromoo/bbc_afaanoromoo_radio/w13xttnw';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import getInitialData from '#app/routes/onDemandRadio/getInitialData';

const Page = ({ pageData, service, isAmp = false, variant }) => (
  <StaticRouter>
    <ToggleContextProvider
      service={service}
      origin="https://www.test.bbc.co.uk"
    >
      <ServiceContextProvider service={service} variant={variant}>
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

const renderPage = async ({ pageData, service, isAmp = false, variant }) => {
  let result;
  await act(async () => {
    result = await render(
      <Page
        pageData={pageData}
        service={service}
        isAmp={isAmp}
        variant={variant}
      />,
    );
  });

  return result;
};

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const { env } = process;

const getAvailableEpisode = assocPath(
  ['content', 'blocks', 0, 'availability'],
  'available',
);

const pageType = 'media';

describe('OnDemand Radio Page ', () => {
  beforeEach(() => {
    process.env = { ...env };
  });

  it('should match snapshot for Canonical', async () => {
    const pashtoPageDataWithAvailableEpisode = getAvailableEpisode(
      pashtoPageData,
    );
    fetch.mockResponse(JSON.stringify(pashtoPageDataWithAvailableEpisode));
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });

    await matchSnapshotAsync(<Page pageData={pageData} service="pashto" />);
  });

  it('should match snapshot for AMP', async () => {
    const pashtoPageDataWithAvailableEpisode = getAvailableEpisode(
      pashtoPageData,
    );
    fetch.mockResponse(JSON.stringify(pashtoPageDataWithAvailableEpisode));
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });

    await matchSnapshotAsync(
      <Page pageData={pageData} service="pashto" isAmp />,
    );
  });

  it('should show the brand title for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { getByText } = await renderPage({
      pageData: pageDataWithWithoutVideo,
      service: 'pashto',
    });

    expect(getByText('ماښامنۍ خپرونه')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Pashto OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });

    expect(getByText('۱ می ۲۰۲۰')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Korean OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(koreanPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { getByText } = await renderPage({
      pageData: pageDataWithWithoutVideo,
      service: 'korean',
    });

    expect(getByText('2020년 5월 4일')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Indonesian OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(indonesiaPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { getByText } = await renderPage({
      pageData: pageDataWithWithoutVideo,
      service: 'indonesia',
    });

    expect(getByText('27 April 2020')).toBeInTheDocument();
  });

  it('should show the datestamp correctly for Zhongwen OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(zhongwenPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });

    const { getByText } = await renderPage({
      pageData,
      variant: 'trad',
      service: 'zhongwen',
    });

    expect(getByText('2020年6月6日')).toBeInTheDocument();
  });

  it('should show the summary for OnDemand Radio Pages', async () => {
    fetch.mockResponse(JSON.stringify(indonesiaPageData));

    const { pageData: pageDataWithWithoutVideo } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
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
    const koreanPageDataWithAvailableEpisode = getAvailableEpisode(
      koreanPageData,
    );
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({ pageData, service: 'korean' });
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/korean/bbc_korean_radio/w3ct0kn5/ko?morph_env=live',
    );
  });

  it('should show the audio player on canonical using no override on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const koreanPageDataWithAvailableEpisode = getAvailableEpisode(
      koreanPageData,
    );
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({ pageData, service: 'korean' });
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.bbc.co.uk/ws/av-embeds/media/korean/bbc_korean_radio/w3ct0kn5/ko',
    );
  });

  it('should show the audio player on AMP', async () => {
    const koreanPageDataWithAvailableEpisode = getAvailableEpisode(
      koreanPageData,
    );
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'korean',
      isAmp: true,
    });
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      `https://polling.test.bbc.co.uk/ws/av-embeds/media/korean/bbc_korean_radio/w3ct0kn5/ko/amp?morph_env=live`,
    );
  });

  it('should show the audio player on AMP using no override on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const koreanPageDataWithAvailableEpisode = getAvailableEpisode(
      koreanPageData,
    );
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'korean',
      isAmp: true,
    });
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.bbc.co.uk/ws/av-embeds/media/korean/bbc_korean_radio/w3ct0kn5/ko/amp',
    );
  });

  it('should show the expired content message if episode is expired', async () => {
    fetch.mockResponse(JSON.stringify(koreanPageData));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container, getByText } = await renderPage({
      pageData,
      service: 'korean',
    });
    const audioPlayerIframeEl = container.querySelector('iframe');
    const expiredMessageEl = getByText('더 이상 이용할 수 없는 콘텐츠입니다.');

    expect(audioPlayerIframeEl).not.toBeInTheDocument();
    expect(expiredMessageEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should show the 'content not yet available' message if episode is not yet available", async () => {
    const koreanPageDataWithNotYetAvailableEpisode = assocPath(
      ['content', 'blocks', 0, 'availability'],
      'future',
      koreanPageData,
    );

    fetch.mockResponse(
      JSON.stringify(koreanPageDataWithNotYetAvailableEpisode),
    );
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container, getByText } = await renderPage({
      pageData,
      service: 'korean',
    });
    const audioPlayerIframeEl = container.querySelector('iframe');
    const notYetAvailableMessageEl = getByText(
      '아직 재생할 수 없는 프로그램입니다.',
    );

    expect(audioPlayerIframeEl).not.toBeInTheDocument();
    expect(notYetAvailableMessageEl).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should return bbc_afaanoromoo_radio when the masterBrand is bbc_oromo_radio on canonical', async () => {
    const afaanPageDataWithAvailableEpisode = getAvailableEpisode(
      afaanoromooPageData,
    );
    fetch.mockResponse(JSON.stringify(afaanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'afaanoromoo',
    });
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om?morph_env=live',
    );
  });

  it('should return bbc_afaanoromoo_radio when the masterBrand is bbc_oromo_radio on AMP', async () => {
    const afaanPageDataWithAvailableEpisode = getAvailableEpisode(
      afaanoromooPageData,
    );
    fetch.mockResponse(JSON.stringify(afaanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'afaanoromoo',
      isAmp: true,
    });
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om/amp?morph_env=live',
    );
  });

  it('should contain the translated iframe title', async () => {
    const koreanPageDataWithAvailableEpisode = getAvailableEpisode(
      koreanPageData,
    );
    fetch.mockResponse(JSON.stringify(koreanPageDataWithAvailableEpisode));
    const { pageData } = await getInitialData({
      path: 'some-ondemand-radio-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'korean',
    });

    const audioPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(audioPlayerIframeTitle).toEqual('오디오 플레이어');
  });
});
