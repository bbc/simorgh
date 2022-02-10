import { Agent } from 'https';
import fetch from 'node-fetch';
import nodeLogger from '#lib/logger.node';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import getCerts from './certs';

const logger = nodeLogger(__filename);

const getAgent = async () => {
  const { certChain, key, ca } = await getCerts();

  if (!ca) throw new Error(`No CA Bundle found`);
  if (!certChain) throw new Error(`No Public Key Chain found`);
  if (!key) throw new Error(`No Private Key found`);

  const agentOptions = { cert: certChain, key, ca };
  const agent = new Agent(agentOptions);
  return agent;
};

const fetchWithCerts = async (requestUrl, service) => {
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
    logger.error(BFF_FETCH_ERROR, {
      service,
      error,
    });
    return null;
  }
};

export default fetchWithCerts;
