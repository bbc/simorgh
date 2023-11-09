import Url from 'url-parse';
import { APP_REGEX } from '#app/lib/regex.const';

export default (url: string): boolean => {
  const { pathname } = new Url(url, true);
  return APP_REGEX.test(pathname);
};
