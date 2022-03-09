import React, { useContext } from 'react';
import ATIAnalytics from '#containers/ATIAnalytics';
import { shape, arrayOf, string } from 'prop-types';
import styled from '@emotion/styled';
import MetadataContainer from '#app/containers/Metadata';
import LinkedData from '#app/containers/LinkedData';
import { ServiceContext } from '../../contexts/ServiceContext';
import TopicTitle from './TopicTitle';
import TopicGrid from './TopicGrid';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 61rem;
`;

const TopicPage = ({ pageData }) => {
  const { lang } = useContext(ServiceContext);
  const { title, description, promos } = pageData;
  return (
    <Wrapper>
      <MetadataContainer
        title={title}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="CollectionPage" seoTitle={title} headline={title} />
      <TopicTitle>{title}</TopicTitle>
      <TopicGrid promos={promos} />
      <ATIAnalytics data={pageData} />;
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
