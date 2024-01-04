import { Agent } from 'undici';
import getAgent from '.';
import getCerts from './certs';

jest.mock('undici', () => ({
  Agent: jest.fn(),
  setGlobalDispatcher: jest.fn(),
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
    (getCerts as jest.Mock).mockReturnValue({
      ca: 'someCa',
      certChain: 'someCert',
      key: 'someKey',
    });

    await getAgent();
    await getAgent();

    expect(getCerts).toHaveBeenCalledTimes(1);
    expect(Agent).toHaveBeenCalledTimes(1);
    expect(Agent).toHaveBeenCalledWith({
      connect: {
        keepAlive: true,
        rejectUnauthorized: false,
        secureContext: {
          context: {
            ca: 'someCa',
            cert: 'someCert',
            key: 'someKey',
          },
        },
      },
    });
  });
});
