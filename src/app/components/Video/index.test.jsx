import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import Video from './index';

describe('Video', () => {
  describe('with data', () => {
    const props = {
      pid: 'p00a0a0m',
      kind: 'episode',
      title: 'Hello World',
      items: [
        {
          versionID: 'p00a0a0v',
          kind: 'episode',
          duration: 100,
        },
      ],
      holdingImageUrl: 'https://foo/bar/baz.png',
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
