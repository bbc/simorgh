import fetch from 'node-fetch';
import nodeLogger from '#lib/logger.node';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import getAgent from './agent';

const logger = nodeLogger(__filename);

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
