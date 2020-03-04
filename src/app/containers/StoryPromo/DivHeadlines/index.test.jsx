import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import DivHeadline from './index';

describe('DivHeadline', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <DivHeadline script={latin} service="news" />,
  );
});
