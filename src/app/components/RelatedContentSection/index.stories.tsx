import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../ThemeProvider';
import { Services } from '../../models/types/global';
import { OptimoBlock } from '../../models/types/optimo';

import RelatedContentSection from '.';
import {
  RelatedContentSingleItem,
  RelatedContentList,
  RelatedContentSingleItemRtl,
  RelatedContentListRtl,
} from './fixture';
import md from './README.md';

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 2rem;
`;

type Props = {
  content: OptimoBlock[];
  service?: Services;
};

// eslint-disable-next-line react/prop-types
const RelatedContentComponent = ({ content, service = 'news' }: Props) => (
  <ThemeProvider service={service} variant="default">
    <ToggleContextProvider>
      <BackGround>
        <ServiceContextProvider service={service}>
          <RelatedContentSection content={content} />
        </ServiceContextProvider>
      </BackGround>
    </ToggleContextProvider>
  </ThemeProvider>
);

export default {
  title: 'components/OptimoPromos/OptimoRelatedContent',
  RelatedContentComponent,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    docs: {
      page: md,
    },
  },
};

export const ListRelatedContent = () => (
  <RelatedContentComponent content={RelatedContentList} />
);

export const ListRelatedContentRtl = () => (
  <RelatedContentComponent content={RelatedContentListRtl} service="arabic" />
);

export const SingleRelatedContent = () => (
  <RelatedContentComponent content={RelatedContentSingleItem} />
);

export const SingleRelatedContentRtl = () => (
  <RelatedContentComponent
    content={RelatedContentSingleItemRtl}
    service="arabic"
  />
);
