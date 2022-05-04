import React, { useContext } from 'react';
import ATIAnalytics from '#containers/ATIAnalytics';
import { shape, arrayOf, string } from 'prop-types';
import styled from '@emotion/styled';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import MetadataContainer from '#app/containers/Metadata';
import LinkedData from '#app/containers/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import TopicTitle from './TopicTitle';
import TopicGrid from './TopicGrid';
import Pagination from './Pagination';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';

const Wrapper = styled.main`
  max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  margin: 0 auto;
  padding: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const TopicPage = ({ pageData }) => {
  const { lang } = useContext(ServiceContext);
  const { title, description, promos } = pageData;

  const promoEntities = promos.map(promo => ({
    '@type': 'Article',
    name: promo.title,
    headline: promo.title,
    url: promo.link,
    dateCreated: promo.firstPublished,
  }));

  return (
    <Wrapper role="main">
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
        hasAmpPage={false}
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={title}
        headline={title}
        entities={promoEntities}
      />
      <TopicTitle
        title={title}
        activePage={pageData.activePage}
        pageCount={pageData.pageCount}
      />
      <TopicGrid promos={promos} />
      <Pagination
        activePage={pageData.activePage}
        pageCount={pageData.pageCount}
      />
    </Wrapper>
  );
};

TopicPage.propTypes = {
  pageData: shape({
    title: string.isRequired,
    promos: arrayOf(shape({})).isRequired,
  }).isRequired,
};

export default TopicPage;
