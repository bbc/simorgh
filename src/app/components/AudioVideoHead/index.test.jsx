import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import AudioVideoHead from './index';

describe('AudioVideoHead', () => {
  const video = {
    appName: 'news',
    appType: 'responsive',
    counterName: 'news.articles.c0000000000o.page',
    mediator: { host: 'open.test.bbc.co.uk' },
    playlistObject: {
      title: 'Five things ants can teach us about management',
      holdingImageURL:
        'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
      guidance: 'Contains strong language and adult humour.',
      items: [{ versionID: 'p01k6msp', duration: 191, kind: 'programme' }],
    },
    product: 'news',
    statsObject: { destination: 'NEWS_PS_TEST', clipPID: 'p01k6msm' },
    superResponsive: true,
    ui: {
      cta: { mode: 'duration' },
      locale: { lang: 'en-GB' },
      subtitles: { defaultOn: true, enabled: true },
    },
  };

  const audio = {
    appName: 'news',
    appType: 'responsive',
    counterName: 'news.articles.c0000000000o.page',
    mediator: { host: 'open.test.bbc.co.uk' },
    playlistObject: {
      title: 'Birmingham checkout',
      holdingImageURL:
        'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01mt2kt.jpg',
      guidance: 'Contains some strong language.',
      items: [{ versionID: 'p01m7d09', duration: 127, kind: 'audio' }],
    },
    product: 'news',
    statsObject: { destination: 'NEWS_PS_TEST', clipPID: 'p01m7d07' },
    superResponsive: true,
    ui: {
      cta: { mode: 'duration' },
      locale: { lang: 'en-GB' },
      subtitles: { defaultOn: true, enabled: true },
    },
  };

  shouldMatchSnapshot(
    'should place video mediaPlayer settings on page',
    <AudioVideoHead audioVideoAssets={[video]} />,
  );

  shouldMatchSnapshot(
    'should place audio mediaPlayer settings on page',
    <AudioVideoHead audioVideoAssets={[audio]} />,
  );

  shouldMatchSnapshot(
    'should place multiple mediaPlayer settings on page',
    <AudioVideoHead audioVideoAssets={[video, audio, video, video]} />,
  );
});
