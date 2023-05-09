import { setGlobalDispatcher, Agent } from 'undici';
import getCert from './certs';

const getAgent = async () => {
  const { certChain, key, ca } = await getCert();

  setGlobalDispatcher(
    new Agent({
      connect: {
        cert: certChain,
        key,
        ca,
        rejectUnauthorized: false,
      },
    }),
  );
};

export default getAgent;
