import React from 'react';
import { storiesOf } from '@storybook/react';
import Video from './index';

const props = {
  pid: 'p00a00a',
  kind: 'clip',
  title: 'Static Data Example',
  items: [
    {
      versionID: 'p00p00v',
      kind: 'clip',
      duration: 10,
    },
  ],
  holdingImageUrl: 'https://www.foo.bar/baz.png',
  statsAppName: 'news',
  statsAppType: 'responsive',
  statsCountername: 'news.articles.c0000000000o.page',
  statsDestination: 'NEWS_PS_TEST',
  uiLocale: 'en-GB',
};

storiesOf('Video', module).add('default', () => <Video {...props} />);
