import React from 'react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import ToggleContainer from '.';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const WithContext = (toggleName, FallbackComponent) => (
  <ToggleContainer
    toggleName={toggleName}
    FallbackComponent={FallbackComponent}
  >
    <h1>Child component</h1>
  </ToggleContainer>
);

const FallbackComponent = () => <p>Fallback UI</p>;

const { useContext } = jest.requireMock('react');

describe('ToggleContainer', () => {
  beforeEach(() => {
    useContext.mockReturnValueOnce({ env: 'test' }).mockReturnValueOnce({
      toggleState: { foo: { enabled: true } },
    });
  });

  describe('should render child component', () => {
    shouldMatchSnapshot('should match snapshot', WithContext('foo'));
  });

  describe('should render null', () => {
    isNull('should match snapshot', WithContext('bar'));
  });

  describe('should render fallback component', () => {
    shouldMatchSnapshot(
      'should match snapshot',
      WithContext('bar', FallbackComponent),
    );
  });
});
