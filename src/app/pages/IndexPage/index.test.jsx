import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import IndexPage from '.';

describe('IndexPage', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render a blank page with HOC components',
      <IndexPage />,
    );
  });
});
