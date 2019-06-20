import React, { Fragment, useContext } from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';

const { RequestContextProvider, RequestContext } = require('./index');

const renderWithContextProvider = (
  node,
  {
    platformString,
    bbcOrigin,
    pageType,
    statsDestination,
    statsPageIdentifier,
  },
) => (
  <RequestContextProvider
    platform={platformString}
    bbcOrigin={bbcOrigin}
    pageType={pageType}
    statsDestination={statsDestination}
    statsPageIdentifier={statsPageIdentifier}
  >
    {node}
  </RequestContextProvider>
);

const Component = () => {
  const {
    platform,
    isUK,
    origin,
    pageType,
    statsDestination,
    statsPageIdentifier,
  } = useContext(RequestContext);
  return (
    <Fragment>
      <span>{platform}</span>
      <span>{isUK ? 'true' : 'false'}</span>
      <span>{origin}</span>
      <span>{pageType}</span>
      <span>{statsDestination}</span>
      <span>{statsPageIdentifier}</span>
    </Fragment>
  );
};

describe('RequestContext', () => {
  const testRequestContext = ({
    pageType,
    platformString,
    statsDestination,
    statsPageIdentifier,
    isUK,
    origin,
  }) => {
    shouldMatchSnapshot(
      `should have a request object for platform ${platformString}, origin ${origin}, isUK, ${isUK}, pageType ${pageType}, statsDestination ${statsDestination} & statsPageIdentifier ${statsPageIdentifier}`,
      renderWithContextProvider(<Component />, {
        isUK,
        origin,
        pageType,
        platformString,
        statsDestination,
        statsPageIdentifier,
      }),
    );
  };

  testRequestContext({
    pageType: 'article',
    platformString: 'default',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
  testRequestContext({
    pageType: 'article',
    platformString: 'canonical',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
  testRequestContext({
    pageType: 'article',
    platformString: 'amp',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
  testRequestContext({
    pageType: 'article',
    platformString: 'default',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
});
