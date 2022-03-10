import React from 'react';
import ATIAnalytics from '#containers/ATIAnalytics';
import { shape, arrayOf, string } from 'prop-types';
import styled from '@emotion/styled';
import TopicTitle from './TopicTitle';
import TopicGrid from './TopicGrid';
import ChartbeatAnalytics from '../../containers/ChartbeatAnalytics';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 61rem;
`;

const TopicPage = ({ pageData }) => {
  return (
    <Wrapper>
      <TopicTitle>{pageData.title}</TopicTitle>
      <TopicGrid promos={pageData.promos} />
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
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
