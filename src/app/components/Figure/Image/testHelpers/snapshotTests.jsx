import React from 'react';
import { shouldMatchSnapshot } from '../../../../helpers/tests/testHelpers';
import { custom, landscape, portrait, square } from './fixtureData';

const snapshotTests = Component => {
  shouldMatchSnapshot(
    'should render landscape image correctly',
    <Component
      alt={landscape.alt}
      src={landscape.src}
      height={landscape.height}
      width={landscape.width}
    />,
  );
  shouldMatchSnapshot(
    'should render portrait image correctly',
    <Component
      alt={portrait.alt}
      src={portrait.src}
      height={portrait.height}
      width={portrait.width}
    />,
  );
  shouldMatchSnapshot(
    'should render square image correctly',
    <Component
      alt={square.alt}
      src={square.src}
      height={square.height}
      width={square.width}
    />,
  );
  shouldMatchSnapshot(
    'should render image with custom dimensions correctly',
    <Component
      alt={custom.alt}
      src={custom.src}
      height={custom.height}
      width={custom.width}
    />,
  );
  shouldMatchSnapshot(
    'should render image with srcset correctly',
    <Component
      alt={landscape.alt}
      src={landscape.src}
      srcset={landscape.srcset}
      height={landscape.height}
      width={landscape.width}
    />,
  );
};

export default snapshotTests;
