import { AMP_REGEX, APP_REGEX, LITE_REGEX } from '#app/lib/regex.const';

export default (url: string) => {
  const { pathname } = new URL(url, 'https://www.bbc.com');

  return {
    isAmp: AMP_REGEX.test(pathname),
    isApp: APP_REGEX.test(pathname),
    isLite: LITE_REGEX.test(pathname),
  };
};
