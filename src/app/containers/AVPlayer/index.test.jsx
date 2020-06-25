import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AVPlayer from '.';

/* eslint-disable react/prop-types */
const GenerateFixtureData = ({
  platform,
  assetId = 'w3ct0l8r',
  title = 'Video Player',
  type = 'video',
  embedUrl,
  iframeTitle = 'On Demand TV',
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
        <AVPlayer
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

const VideoCanonicalNoPlaceholder = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live"
  />
);

const VideoAMPWithPlaceholder = (
  <GenerateFixtureData
    platform="amp"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp?morph_env=live"
  />
);

describe('VideoPlayer', () => {
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
