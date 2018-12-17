import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Image, { Img } from './index';
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

const snapshotTests = Component => {
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <Component
      alt={imageAltPortrait}
      src={imageSrcPortrait}
      height={723}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <Component
      alt={imageAltLandscape}
      src={imageSrcLandscape}
      height={1024}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <Component
      alt={imageAltSquare}
      src={imageSrcSquare}
      height={660}
      width={660}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <Component
      alt={imageAltCustom}
      src={imageSrcCustom}
      height={660}
      width={660}
    />,
  );
};

describe("Image - imported as '{ Img }'", () => {
  snapshotTests(Img);
});

describe("Image - imported as default 'Image'", () => {
  snapshotTests(Image);
});
