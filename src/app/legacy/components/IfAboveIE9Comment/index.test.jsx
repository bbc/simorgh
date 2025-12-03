import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import IfAboveIE9 from '.';

describe('IfAboveIE9Comment', () => {
  shouldMatchSnapshot(
    'should render if not IE9',
    <IfAboveIE9>
      <h1>I can not be seen on IE9</h1>
    </IfAboveIE9>,
  );
});
