import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import MPulseBeacon from './index';

describe('MPulseBeacon', () => {
  const apiKey = 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX';
  shouldMatchSnapshot(
    'should return script snippet',
    <MPulseBeacon apiKey={apiKey} />,
  );
});
