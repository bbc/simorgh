import path from 'ramda/src/path';

const getISOStringDate = date => new Date(date).toISOString();

export const getHeadline = path(['promo', 'headlines', 'seoHeadline']);

export const getFirstPublished = articleData =>
  getISOStringDate(path(['metadata', 'firstPublished'], articleData));

export const getLastPublished = articleData =>
  getISOStringDate(path(['metadata', 'lastPublished'], articleData));

export const getAboutTags = path(['metadata', 'tags', 'about']);

export const getArticleSection = path(['metadata', 'passport', 'genre']);

export const getMentions = path(['metadata', 'tags', 'mentions']);

export const getLang = path(['metadata', 'passport', 'language']);

const checkType = types => {
  const acceptableTypes = ['Person', 'Event', 'Organization', 'Place'];
  if (types.length === 0 || types.length > 1) {
    return 'Thing';
  }
  return acceptableTypes.includes(types[0]) ? types[0] : 'Thing';
};

const checkSameAs = uris => {
  const sameAs = uris.filter(uri => uri.includes('http://dbpedia.org'));
  return sameAs.length ? sameAs : undefined;
};

const aboutTagsContent = aboutTags => {
  if (aboutTags && aboutTags.length > 0) {
    const content = [];
    aboutTags.forEach(tag => {
      const about = {
        '@type': checkType(tag.thingType),
        name: tag.thingLabel,
      };

      if (tag['skos:altLabel']) {
        about.alternateName = tag['skos:altLabel'];
      }

      if (tag.thingSameAs && tag.thingSameAs.length > 0) {
        about.sameAs = checkSameAs(tag.thingSameAs);
      }

      content.push(about);
    });
    return content;
  }
  return undefined;
};

export const buildLinkedData = ({
  brandName,
  defaultImage,
  noBylinesPolicy,
  ...articleData
}) => {
  return {
    headline: getHeadline(articleData),
    datePublished: getFirstPublished(articleData),
    dateModified: getLastPublished(articleData),
    about: aboutTagsContent(getAboutTags(articleData)),
    author: {
      '@type': 'NewsMediaOrganization',
      name: brandName,
      logo: {
        '@type': 'ImageObject',
        width: 1024,
        height: 576,
        url: defaultImage,
      },
      noBylinesPolicy,
    },
  };
};
