import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import IfAboveIE9 from '.';

describe('Timestamp', () => {
  shouldMatchSnapshot(
    'should render if not IE9 comment',
    <IfAboveIE9>
      <h1>I can not be seen on IE9</h1>
    </IfAboveIE9>,
  );
});
