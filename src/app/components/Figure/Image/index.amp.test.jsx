import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import AmpImg from './index.amp';
import {
  imageCustomAlt,
  imageCustomHeight,
  imageCustomSrc,
  imageCustomWidth,
  imageLandscapeAlt,
  imageLandscapeHeight,
  imageLandscapeSrc,
  imageLandscapeWidth,
  imagePortraitAlt,
  imagePortraitHeight,
  imagePortraitSrc,
  imagePortraitWidth,
  imageSquareAlt,
  imageSquareHeight,
  imageSquareSrc,
  imageSquareWidth,
} from './fixtureData';

describe('Image - AmpImg', () => {
  shouldMatchSnapshot(
    'should render 16:9 landscape image correctly',
    <AmpImg
      alt={imageLandscapeAlt}
      src={imageLandscapeSrc}
      height={imageLandscapeHeight}
      width={imageLandscapeWidth}
    />,
  );
  shouldMatchSnapshot(
    'should render 9:16 portrait image correctly',
    <AmpImg
      alt={imagePortraitAlt}
      src={imagePortraitSrc}
      height={imagePortraitHeight}
      width={imagePortraitWidth}
    />,
  );
  shouldMatchSnapshot(
    'should render 1:1 square image correctly',
    <AmpImg
      alt={imageSquareAlt}
      src={imageSquareSrc}
      height={imageSquareHeight}
      width={imageSquareWidth}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <AmpImg
      alt={imageCustomAlt}
      src={imageCustomSrc}
      height={imageCustomHeight}
      width={imageCustomWidth}
    />,
  );
});
