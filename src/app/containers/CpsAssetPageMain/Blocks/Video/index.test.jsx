import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import CPSVideoBlock from '.';

describe('CPSVideoBlock', () => {
  shouldMatchSnapshot(
    'no placeholder',
    <CPSVideoBlock assetUri="/pidgin/12345678" />,
  );
  shouldMatchSnapshot(
    'with placeholder',
    <CPSVideoBlock assetUri="/pidgin/12345678" showPlaceholder />,
  );
});
