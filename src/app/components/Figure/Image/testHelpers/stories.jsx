import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { custom, landscape, portrait, square } from './fixtureData';

const stories = (Component, title, additionalProps) =>
  storiesOf(title, module)
    .add('16:9 landscape image', () => (
      <Component
        alt={landscape.alt}
        src={landscape.src}
        width={landscape.width}
        {...additionalProps}
      />
    ))
    .add('9:16 portrait image', () => (
      <Component
        alt={portrait.alt}
        src={portrait.src}
        width={portrait.width}
        {...additionalProps}
      />
    ))
    .add('1:1 square image', () => (
      <Component
        alt={square.alt}
        src={square.src}
        width={square.width}
        {...additionalProps}
      />
    ))
    .add('custom ratio image', () => (
      <Component
        alt={custom.alt}
        src={custom.src}
        width={custom.width}
        {...additionalProps}
      />
    ))
    .add('image with srcset', () => (
      <Component
        alt={landscape.alt}
        src={landscape.src}
        srcset={landscape.srcset}
        width={landscape.width}
        {...additionalProps}
      />
    ));

export default stories;
