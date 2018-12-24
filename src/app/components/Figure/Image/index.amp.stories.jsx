import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import AmpImg from './index.amp';
import AmpDecorator from '../../../helpers/storybook/ampDecorator';
import { custom, landscape, portrait, square } from './testHelpers/fixtureData';
import getImageProps from './testHelpers/getImageProps';

storiesOf('Image - AmpImg', module)
  .addDecorator(AmpDecorator)
  .add('16:9 landscape image', () => (
    <AmpImg {...getImageProps(landscape, true)} layout="responsive" />
  ))
  .add('9:16 portrait image', () => (
    <AmpImg {...getImageProps(portrait, true)} layout="responsive" />
  ))
  .add('1:1 square image', () => (
    <AmpImg {...getImageProps(square, true)} layout="responsive" />
  ))
  .add('custom ratio image', () => (
    <AmpImg {...getImageProps(custom, true)} layout="responsive" />
  ))
  .add('image with srcset', () => (
    <AmpImg
      {...getImageProps(landscape, true)}
      srcset={landscape.srcset}
      layout="responsive"
    />
  ));
