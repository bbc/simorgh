import Url from 'url-parse';
import { APP_REGEX } from '#app/lib/regex.const';

export default url => {
  const { pathname } = new Url(url, true);
  return APP_REGEX.test(pathname);
};
