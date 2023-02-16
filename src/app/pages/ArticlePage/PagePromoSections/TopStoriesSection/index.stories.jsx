import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import TopStoriesSection from '.';
import {
  topStoriesList,
  topStoriesSingleItem,
  topStoriesListRtl,
  topStoriesSingleItemRtl,
} from './fixture';
import ThemeProvider from '../../../../components/ThemeProvider';
import metadata from './metadata.json';
import md from './README.md';

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 2rem;
`;

// eslint-disable-next-line react/prop-types
const RelatedContentComponent = ({ content, service, script }) => (
  <ThemeProvider service={service}>
    <ToggleContextProvider>
      <BackGround>
        <ServiceContextProvider service={service} script={script}>
          <TopStoriesSection content={content} />
        </ServiceContextProvider>
      </BackGround>
    </ToggleContextProvider>
  </ThemeProvider>
);

export default {
  title: 'components/OptimoPromos/TopStoriesSections',
  component: TopStoriesSection,
  parameters: {
    metadata,
    docs: {
      page: md,
    },
  },
  decorators: [withKnobs, withServicesKnob()],
};

export const ListTopStories = props => (
  <RelatedContentComponent content={topStoriesList} service="news" />
);

export const ListTopStoriesRtl = props => (
  <RelatedContentComponent content={topStoriesListRtl} service="arabic" />
);

export const SingleTopStories = props => (
  <RelatedContentComponent content={topStoriesSingleItem} service="news" />
);

export const SingleTopStoriesRtl = props => (
  <RelatedContentComponent content={topStoriesSingleItemRtl} service="arabic" />
);
