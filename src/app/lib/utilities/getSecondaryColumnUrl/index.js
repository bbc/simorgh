export default ({ service, variant }) =>
  variant
    ? `/${service}/sty-secondary-column/${variant}.json`
    : `/${service}/sty-secondary-column.json`;
