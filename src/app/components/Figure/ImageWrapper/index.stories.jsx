import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import ImageWrapper from './index';

const landscapeImageRatio = 56.25;
const squareImageRatio = 100;
const portraitImageRatio = 177.78;

storiesOf('ImageWrapper', module)
  .add('16x9 image placeholder', () => (
    <ImageWrapper ratio={landscapeImageRatio} />
  ))
  .add('1x1·image·placeholder', () => <ImageWrapper ratio={squareImageRatio} />)
  .add('9x16 image placeholder', () => (
    <ImageWrapper ratio={portraitImageRatio} />
  ));
