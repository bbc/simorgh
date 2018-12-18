import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { custom, landscape, portrait, square } from './fixtureData';

const stories = (Component, title) =>
  storiesOf(title, module)
    .add('16:9 landscape image', () => (
      <Component
        alt={landscape.alt}
        src={landscape.src}
        height={landscape.height}
        width={landscape.width}
      />
    ))
    .add('9:16 portrait image', () => (
      <Component
        alt={portrait.alt}
        src={portrait.src}
        height={portrait.height}
        width={portrait.width}
      />
    ))
    .add('1:1 square image', () => (
      <Component
        alt={square.alt}
        src={square.src}
        height={square.height}
        width={square.width}
      />
    ))
    .add('custom ratio image', () => (
      <Component
        alt={custom.alt}
        src={custom.src}
        height={custom.height}
        width={custom.width}
      />
    ));

export default stories;
