import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import ThemeProvider from '../../../../components/ThemeProvider';
import RelatedContentSection from '.';
import {
  RelatedContentSingleItem,
  RelatedContentList,
  RelatedContentSingleItemRtl,
  RelatedContentListRtl,
} from './fixture';

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: 2rem;
`;

// eslint-disable-next-line react/prop-types
const RelatedContentComponent = ({
  content,
  service = 'news',
  script,
  dir,
}) => (
  <ThemeProvider service={service} variant="default">
    <ToggleContextProvider>
      <BackGround>
        <ServiceContextProvider service={service} script={script} dir={dir}>
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
};

export const ListRelatedContent = props => (
  <RelatedContentComponent content={RelatedContentList} />
);

export const ListRelatedContentRtl = props => (
  <RelatedContentComponent content={RelatedContentListRtl} service="arabic" />
);

export const SingleRelatedContent = props => (
  <RelatedContentComponent content={RelatedContentSingleItem} />
);

export const SingleRelatedContentRtl = props => (
  <RelatedContentComponent
    content={RelatedContentSingleItemRtl}
    service="arabic"
  />
);
