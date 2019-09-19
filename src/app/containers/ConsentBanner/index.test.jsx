import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';

jest.mock('./index.canonical', () => () => <div>Canonical Cookie banner</div>);
jest.mock('./index.amp', () => () => <div>Amp Cookie banner</div>);
jest.mock('react', () => {
  const react = jest.requireActual('react');

  return react;
});

const ConsentBanner = require('./index').default;

const Component = (isAmp = false) => (
  <RequestContextProvider
    bbcOrigin="https://www.test.bbc.co.uk"
    id="c0000000000o"
    isAmp={isAmp}
    pageType="article"
    service="news"
    statusCode={200}
    pathname="/pathname"
  >
    <ConsentBanner />
  </RequestContextProvider>
);

describe('Consent Banner Container', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot('should correctly render amp banner', Component(true));

  shouldMatchSnapshot('should correctly render canonical banner', Component());
});
