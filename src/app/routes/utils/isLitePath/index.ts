import Url from 'url-parse';
import { LITE_REGEX } from '#app/lib/regex.const';

export default (url: string): boolean => {
  const { pathname } = new Url(url, true);
  return LITE_REGEX.test(pathname);
};
