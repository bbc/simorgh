import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import WithError from '.';

jest.mock('#pages/ErrorPage/ErrorPage', () => () => <h1>This is an error.</h1>);

describe('withError HOC', () => {
  const Component = () => <h1>Hola</h1>;
  const ErrorHOC = WithError(Component);

  describe('with error', () => {
    shouldMatchSnapshot(
      `should return the errorMain component`,
      <ErrorHOC error={new Error('This is an error.')} status={500} />,
    );
  });

  describe('with no error', () => {
    shouldMatchSnapshot(
      'should return the passed in component',
      <ErrorHOC status={200} />,
    );
  });
});
