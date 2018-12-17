import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import AmpImg from './index.amp';
import {
  imageAltLandscape,
  imageSrcLandscape,
  imageAltPortrait,
  imageSrcPortrait,
  imageAltSquare,
  imageSrcSquare,
  imageAltCustom,
  imageSrcCustom,
} from './fixtureData';

describe('Image - AmpImg', () => {
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <AmpImg
      alt={imageAltPortrait}
      src={imageSrcPortrait}
      height={723}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <AmpImg
      alt={imageAltLandscape}
      src={imageSrcLandscape}
      height={1024}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <AmpImg
      alt={imageAltSquare}
      src={imageSrcSquare}
      height={660}
      width={660}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <AmpImg
      alt={imageAltCustom}
      src={imageSrcCustom}
      height={660}
      width={660}
    />,
  );
});
