import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import * as analyticsUtils from '#lib/analyticsUtils';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import LiveRadioPage from './LiveRadioPage';
import afriquePageData from './fixtureData/afrique';
import indonesianPageData from './fixtureData/indonesia';
import gahuzaPageData from './fixtureData/gahuza';

const Page = ({ pageData, service, lang }) => (
  <BrowserRouter>
    <ToggleContextProvider>
      <ServiceContextProvider service={service} lang={lang}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
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

jest.mock('../../components/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('Radio Page Main', () => {
  it('should match snapshot for Canonical', () => {
    const { container } = render(
      <Page pageData={afriquePageData} service="afrique" lang="fr" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should show the title for the Live Radio page', () => {
    const { getByText } = render(
      <Page pageData={afriquePageData} service="afrique" lang="fr" />,
    );

    expect(getByText('BBC Afrique Radio')).toBeInTheDocument();
  });

  it('should show the summary for the Live Radio page', () => {
    const { getByText } = render(
      <Page pageData={afriquePageData} service="afrique" lang="fr" />,
    );

    expect(getByText('Infos, musique et sports')).toBeInTheDocument();
  });

  it('should show the audio player on canonical', () => {
    const { container } = render(
      <Page pageData={afriquePageData} service="afrique" lang="fr" />,
    );
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      '/ws/av-embeds/media/bbc_afrique_radio/liveradio/fr?morph_env=live',
    );
  });

  it('should show the radio schedule for the Live Radio page on canonical', () => {
    const { getByText } = render(
      <Page pageData={indonesianPageData} service="indonesia" lang="id" />,
    );
    const radioScheduleTitle = getByText('Siaran radio');
    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).toBeInTheDocument();
    expect(radioScheduleTitle).toBeInTheDocument();
  });

  it('should not show the radio schedule for services without a schedule', async () => {
    const { container } = render(
      <Page pageData={gahuzaPageData} service="gahuza" lang="rw" />,
    );

    const scheduleWrapper = container.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    expect(scheduleWrapper).not.toBeInTheDocument();
  });
});
