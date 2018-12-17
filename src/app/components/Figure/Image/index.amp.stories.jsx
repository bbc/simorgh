import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import AmpImg from './index.amp';
import { custom, landscape, portrait, square } from './fixtureData';

storiesOf('Image - AmpImg', module)
  .add('16:9 landscape image', () => (
    <AmpImg
      alt={landscape.alt}
      src={landscape.src}
      height={landscape.height}
      width={landscape.width}
    />
  ))
  .add('9:16 portrait image', () => (
    <AmpImg
      alt={portrait.alt}
      src={portrait.src}
      height={portrait.height}
      width={portrait.width}
    />
  ))
  .add('1:1 square image', () => (
    <AmpImg
      alt={square.alt}
      src={square.src}
      height={square.height}
      width={square.width}
    />
  ))
  .add('custom ratio image', () => (
    <AmpImg
      alt={custom.alt}
      src={custom.src}
      height={custom.height}
      width={custom.width}
    />
  ));
