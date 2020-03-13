/* eslint react/prop-types: 0 */
import React from 'react';
import { render, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import useToggle from './useToggle';
import { ToggleContextProvider } from '#contexts/ToggleContext';

describe('useToggle custom hook', () => {
  afterEach(() => jest.clearAllMocks());
  test('should return true for ads toggle', () => {
    const TestComponent = () => {
      const { enabled } = useToggle('ads');
      process.env.SIMORGH_APP_ENV = 'test';
      return <>{enabled.toString()}</>;
    };
    const { container } = render(
      <ToggleContextProvider service="mundo" origin="https://www.test.bbc.com">
        <TestComponent />
      </ToggleContextProvider>,
    );
    expect(queryByText(container, 'true')).toBeInTheDocument();
  });
});
