import path from 'ramda/src/path';
import aboutTagsContent from '../Metadata/linkedDataAbout';

const getISOStringDate = date => new Date(date).toISOString();

export default articleData => {
  const headline = path(['promo', 'headlines', 'seoHeadline'], articleData);
  const firstPublished = getISOStringDate(
    path(['metadata', 'firstPublished'], articleData),
  );
  const lastPublished = getISOStringDate(
    path(['metadata', 'lastPublished'], articleData),
  );
  const aboutTags = path(['metadata', 'tags', 'about'], articleData);
  const articleSection = path(['metadata', 'passport', 'genre'], articleData);
  const mentionsTags = path(['metadata', 'tags', 'mentions'], articleData);

  return {
    firstPublished,
    lastPublished,
    articleSection,
    mentionsTags,
    aboutTags,
    articleSpecificLinkedData: {
      headline,
      datePublished: firstPublished,
      dateModified: lastPublished,
      about: aboutTagsContent(aboutTags),
      author: {
        '@type': 'NewsMediaOrganization',
        name: path(['brandName'], articleData),
        logo: {
          '@type': 'ImageObject',
          width: 1024,
          height: 576,
          url: path(['defaultImage'], articleData),
        },
        noBylinesPolicy: path(['noBylinesPolicy'], articleData),
      },
    },
  };
};
