import React, { Fragment } from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import getOriginContext from './getOriginContext';

jest.mock('./getOriginContext', () => jest.fn());
getOriginContext.mockImplementation(originValue => {
  const origin = originValue || 'https://foobar.com';

  return {
    isUK: true,
    origin,
    env: 'live',
    href: `${origin}/path`,
    referrer: `${origin}/otherPath`,
  };
});

const { RequestContextProvider, RequestContextConsumer } = require('./index');

describe('RequestContext', () => {
  const testRequestContext = ({
    platform,
    bbcOrigin,
    service,
    articleData,
  }) => {
    shouldMatchSnapshot(
      `should have a request object for platform ${platform} and bbcOrigin ${bbcOrigin}`,
      <RequestContextProvider
        platform={platform}
        bbcOrigin={bbcOrigin}
        service={service}
        articleData={articleData}
      >
        <RequestContextConsumer>
          {({ platform: platformOutput, isUK, origin, env, href, referrer }) => (
            <Fragment>
              <span>{platformOutput}</span>
              <span>{isUK ? 'true' : 'false'}</span>
              <span>{origin}</span>
              <span>{env}</span>
              <span>{href}</span>
              <span>{referrer}</span>
            </Fragment>
          )}
        </RequestContextConsumer>
      </RequestContextProvider>,
    );
  };

  testRequestContext({ platform: 'default', service: 'news', articleData: {} });
  testRequestContext({
    platform: 'canonical',
    service: 'news',
    articleData: {},
  });
  testRequestContext({ platform: 'amp', service: 'news', articleData: {} });
  testRequestContext({
    platform: 'default',
    service: 'news',
    articleData: {},
    bbcOrigin: 'https://www.bbc.co.uk',
  });
});
