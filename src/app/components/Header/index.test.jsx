import React from 'react';
import Header from './index';

import {
  shallowRender,
  shouldMatchSnapshot,
} from '../../helpers/tests/testHelpers';

describe(`Header`, () => {
  shouldMatchSnapshot('should render correctly', shallowRender(<Header />));
});
