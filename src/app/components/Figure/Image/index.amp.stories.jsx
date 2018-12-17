import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
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

storiesOf('Image - AmpImg', module)
  .add('16:9 landscape image', () => (
    <AmpImg alt={imageAltLandscape} src={imageSrcLandscape} />
  ))
  .add('16:9 portrait image', () => (
    <AmpImg alt={imageAltPortrait} src={imageSrcPortrait} />
  ))
  .add('1:1 square image', () => (
    <AmpImg alt={imageAltSquare} src={imageSrcSquare} />
  ))
  .add('custom ratio image', () => (
    <AmpImg alt={imageAltCustom} src={imageSrcCustom} />
  ));
