import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { ComponentUsingContext } from '../../helpers/tests/mockComponents';
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
