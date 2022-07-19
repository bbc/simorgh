import React from 'react';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import Copyright from './index';

describe('Copyright', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Copyright>Getty Images</Copyright>,
  );

  shouldMatchSnapshot(
    'should render correctly when passed prop position with value "right"',
    <Copyright position="right">Getty Images</Copyright>,
  );
});
