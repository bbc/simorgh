const getAmpUrl = url => `${url}.amp`;

const getCanonicalUrl = (origin, pathname) => {
  const ampRegex = /(.amp)/g;
  const canonicalUrl = `${origin}${pathname}`;

  return canonicalUrl.replace(ampRegex, '');
};

const getUkCanonicalUrl = (origin, pathname) => {
  const tldRegex = /(.com|.co.uk)/g;
  return `${origin.replace(tldRegex, '.co.uk')}${pathname}`;
};

const getNonUkCanonicalUrl = (origin, pathname) => {
  const tldRegex = /(.com|.co.uk)/g;
  return `${origin.replace(tldRegex, '.com')}${pathname}`;
};

const getMetaUrls = (origin, pathname) => {
  const canonicalLink = getCanonicalUrl(origin, pathname);
  const canonicalUkLink = getUkCanonicalUrl(origin, pathname);
  const canonicalNonUkLink = getNonUkCanonicalUrl(origin, pathname);

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
