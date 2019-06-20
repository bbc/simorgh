import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import Video from './index';

describe('Video', () => {
  describe('with data', () => {
    const props = {
      id: 'mp#p00a0a0m',
      title: 'Hello World',
      mediaPlayerSettings: {
        product: 'news',
        responsive: true,
        statsObject: { clipPID: 'p00a0a0m' },
        mediator: {
          host: 'open.test.bbc.co.uk',
        },
        playlistObject: {
          title: 'Hello World',
          holdingImageURL: 'https://foo/bar/baz.png',
          guidance: 'Scary',
          items: [
            {
              versionID: 'p01k6msm',
              kind: 'episode',
              duration: 100,
            },
          ],
        },
      },
      statsAppName: 'news',
      statsAppType: 'responsive',
      statsCountername: 'news.articles.c0000000000o.page',
      statsDestination: 'NEWS_PS_TEST',
      uiLocale: 'en-GB',
    };

    shouldShallowMatchSnapshot(
      'should render the video with valid props',
      <Video {...props} />,
    );
  });
});
