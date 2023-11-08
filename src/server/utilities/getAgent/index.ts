import { setGlobalDispatcher, Agent } from 'undici';
import { createSecureContext } from 'tls';
import { PRIMARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';
import getCert from './certs';

let agentMemo: Agent;

type Props = {
  timeout: number;
};

const getAgent = async (
  { timeout }: Props = { timeout: PRIMARY_DATA_TIMEOUT },
) => {
  if (agentMemo) {
    return agentMemo;
  }

  const { certChain, key, ca } = await getCert();

  agentMemo = new Agent({
    connect: {
      timeout,
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
