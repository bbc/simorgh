import 'isomorphic-fetch';

const logger = require('../../helpers/logger.node')(__filename);

const getInitialData = async ({ match }) => {
  try {
    const { id, service, amp } = match.params;

    const url = `${
      process.env.SIMORGH_BASE_URL
    }/${service}/articles/${id}.json`;

    const response = await fetch(url);

    const data = await response.json();
    const isAmp = !!amp;

    return {
      isAmp,
      data,
      service,
    };
  } catch (error) {
    logger.error(error);
    return {};
  }
};

export default getInitialData;
