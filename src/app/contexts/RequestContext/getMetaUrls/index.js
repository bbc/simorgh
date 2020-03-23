const getAmpUrl = (url) => `${url}.amp`;

const getCanonicalUrl = (origin, pathname) => {
  const ampRegex = /(.amp)/g;
  const canonicalUrl = `${origin}${pathname}`;

  return canonicalUrl.replace(ampRegex, '');
};

const getUkCanonicalUrl = (url) => {
  const tldRegex = /(.com|.co.uk)/g;
  return url.replace(tldRegex, '.co.uk');
};

const getNonUkCanonicalUrl = (url) => {
  const tldRegex = /(.com|.co.uk)/g;
  return url.replace(tldRegex, '.com');
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
