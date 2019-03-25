import React, { Fragment } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import getOriginContext from './getOriginContext';

jest.mock('./getOriginContext', () => jest.fn());
getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin: origin || 'https://foobar.com',
}));

const { RequestContextProvider, RequestContextConsumer } = require('./index');

describe('RequestContext', () => {
  const testRequestContext = (platformString, bbcOrigin) => {
    shouldMatchSnapshot(
      `should have a request object for platform ${platformString} and bbcOrigin ${bbcOrigin}`,
      <RequestContextProvider platform={platformString} bbcOrigin={bbcOrigin}>
        <RequestContextConsumer>
          {({ platform, isUK, origin }) => (
            <Fragment>
              <span>{platform}</span>
              <span>{isUK ? 'true' : 'false'}</span>
              <span>{origin}</span>
            </Fragment>
          )}
        </RequestContextConsumer>
      </RequestContextProvider>,
    );
  };

  testRequestContext('default');
  testRequestContext('canonical');
  testRequestContext('amp');
  testRequestContext('default', 'https://bbc.co.uk');
});
