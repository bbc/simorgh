const getMostWatchedEndpoint = ({ service, variant }) =>
  variant
    ? `/${service}/mostwatched/${variant}.json`
    : `/${service}/mostwatched.json`;

export default getMostWatchedEndpoint;
