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
    playlistObject: {
      title: 'Ants',
      holdingImageURL: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
      items: [
        {
          versionID: 'p01kdbnv',
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
