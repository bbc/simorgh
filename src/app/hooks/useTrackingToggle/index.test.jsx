import React from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import useTrackingToggle from '#hooks/useTrackingToggle';

const wrapper = ({ children, toggles }) => (
  <ToggleContextProvider toggles={toggles}>{children}</ToggleContextProvider>
);

const isEnabled = (componentName, enabled, value) => {
  const { result } = renderHook(() => useTrackingToggle(componentName), {
    wrapper: props =>
      wrapper({ ...props, toggles: { eventTracking: { enabled, value } } }),
  });

  return result.current.trackingIsEnabled;
};

describe('Expected Use', () => {
  const componentName = 'most-read';

  it.each`
    enabled  | value                           | expected | description
    ${false} | ${''}                           | ${false} | ${'tracking disabled and empty string for value'}
    ${false} | ${'most-read'}                  | ${false} | ${'tracking disabled and same component name for value'}
    ${false} | ${'related-content'}            | ${false} | ${'tracking disabled and different component name for value'}
    ${false} | ${'most-read,related-content'}  | ${false} | ${'tracking disabled and both component names for value'}
    ${false} | ${'most-read, related-content'} | ${false} | ${'tracking disabled and both component names for value with space'}
    ${true}  | ${''}                           | ${true}  | ${'empty string for value'}
    ${true}  | ${'most-read'}                  | ${false} | ${'same component name for value'}
    ${true}  | ${'related-content'}            | ${true}  | ${'different component name for value'}
    ${true}  | ${'most-read,related-content'}  | ${false} | ${'both component names for value'}
    ${true}  | ${'most-read, related-content'} | ${false} | ${'both component names for value with space'}
  `(
    "should return '$expected' for enabled = '$enabled' and exclusion list = '$value' ($description)",
    ({ enabled, value, expected }) => {
      expect(isEnabled(componentName, enabled, value)).toBe(expected);
    },
  );
});

describe('Error handling', () => {
  const componentName = 'most-read';

  it.each`
    enabled      | value                | expected | description
    ${0}         | ${'most-read'}       | ${false} | ${'non-boolean value for enabled and same component name'}
    ${0}         | ${'related-content'} | ${false} | ${'non-boolean value for enabled and different component name'}
    ${1}         | ${'most-read'}       | ${false} | ${'non-boolean truthy value for enabled and same component name'}
    ${1}         | ${'related-content'} | ${false} | ${'non-boolean truthy value for enabled and different component name'}
    ${true}      | ${['most-read']}     | ${true}  | ${'non-string for value'}
    ${true}      | ${5}                 | ${true}  | ${'non-string for value'}
    ${true}      | ${','}               | ${true}  | ${'single comma for value'}
    ${true}      | ${',,'}              | ${true}  | ${'double comma for value'}
    ${true}      | ${undefined}         | ${true}  | ${'undefined for value'}
    ${true}      | ${null}              | ${true}  | ${'null for value'}
    ${undefined} | ${''}                | ${false} | ${'undefined for enabled'}
    ${null}      | ${''}                | ${false} | ${'null for enabled'}
    ${undefined} | ${undefined}         | ${false} | ${'undefined for enabled and value'}
    ${null}      | ${null}              | ${false} | ${'null for enabled and value'}
  `(
    "should return '$expected' for enabled = '$enabled' and exclusion list = '$value' ($description)",
    ({ enabled, value, expected }) => {
      expect(isEnabled(componentName, enabled, value)).toBe(expected);
    },
  );
});
