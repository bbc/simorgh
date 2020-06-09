import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, shape, arrayOf, bool, object } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import getAboutTagsContent from './getAboutTagsContent';
import serialiseForScript from '#lib/utilities/serialiseForScript';

const LinkedData = ({
  showAuthor,
  type,
  seoTitle,
  headline,
  description,
  datePublished,
  dateModified,
  aboutTags,
  entities,
}) => {
  const {
    brandName,
    publishingPrinciples,
    defaultImage,
    noBylinesPolicy,
    isTrustProjectParticipant,
  } = useContext(ServiceContext);
  const { canonicalNonUkLink } = useContext(RequestContext);
  const IMG_TYPE = 'ImageObject';
  const ORG_TYPE = isTrustProjectParticipant
    ? 'NewsMediaOrganization'
    : 'Organization';
  const WEB_PAGE_TYPE = 'WebPage';
  const AUTHOR_PUBLISHER_NAME = isTrustProjectParticipant ? brandName : 'BBC';

  const logo = {
    '@type': IMG_TYPE,
    width: 1024,
    height: 576,
    url: defaultImage,
  };

  const image = {
    '@type': IMG_TYPE,
    width: 1024,
    height: 576,
    url: defaultImage,
  };

  const publisher = {
    '@type': ORG_TYPE,
    name: AUTHOR_PUBLISHER_NAME,
    ...(isTrustProjectParticipant && { publishingPrinciples }),
    logo,
  };
  const mainEntityOfPage = {
    '@type': WEB_PAGE_TYPE,
    '@id': canonicalNonUkLink,
    name: seoTitle,
  };

  const linkedData = {
    '@type': type,
    url: canonicalNonUkLink,
    publisher,
    image,
    thumbnailUrl: defaultImage,
    mainEntityOfPage,
    headline,
    description,
    datePublished,
    dateModified,
    ...(aboutTags && { about: getAboutTagsContent(aboutTags) }),
    ...(showAuthor && {
      author: {
        '@type': ORG_TYPE,
        name: AUTHOR_PUBLISHER_NAME,
        logo: {
          '@type': 'ImageObject',
          width: 1024,
          height: 576,
          url: defaultImage,
        },
        ...(isTrustProjectParticipant && { noBylinesPolicy }),
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {serialiseForScript({
          '@context': 'http://schema.org',
          '@graph': [{ ...linkedData }, ...entities],
        })}
      </script>
    </Helmet>
  );
};

LinkedData.propTypes = {
  showAuthor: bool,
  type: string.isRequired,
  seoTitle: string.isRequired,
  headline: string,
  description: string,
  datePublished: string,
  dateModified: string,
  aboutTags: arrayOf(
    shape({
      '@type': string,
      name: string,
      sameAs: arrayOf(string),
    }),
  ),
  // eslint-disable-next-line react/forbid-prop-types
  entities: arrayOf(object),
};

LinkedData.defaultProps = {
  showAuthor: false,
  headline: undefined,
  description: undefined,
  datePublished: undefined,
  dateModified: undefined,
  aboutTags: undefined,
  entities: [],
};

export default LinkedData;
