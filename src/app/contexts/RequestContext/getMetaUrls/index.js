import { AMP_REGEX, TLD_REGEX } from '#app/lib/regex.const';

const getAmpUrl = url => `${url}.amp`;

const getCanonicalUrl = (origin, pathname) => {
  const canonicalUrl = `${origin}${pathname}`;

  return canonicalUrl.replace(AMP_REGEX, '');
};

const getUkCanonicalUrl = url => {
  return url.replace(TLD_REGEX, '.co.uk');
};

const getNonUkCanonicalUrl = url => {
  return url.replace(TLD_REGEX, '.com');
};

const getMetaUrls = (origin, pathname) => {
  const canonicalLink = getCanonicalUrl(origin, pathname);
  const canonicalUkLink = getUkCanonicalUrl(canonicalLink);
  const canonicalNonUkLink = getNonUkCanonicalUrl(canonicalLink);

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
