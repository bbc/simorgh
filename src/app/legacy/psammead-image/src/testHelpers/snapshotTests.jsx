import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { custom, landscape, portrait, square } from './fixtureData';

const snapshotTests = (Component, additionalProps) => {
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <Component
      alt={landscape.alt}
      attribution={landscape.attribution}
      sizes={landscape.sizes}
      src={landscape.src}
      height={landscape.height}
      width={landscape.width}
      {...additionalProps}
    />,
  );
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <Component
      alt={portrait.alt}
      attribution={portrait.attribution}
      sizes={portrait.sizes}
      src={portrait.src}
      height={portrait.height}
      width={portrait.width}
      {...additionalProps}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <Component
      alt={square.alt}
      attribution={square.attribution}
      sizes={square.sizes}
      src={square.src}
      height={square.height}
      width={square.width}
      {...additionalProps}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <Component
      alt={custom.alt}
      attribution={custom.attribution}
      sizes={custom.sizes}
      src={custom.src}
      height={custom.height}
      width={custom.width}
      {...additionalProps}
    />,
  );
  shouldMatchSnapshot(
    'should render image with srcset and fallbackSrcset correctly',
    <Component
      alt={landscape.alt}
      attribution={landscape.attribution}
      sizes={landscape.sizes}
      src={landscape.src}
      srcset={landscape.srcset}
      fallbackSrcset={landscape.fallbackSrcset}
      primaryMimeType={landscape.primaryMimeType}
      fallbackMimeType={landscape.fallbackMimeType}
      height={landscape.height}
      width={landscape.width}
      {...additionalProps}
    />,
  );
  shouldMatchSnapshot(
    'should render image with only srcset correctly',
    <Component
      alt={landscape.alt}
      attribution={landscape.attribution}
      sizes={landscape.sizes}
      src={landscape.src}
      srcset={landscape.srcset}
      primaryMimeType={landscape.primaryMimeType}
      height={landscape.height}
      width={landscape.width}
      {...additionalProps}
    />,
  );
};

export default snapshotTests;
