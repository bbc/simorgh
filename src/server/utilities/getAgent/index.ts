import { setGlobalDispatcher, Agent } from 'undici';
import { createSecureContext } from 'tls';
import getCert from './certs';

let agentMemo: Agent;

const getAgent = async () => {
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
};

export default getAgent;
