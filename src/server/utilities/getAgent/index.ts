/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSecureContext } from 'tls';
import getCert from './certs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let agentMemo: any;

const getAgent = async () => {
  if (agentMemo) {
    return agentMemo;
  }

  try {
    const undici = await import('undici');
    const { setGlobalDispatcher, Agent } = undici;

    const { certChain, key, ca } = await getCert();

    agentMemo = new Agent({
      connect: {
        keepAlive: true,
        rejectUnauthorized: false,
        secureContext: createSecureContext({
          cert: certChain,
          key,
          ca,
        }),
      },
    });

    return setGlobalDispatcher(agentMemo);
  } catch (error) {
    throw new Error(`Failed to import undici: ${error}`);
  }
};

export default getAgent;
