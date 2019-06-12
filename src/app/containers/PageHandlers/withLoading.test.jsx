import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import WithLoading from './withLoading';

describe('withLoading HOC', () => {
  const Component = () => <h1>Hola</h1>;
  const LoadingHOC = WithLoading(Component);

  describe('and the loading prop set to true', () => {
    shouldShallowMatchSnapshot(
      `should return the loading component`,
      <LoadingHOC loading />,
    );
  });

  describe('and no loading prop', () => {
    shouldShallowMatchSnapshot(
      `should return the passed in component`,
      <LoadingHOC />,
    );
  });
});
