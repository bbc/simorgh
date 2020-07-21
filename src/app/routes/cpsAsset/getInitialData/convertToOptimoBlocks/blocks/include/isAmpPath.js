const isAmpPath = pathname => {
  const ampRegex = /(\.amp)/;
  return ampRegex.test(pathname);
};

export default isAmpPath;
