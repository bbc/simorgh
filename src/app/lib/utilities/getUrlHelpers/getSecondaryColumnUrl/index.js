export default ({ service, variant }) =>
  variant
    ? `/${service}/sty-secondary-column/${variant}`
    : `/${service}/sty-secondary-column`;
