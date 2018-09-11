import 'isomorphic-fetch';
import Article from '../containers/Article';
import isAmpPath from '../helpers/isAmpPath';

const isServer = () => typeof window === 'undefined';

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

    let url = `/data/${id}.json`;

    if (isServer()) {
      url = `${process.env.RAZZLE_BASE_PATH}${url}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const amp = isAmpPath(path);

    return { amp, data };
  } catch (error) {
    throw error;
  }
};

const routes = [
  {
    path: '/:service/articles/:id',
    exact: true,
    component: Article,
    getInitialData,
  },
  {
    path: '/:service/articles/amp/:id',
    exact: true,
    component: Article,
    getInitialData,
  },
];

export default routes;
