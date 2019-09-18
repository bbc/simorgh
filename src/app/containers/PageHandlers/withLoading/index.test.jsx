import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import WithLoading from '.';

describe('withLoading HOC', () => {
  const Component = () => <h1>Hola</h1>;
  const LoadingHOC = WithLoading(Component);

  describe('and the loading prop set to true', () => {
    shouldMatchSnapshot(
      `should return the loading component`,
      <LoadingHOC loading />,
    );
  });

  describe('and no loading prop', () => {
    shouldMatchSnapshot(
      `should return the passed in component`,
      <LoadingHOC />,
    );
  });
});
