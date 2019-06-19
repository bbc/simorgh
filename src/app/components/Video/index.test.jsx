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
        playlistObject: {
          title: 'Hello World',
          holdingImageURL: 'https://foo/bar/baz.png',
          items: [
            {
              versionID: 'p00a0a0v',
              kind: 'episode',
              duration: 100,
            },
          ],
          guidance: 'Scary',
          mediator: {
            host: 'open.test.bbc.co.uk',
          },
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
