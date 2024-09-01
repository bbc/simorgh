import React from 'react';
import styled from '@emotion/styled';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import TopStoriesSection from '.';
import {
  topStoriesList,
  topStoriesSingleItem,
  topStoriesListRtl,
  topStoriesSingleItemRtl,
  topStoriesItem,
  tipoFormattedTopStoriesItem,
  tipoLivePageTopStoriesItem,
  topStoriesLiveLabelItem,
} from './fixture';
import metadata from './metadata.json';
import readme from './README.md';
import { TopStoryItem } from './types';

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 2rem;
`;

type Props = {
  content: TopStoryItem[];
  service: Services;
};

const RelatedContentComponent = ({ content, service }: Props) => (
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

export const ListTopStoriesMixedDataSources = () => (
  <RelatedContentComponent
    content={[
      topStoriesItem,
      tipoFormattedTopStoriesItem,
      tipoLivePageTopStoriesItem,
      topStoriesLiveLabelItem,
    ]}
    service="news"
  />
);
