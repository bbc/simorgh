import React, { Fragment, useContext } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import getOriginContext from './getOriginContext';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getStatsDestination from './getStatsDestination';

jest.mock('./getOriginContext', () => jest.fn());
getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin: origin || 'https://foobar.com',
}));

jest.mock('./getStatsDestination', () => jest.fn());
getStatsDestination.mockImplementation(() => '598286');

jest.mock('./getStatsPageIdentifier', () => jest.fn());
getStatsPageIdentifier.mockImplementation(
  () => 'persian.articles.c0000000000o.page',
);

const { RequestContextProvider, RequestContext } = require('./index');

const renderWithContextProvider = (node, { platformString, bbcOrigin }) => (
  <RequestContextProvider platform={platformString} bbcOrigin={bbcOrigin}>
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
    bbcOrigin,
  ) => {
    shouldMatchSnapshot(
      `should have a request object for platform ${platformString}, bbcOrigin ${bbcOrigin}, statsDestination ${statsDestination} & statsPageIdentifier ${statsPageIdentifier}`,
      renderWithContextProvider(<Component />, {
        platformString,
        bbcOrigin,
      }),
    );
  };

  testRequestContext('default', '598286', 'persian.articles.c0000000000o.page');
  testRequestContext(
    'canonical',
    '598286',
    'persian.articles.c0000000000o.page',
  );
  testRequestContext('amp', '598286', 'persian.articles.c0000000000o.page');
  testRequestContext(
    'default',
    '598286',
    'persian.articles.c0000000000o.page',
    'https://www.bbc.co.uk',
  );
});
