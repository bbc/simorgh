import React, { Fragment, useContext } from 'react';
import { shouldMatchSnapshot } from '../../../testHelpers';

const { RequestContextProvider, RequestContext } = require('./index');

const renderWithContextProvider = (
  node,
  {
    env,
    platformString,
    bbcOrigin,
    pageType,
    statsDestination,
    statsPageIdentifier,
  },
) => (
  <RequestContextProvider
    env={env}
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
    env,
    platform,
    isUK,
    origin,
    pageType,
    statsDestination,
    statsPageIdentifier,
  } = useContext(RequestContext);
  return (
    <Fragment>
      <span>{env}</span>
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
    env,
    pageType,
    platformString,
    statsDestination,
    statsPageIdentifier,
    isUK,
    origin,
  }) => {
    shouldMatchSnapshot(
      `should have a request object for env ${env}, platform ${platformString}, origin ${origin}, isUK, ${isUK}, pageType ${pageType}, statsDestination ${statsDestination} & statsPageIdentifier ${statsPageIdentifier}`,
      renderWithContextProvider(<Component />, {
        env,
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
    env: 'test',
    pageType: 'article',
    platformString: 'default',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
  testRequestContext({
    env: 'test',
    pageType: 'article',
    platformString: 'canonical',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
  testRequestContext({
    env: 'test',
    pageType: 'article',
    platformString: 'amp',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
  testRequestContext({
    env: 'test',
    pageType: 'article',
    platformString: 'default',
    statsDestination: 'NEWS_PS_TEST',
    statsPageIdentifier: 'persian.articles.c0000000000o.page',
    isUK: false,
    origin: 'https://www.bbc.com',
  });
});
