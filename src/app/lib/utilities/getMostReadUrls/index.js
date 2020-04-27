export const getMostReadEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;

export const getLocalMostReadEndpoint = ({ service, variant = 'default' }) =>
  `./data/${service}/mostRead/${
    variant === 'default' ? 'index' : variant
  }.json`;
