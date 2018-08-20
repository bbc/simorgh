import Article from '../containers/Article';
import 'isomorphic-fetch';

const routes = [
  {
    path: '/news/articles/:id',
    exact: true,
    component: Article,
    getInitialProps: async ({ match }) => {
      try {
        const { id } = match.params;

        const regex = '^(c[a-zA-Z0-9]{10}o)$';
        const routeMatches = id.match(regex);

        if (!routeMatches) {
          throw new Error(
            `Invalid route parameter: ${id}. ID parameter must be in format 'c[xxxxxxxxxx]o', where the middle part could be 0000000001 to 0000000027.`,
          );
        }

        let url = `/data/${id}.json`;

        if (typeof window === 'undefined') {
          url = `${process.env.RAZZLE_BASE_PATH}${url}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return { data };
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return {};
      }
    },
  },
  {
    path: '/news/articles/amp/:id',
    exact: true,
    component: Article,
  },
];

export default routes;
