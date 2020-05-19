import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import IdxPage from '.';

describe('IdxPage', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render a blank page with HOC components',
      <IdxPage />,
    );
  });
});
