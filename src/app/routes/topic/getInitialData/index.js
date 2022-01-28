import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const validateResponse = async response => {
  const { status } = response;
  if (response.status === 200) {
    const { data } = await response.json();
    return { data, status };
  }

  return null;
};

export default async ({ fetch, service }) => {
  try {
    const fablPath = process.env.BFF_PATH;
    const response = await fetch(fablPath, service);
    const { status, data } = await validateResponse(response);
    return {
      status,
      pageData: {
        ...data,
      },
    };
  } catch (error) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      error,
    });
    return { error, status: INTERNAL_SERVER_ERROR };
  }
};
