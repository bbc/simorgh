import path from 'ramda/src/path';
import aboutTagsContent from '../Metadata/linkedDataAbout';

const getISOStringDate = date => new Date(date).toISOString();

export default articleData => {
  const content = path(['content'], articleData);
  const metadata = path(['metadata'], articleData);
  const promo = path(['promo'], articleData);
  const blocks = path(['model', 'blocks'], content);
  const headline = path(['headlines', 'seoHeadline'], promo);
  const firstPublished = getISOStringDate(path(['firstPublished'], metadata));
  const lastPublished = getISOStringDate(path(['lastPublished'], metadata));
  const aboutTags = path(['tags', 'about'], metadata);
  const articleSection = path(['passport', 'genre'], metadata);
  const mentionsTags = path(['tags', 'mentions'], metadata);

  return {
    firstPublished,
    lastPublished,
    blocks,
    articleSection,
    mentionsTags,
    aboutTags,
    promo,
    metadata,
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
