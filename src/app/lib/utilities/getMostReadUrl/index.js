export default ({ service, variant }) =>
  variant && variant !== 'default'
    ? `/${service}/mostread/${variant}.json`
    : `/${service}/mostread.json`;
