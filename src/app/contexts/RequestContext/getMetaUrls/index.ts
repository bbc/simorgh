import { AMP_REGEX, TLD_REGEX, LITE_REGEX } from '../../../lib/regex.const';

const getAmpUrl = (url: string) => `${url}.amp`;

const getCanonicalUrl = (origin: string, pathname: string) => {
  const canonicalUrl = `${origin}${pathname}`;

  return canonicalUrl.replace(AMP_REGEX, '').replace(LITE_REGEX, '');
};

const getCanonicalUrlWithTld = (url: string, tld: string) => {
  return url.replace(TLD_REGEX, tld);
};

const getMetaUrls = (origin: string, pathname: string) => {
  const canonicalLink = getCanonicalUrl(origin, pathname);
  const canonicalUkLink = getCanonicalUrlWithTld(canonicalLink, '.co.uk');
  const canonicalNonUkLink = getCanonicalUrlWithTld(canonicalLink, '.com');

  return {
    canonicalLink,
    ampLink: getAmpUrl(canonicalLink),
    canonicalUkLink,
    ampUkLink: getAmpUrl(canonicalUkLink),
    canonicalNonUkLink,
    ampNonUkLink: getAmpUrl(canonicalNonUkLink),
  };
};

export default getMetaUrls;
