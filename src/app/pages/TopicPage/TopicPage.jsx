import React, { useContext } from 'react';
import ATIAnalytics from '#containers/ATIAnalytics';
import { shape, arrayOf, string } from 'prop-types';
import path from 'ramda/src/path';
import MetadataContainer from '#containers/Metadata';
import LinkedData from '#containers/LinkedData';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import styles from './index.styles';
import { ServiceContext } from '../../contexts/ServiceContext';
import TopicImage from './TopicImage';
import TopicTitle from './TopicTitle';
import TopicDescription from './TopicDescription';
import Pagination from './Pagination';
import MessageBanner from '../../components/MessageBanner';
import {
  VISUAL_STYLE,
  COMPONENT_NAMES,
} from '../../components/Curation/constants';
import Curation from '../../components/Curation';
import getComponent from './getComponent';

const { NONE } = VISUAL_STYLE;
const { MESSAGE_BANNER, BILLBOARD } = COMPONENT_NAMES;

const TopicPage = ({ pageData }) => {
  const { lang, translations } = useContext(ServiceContext);
  const { title, description, imageData, curations, pageCount, activePage } =
    pageData;

  const { enabled: adsEnabled } = useToggle('ads');
  const { showAdsBasedOnLocation } = useContext(RequestContext);
  const topStoriesTitle = path(['topStoriesTitle'], translations);

  const linkedDataEntities = curations
    .map(({ summaries }) =>
      summaries.map(summary => ({
        '@type': summary.type,
        name: summary.title,
        headline: summary.title,
        url: summary.link,
        dateCreated: summary.firstPublished,
      })),
    )
    .flat();

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

  return (
    <>
      {adsEnabled && showAdsBasedOnLocation && (
        <>
          <CanonicalAdBootstrapJs />
          <AdContainer slotType="leaderboard" />
        </>
      )}
      <main css={styles.main}>
        <div css={styles.inner}>
          <ATIAnalytics data={pageData} />
          <ChartbeatAnalytics data={pageData} />
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
            entities={linkedDataEntities}
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
              visualStyle = NONE,
            }) => {
              const component = getComponent(visualStyle, visualProminence);

              return (
                <React.Fragment key={`${curationId}-${position}`}>
                  {(() => {
                    switch (component) {
                      case MESSAGE_BANNER:
                        return (
                          <MessageBanner
                            heading={curationTitle}
                            position={position}
                            description={summaries[0].description}
                            link={summaries[0].link}
                            linkText={summaries[0].title}
                            image={summaries[0].imageUrl}
                          />
                        );
                      case BILLBOARD:
                        return null;
                      default:
                        return (
                          <Curation
                            headingLevel={curationTitle && 3}
                            visualStyle={visualStyle}
                            visualProminence={visualProminence}
                            promos={summaries}
                            title={curationTitle}
                            topStoriesTitle={topStoriesTitle}
                            position={position}
                            link={link}
                            curationLength={curations && curations.length}
                          />
                        );
                    }
                  })()}
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
