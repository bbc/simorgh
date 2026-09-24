import { ServerResponse } from 'http';
import getNonceFromCspHeader from './getNonceFromCspHeader';

const resWithCspHeader = (cspHeader?: string) =>
  ({
    getHeader: () => cspHeader,
  }) as unknown as ServerResponse;

describe('getNonceFromCspHeader', () => {
  it('returns the nonce when the policy contains one', () => {
    const res = resWithCspHeader(
      "default-src 'self';script-src 'self' 'nonce-abc-123' *.bbc.com;",
    );

    expect(getNonceFromCspHeader(res)).toBe('abc-123');
  });

  it('returns null when the policy contains no nonce', () => {
    const res = resWithCspHeader("script-src 'self' 'unsafe-inline';");

    expect(getNonceFromCspHeader(res)).toBeNull();
  });

  it('returns null when no policy has been set', () => {
    expect(getNonceFromCspHeader(resWithCspHeader())).toBeNull();
  });

  it('returns null when there is no response', () => {
    expect(getNonceFromCspHeader(undefined)).toBeNull();
  });
});
