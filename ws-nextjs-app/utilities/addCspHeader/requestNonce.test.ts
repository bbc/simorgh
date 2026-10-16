import { IncomingMessage } from 'http';
import { getRequestNonce, setRequestNonce } from './requestNonce';

const createRequest = () => ({}) as IncomingMessage;

describe('requestNonce', () => {
  it('returns the nonce that was set on the request', () => {
    const req = createRequest();

    setRequestNonce(req, 'a-nonce');

    expect(getRequestNonce(req)).toBe('a-nonce');
  });

  it('returns undefined when no nonce has been set', () => {
    expect(getRequestNonce(createRequest())).toBeUndefined();
  });

  it('returns undefined when there is no request', () => {
    expect(getRequestNonce(undefined)).toBeUndefined();
  });

  it('does not throw when setting on a missing request', () => {
    expect(() => setRequestNonce(undefined, 'a-nonce')).not.toThrow();
  });

  it('ignores a null nonce', () => {
    const req = createRequest();

    setRequestNonce(req, null);

    expect(getRequestNonce(req)).toBeUndefined();
  });

  it('keeps nonces isolated between concurrent requests', () => {
    const requestOne = createRequest();
    const requestTwo = createRequest();

    setRequestNonce(requestOne, 'nonce-one');
    setRequestNonce(requestTwo, 'nonce-two');

    expect(getRequestNonce(requestOne)).toBe('nonce-one');
    expect(getRequestNonce(requestTwo)).toBe('nonce-two');
  });

  it('is not exposed as an enumerable property', () => {
    const req = createRequest();

    setRequestNonce(req, 'a-nonce');

    expect(Object.keys(req)).toHaveLength(0);
    expect(JSON.stringify(req)).toBe('{}');
  });
});
