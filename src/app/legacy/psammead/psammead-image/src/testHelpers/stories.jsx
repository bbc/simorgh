import React from 'react';
import { storiesOf } from '@storybook/react';
import notes from '../../README.md';
import {
  custom,
  landscape,
  portrait,
  square,
  noFallbackSrcset,
} from './fixtureData';

export function getProps(image, includeHeight, type) {
  const props = {
    alt: image.alt,
    sizes: image.sizes,
    src: image.src,
    srcset: image.srcset,
    fallbackSrcset: image.fallbackSrcset,
    primaryMimeType: image.primaryMimeType,
    fallbackMimeType: image.fallbackMimeType,
    width: image.width,
    fade: type === 'Img' ? false : null,
  };
  props.height = includeHeight ? image.height : null;

  return props;
}

export const stories = ({
  Component,
  title,
  includeHeight = false,
  additionalProps = {},
  styleDecorator = storyFn => storyFn(),
  type,
  isCanonical = false,
}) =>
  storiesOf(title, module)
    .addDecorator(styleDecorator)
    .add(
      'landscape image',
      () => (
        <Component
          {...getProps(landscape, includeHeight, type)}
          {...additionalProps}
        />
      ),
      { notes },
    )
    .add(
      'portrait image',
      () => (
        <Component
          {...getProps(portrait, includeHeight, type)}
          {...additionalProps}
        />
      ),
      { notes },
    )
    .add(
      'square image',
      () => (
        <Component
          {...getProps(square, includeHeight, type)}
          {...additionalProps}
        />
      ),
      { notes },
    )
    .add(
      'custom ratio image',
      () => (
        <Component
          {...getProps(custom, includeHeight, type)}
          {...additionalProps}
        />
      ),
      { notes },
    )
    .add(
      'image with srcset',
      () => (
        <Component
          {...getProps(landscape, includeHeight, type)}
          srcset={landscape.srcset}
          {...additionalProps}
        />
      ),
      { notes },
    )
    .add(
      'image with no fallbackSrcset',
      () => (
        <Component
          {...getProps(noFallbackSrcset, includeHeight, type)}
          srcset={noFallbackSrcset.srcset}
          {...additionalProps}
        />
      ),
      { notes },
    )
    .add(
      isCanonical && 'image without width',
      () => <Component {...getProps(landscape, false, type)} width={null} />,
      { notes },
    );
