import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
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

storiesOf('Image - AmpImg', module)
  .add('16:9 landscape image', () => (
    <AmpImg
      alt={imageLandscapeAlt}
      src={imageLandscapeSrc}
      height={imageLandscapeHeight}
      width={imageLandscapeWidth}
    />
  ))
  .add('9:16 portrait image', () => (
    <AmpImg
      alt={imagePortraitAlt}
      src={imagePortraitSrc}
      height={imagePortraitHeight}
      width={imagePortraitWidth}
    />
  ))
  .add('1:1 square image', () => (
    <AmpImg
      alt={imageSquareAlt}
      src={imageSquareSrc}
      height={imageSquareHeight}
      width={imageSquareWidth}
    />
  ))
  .add('custom ratio image', () => (
    <AmpImg
      alt={imageCustomAlt}
      src={imageCustomSrc}
      height={imageCustomHeight}
      width={imageCustomWidth}
    />
  ));
