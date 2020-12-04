import React from 'react';
import { render, act } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import WithLoading from '.';

global.scrollTo = jest.fn();

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

  describe(`and visually hidden loading message`, () => {
    it(`should render a visually hidden loading message`, async () => {
      const { queryByTestId } = render(<LoadingHOC loading />);

      expect(queryByTestId('loading-message')).toBeInTheDocument();
    });

    it(`should focus on the visually hidden loading message after a set amount of time`, async () => {
      let queryByTestId;

      await act(async () => {
        ({ queryByTestId } = render(<LoadingHOC loading />));

        await wait(600);
      });

      expect(queryByTestId('loading-message')).toHaveFocus();
    });

    it(`should not focus on the visually hidden loading message before a set amount of time`, async () => {
      let queryByTestId;

      await act(async () => {
        ({ queryByTestId } = render(<LoadingHOC loading />));

        await wait(400);
      });

      expect(queryByTestId('loading-message')).not.toHaveFocus();
    });
  });
});
