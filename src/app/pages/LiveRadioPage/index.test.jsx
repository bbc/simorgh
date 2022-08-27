/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import LiveRadioPage from './LiveRadioPage';
import afriquePageData from './fixtureData/afrique';
import indonesianPageData from './fixtureData/indonesia';
import gahuzaPageData from './fixtureData/gahuza';

const Page = ({ pageData, service, lang, isAmp = false }) => (
  <BrowserRouter>
    <ToggleContextProvider>
      <ServiceContextProvider service={service} lang={lang}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
          isAmp={isAmp}
          pageType={MEDIA_PAGE}
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

analyticsUtils.getAtUserId = jest.fn();

jest.mock('../../legacy/containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('Radio Page Main', () => {
  it('should match snapshot for Canonical', () => {
    const { container } = render(
      <Page
        pageData={afriquePageData}
        service="afrique"
        lang="fr"
        isAmp={false}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for AMP', () => {
    const { container } = render(
      <Page pageData={afriquePageData} service="afrique" lang="fr" isAmp />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should show the title for the Live Radio page', () => {
    const { getByText } = render(
      <Page
        pageData={afriquePageData}
        service="afrique"
        lang="fr"
        isAmp={false}
      />,
    );

    expect(getByText('BBC Afrique Radio')).toBeInTheDocument();
  });

  it('should show the summary for the Live Radio page', () => {
    const { getByText } = render(
      <Page
        pageData={afriquePageData}
        service="afrique"
        lang="fr"
        isAmp={false}
      />,
    );

    expect(getByText('Infos, musique et sports')).toBeInTheDocument();
  });

  it('should show the audio player on canonical', () => {
    const { container } = render(
      <Page
        pageData={afriquePageData}
        service="afrique"
        lang="fr"
        isAmp={false}
      />,
    );
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      '/ws/av-embeds/media/bbc_afrique_radio/liveradio/fr?morph_env=live',
    );
  });

  it('should show the audio player on AMP', () => {
    const { container } = render(
      <Page pageData={afriquePageData} service="afrique" lang="fr" isAmp />,
    );
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_afrique_radio/liveradio/fr/amp?morph_env=live',
    );
  });

  it('should show the radio schedule for the Live Radio page on canonical', () => {
    const { getByText } = render(
      <Page
        pageData={indonesianPageData}
        service="indonesia"
        lang="id"
        isAmp={false}
      />,
    );
    const radioScheduleTitle = getByText('Siaran radio');
    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).toBeInTheDocument();
    expect(radioScheduleTitle).toBeInTheDocument();
  });

  it('should not show the radio schedule for the Live Radio page on AMP', async () => {
    const { container } = render(
      <Page
        pageData={indonesianPageData}
        service="indonesia"
        lang="id"
        isAmp
      />,
    );

    const scheduleWrapper = container.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    await waitFor(() => {
      expect(scheduleWrapper).not.toBeInTheDocument();
    });
  });

  it('should not show the radio schedule for services without a schedule', async () => {
    const { container } = render(
      <Page pageData={gahuzaPageData} service="gahuza" lang="rw" isAmp />,
    );

    const scheduleWrapper = container.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });
});
