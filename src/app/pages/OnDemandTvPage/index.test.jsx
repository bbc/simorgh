/* eslint-disable react/prop-types */
import React from 'react';
import assocPath from 'ramda/src/assocPath';
import { render, act } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import OnDemandTvPage from '.';
import pashtoPageData from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContext } from '#contexts/ToggleContext';
import getInitialData from '#app/routes/onDemandTV/getInitialData';

const Page = ({
  pageData,
  service,
  isAmp = false,
  darkModeEnabled = false,
}) => (
  <StaticRouter>
    <ToggleContext.Provider
      value={{
        toggleState: { cinemaModeTV: { enabled: darkModeEnabled } },
        toggleDispatch: jest.fn(),
      }}
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
          <OnDemandTvPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
  </StaticRouter>
);

const renderPage = async ({
  pageData,
  service,
  isAmp = false,
  darkModeEnabled = false,
}) => {
  let result;
  await act(async () => {
    result = await render(
      <Page
        pageData={pageData}
        service={service}
        isAmp={isAmp}
        darkModeEnabled={darkModeEnabled}
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

const pageType = 'media';

describe('OnDemand TV Brand Page ', () => {
  beforeEach(() => {
    process.env = { ...env };
  });

  it('a11y - should render a visually hidden headline', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-tv-path',
      pageType,
    });
    await renderPage({
      pageData,
      service: 'pashto',
    });

    const visuallyHiddenHeadline = document.querySelector(
      'h1[class^="VisuallyHiddenText"]',
    );

    expect(visuallyHiddenHeadline).toBeInTheDocument();
    expect(visuallyHiddenHeadline.innerHTML).toEqual('نړۍ دا وخت, ۲۷ می ۲۰۲۰');
  });

  it('should show the brand title for OnDemand TV Pages', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-tv-path',
      pageType,
    });
    const { getByText } = await renderPage({
      pageData,
      service: 'pashto',
    });

    expect(getByText('نړۍ دا وخت')).toBeInTheDocument();
  });

  it('a11y - should aria-hide the title', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-tv-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'pashto',
    });

    const hiddenHeadline = container.querySelector('strong[aria-hidden=true]');

    expect(hiddenHeadline).toBeDefined();
    expect(hiddenHeadline).toContainHTML('نړۍ دا وخت');
  });

  it('a11y - should have a "content" id on the h1', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-tv-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'pashto',
    });

    expect(container.querySelector('h1#content')).toBeDefined();
  });

  it('Dark Mode Design - should match snapshot', async () => {
    fetch.mockResponse(JSON.stringify(pashtoPageData));

    const { pageData } = await getInitialData({
      path: 'some-ondemand-tv-path',
      pageType,
    });
    const { container } = await renderPage({
      pageData,
      service: 'pashto',
      darkModeEnabled: true,
    });

    expect(container).toMatchSnapshot();
  });
});

it('should show the datestamp correctly for Pashto OnDemand TV Pages', async () => {
  fetch.mockResponse(JSON.stringify(pashtoPageData));

  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });

  expect(getByText('۲۷ می ۲۰۲۰')).toBeInTheDocument();
});

it('should show the summary for OnDemand TV Pages', async () => {
  fetch.mockResponse(JSON.stringify(pashtoPageData));

  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });

  expect(
    getByText(
      'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
    ),
  ).toBeInTheDocument();
});

it('should show the video player on canonical with no live override', async () => {
  process.env.SIMORGH_APP_ENV = 'live';
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const videoPlayerIframeSrc = container
    .querySelector('iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps',
  );
});

it('should show the video player on amp with no live override', async () => {
  process.env.SIMORGH_APP_ENV = 'live';
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
    isAmp: true,
  });
  const videoPlayerIframeSrc = container
    .querySelector('amp-iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp',
  );
});

it('should show the video player on canonical with live override', async () => {
  process.env.SIMORGH_APP_ENV = 'test';
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const videoPlayerIframeSrc = container
    .querySelector('iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live',
  );
});

it('should show the video player on amp with live override', async () => {
  fetch.mockResponse(JSON.stringify(pashtoPageData));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container } = await renderPage({
    pageData,
    service: 'pashto',
    isAmp: true,
  });
  const videoPlayerIframeSrc = container
    .querySelector('amp-iframe')
    .getAttribute('src');

  expect(videoPlayerIframeSrc).toEqual(
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp?morph_env=live',
  );
});

it('should show the expired content message if episode is expired', async () => {
  const pageDataWithExpiredEpisode = assocPath(
    ['content', 'blocks', 0, 'availability'],
    'notAvailable',
    pashtoPageData,
  );
  fetch.mockResponse(JSON.stringify(pageDataWithExpiredEpisode));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container, getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const audioPlayerIframeEl = container.querySelector('iframe');
  const expiredMessageEl = getByText('دغه فایل نور د لاسرسي وړ نه دی.');

  expect(audioPlayerIframeEl).not.toBeInTheDocument();
  expect(expiredMessageEl).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it('should show the future content message if episode is not yet available', async () => {
  const pageDataWithFutureEpisode = assocPath(
    ['content', 'blocks', 0, 'availability'],
    'future',
    pashtoPageData,
  );
  fetch.mockResponse(JSON.stringify(pageDataWithFutureEpisode));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container, getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const audioPlayerIframeEl = container.querySelector('iframe');
  const notYetAvailableEl = getByText('دغه پروګرام د خپرولو لپاره چمتو نه دی.');

  expect(audioPlayerIframeEl).not.toBeInTheDocument();
  expect(notYetAvailableEl).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it('should show the future content message if episode is pending', async () => {
  const pageDataWithFutureEpisode = assocPath(
    ['content', 'blocks', 0, 'availability'],
    'pending',
    pashtoPageData,
  );
  fetch.mockResponse(JSON.stringify(pageDataWithFutureEpisode));
  const { pageData } = await getInitialData({
    path: 'some-ondemand-tv-path',
    pageType,
  });
  const { container, getByText } = await renderPage({
    pageData,
    service: 'pashto',
  });
  const audioPlayerIframeEl = container.querySelector('iframe');
  const notYetAvailableEl = getByText('دغه پروګرام د خپرولو لپاره چمتو نه دی.');

  expect(audioPlayerIframeEl).not.toBeInTheDocument();
  expect(notYetAvailableEl).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
