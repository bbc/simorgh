export default ({ path, suffix = '' }) => {
  const { pathname, search } = new URL(`https://www.bbc.com${path}`);

  return `${pathname}${suffix}${search}`;
};
