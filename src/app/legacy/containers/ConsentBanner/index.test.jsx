import React from 'react';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';

jest.mock('./index.canonical', () => () => <div>Canonical Cookie banner</div>);

const ConsentBanner = require('./index').default;

describe('Consent Banner Container', () => {
  it('should return null on AMP pages', () => {
    const { container } = render(
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp
        pageType={ARTICLE_PAGE}
        service="news"
        statusCode={200}
        pathname="/pathname"
        showCookieBannerBasedOnCountry
      >
        <ConsentBanner />
      </RequestContextProvider>,
    );

    expect(container.firstChild).toBeNull();
  });

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
