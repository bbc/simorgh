import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Copyright from './index';

describe('Copyright', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <Copyright>Getty Images</Copyright>,
  );
});
