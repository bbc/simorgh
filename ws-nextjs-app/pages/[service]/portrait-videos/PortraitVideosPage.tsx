import { use } from 'react';
import ATIAnalytics from '#app/components/ATIAnalytics';
import Heading from '#app/components/Heading';
import MetadataContainer from '#app/components/Metadata';
import PortraitVideoCarousel from '#app/components/PortraitVideoCarousel';
import {
  PortraitVideoArticleBlock,
  PortraitVideoCarouselBlock,
} from '#app/components/PortraitVideoCarousel/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  PortraitVideoArticle,
  PortraitVideoPageData,
} from '#app/lib/config/portraitVideoPages';
import styles from './index.module.scss';

export const TOP_SLICES_LIMIT = 6;

export type PortraitVideosPageProps = {
  pageData: PortraitVideoPageData;
};

export const toCarouselBlock = ({
  url,
  title,
  duration,
  imgSrc,
  imgAlt,
  videoId,
  versionId,
}: PortraitVideoArticle): PortraitVideoCarouselBlock => {
  const images = [
    {
      source: imgSrc,
      urlTemplate: imgSrc.replace('/240/', '/{width}/'),
      altText: imgAlt,
    },
  ];

  if (videoId && versionId) {
    return {
      type: 'portraitClipMedia',
      model: {
        type: 'video',
        images,
        video: {
          id: videoId,
          title,
          holdingImageURL: imgSrc,
          version: {
            id: versionId,
            duration,
            kind: 'programme',
            guidance: null,
            territories: ['uk', 'nonuk'],
          },
          isEmbeddingAllowed: false,
        },
      },
    };
  }

  const articleBlock: PortraitVideoArticleBlock = {
    type: 'portraitClipMedia',
    model: {
      type: 'video',
      images,
      video: {
        title,
        version: { duration },
        articleUrl: url,
      },
    },
  };

  return articleBlock;
};

const PortraitVideosPage = ({ pageData }: PortraitVideosPageProps) => {
  const { lang } = use(ServiceContext);
  const topSlices = pageData.slices.slice(0, TOP_SLICES_LIMIT);
  const firstPlayableSliceIndex = topSlices.findIndex(({ articles }) =>
    articles.some(({ videoId, versionId }) => videoId && versionId),
  );

  return (
    <main className={styles.main} data-is-dark-ui="true">
      <ATIAnalytics />
      <MetadataContainer
        title={pageData.pageTitle}
        openGraphType="website"
        hasAmpPage={false}
        lang={lang}
      />
      <div className={styles.inner}>
        <Heading level={1} className={styles.heading}>
          {pageData.pageTitle}
        </Heading>
        <div className={styles.carousels}>
          {topSlices.map(({ topicId, title, articles }, index) => (
            <PortraitVideoCarousel
              key={topicId}
              title={title}
              blocks={articles.map(toCarouselBlock)}
              loadPlayerScripts={index === firstPlayableSliceIndex}
              eventTrackingData={{
                componentName: 'portrait-video-carousel-portrait-videos',
                groupTracker: {
                  name: title,
                  resourceId: topicId,
                },
              }}
              backgroundColor="rgba(20, 20, 20, 0.75)"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default PortraitVideosPage;
