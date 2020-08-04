/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import LiveRadioPage from '.';
import afriquePageData from './fixtureData/afrique';
import indonesianPageData from './fixtureData/indonesia';
import gahuzaPageData from './fixtureData/gahuza';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const Page = ({ pageData, service = 'afrique', isAmp = false }) => (
  <BrowserRouter>
    <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
      <ServiceContextProvider service={service} lang="fr">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
          isAmp={isAmp}
          pageType="media"
          pathname="/pathname"
          service={service}
          statusCode={200}
        >
          <LiveRadioPage pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

const renderPage = async ({ pageData, service = 'afrique', isAmp = false }) => {
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

describe('Radio Page Main', () => {
  it('should match snapshot for Canonical', async () => {
    fetch.mockResponse(JSON.stringify(afriquePageData));

    await matchSnapshotAsync(<Page pageData={afriquePageData} />);
  });

  it('should match snapshot for AMP', async () => {
    await matchSnapshotAsync(<Page pageData={afriquePageData} isAmp />);
  });

  it('should show the title for the Live Radio page', async () => {
    const { getByText } = await renderPage({
      pageData: afriquePageData,
    });

    expect(getByText('BBC Afrique Radio')).toBeInTheDocument();
  });

  it('should show the summary for the Live Radio page', async () => {
    const { getByText } = await renderPage({
      pageData: afriquePageData,
    });

    expect(getByText('Infos, musique et sports')).toBeInTheDocument();
  });

  it('should show the audio player on canonical', async () => {
    const { container } = await renderPage({ pageData: afriquePageData });
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_afrique_radio/liveradio/fr?morph_env=live',
    );
  });

  it('should show the audio player on AMP', async () => {
    const { container } = await renderPage({
      pageData: afriquePageData,
      isAmp: true,
    });
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_afrique_radio/liveradio/fr/amp?morph_env=live',
    );
  });

  it('should show the radio schedule for the Live Radio page on canonical', async () => {
    const { getByText } = await renderPage({
      pageData: indonesianPageData,
      service: 'indonesia',
    });

    const radioScheduleTitle = getByText('Siaran radio');
    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).toBeInTheDocument();
    expect(radioScheduleTitle).toBeInTheDocument();
  });

  it('should not show the radio schedule for the Live Radio page on AMP', async () => {
    renderPage({
      pageData: indonesianPageData,
      service: 'indonesia',
      isAmp: true,
    });

    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });

  it('should not show the radio schedule for services without schedules', async () => {
    renderPage({
      pageData: gahuzaPageData,
      service: 'gahuza',
    });

    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });
});
