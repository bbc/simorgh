import { Agent } from 'https';
import getCert from './certs';

let agentMemo = null;

const getAgent = async () => {
  if (agentMemo) {
    return agentMemo;
  }
  const { certChain, key, ca } = await getCert();

  const agentOptions = { cert: certChain, key, ca };
  agentMemo = new Agent(agentOptions);
  return agentMemo;
};

export default getAgent;
