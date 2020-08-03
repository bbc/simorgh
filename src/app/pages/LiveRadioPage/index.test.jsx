/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import LiveRadioPage from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import * as analyticsUtils from '#lib/analyticsUtils';
import getInitialData from '#app/routes/liveRadio/getInitialData';

const Page = ({ pageData, isAmp = false }) => (
  <BrowserRouter>
    <LiveRadioPage
      bbcOrigin="https://www.test.bbc.com"
      isAmp={isAmp}
      pageType="media"
      pathname="/pathname"
      service="amharic"
      status={200}
      pageData={pageData}
    />
  </BrowserRouter>
);

const renderPage = async ({ pageData, isAmp = false }) => {
  let result;
  await act(async () => {
    result = await render(<Page pageData={pageData} isAmp={isAmp} />);
  });

  return result;
};
analyticsUtils.getAtUserId = jest.fn();

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  return props => <Component {...props} />;
});

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

describe('Live radio page', () => {
  it('should match snapshot for Canonical', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData({
      path: 'some-live-radio-path',
    });

    await matchSnapshotAsync(<Page pageData={pageData} />);
  });

  it('should match snapshot for AMP', async () => {
    const { pageData } = await getInitialData({
      path: 'some-live-radio-path',
    });

    await matchSnapshotAsync(<Page pageData={pageData} isAmp />);
  });

  it('should show the title for the Live Radio page', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData('some-live-radio-path');

    const { getByText } = await renderPage({
      pageData,
    });

    expect(getByText('ያድምጡ')).toBeInTheDocument();
  });

  it('should show the summary for the Live Radio page', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData('some-live-radio-path');
    const { getByText } = await renderPage({
      pageData,
    });

    expect(getByText('ዝግጅቶቻችንን’')).toBeInTheDocument();
  });

  it('should show the audio player on canonical', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData('some-live-radio-path');
    const { container } = await renderPage({ pageData });
    const audioPlayerIframeSrc = container
      .querySelector('iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am?morph_env=live',
    );
  });

  it('should show the audio player on AMP', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData('some-live-radio-path');
    const { container } = await renderPage({ pageData, isAmp: true });
    const audioPlayerIframeSrc = container
      .querySelector('amp-iframe')
      .getAttribute('src');

    expect(audioPlayerIframeSrc).toEqual(
      'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am/amp?morph_env=live',
    );
  });

  it('should show the radio schedule for the Live Radio page on canonical', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData('some-live-radio-path');

    const { getByText } = await renderPage({
      pageData,
    });

    expect(getByText('ያድምጡ')).toBeInTheDocument();
  });

  it('should show the radio schedule for the Live Radio page on AMP', async () => {
    fetch.mockResponse(JSON.stringify(amharicPageData));
    const { pageData } = await getInitialData('some-live-radio-path');

    const { getByText } = await renderPage({
      pageData,
      isAmp: true,
    });

    expect(getByText('ያድምጡ')).toBeInTheDocument();
  });
});
