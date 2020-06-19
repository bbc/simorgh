import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { string } from 'prop-types';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AudioPlayer from '.';

/* eslint-disable react/prop-types */
const GenerateFixtureData = ({
  platform,
  assetId = 'w3ct0l8r',
  title = 'Audio Player',
  type = 'audio',
  embedUrl,
  iframeTitle = 'Audio Player',
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="foo"
    pageType="media"
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <BrowserRouter>
        <AudioPlayer
          assetId={assetId}
          embedUrl={embedUrl}
          iframeTitle={iframeTitle}
          title={title}
          type={type}
        />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContextProvider>
);

GenerateFixtureData.propTypes = {
  platform: string.isRequired,
  title: string.isRequired,
  assetId: string.isRequired,
  type: string.isRequired,
  embedUrl: string.isRequired,
  iframeTitle: string.isRequired,
};

const VideoAMPWithPlaceholder = (
  <GenerateFixtureData
    platform="amp"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om/amp"
  />
);

const VideoCanonicalNoPlaceholder = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om"
  />
);

describe('AudioPlayer', () => {
  it('should render the iframe on canonical', () => {
    render(VideoCanonicalNoPlaceholder);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should render the iframe on AMP', () => {
    render(VideoAMPWithPlaceholder);

    expect(document.querySelector('amp-iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(VideoCanonicalNoPlaceholder);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on AMP', () => {
    render(VideoAMPWithPlaceholder);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });
});
