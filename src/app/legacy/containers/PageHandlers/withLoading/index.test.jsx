import React from 'react';
import { render, act } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import WithLoading from '.';

const wait = duration =>
  new Promise(resolve => {
    setTimeout(resolve, duration);
  });

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

  describe(`and the loading indicator`, () => {
    it(`should not show the loading indicator before a set amount of time`, async () => {
      const { queryByTestId } = render(<LoadingHOC loading />);

      await act(async () => {
        await wait(400);
      });

      expect(queryByTestId('loading')).not.toBeInTheDocument();
    });

    it(`should show the loading indicator after a set amount of time`, async () => {
      const { queryByTestId } = render(<LoadingHOC loading />);

      await act(async () => {
        await wait(600);
      });

      expect(queryByTestId('loading')).toBeInTheDocument();
    });

    it(`should not show the loading indicator if loading is false (even after a set amount of time)`, async () => {
      const { queryByTestId } = render(<LoadingHOC loading={false} />);

      await act(async () => {
        await wait(600);
      });

      expect(queryByTestId('loading')).not.toBeInTheDocument();
    });
  });
});
