import React, { useContext } from 'react';
import ATIAnalytics from '#containers/ATIAnalytics';
import { shape, arrayOf, string } from 'prop-types';
import styled from '@emotion/styled';
import MetadataContainer from '#app/containers/Metadata';
import LinkedData from '#app/containers/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import TopicTitle from './TopicTitle';
import TopicGrid from './TopicGrid';
import Pagination from './Pagination';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 61rem;
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
    <Wrapper>
      <TopicTitle>{pageData.title}</TopicTitle>
      <TopicGrid promos={pageData.promos} />
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData
        type="CollectionPage"
        seoTitle={title}
        headline={title}
        entities={promoEntities}
      />
      <TopicTitle>{title}</TopicTitle>
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
