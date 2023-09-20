import { Agent } from 'https';
import getAgent from '.';
import getCerts from './certs';

jest.mock('https', () => ({
  Agent: jest.fn(),
}));

jest.mock('tls', () => ({
  createSecureContext: jest.fn().mockReturnValue({
    context: {
      ca: 'someCa',
      cert: 'someCert',
      key: 'someKey',
    },
  }),
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
      keepAlive: true,
      secureContext: {
        context: {
          ca: 'someCa',
          cert: 'someCert',
          key: 'someKey',
        },
      },
    });
  });
});
