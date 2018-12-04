import React from 'react';
import HeaderContainer from './index';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`Header`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="default">
      <HeaderContainer />
    </ServiceContextProvider>,
  );
});
