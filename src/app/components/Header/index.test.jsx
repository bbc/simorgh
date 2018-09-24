import React from 'react';
import Header from './index';
import { ServiceContextProvider } from '../ServiceContext';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

describe(`Header`, () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ServiceContextProvider service="default">
      <Header />
    </ServiceContextProvider>,
  );
});
