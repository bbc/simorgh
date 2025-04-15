import React from 'react';
import styled from '@emotion/styled';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ScrollablePromo from '.';
import {
  threeLinks,
  oneLinkOnly,
  oneLinkWithNoTitle,
  oneLinkWithTimestamp,
  moreThanThreeLinks,
  twoLinksWithNoImages,
  truncatedTextInSingleLink,
  arabicText,
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
  mostReadBlocks,
  mostReadBlocksRTL,
} from './helpers/fixtureData';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;

const ScrollablePromoComponent = ({
  data,
  service,
  experimentVariant = null,
}) => (
  <ServiceContextProvider service={service}>
    <ScrollablePromo blocks={data} experimentVariant={experimentVariant} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/Scrollable Promo',
  ScrollablePromoComponent,
};

export const ThreeLinks = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent data={threeLinks} service={service} />
  </BackGround>
);

export const OnlyOneLink = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent data={oneLinkOnly} service={service} />
  </BackGround>
);

export const OneLinkWithNoTitle = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent data={oneLinkWithNoTitle} service={service} />
  </BackGround>
);

export const MoreThanThreeLinks = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent data={moreThanThreeLinks} service={service} />
  </BackGround>
);

export const NoImagesInData = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent data={twoLinksWithNoImages} service={service} />
  </BackGround>
);

export const TruncatedTextInSingleLink = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent
      data={truncatedTextInSingleLink}
      service={service}
    />
  </BackGround>
);

export const ArabicText = () => (
  <BackGround>
    <ScrollablePromoComponent data={arabicText} service="arabic" />
  </BackGround>
);

export const WithTimestamp = (_, { service }) => (
  <BackGround>
    <ScrollablePromoComponent data={oneLinkWithTimestamp} service={service} />
  </BackGround>
);

export const OJTopBarTopStories = (_, { service }) => (
  <ScrollablePromoComponent
    data={topStoriesBlocks}
    service={service}
    experimentVariant="top_bar_top_stories"
  />
);

export const OJTopBarTopStoriesWithLiveLabel = (_, { service }) => (
  <ScrollablePromoComponent
    data={topStoriesBlocksWithLiveItem}
    service={service}
    experimentVariant="top_bar_top_stories"
  />
);

export const OJTopBarMostRead = (_, { service }) => (
  <ScrollablePromoComponent
    data={mostReadBlocks}
    service={service}
    experimentVariant="top_bar_most_read"
  />
);

export const OJTopBarMostReadRTL = () => (
  <ScrollablePromoComponent
    data={mostReadBlocksRTL}
    service="arabic"
    experimentVariant="top_bar_most_read"
  />
);
