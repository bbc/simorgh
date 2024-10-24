import { Agent } from 'https';
import { createSecureContext } from 'tls';
import getCert from './certs';

let agentMemo = null;

const getAgent = async () => {
  if (agentMemo) {
    return agentMemo;
  }

  const { certChain, key, ca } = await getCert();

  agentMemo = new Agent({
    secureContext: createSecureContext({ cert: certChain, key, ca }),
    keepAlive: true,
  });

  return agentMemo;
};

export default getAgent;
