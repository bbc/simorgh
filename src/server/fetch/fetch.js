import { Agent } from 'https';
import fetch from 'node-fetch';
import getCerts from './certs';

let agentMemo = null;

const getAgent = async () => {
  const certsMemo = await getCerts();
  const { certChain, key, ca, caPath, keyPath, certChainPath } = certsMemo;

  if (!ca) throw new Error(`No CA Bundle found at ${caPath}`);
  if (!certChain)
    throw new Error(`No Public Key Chain found at ${certChainPath}`);
  if (!key) throw new Error(`No Private Key found at ${keyPath}`);

  const agentOptions = { cert: certChain, key, ca };
  agentMemo = new Agent(agentOptions);
  return agentMemo;
};

const fetchWithCerts = async requestUrl => {
  const agent = await getAgent();

  const opts = {
    method: 'GET',
    agent,
    headers: {
      Accept: 'application/json',
    },
  };

  try {
    return await fetch(requestUrl, opts);
  } catch (error) {
    const socketConnectionFailedErrors = ['ECONNRESET', 'EPIPE', 'ETIMEDOUT'];
    if (socketConnectionFailedErrors.includes(error.code)) {
      return fetch(requestUrl, opts);
    }

    throw error;
  }
};

export default fetchWithCerts;
