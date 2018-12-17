import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { Img } from './index';
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

storiesOf('Image - Img', module)
  .add('16:9 landscape image', () => (
    <Img
      alt={imageLandscapeAlt}
      src={imageLandscapeSrc}
      height={imageLandscapeHeight}
      width={imageLandscapeWidth}
    />
  ))
  .add('9:16 portrait image', () => (
    <Img
      alt={imagePortraitAlt}
      src={imagePortraitSrc}
      height={imagePortraitHeight}
      width={imagePortraitWidth}
    />
  ))
  .add('1:1 square image', () => (
    <Img
      alt={imageSquareAlt}
      src={imageSquareSrc}
      height={imageSquareHeight}
      width={imageSquareWidth}
    />
  ))
  .add('custom ratio image', () => (
    <Img
      alt={imageCustomAlt}
      src={imageCustomSrc}
      height={imageCustomHeight}
      width={imageCustomWidth}
    />
  ));
