import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import CanonicalDecorator from '../../../helpers/storybook/canonicalDecorator';
import { Img } from '.';
import { custom, landscape, portrait, square } from './testHelpers/fixtureData';
import getImageProps from './testHelpers/getImageProps';

storiesOf('Image - Img', module)
  .addDecorator(CanonicalDecorator)
  .add('16:9 landscape image', () => <Img {...getImageProps(landscape)} />)
  .add('9:16 portrait image', () => <Img {...getImageProps(portrait)} />)
  .add('1:1 square image', () => <Img {...getImageProps(square)} />)
  .add('custom ratio image', () => <Img {...getImageProps(custom)} />)
  .add('image with srcset', () => (
    <Img {...getImageProps(landscape)} srcset={landscape.srcset} />
  ));
