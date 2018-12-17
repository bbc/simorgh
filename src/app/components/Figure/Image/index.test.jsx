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

describe("Image - imported as '{ Img }'", () => {
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <Img
      alt={imageAltPortrait}
      src={imageSrcPortrait}
      height={723}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <Img
      alt={imageAltLandscape}
      src={imageSrcLandscape}
      height={1024}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <Img alt={imageAltSquare} src={imageSrcSquare} height={660} width={660} />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <Img alt={imageAltCustom} src={imageSrcCustom} height={660} width={660} />,
  );
});

describe("Image - imported as default 'Image'", () => {
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <Image
      alt={imageAltPortrait}
      src={imageSrcPortrait}
      height={723}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <Image
      alt={imageAltLandscape}
      src={imageSrcLandscape}
      height={1024}
      width={578}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <Image
      alt={imageAltSquare}
      src={imageSrcSquare}
      height={660}
      width={660}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <Image
      alt={imageAltCustom}
      src={imageSrcCustom}
      height={660}
      width={660}
    />,
  );
});
