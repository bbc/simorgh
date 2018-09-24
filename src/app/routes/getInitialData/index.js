import 'isomorphic-fetch';
import isAmpPath from '../../helpers/isAmpPath';
import isServer from '../../helpers/isServer';

const validateService = service => {
  const services = ['news', 'persian'];
  const serviceMatch = services.includes(service);

  if (!serviceMatch) {
    throw new Error(
      `Invalid route parameter: ${service}. Service parameter must be news or persian.`,
    );
  }
};

const validateId = id => {
  const regex = '^(c[a-zA-Z0-9]{10}o)$';
  const routeMatches = id.match(regex);

  if (!routeMatches) {
    throw new Error(
      `Invalid route parameter: ${id}. ID parameter must be in format 'c[xxxxxxxxxx]o', where the middle part could be 0000000001 to 0000000027.`,
    );
  }
};

const getInitialData = async ({ match }) => {
  try {
    const { path } = match;
    const { id, service } = match.params;

    validateService(service);
    validateId(id);

    let url = `/data/${service}/${id}.json`;

    if (isServer()) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const amp = isAmpPath(path);

    return { amp, data, service };
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    return {};
  }
};

export default getInitialData;
