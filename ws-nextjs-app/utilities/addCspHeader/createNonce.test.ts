import createNonce from './createNonce';

jest.mock('#app/lib/utilities/getUUID', () => () => 'mock-uuid');

describe('createNonce', () => {
  it('should return a base64-encoded nonce', () => {
    expect(createNonce()).toBe(Buffer.from('mock-uuid').toString('base64'));
  });
});
