import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import AmpMediaPlayer from '.';

describe('Media Player: AmpMediaPlayer', () => {
  shouldMatchSnapshot(
    'should render an amp-iframe with placeholder',
    <AmpMediaPlayer
      embedSrc="https://foo.bar/"
      placeholderSrc="https://foo.bar/placeholder.png"
    />,
  );
});
