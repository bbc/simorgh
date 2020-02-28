import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import WithError from '.';

// eslint-disable-next-line react/prop-types
jest.mock('#pages/ErrorPage', () => () => <h1>This is an error.</h1>);

describe('withError HOC', () => {
  const Component = () => <h1>Hola</h1>;
  const ErrorHOC = WithError(Component);

  describe('with error', () => {
    shouldMatchSnapshot(
      `should return the errorMain component`,
      <ErrorHOC error={new Error('This is an error.')} />,
    );
  });

  describe('with no error', () => {
    shouldMatchSnapshot('should return the passed in component', <ErrorHOC />);
  });
});
