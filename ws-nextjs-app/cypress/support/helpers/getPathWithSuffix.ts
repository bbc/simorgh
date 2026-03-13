export default ({ path, suffix = '' }: { path: string; suffix?: string }) => {
  const { pathname, search } = new URL(`https://www.bbc.com${path}`);

  return `${pathname}${suffix}${search}`;
};
