import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import AVPlayer from '.';

/* eslint-disable react/prop-types */
const GenerateFixtureData = ({
  platform,
  assetId = 'w3ct0l8r',
  placeholderSrc = 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
  title = 'Video Player',
  type = 'video',
  embedUrl,
  iframeTitle = 'ویډیو پلیئر',
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
          placeholderSrc={placeholderSrc}
          embedUrl={embedUrl}
          iframeTitle={iframeTitle}
          title={title}
          type={type}
        />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContextProvider>
);

const AVPlayerCanonical = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live"
  />
);

const AVPlayerAMP = (
  <GenerateFixtureData
    platform="amp"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp?morph_env=live"
  />
);

describe('VideoPlayer', () => {
  shouldMatchSnapshot(
    'should match snapshot for canonical AVPlayer',
    AVPlayerCanonical,
  );

  shouldMatchSnapshot('should match snapshot for AMP AVPlayer', AVPlayerAMP);

  it('should render the iframe on canonical', () => {
    render(AVPlayerCanonical);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should render the iframe on AMP', () => {
    render(AVPlayerAMP);

    expect(document.querySelector('amp-iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(AVPlayerCanonical);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on AMP', () => {
    render(AVPlayerAMP);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the translated iframe title on canonical', () => {
    const { container } = render(AVPlayerCanonical);

    const AVPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('ویډیو پلیئر');
  });

  it('should contain the translated iframe title on AMP', () => {
    const { container } = render(AVPlayerAMP);

    const AVPlayerIframeTitle = container
      .querySelector('amp-iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('ویډیو پلیئر');
  });
});
