import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ComponentUsingContext } from '#testHelpers/mockComponents';

const mockToggleValues = {
  local: {
    foobarFeature: {
      enabled: true,
    },
  },
  test: {
    foobarFeature: {
      enabled: true,
    },
  },
  live: {
    foobarFeature: {
      enabled: false,
    },
  },
};

jest.mock('#lib/config/toggles', () => mockToggleValues);

// Require after mock to allow mocking of JS object
const { ToggleContext, ToggleContextProvider } = require('./index');

describe('ToggleContext', () => {
  shouldMatchSnapshot(
    `should provide a toggles object`,
    <ToggleContextProvider>
      <ComponentUsingContext context={ToggleContext} />
    </ToggleContextProvider>,
  );
});
