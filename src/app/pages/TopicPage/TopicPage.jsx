import { Fragment, use } from 'react';
import path from 'ramda/src/path';
import Curation from '#app/components/Curation';
import FollowTopicButton from '#app/components/FollowTopicButton';
import OptimizelyPageMetrics from '#app/components/OptimizelyPageMetrics';
import parseRoute from '#app/routes/utils/parseRoute';
import getTopicPageUrl from '#app/lib/utilities/getTopicPageUrl';
import AdContainer from '../../components/Ad';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import styles from './index.module.scss';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import TopicImage from './TopicImage';
import TopicTitle from './TopicTitle';
import TopicDescription from './TopicDescription';
import Pagination from '../../components/Pagination';
import getItemList from '../../lib/seoUtils/getItemList';
import getNthCurationByStyleAndProminence from '../utils/getNthCurationByStyleAndProminence';
import TopicPageElectionBanner from './TopicPageElectionBanner';
import EditorialPicksPromoExperiment from './EditorialPicksPromoExperiment';

const TopicPage = ({ pageData }) => {
  const { lang, translations, brandName, service } = use(ServiceContext);
  const { pathname, variant } = use(RequestContext);
  const {
    title,
    description,
    seoTitle,
    seoDescription,
    imageData,
    curations,
    pageCount,
    activePage,
  } = pageData;

  const { assetId: topicId } = parseRoute(pathname);
  const topStoriesTitle = path(['topStoriesTitle'], translations);
  const { pageXOfY, previousPage, nextPage, page } = {
    pageXOfY: 'Page {x} of {y}',
    previousPage: 'Previous Page',
    nextPage: 'Next Page',
    page: 'Page',
    ...translations.pagination,
  };

  const translatedPage = pageXOfY
    .replace('{x}', activePage)
    .replace('{y}', pageCount);

  const metadataBaseTitle = seoTitle || title;
  const seoPaginatedTitle = `${metadataBaseTitle}, ${translatedPage}`;
  const metadataTitle = activePage >= 2 ? seoPaginatedTitle : metadataBaseTitle;
  const metadataDescription = seoDescription || description;

  const itemList = getItemList({ curations, name: brandName });

  const buildTopicURL = getTopicPageUrl({
    service,
    topicId,
    variant,
    topicsPath: translations?.topicsPath,
    absolute: true,
  });

  return (
    <div className={styles.pageWrapper}>
      <EditorialPicksPromoExperiment topicId={topicId} />
      <AdContainer slotType="leaderboard" />
      <main className={styles.main} role="main">
        <div className={styles.inner}>
          <ATIAnalytics />
          <ChartbeatAnalytics title={title} />
          <OptimizelyPageMetrics trackPageComplete trackPageDepth />
          <MetadataContainer
            title={metadataTitle}
            socialHeadline={metadataBaseTitle}
            lang={lang}
            description={metadataDescription}
            openGraphType="website"
            hasAmpPage={false}
          />
          <LinkedData
            type="CollectionPage"
            seoTitle={metadataBaseTitle}
            headline={title}
            entities={[itemList]}
          />
          <div className={styles.title}>
            <div className={styles.inline}>
              {imageData && <TopicImage image={imageData.url} />}
              <TopicTitle>{title}</TopicTitle>
            </div>
            {description && <TopicDescription>{description}</TopicDescription>}
            {topicId && (
              <FollowTopicButton
                topicData={{
                  topicId,
                  title,
                  url: buildTopicURL,
                }}
              />
            )}
          </div>
          <TopicPageElectionBanner
            curationIds={curations.map(({ curationId }) => curationId)}
          />
          {curations.map(
            ({
              visualProminence,
              summaries,
              curationId,
              title: curationTitle,
              link,
              position,
              visualStyle,
              ...curationProps
            }) => {
              const nthCurationByStyleAndProminence =
                getNthCurationByStyleAndProminence({
                  curations,
                  position,
                  visualStyle,
                  visualProminence,
                });

              return (
                <Fragment key={`${curationId}-${position}`}>
                  <Curation
                    visualStyle={visualStyle}
                    visualProminence={visualProminence}
                    summaries={summaries}
                    title={curationTitle}
                    topStoriesTitle={topStoriesTitle}
                    position={position}
                    link={link}
                    curationLength={curations && curations.length}
                    nthCurationByStyleAndProminence={
                      nthCurationByStyleAndProminence
                    }
                    {...curationProps}
                  />
                </Fragment>
              );
            },
          )}
          <Pagination
            activePage={activePage}
            pageCount={pageCount}
            pageXOfY={pageXOfY}
            previousPage={previousPage}
            nextPage={nextPage}
            page={page}
          />
        </div>
      </main>
    </div>
  );
};

export default TopicPage;
