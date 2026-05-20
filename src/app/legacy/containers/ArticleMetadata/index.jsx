import { use } from 'react';

import getBrandedImage from '#lib/utilities/getBrandedImage';
import Metadata from '../../../components/Metadata';
import { ServiceContext } from '../../../contexts/ServiceContext';

const ArticleMetadata = ({
  articleId = '',
  title,
  author,
  twitterHandle = null,
  firstPublished,
  lastPublished,
  section = '',
  aboutTags,
  mentionsTags,
  lang,
  description,
  imageLocator = '',
  imageAltText = '',
  hasAmpPage = true,
}) => {
  const { service } = use(ServiceContext);
  const brandedImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : null;

  return (
    articleId && (
      <Metadata
        title={title}
        lang={lang}
        twitterHandle={twitterHandle}
        description={description}
        openGraphType="article"
        aboutTags={aboutTags}
        mentionsTags={mentionsTags}
        image={brandedImage}
        imageAltText={imageAltText}
        hasAmpPage={hasAmpPage}
      >
        <meta name="article:author" content={author} />
        {lastPublished && (
          <meta name="article:modified_time" content={lastPublished} />
        )}
        {firstPublished && (
          <meta name="article:published_time" content={firstPublished} />
        )}
        {section && <meta name="article:section" content={section} />}
      </Metadata>
    )
  );
};

export default ArticleMetadata;
