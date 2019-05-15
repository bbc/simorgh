import React, { Fragment, useContext } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';

const { RequestContextProvider, RequestContext } = require('./index');

const renderWithContextProvider = (
  node,
  { platformString, bbcOrigin, statsDestination, statsPageIdentifier },
) => (
  <RequestContextProvider
    platform={platformString}
    bbcOrigin={bbcOrigin}
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
    statsDestination,
    statsPageIdentifier,
  } = useContext(RequestContext);
  return (
    <Fragment>
      <span>{platform}</span>
      <span>{isUK ? 'true' : 'false'}</span>
      <span>{origin}</span>
      <span>{statsDestination}</span>
      <span>{statsPageIdentifier}</span>
    </Fragment>
  );
};

describe('RequestContext', () => {
  const testRequestContext = (
    platformString,
    statsDestination,
    statsPageIdentifier,
    isUK,
    origin,
  ) => {
    shouldMatchSnapshot(
      `should have a request object for platform ${platformString}, origin ${origin}, isUK, ${isUK}, statsDestination ${statsDestination} & statsPageIdentifier ${statsPageIdentifier}`,
      renderWithContextProvider(<Component />, {
        isUK,
        origin,
        platformString,
        statsDestination,
        statsPageIdentifier,
      }),
    );
  };

  testRequestContext(
    'default',
    'NEWS_PS_TEST',
    'persian.articles.c0000000000o.page',
    false,
    'https://www.bbc.com',
  );
  testRequestContext(
    'canonical',
    'NEWS_PS_TEST',
    'persian.articles.c0000000000o.page',
    false,
    'https://www.bbc.com',
  );
  testRequestContext(
    'amp',
    'NEWS_PS_TEST',
    'persian.articles.c0000000000o.page',
    false,
    'https://www.bbc.com',
  );
  testRequestContext(
    'default',
    'NEWS_PS_TEST',
    'persian.articles.c0000000000o.page',
    'https://www.bbc.co.uk',
    false,
    'https://www.bbc.com',
  );
});
