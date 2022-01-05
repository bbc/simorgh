import { localBaseUrl } from '#testHelpers/config';
import getCookieOvenEndpoints from './getCookieOvenEndpoints';

const POLICY_APPROVED = '111';
const POLICY_DENIED = '000';

describe('getCookieOvenEndpoints', () => {
  test.each`
    origin                                                      | policy             | expectedOutsideUkEndpoint                           | expectedUkEndpoint
    ${'https://www.bbc.com'}                                    | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'https://www.bbc.com'}                                    | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
    ${'https://www.bbc.co.uk'}                                  | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'https://www.bbc.co.uk'}                                  | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
    ${'https://simorgh.api.bbci.co.uk'}                         | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'https://simorgh.api.bbci.co.uk'}                         | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
    ${'https://my-routing-layer.cookieless-domain.co.uk/'}      | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'https://my-routing-layer.cookieless-domain.co.uk/'}      | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
    ${'https://www.stage.bbc.com'}                              | ${POLICY_APPROVED} | ${'https://www.test.bbc.com/cookieoven?policy=111'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=111'}
    ${'https://www.stage.bbc.com'}                              | ${POLICY_DENIED}   | ${'https://www.test.bbc.com/cookieoven?policy=000'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=000'}
    ${'https://www.stage.bbc.co.uk'}                            | ${POLICY_APPROVED} | ${'https://www.test.bbc.com/cookieoven?policy=111'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=111'}
    ${'https://www.stage.bbc.co.uk'}                            | ${POLICY_DENIED}   | ${'https://www.test.bbc.com/cookieoven?policy=000'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=000'}
    ${'https://www.test.bbc.com'}                               | ${POLICY_APPROVED} | ${'https://www.test.bbc.com/cookieoven?policy=111'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=111'}
    ${'https://www.test.bbc.com'}                               | ${POLICY_DENIED}   | ${'https://www.test.bbc.com/cookieoven?policy=000'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=000'}
    ${'https://www.test.bbc.co.uk'}                             | ${POLICY_APPROVED} | ${'https://www.test.bbc.com/cookieoven?policy=111'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=111'}
    ${'https://www.test.bbc.co.uk'}                             | ${POLICY_DENIED}   | ${'https://www.test.bbc.com/cookieoven?policy=000'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=000'}
    ${'https://simorgh.test.api.bbci.co.uk'}                    | ${POLICY_APPROVED} | ${'https://www.test.bbc.com/cookieoven?policy=111'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=111'}
    ${'https://simorgh.test.api.bbci.co.uk'}                    | ${POLICY_DENIED}   | ${'https://www.test.bbc.com/cookieoven?policy=000'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=000'}
    ${'https://my-routing-layer.test.cookieless-domain.co.uk/'} | ${POLICY_APPROVED} | ${'https://www.test.bbc.com/cookieoven?policy=111'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=111'}
    ${'https://my-routing-layer.test.cookieless-domain.co.uk/'} | ${POLICY_DENIED}   | ${'https://www.test.bbc.com/cookieoven?policy=000'} | ${'https://www.test.bbc.co.uk/cookieoven?policy=000'}
    ${localBaseUrl}                                             | ${POLICY_APPROVED} | ${`${localBaseUrl}/cookieoven?policy=111`}          | ${undefined}
    ${localBaseUrl}                                             | ${POLICY_DENIED}   | ${`${localBaseUrl}/cookieoven?policy=000`}          | ${undefined}
    ${'https://foobar.org'}                                     | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'https://foobar.org'}                                     | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
    ${'http://foobar.org'}                                      | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'http://foobar.org'}                                      | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
    ${'foobar.org'}                                             | ${POLICY_APPROVED} | ${'https://www.bbc.com/cookieoven?policy=111'}      | ${'https://www.bbc.co.uk/cookieoven?policy=111'}
    ${'foobar.org'}                                             | ${POLICY_DENIED}   | ${'https://www.bbc.com/cookieoven?policy=000'}      | ${'https://www.bbc.co.uk/cookieoven?policy=000'}
  `(
    `returns correct endpoints when on $origin and policy is $policy`,
    ({ origin, policy, expectedOutsideUkEndpoint, expectedUkEndpoint }) => {
      const [outsideUkEndpoint, ukEndpoint] = getCookieOvenEndpoints({
        origin,
        policy,
      });

      expect(outsideUkEndpoint).toBe(expectedOutsideUkEndpoint);
      expect(ukEndpoint).toBe(expectedUkEndpoint);
    },
  );
});
