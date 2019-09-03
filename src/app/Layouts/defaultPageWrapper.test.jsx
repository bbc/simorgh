import React from 'react';
import { shouldShallowMatchSnapshot } from '@bbc/psammead-test-helpers';
import DefaultPageWrapper from './defaultPageWrapper';

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    children: <h2>Child element</h2>,
  };

  shouldShallowMatchSnapshot(
    'should render default page wrapper with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );
});
