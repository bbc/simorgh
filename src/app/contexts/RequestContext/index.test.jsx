import React, { Fragment, useContext } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import getOriginContext from './getOriginContext';

jest.mock('./getOriginContext', () => jest.fn());
getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin: origin || 'https://foobar.com',
}));

const { RequestContextProvider, RequestContext } = require('./index');

const renderWithContext = (node, { platformString, bbcOrigin }) => (
  <RequestContextProvider platform={platformString} bbcOrigin={bbcOrigin}>
    {node}
  </RequestContextProvider>
);

const Component = () => {
  const { platform, isUK, origin } = useContext(RequestContext);
  return (
    <Fragment>
      <span>{platform}</span>
      <span>{isUK ? 'true' : 'false'}</span>
      <span>{origin}</span>
    </Fragment>
  );
};

describe('RequestContext', () => {
  const testRequestContext = (platformString, bbcOrigin) => {
    shouldMatchSnapshot(
      `should have a request object for platform ${platformString} and bbcOrigin ${bbcOrigin}`,
      renderWithContext(<Component />, {
        platformString,
        bbcOrigin,
      }),
    );
  };

  testRequestContext('default');
  testRequestContext('canonical');
  testRequestContext('amp');
  testRequestContext('default', 'https://www.bbc.co.uk');
});
