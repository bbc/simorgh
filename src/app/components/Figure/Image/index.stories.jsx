import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { Img } from './index';
import { custom, landscape, portrait, square } from './fixtureData';

storiesOf('Image - Img', module)
  .add('16:9 landscape image', () => (
    <Img
      alt={landscape.alt}
      src={landscape.src}
      height={landscape.height}
      width={landscape.width}
    />
  ))
  .add('9:16 portrait image', () => (
    <Img
      alt={portrait.alt}
      src={portrait.src}
      height={portrait.height}
      width={portrait.width}
    />
  ))
  .add('1:1 square image', () => (
    <Img
      alt={square.alt}
      src={square.src}
      height={square.height}
      width={square.width}
    />
  ))
  .add('custom ratio image', () => (
    <Img
      alt={custom.alt}
      src={custom.src}
      height={custom.height}
      width={custom.width}
    />
  ));
