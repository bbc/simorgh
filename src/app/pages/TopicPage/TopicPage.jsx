import React, { useContext } from 'react';
import ATIAnalytics from '#containers/ATIAnalytics';
import { shape, arrayOf, string } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
  GEL_SPACING_SEXT,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import MetadataContainer from '#containers/Metadata';
import LinkedData from '#containers/LinkedData';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import { ServiceContext } from '../../contexts/ServiceContext';
import TopicImage from './TopicImage';
import TopicTitle from './TopicTitle';
import TopicDescription from './TopicDescription';
import Pagination from './Pagination';
import Curation, { VISUAL_PROMINANCE, VISUAL_STYLE } from './Curation';
import HiearchicalGrid from './HierarchicalGrid';

const OuterWrapper = styled.main`
  margin: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_DBL};
  }
`;

const InnerWrapper = styled.div`
  max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  margin: 0 auto;
`;

const InlineWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    align-items: center;
    display: flex;
  }
`;

const TitleWrapper = styled.div`
  margin: ${GEL_SPACING_TRPL} 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUAD} 0;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_SEXT} 0;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUIN} 0 ${GEL_SPACING_SEXT} 0;
  }
`;

const TopicPage = ({ pageData }) => {
  const { lang, translations } = useContext(ServiceContext);
  const { title, description, imageData, curations, pageCount, activePage } =
    pageData;

  const { enabled: adsEnabled } = useToggle('ads');
  const { showAdsBasedOnLocation } = useContext(RequestContext);

  const linkedDataEntities = curations
    .map(({ summaries }) =>
      summaries.map(summary => ({
        '@type': 'Article',
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
      <OuterWrapper role="main">
        <InnerWrapper>
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
          <TitleWrapper>
            <InlineWrapper>
              {imageData && <TopicImage image={imageData.url} />}
              <TopicTitle>{title}</TopicTitle>
            </InlineWrapper>
            {description && <TopicDescription>{description}</TopicDescription>}
          </TitleWrapper>
          {curations.map(({ summaries }) => (
            <HiearchicalGrid summaries={summaries} />
          ))}
          <Pagination
            activePage={activePage}
            pageCount={pageCount}
            pageXOfY={pageXOfY}
            previousPage={previousPage}
            nextPage={nextPage}
            page={page}
          />
        </InnerWrapper>
      </OuterWrapper>
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
