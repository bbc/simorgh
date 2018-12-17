import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import AmpImg from './index.amp';
import { custom, landscape, portrait, square } from './fixtureData';

describe('Image - AmpImg', () => {
  shouldMatchSnapshot(
    'should render 16:9 landscape image correctly',
    <AmpImg
      alt={landscape.alt}
      src={landscape.src}
      height={landscape.height}
      width={landscape.width}
    />,
  );
  shouldMatchSnapshot(
    'should render 9:16 portrait image correctly',
    <AmpImg
      alt={portrait.alt}
      src={portrait.src}
      height={portrait.height}
      width={portrait.width}
    />,
  );
  shouldMatchSnapshot(
    'should render 1:1 square image correctly',
    <AmpImg
      alt={square.alt}
      src={square.src}
      height={square.height}
      width={square.width}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <AmpImg
      alt={custom.alt}
      src={custom.src}
      height={custom.height}
      width={custom.width}
    />,
  );
});
