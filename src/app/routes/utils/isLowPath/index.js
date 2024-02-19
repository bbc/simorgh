import Url from 'url-parse';
import { LOW_REGEX } from '#app/lib/regex.const';

export default url => {
  const { pathname } = new Url(url, true);
  return LOW_REGEX.test(pathname);
};
