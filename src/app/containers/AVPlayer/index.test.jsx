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

const VideoPlayerCanonical = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live"
  />
);

const VideoPlayerAMP = (
  <GenerateFixtureData
    platform="amp"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp?morph_env=live"
  />
);

const AudioPlayerCanonical = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om"
    title="Audio Player"
    type="audio"
    iframeTitle="Audio player"
    skin="audio"
  />
);

const AudioPlayerAMP = (
  <GenerateFixtureData
    platform="amp"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om/amp"
    title="Audio Player"
    type="audio"
    iframeTitle="Audio player"
    skin="audio"
  />
);

describe('AVPlayer for TV', () => {
  shouldMatchSnapshot(
    'should match snapshot for canonical AVPlayer',
    VideoPlayerCanonical,
  );

  shouldMatchSnapshot('should match snapshot for AMP AVPlayer', VideoPlayerAMP);

  it('should render the iframe on canonical', () => {
    render(VideoPlayerCanonical);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should render the iframe on AMP', () => {
    render(VideoPlayerAMP);

    expect(document.querySelector('amp-iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(VideoPlayerCanonical);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on AMP', () => {
    render(VideoPlayerAMP);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on canonical', () => {
    const { container } = render(VideoPlayerCanonical);

    const AVPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('ویډیو پلیئر');
  });

  it('should contain the iframe title on AMP', () => {
    const { container } = render(VideoPlayerAMP);

    const AVPlayerIframeTitle = container
      .querySelector('amp-iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('ویډیو پلیئر');
  });
});

describe('AVPlayer for Radio', () => {
  shouldMatchSnapshot(
    'should match snapshot for canonical AVPlayer',
    AudioPlayerCanonical,
  );

  shouldMatchSnapshot('should match snapshot for AMP AVPlayer', AudioPlayerAMP);

  it('should render the iframe on canonical', () => {
    render(AudioPlayerCanonical);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });
  it('should render the iframe on canonical', () => {
    render(AudioPlayerCanonical);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should render the iframe on AMP', () => {
    render(AudioPlayerAMP);

    expect(document.querySelector('amp-iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(AudioPlayerCanonical);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on AMP', () => {
    render(AudioPlayerAMP);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on canonical', () => {
    const { container } = render(AudioPlayerCanonical);

    const AVPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('Audio player');
  });

  it('should contain the iframe title on AMP', () => {
    const { container } = render(AudioPlayerAMP);

    const AVPlayerIframeTitle = container
      .querySelector('amp-iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('Audio player');
  });
});
