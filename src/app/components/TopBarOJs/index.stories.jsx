import React from 'react';
import styled from '@emotion/styled';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
} from './helpers/fixtureData';
import TopBarOJs from '.';
import { service } from '#app/lib/config/services/afaanoromoo';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;

const TopBarOJsComponent = args => {
  <ServiceContextProvider service={service}>
    <TopBarOJs {...args} />
  </ServiceContextProvider>;
};

export default {
  title: 'Components/TopBarOJs',
  component: TopBarOJsComponent,
};

export const OJTopBarTopStories = args => <TopBarOJs {...args} />;

OJTopBarTopStories.args = {
  blocks: topStoriesBlocks,
  service: 'news',
};

export const OJTopBarTopStoriesWithLiveLabel = args => <TopBarOJs {...args} />;

OJTopBarTopStoriesWithLiveLabel.args = {
  blocks: topStoriesBlocksWithLiveItem,
  service: 'news',
};
