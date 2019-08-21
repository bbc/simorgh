import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import CanonicalMediaPlayer from '.';

describe('Media Player: CanonicalMediaPlayer', () => {
  shouldMatchSnapshot(
    'should render an iframe',
    <CanonicalMediaPlayer embedSrc="https://foo.bar/" />,
  );
});
