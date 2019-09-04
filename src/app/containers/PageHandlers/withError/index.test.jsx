import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import WithError from '.';

// eslint-disable-next-line react/prop-types
jest.mock('../../ErrorMain', () => () => <h1>This is an error.</h1>);

describe('withError HOC', () => {
  const Component = () => <h1>500</h1>;
  const ErrorHOC = WithError(Component);

  shouldMatchSnapshot(`should return the passed in component`, <ErrorHOC />);

  shouldMatchSnapshot(
    `should return the errorMain component`,
    <ErrorHOC error={new Error('This is an error.')} />,
  );
});
