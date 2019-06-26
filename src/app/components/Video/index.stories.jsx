import React from 'react';
import { storiesOf } from '@storybook/react';
import Video from './index';

const props = {
  id: 'mp#p00a00a',
  pid: 'p00a00a',
  kind: 'clip',
  title: 'Static Data Example',
  statsAppName: 'news',
  statsAppType: 'responsive',
  statsCountername: 'news.articles.c0000000000o.page',
  statsDestination: 'NEWS_PS_TEST',
  uiLocale: 'en-GB',
  mediaPlayerSettings: {
    product: 'news',
    responsive: true,
    statsObject: { clipPID: 'test' },
    mediator: {
      host: 'open.test.bbc.co.uk',
    },
    playlistObject: {
      title: 'Ants',
      holdingImageURL:
        'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01kdbpk.jpg',
      items: [
        {
          versionID: 'p01kdbnv',
          duration: 162,
          kind: 'programme',
        },
      ],
      guidance: null,
    },
  },
};

storiesOf('Video', module).add('default', () => <Video {...props} />);
