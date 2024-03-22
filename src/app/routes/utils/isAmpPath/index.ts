import Url from 'url-parse';
import { AMP_REGEX } from '#app/lib/regex.const';

export default (url: string) => {
  const { pathname } = new Url(url, true);
  return AMP_REGEX.test(pathname);
};
