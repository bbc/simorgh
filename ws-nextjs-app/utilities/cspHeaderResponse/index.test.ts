/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import cspHeaderResponse from '.';

const policies = [
  'default-src',
  'child-src',
  'connect-src',
  'font-src',
  'frame-src',
  'img-src',
  'script-src',
  'style-src',
  'media-src',
  'worker-src',
  'report-to',
  'upgrade-insecure-requests',
];

describe('cspHeaderResponse', () => {
  it.each(policies)('should set %s in the request CSP', policy => {
    const response = cspHeaderResponse({
      request: {
        url: 'https://www.test.bbc.com/pidgin/live/c7p765ynk9qt',
      } as NextRequest,
    });

    const requestCsp = response.headers.get(
      'x-middleware-request-content-security-policy',
    );

    expect(requestCsp?.includes(policy)).toBe(true);
  });

  it.each(policies)('should set %s in the response CSP', policy => {
    const response = cspHeaderResponse({
      request: {
        url: 'https://www.test.bbc.com/pidgin/live/c7p765ynk9qt',
      } as NextRequest,
    });

    const requestCsp = response.headers.get('content-security-policy');

    expect(requestCsp?.includes(policy)).toBe(true);
  });
});
