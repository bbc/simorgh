import React from 'react';
import DefaultPageWrapper from './defaultPageWrapper';
import { shouldShallowMatchSnapshot } from '../../testHelpers';
import { ServiceContextProvider } from '../contexts/ServiceContext';

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    children: <h2>Child element</h2>,
  };

  shouldShallowMatchSnapshot(
    'should render default page wrapper with children',
    <ServiceContextProvider service="news">
      <DefaultPageWrapper {...propsWithChildren} />,
    </ServiceContextProvider>,
  );
});
