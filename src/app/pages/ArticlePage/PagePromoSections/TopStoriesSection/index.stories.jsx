import React from 'react';
import styled from '@emotion/styled';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import TopStoriesSection from '.';
import {
  topStoriesList,
  topStoriesSingleItem,
  topStoriesListRtl,
  topStoriesSingleItemRtl,
} from './fixture';
import metadata from './metadata.json';
import readme from './README.md';

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 2rem;
`;

const RelatedContentComponent = ({ content, service }) => (
  <BackGround>
    <ServiceContextProvider service={service}>
      <TopStoriesSection content={content} />
    </ServiceContextProvider>
  </BackGround>
);

export default {
  title: 'components/OptimoPromos/TopStoriesSections',
  component: TopStoriesSection,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const ListTopStories = () => (
  <RelatedContentComponent content={topStoriesList} service="news" />
);

export const ListTopStoriesRtl = () => (
  <RelatedContentComponent content={topStoriesListRtl} service="arabic" />
);

export const SingleTopStories = () => (
  <RelatedContentComponent content={topStoriesSingleItem} service="news" />
);

export const SingleTopStoriesRtl = () => (
  <RelatedContentComponent content={topStoriesSingleItemRtl} service="arabic" />
);
