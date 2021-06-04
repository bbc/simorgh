import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import useTrackingToggle from '#hooks/useTrackingToggle';

const wrapper = ({ children, toggles }) => (
  <ToggleContextProvider toggles={toggles}>{children}</ToggleContextProvider>
);

const isEnabled = (componentName, enabled, value) => {
  const { result } = renderHook(() => useTrackingToggle(componentName), {
    wrapper,
    initialProps: {
      toggles: {
        eventTracking: {
          enabled,
          value,
        },
      },
    },
  });

  return result.current.trackingIsEnabled;
};

describe('Expected Use', () => {
  const componentName = 'most-read';

  it.each`
    enabled  | value                           | expected
    ${false} | ${''}                           | ${false}
    ${false} | ${'most-read'}                  | ${false}
    ${false} | ${'related-content'}            | ${false}
    ${false} | ${'most-read,related-content'}  | ${false}
    ${false} | ${'most-read, related-content'} | ${false}
    ${true}  | ${''}                           | ${true}
    ${true}  | ${'most-read'}                  | ${false}
    ${true}  | ${'related-content'}            | ${true}
    ${true}  | ${'most-read,related-content'}  | ${false}
    ${true}  | ${'most-read, related-content'} | ${false}
  `(
    "should return '$expected' for enabled = '$enabled' and exclusion list = '$value'",
    ({ enabled, value, expected }) => {
      expect(isEnabled(componentName, enabled, value)).toBe(expected);
    },
  );
});

describe('Error handling', () => {
  const componentName = 'most-read';

  it.each`
    enabled      | value                | expected
    ${0}         | ${'most-read'}       | ${false}
    ${0}         | ${'related-content'} | ${false}
    ${1}         | ${'most-read'}       | ${false}
    ${1}         | ${'related-content'} | ${false}
    ${true}      | ${['most-read']}     | ${true}
    ${true}      | ${5}                 | ${true}
    ${true}      | ${','}               | ${true}
    ${true}      | ${',,'}              | ${true}
    ${true}      | ${undefined}         | ${true}
    ${true}      | ${null}              | ${true}
    ${undefined} | ${''}                | ${false}
    ${null}      | ${''}                | ${false}
    ${undefined} | ${undefined}         | ${false}
    ${null}      | ${null}              | ${false}
  `(
    "should return '$expected' for enabled = '$enabled' and exclusion list = '$value'",
    ({ enabled, value, expected }) => {
      expect(isEnabled(componentName, enabled, value)).toBe(expected);
    },
  );
});
