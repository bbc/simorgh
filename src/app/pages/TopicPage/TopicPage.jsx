import React, { useContext } from 'react';
import { shape, arrayOf, string } from 'prop-types';
import path from 'ramda/src/path';
import Curation from '#app/components/Curation';
import AdContainer from '../../components/Ad';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import LinkedData from '../../components/LinkedData';
import styles from './index.styles';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import TopicImage from './TopicImage';
import TopicTitle from './TopicTitle';
import TopicDescription from './TopicDescription';
import Pagination from '../../components/Pagination';
import getItemList from '../../lib/seoUtils/getItemList';
import getNthCurationByStyleAndProminence from '../utils/getNthCurationByStyleAndProminence';

const TopicPage = ({ pageData }) => {
  const { lang, translations, brandName } = useContext(ServiceContext);
  const {
    title,
    description,
    imageData,
    curations,
    pageCount,
    activePage,
    metadata: { atiAnalytics } = {},
  } = pageData;

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

  const pageTitle = `${title}, ${translatedPage}`;

  const itemList = getItemList({ curations, name: brandName });

  return (
    <>
      <AdContainer slotType="leaderboard" />
      <main css={styles.main}>
        <div css={styles.inner}>
          <ATIAnalytics atiData={atiAnalytics} />
          <ChartbeatAnalytics title={title} />
          <MetadataContainer
            title={activePage >= 2 ? pageTitle : title}
            socialHeadline={title}
            lang={lang}
            description={description}
            openGraphType="website"
            hasAmpPage={false}
          />
          <LinkedData
            type="CollectionPage"
            seoTitle={title}
            headline={title}
            entities={[itemList]}
          />
          <div css={styles.title}>
            <div css={styles.inline}>
              {imageData && <TopicImage image={imageData.url} />}
              <TopicTitle>{title}</TopicTitle>
            </div>
            {description && <TopicDescription>{description}</TopicDescription>}
          </div>
          {curations.map(
            ({
              visualProminence,
              summaries,
              curationId,
              title: curationTitle,
              link,
              position,
              visualStyle,
            }) => {
              const nthCurationByStyleAndProminence =
                getNthCurationByStyleAndProminence({
                  curations,
                  position,
                  visualStyle,
                  visualProminence,
                });

              return (
                <React.Fragment key={`${curationId}-${position}`}>
                  <Curation
                    headingLevel={curationTitle && 3}
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
                  />
                </React.Fragment>
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
    </>
  );
};

TopicPage.propTypes = {
  pageData: shape({
    title: string.isRequired,
    curations: arrayOf(shape({})).isRequired,
  }).isRequired,
};

export default TopicPage;
