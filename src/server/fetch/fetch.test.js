import fetch from 'node-fetch';
import { Agent } from 'https';
import fetchWithCerts from '.';
import getCerts from './certs';

jest.mock('node-fetch');
jest.mock('fs');
jest.mock('https', () => ({
  Agent: jest.fn(),
}));

jest.mock('./certs');

const mockAgent = {};

describe('Fetch with certs', () => {
  it('should only call for the certificate once, then store in memo function', async () => {
    getCerts.mockReturnValue({
      ca: 'someCa',
      certChain: 'someCert',
      key: 'someKey',
    });
    await fetchWithCerts('someUrl');
    await fetchWithCerts('someUrl');

    expect(getCerts).toHaveBeenCalledTimes(1);
  });
  it('should add certificate chain to request', async () => {
    fetch.mockReturnValue('mockedResponse');
    getCerts.mockReturnValue({
      ca: 'someCa',
      certChain: 'someCert',
      key: 'someKey',
    });

    await fetchWithCerts('https://someUrl');

    expect(Agent).toHaveBeenCalledTimes(1);
    expect(Agent).toHaveBeenCalledWith({
      ca: 'someCa',
      cert: 'someCert',
      key: 'someKey',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://someUrl', {
      method: 'GET',
      agent: mockAgent,
      headers: {
        Accept: 'application/json',
      },
    });
  });
});

it('should throw an error if no ca is presented to fetch', async () => {
  await expect(fetchWithCerts('someUrl')).rejects.toMatchInlineSnapshot(
    `[Error: No CA Bundle found]`,
  );
});
