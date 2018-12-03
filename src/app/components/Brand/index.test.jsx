import React from 'react';
import Brand from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider>
      <Brand />
    </ServiceContextProvider>,
  );
});
