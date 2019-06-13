import React from 'react';
import { storiesOf } from '@storybook/react';
import Video from './index';

const props = {
  id: 'mediaPlayer',
  pid: 'p00a00a',
  kind: 'clip',
  title: 'Static Data Example',
  items: [
    {
      versionID: 'p00p00v',
      kind: 'programme',
      duration: 10,
    },
  ],
  holdingImageUrl: 'https://www.foo.bar/baz.png',
  statsAppName: 'news',
  statsAppType: 'responsive',
  statsCountername: 'news.articles.c0000000000o.page',
  statsDestination: 'NEWS_PS_TEST',
  uiLocale: 'en-GB',
  mediaPlayerSettings: {
    product: 'news',
    responsive: true,
    statsObject: { clipPID: 'p00a00a' },
    playlistObject: {
      title: 'Static Data Example',
      holdingImageURL: 'https://www.foo.bar/baz.png',
      items: [
        {
          versionID: 'p00p00v',
          duration: 111,
          kind: 'programme',
        },
      ],
    },
    mediator: {
      host: 'https://open.test.bbc.co.uk',
    },
  },
};

storiesOf('Video', module).add('default', () => <Video {...props} />);
