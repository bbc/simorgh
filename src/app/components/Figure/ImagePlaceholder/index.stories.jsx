import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ImagePlaceholder from './index';

const landscapeImageRatio = 56.25;
const squareImageRatio = 100;
const portraitImageRatio = 177.78;

storiesOf('ImagePlaceholder', module)
  .add('16x9 image placeholder', () => (
    <ImagePlaceholder ratio={landscapeImageRatio} />
  ))
  .add('1x1·image·placeholder', () => (
    <ImagePlaceholder ratio={squareImageRatio} />
  ))
  .add('9x16 image placeholder', () => (
    <ImagePlaceholder ratio={portraitImageRatio} />
  ));
