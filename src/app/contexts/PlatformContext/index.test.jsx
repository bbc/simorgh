import React, { Fragment } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import getOriginContext from './getOriginContext';

jest.mock('./getOriginContext', () => jest.fn());
getOriginContext.mockImplementation(origin => ({
  isUK: true,
  origin,
}));

const { PlatformContextProvider, PlatformContextConsumer } = require('./index');

describe('PlatformContext', () => {
  const testPlatformContext = (platformString, bbcOrigin) => {
    shouldMatchSnapshot(
      `should have a platform object for platform ${platformString} and bbcOrigin ${bbcOrigin}`,
      <PlatformContextProvider platform={platformString} bbcOrigin={bbcOrigin}>
        <PlatformContextConsumer>
          {({ platform, isUK, origin }) => (
            <Fragment>
              <span>{platform}</span>
              <span>{isUK ? 'true' : 'false'}</span>
              <span>{origin}</span>
            </Fragment>
          )}
        </PlatformContextConsumer>
      </PlatformContextProvider>,
    );
  };

  testPlatformContext('default');
  testPlatformContext('canonical');
  testPlatformContext('amp');
  testPlatformContext('default', 'https://bbc.co.uk');
});
