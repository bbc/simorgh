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
      platform="amp"
      isUK
      lang="en-gb"
      pageType="article"
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp
      service="news"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );

  shouldMatchSnapshot(
    'should correctly render canonical banner',
    <RequestContextProvider
      platform="canonical"
      lang="en-gb"
      isUK
      pageType="article"
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={false}
      service="news"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );
});
