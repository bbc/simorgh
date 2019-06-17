import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import { ComponentUsingContext } from '../../../testHelpers/mockComponents';
import { DialContext, DialContextProvider } from './index';

describe('DialContext', () => {
  const dials = { dial: 'value' };

  shouldMatchSnapshot(
    `should provide a dials object`,
    <DialContextProvider dials={dials}>
      <ComponentUsingContext context={DialContext} />
    </DialContextProvider>,
  );
});
