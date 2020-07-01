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

const AVPlayerCanonicalTV = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live"
  />
);

const AVPlayerAMPRadio = (
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
    AVPlayerCanonicalTV,
  );

  it('should render the iframe on canonical', () => {
    render(AVPlayerCanonicalTV);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(AVPlayerCanonicalTV);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on canonical', () => {
    const { container } = render(AVPlayerCanonicalTV);

    const AVPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('ویډیو پلیئر');
  });
});

describe('AVPlayer for Radio', () => {
  shouldMatchSnapshot(
    'should match snapshot for AMP AVPlayer',
    AVPlayerAMPRadio,
  );

  it('should render the iframe on AMP', () => {
    render(AVPlayerAMPRadio);

    expect(document.querySelector('amp-iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on AMP', () => {
    render(AVPlayerAMPRadio);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on AMP', () => {
    const { container } = render(AVPlayerAMPRadio);

    const AVPlayerIframeTitle = container
      .querySelector('amp-iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('Audio player');
  });
});
