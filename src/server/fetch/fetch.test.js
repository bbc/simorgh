import fetch from 'node-fetch';
import fetchWithCerts from './fetch';
import getAgent from './agent';

jest.mock('node-fetch');
jest.mock('fs');
jest.mock('./agent');

const mockAgent = { ca: 'someCa', certChain: 'someCert', key: 'someKey' };

describe('Fetch with certs', () => {
  it('should add certificate chain to request', async () => {
    fetch.mockReturnValue('mockedResponse');
    getAgent.mockReturnValue(mockAgent);

    await fetchWithCerts('https://someUrl');

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
