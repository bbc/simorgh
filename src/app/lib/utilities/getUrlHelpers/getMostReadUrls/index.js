export const getMostReadEndpoint = ({ service, variant, isBff = false }) => {
  if (isBff) {
    return variant
      ? `/fd/simorgh-bff?pageType=mostRead&service=${service}&variant=${variant}`
      : `/fd/simorgh-bff?pageType=mostRead&service=${service}`;
  }

  return variant
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;
};

export const getLocalMostReadEndpoint = ({ service, variant = 'default' }) =>
  `#data/${service}/mostRead/${variant === 'default' ? 'index' : variant}.json`;
