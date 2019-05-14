import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
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
};

storiesOf('Video', module).add('default', () => <Video {...props} />);
