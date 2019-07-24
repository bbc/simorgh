import React from 'react';
import DefaultPageWrapper from './defaultPageWrapper';
import { shouldShallowMatchSnapshot } from '../../testHelpers';

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    children: <h2>Child element</h2>,
  };

  shouldShallowMatchSnapshot(
    'should render default page wrapper with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );
});
