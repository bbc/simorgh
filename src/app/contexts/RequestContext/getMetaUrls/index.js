const base = `https://www.`

const getAmpUrl = url => `${url}.amp`

const getCanonicalUrl = (origin, service, pageType, id) => {
    switch (pageType) {
        case 'frontPage':
            return `${origin}/${service}`;
        default:
            return `${origin}/${service}/articles/${id}`;
    }
}

const getCanonicalUrlWithVariant = (origin, service, serviceVariant, pageType, id) => {
    switch (pageType) {
        case 'frontPage':
            return `${origin}/${service}/${serviceVariant}`;
        default:
            return `${origin}/${service}/articles/${id}/${serviceVariant}`;
    }
}

const getUkConicalUrl = (url) => {
    const tldRegex = /(.com|.co.uk)/g
    return url.replace(tldRegex, '.com')
}

const getNonUkConicalUrl = (url) => {
    const tldRegex = /(.com|.co.uk)/g
    return url.replace(tldRegex, '.co.uk')
}

const getMetaUrls = (origin, env, platform, service, serviceVariant, pageType, id) => {
    let
        canonicalLink = getCanonicalUrl(origin, service, pageType, id),
        canonicalUkLink = getUkConicalUrl(canonicalLink),
        canonicalNonUkLink = getNonUkConicalUrl(canonicalLink);

    if (serviceVariant) {
        canonicalLink = getCanonicalUrlWithVariant(origin, service, serviceVariant, pageType, id);
        return {
            canonicalLink: canonicalLink,
            ampLink: getAmpUrl(canonicalLink),
            canonicalUkLink: canonicalUkLink,
            ampUkLink: getAmpUrl(canonicalUkLink),
            canonicalNonUkLink: canonicalNonUkLink,
            ampNonUkLink: getAmpUrl(canonicalNonUkLink),
        }
    }

    return {
        canonicalLink: canonicalLink,
        ampLink: getAmpUrl(canonicalLink),
        canonicalUkLink: canonicalUkLink,
        ampUkLink: getAmpUrl(canonicalUkLink),
        canonicalNonUkLink: canonicalNonUkLink,
        ampNonUkLink: getAmpUrl(canonicalNonUkLink),
    }
}

export default getMetaUrls