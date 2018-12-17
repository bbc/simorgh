import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Image, { Img } from './index';
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

const snapshotTests = Component => {
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <Component
      alt={imagePortraitAlt}
      src={imagePortraitSrc}
      height={imagePortraitHeight}
      width={imagePortraitWidth}
    />,
  );
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <Component
      alt={imageLandscapeAlt}
      src={imageLandscapeSrc}
      height={imageLandscapeHeight}
      width={imageLandscapeWidth}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <Component
      alt={imageSquareAlt}
      src={imageSquareSrc}
      height={imageSquareHeight}
      width={imageSquareWidth}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <Component
      alt={imageCustomAlt}
      src={imageCustomSrc}
      height={imageCustomHeight}
      width={imageCustomWidth}
    />,
  );
};

describe("Image - imported as '{ Img }'", () => {
  snapshotTests(Img);
});

describe("Image - imported as default 'Image'", () => {
  snapshotTests(Image);
});
