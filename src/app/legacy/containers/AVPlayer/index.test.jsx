import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
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
  skin = 'classic',
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    statusCode={200}
    platform={platform}
    id="foo"
    pageType={MEDIA_PAGE}
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
          skin={skin}
        />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContextProvider>
);

const AVPlayerCanonicalODTV = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://test.bbc.com/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps?morph_env=live"
  />
);

const AVPlayerAMPODRadio = (
  <GenerateFixtureData
    platform="amp"
    embedUrl="https://polling.test.bbc.co.uk/ws/av-embeds/media/afaanoromoo/bbc_afaanoromoo_radio/w3ct0l8r/om/amp"
    title="Audio Player"
    type="audio"
    iframeTitle="Audio player"
    skin="audio"
  />
);

const AVPlayerLiveRadio = (
  <GenerateFixtureData
    platform="canonical"
    embedUrl="https://test.bbc.com/ws/av-embeds/media/bbc_korean_radio/liveradio/ko"
    title="Live radio"
    type="audio"
    iframeTitle="오디오 플레이어"
    skin="audio"
  />
);

describe('AVPlayer for On Demand TV', () => {
  shouldMatchSnapshot(
    'should match snapshot for canonical AVPlayer',
    AVPlayerCanonicalODTV,
  );

  it('should render the iframe on canonical', () => {
    render(AVPlayerCanonicalODTV);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(AVPlayerCanonicalODTV);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on canonical', () => {
    const { container } = render(AVPlayerCanonicalODTV);

    const AVPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('ویډیو پلیئر');
  });
});

describe('AVPlayer for On Demand Radio', () => {
  shouldMatchSnapshot(
    'should match snapshot for AMP AVPlayer',
    AVPlayerAMPODRadio,
  );

  it('should render the iframe on AMP', () => {
    render(AVPlayerAMPODRadio);

    expect(document.querySelector('amp-iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on AMP', () => {
    render(AVPlayerAMPODRadio);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on AMP', () => {
    const { container } = render(AVPlayerAMPODRadio);

    const AVPlayerIframeTitle = container
      .querySelector('amp-iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('Audio player');
  });
});

describe('AVPlayer for Live Radio', () => {
  shouldMatchSnapshot(
    'should match snapshot for canonical AVPlayer',
    AVPlayerLiveRadio,
  );

  it('should render the iframe on canonical', () => {
    render(AVPlayerLiveRadio);

    expect(document.querySelector('iframe')).toBeInTheDocument();
  });

  it('should contain the noscript tag for no-JS scenarios on canonical', () => {
    render(AVPlayerLiveRadio);

    expect(document.querySelector('noscript')).toBeInTheDocument();
  });

  it('should contain the iframe title on canonical', () => {
    const { container } = render(AVPlayerLiveRadio);

    const AVPlayerIframeTitle = container
      .querySelector('iframe')
      .getAttribute('title');

    expect(AVPlayerIframeTitle).toEqual('오디오 플레이어');
  });
});
