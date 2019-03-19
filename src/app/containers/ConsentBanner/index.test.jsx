import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { PlatformContextProvider } from '../../contexts/PlatformContext';

jest.mock('./index.canonical', () => () => <h1>Canonical Cookie banner</h1>);
jest.mock('./index.amp', () => () => <h1>Amp Cookie banner</h1>);

const ConsentBanner = require('./index').default;

describe('Consent Banner Container', () => {
  shouldMatchSnapshot(
    'should correctly render amp banner',
    <PlatformContextProvider platform="amp">
      <ConsentBanner />
    </PlatformContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical banner',
    <PlatformContextProvider platform="canonical">
      <ConsentBanner />
    </PlatformContextProvider>,
  );
});
