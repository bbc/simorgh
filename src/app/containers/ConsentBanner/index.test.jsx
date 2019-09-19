import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';

jest.mock('./index.canonical', () => () => <div>Canonical Cookie banner</div>);
jest.mock('./index.amp', () => () => <div>Amp Cookie banner</div>);

const ConsentBanner = require('./index').default;

describe('Consent Banner Container', () => {
  shouldMatchSnapshot(
    'should correctly render amp banner',
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp
      pageType="article"
      service="news"
      statusCode={200}
      pathname="/pathname"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical banner',
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      service="news"
      statusCode={200}
      pathname="/pathname"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );
});
