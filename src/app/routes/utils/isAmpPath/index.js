import Url from 'url-parse';

const isAmpPath = url => {
  const { pathname } = new Url(url, true);
  const ampRegex = /\.amp$/;
  return ampRegex.test(pathname);
};

export default isAmpPath;
