import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';

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
      pageType={ARTICLE_PAGE}
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
      pageType={ARTICLE_PAGE}
      service="news"
      statusCode={200}
      pathname="/pathname"
    >
      <ConsentBanner />
    </RequestContextProvider>,
  );
});
