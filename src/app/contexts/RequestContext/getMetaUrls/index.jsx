const getAmpUrl = url => `${url}.amp`;

const getCanonicalUrl = (origin, service, pageType, id) => {
  switch (pageType) {
    case 'frontPage':
      return `${origin}/${service}`;
    default:
      return `${origin}/${service}/articles/${id}`;
  }
};

const getCanonicalUrlWithVariant = (
  origin,
  service,
  serviceVariant,
  pageType,
  id,
) => {
  switch (pageType) {
    case 'frontPage':
      return `${origin}/${service}/${serviceVariant}`;
    default:
      return `${origin}/${service}/articles/${id}/${serviceVariant}`;
  }
};

const getUkCanonicalUrl = url => {
  const tldRegex = /(.com|.co.uk)/g;
  return url.replace(tldRegex, '.co.uk');
};

const getNonUkCanonicalUrl = url => {
  const tldRegex = /(.com|.co.uk)/g;
  return url.replace(tldRegex, '.com');
};

const getMetaUrls = (origin, service, serviceVariant, pageType, id) => {
  let canonicalLink = getCanonicalUrl(origin, service, pageType, id);
  let canonicalUkLink = getUkCanonicalUrl(canonicalLink);
  let canonicalNonUkLink = getNonUkCanonicalUrl(canonicalLink);

  if (serviceVariant) {
    canonicalLink = getCanonicalUrlWithVariant(
      origin,
      service,
      serviceVariant,
      pageType,
      id,
    );
    canonicalUkLink = getUkCanonicalUrl(canonicalLink);
    canonicalNonUkLink = getNonUkCanonicalUrl(canonicalLink);

    return {
      canonicalLink,
      ampLink: getAmpUrl(canonicalLink),
      canonicalUkLink,
      ampUkLink: getAmpUrl(canonicalUkLink),
      canonicalNonUkLink,
      ampNonUkLink: getAmpUrl(canonicalNonUkLink),
    };
  }

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
