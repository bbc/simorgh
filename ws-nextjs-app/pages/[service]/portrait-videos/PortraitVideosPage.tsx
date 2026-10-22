import { use } from 'react';
import ATIAnalytics from '#app/components/ATIAnalytics';
import Heading from '#app/components/Heading';
import MetadataContainer from '#app/components/Metadata';
import PortraitVideoCarousel from '#app/components/PortraitVideoCarousel';
import { PortraitVideoArticleBlock } from '#app/components/PortraitVideoCarousel/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  PortraitVideoArticle,
  PortraitVideoPageData,
} from '#app/lib/config/portraitVideoPages';
import styles from './index.module.scss';

export const TOP_TOPICS_LIMIT = 5;

export type PortraitVideosPageProps = {
  pageData: PortraitVideoPageData;
};

const toCarouselBlock = ({
  url,
  title,
  duration,
  imgSrc,
  imgAlt,
}: PortraitVideoArticle): PortraitVideoArticleBlock => ({
  type: 'portraitClipMedia',
  model: {
    type: 'video',
    images: [
      {
        source: imgSrc,
        urlTemplate: imgSrc.replace('/240/', '/{width}/'),
        altText: imgAlt,
      },
    ],
    video: {
      title,
      version: { duration },
      articleUrl: url,
    },
  },
});

const PortraitVideosPage = ({ pageData }: PortraitVideosPageProps) => {
  const { lang } = use(ServiceContext);
  const topTopics = Object.entries(pageData.topics).slice(0, TOP_TOPICS_LIMIT);

  return (
    <main className={styles.main}>
      <ATIAnalytics />
      <MetadataContainer
        title={pageData.pageTitle}
        openGraphType="website"
        hasAmpPage={false}
        lang={lang}
      />
      <Heading level={1} className={styles.heading}>
        {pageData.pageTitle}
      </Heading>
      <div className={styles.carousels}>
        {topTopics.map(([topicId, articles]) => {
          const topicTitle = pageData.topicTitles[topicId] ?? topicId;

          return (
            <PortraitVideoCarousel
              key={topicId}
              title={topicTitle}
              blocks={articles.map(toCarouselBlock)}
              eventTrackingData={{
                componentName: 'portrait-video-carousel-portrait-videos',
                groupTracker: {
                  name: topicTitle,
                  resourceId: topicId,
                },
              }}
            />
          );
        })}
      </div>
    </main>
  );
};

export default PortraitVideosPage;
