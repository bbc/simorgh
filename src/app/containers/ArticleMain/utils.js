import path from 'ramda/src/path';
import aboutTagsContent from '../Metadata/linkedDataAbout';

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
