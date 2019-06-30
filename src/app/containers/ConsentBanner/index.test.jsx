import React from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';

jest.mock('./index.canonical', () => () => <div>Canonical Cookie banner</div>);
jest.mock('./index.amp', () => () => <div>Amp Cookie banner</div>);

const ConsentBanner = require('./index').default;

describe('Consent Banner Container', () => {
  shouldMatchSnapshot(
    'should correctly render amp banner',
    <RequestContextProvider
      id="c0000000000o"
      bbcOrigin="https://www.test.bbc.co.uk"
      pageType="article"
      isAmp
      service="news"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical banner',
    <RequestContextProvider
      id="c0000000000o"
      bbcOrigin="https://www.test.bbc.co.uk"
      pageType="article"
      isAmp={false}
      service="news"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );
});
