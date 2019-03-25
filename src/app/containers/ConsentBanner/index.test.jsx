import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';

jest.mock('./index.canonical', () => () => <h1>Canonical Cookie banner</h1>);

const ConsentBanner = require('./index').default;

describe('Consent Banner Container', () => {
  shouldMatchSnapshot(
    'should correctly render amp banner',
    <RequestContextProvider platform="amp">
      <ConsentBanner />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical banner',
    <RequestContextProvider platform="canonical">
      <ConsentBanner />
    </RequestContextProvider>,
  );
});
