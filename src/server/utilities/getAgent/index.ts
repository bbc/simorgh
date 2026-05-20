import { createSecureContext } from 'node:tls';

import { Agent, setGlobalDispatcher } from 'undici';

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

  return setGlobalDispatcher(agentMemo) as unknown as Agent;
};

export default getAgent;
