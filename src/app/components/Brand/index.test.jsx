import React from 'react';
import Brand from './index';

import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ServiceContextProvider } from '../ServiceContext';

describe('Brand', () => {
  shouldMatchSnapshot(
    'should render correctly with a default indented logo',
    <ServiceContextProvider>
      <Brand />
    </ServiceContextProvider>,
  );
  shouldMatchSnapshot(
    'should render correctly with indentedLogo false',
    <ServiceContextProvider>
      <Brand indentedLogo={false} />
    </ServiceContextProvider>,
  );
});
