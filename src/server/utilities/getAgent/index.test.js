import { Agent } from 'https';
import getAgent from '.';
import getCerts from './certs';

jest.mock('https', () => ({
  Agent: jest.fn(),
}));

jest.mock('./certs');

describe('Agent', () => {
  it('should only call for the certificate once, then store in memo', async () => {
    getCerts.mockReturnValue({
      ca: 'someCa',
      certChain: 'someCert',
      key: 'someKey',
    });
    await getAgent();
    await getAgent();

    expect(getCerts).toHaveBeenCalledTimes(1);
    expect(Agent).toHaveBeenCalledTimes(1);
    expect(Agent).toHaveBeenCalledWith({
      ca: 'someCa',
      cert: 'someCert',
      key: 'someKey',
    });
  });
});
