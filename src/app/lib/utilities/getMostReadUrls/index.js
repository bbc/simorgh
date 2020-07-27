export const getMostReadEndpoint = ({
  service,
  variant,
  env,
  queryString,
  baseUrl = '',
}) => {
  const query = env !== 'live' && queryString ? queryString : '';
  return variant
    ? `${baseUrl}/${service}/mostread/${variant}.json${query}`
    : `${baseUrl}/${service}/mostread.json${query}`;
};

export const getLocalMostReadEndpoint = ({ service, variant = 'default' }) =>
  `./data/${service}/mostRead/${
    variant === 'default' ? 'index' : variant
  }.json`;
