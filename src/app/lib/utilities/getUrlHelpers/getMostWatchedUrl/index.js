const getBaseUrl = env =>
  ({
    live: 'https://www.bbc.com/',
    test: 'https://www.test.bbc.com/',
  })[env] || '/';

const getExtension = env => (env !== 'local' ? '.json' : '');

const getMostWatchedEndpoint = ({ service, variant, env }) =>
  variant
    ? `${getBaseUrl(env)}${service}/mostwatched/${variant}${getExtension(env)}`
    : `${getBaseUrl(env)}${service}/mostwatched${getExtension(env)}`;

export default getMostWatchedEndpoint;
