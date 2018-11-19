import React from 'react';
import Brand from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContextProvider } from '../ServiceContext';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider>
      <Brand />
    </ServiceContextProvider>,
  );
});
