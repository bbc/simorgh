import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { PlatformContextProvider } from '../../contexts/PlatformContext';

jest.mock('./index.canonical', () => () => <div>Canonical Cookie banner</div>);
jest.mock('./index.amp', () => () => <div>Amp Cookie banner</div>);

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
