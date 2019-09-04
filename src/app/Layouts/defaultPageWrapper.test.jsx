import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import DefaultPageWrapper from './defaultPageWrapper';

describe('defaultPageWrapper', () => {
  const propsWithChildren = {
    children: <h2>Child element</h2>,
  };

  shouldMatchSnapshot(
    'should render default page wrapper with children',
    <DefaultPageWrapper {...propsWithChildren} />,
  );
});
