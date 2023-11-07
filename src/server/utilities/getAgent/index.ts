import { createSecureContext } from 'tls';
import getCert from './certs';

const getAgent = async () => {
  try {
    const undici = await import('undici');
    const { setGlobalDispatcher, Agent } = undici;

    let agentMemo;

    if (agentMemo) {
      return agentMemo;
    }

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
