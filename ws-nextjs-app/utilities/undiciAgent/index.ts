import { setGlobalDispatcher, Agent } from 'undici';
import getCert from './certs';

let agentMemo: Agent;

const getAgent = async () => {
  if (agentMemo) {
    return agentMemo;
  }

  const { certChain, key, ca } = await getCert();

  const agentOptions = { cert: certChain, key, ca, rejectUnauthorized: false };

  agentMemo = new Agent({ connect: agentOptions });

  return setGlobalDispatcher(agentMemo);
};

export default getAgent;
