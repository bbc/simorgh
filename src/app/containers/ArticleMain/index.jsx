import React, { useContext } from 'react';
import path from 'ramda/src/path';
import { articleDataPropTypes } from '#models/propTypes/article';
import MetadataContainer from '../Metadata';
import ArticleMetadata from '../../components/ArticleMetadata';
import { ServiceContext } from '#contexts/ServiceContext';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostGrid } from '#lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import ChartbeatAnalytics from '../ChartbeatAnalytics';
import mediaPlayer from '../MediaPlayer';
import aboutTagsContent from '../Metadata/linkedDataAbout';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  audio: mediaPlayer,
  video: mediaPlayer,
  text,
  image,
  timestamp,
};

const getISOStringDate = date => new Date(date).toISOString();

const ArticleMain = ({ articleData }) => {
  const {
    brandName,
    noBylinesPolicy,
    defaultImage,
    articleAuthor,
  } = useContext(ServiceContext);
  const content = path(['content'], articleData);
  const metadata = path(['metadata'], articleData);
  const promo = path(['promo'], articleData);
  const { blocks } = content.model;
  const headline = path(['headlines', 'seoHeadline'], promo);
  const firstPublished = getISOStringDate(path(['firstPublished'], metadata));
  const lastPublished = getISOStringDate(path(['lastPublished'], metadata));
  const aboutTags = path(['tags', 'about'], metadata);
  const articleSection = path(['passport', 'genre'], metadata);
  const mentionsTags = path(['tags', 'mentions'], metadata);
  const articleSpecificLinkedData = {
    headline,
    datePublished: firstPublished,
    dateModified: lastPublished,
    about: aboutTagsContent(aboutTags),
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

  return (
    <>
      <ATIAnalytics data={articleData} />
      <ChartbeatAnalytics data={articleData} />
      <MetadataContainer
        metadata={metadata}
        promo={promo}
        pageSpecificLinkedData={articleSpecificLinkedData}
      />
      <ArticleMetadata
        author={articleAuthor}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        articleSection={articleSection}
        aboutTags={aboutTags}
        mentionsTags={mentionsTags}
      />
      <main role="main">
        <GhostGrid>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostGrid>
      </main>
    </>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
};

export default ArticleMain;
