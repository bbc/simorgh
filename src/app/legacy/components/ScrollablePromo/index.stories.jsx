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
} from './helpers/fixtureData';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;

const ScrollablePromoComponent = ({ data, service }) => (
  <BackGround>
    <ServiceContextProvider service={service}>
      <ScrollablePromo blocks={data} />
    </ServiceContextProvider>
  </BackGround>
);

export default {
  title: 'Components/Scrollable Promo',
  ScrollablePromoComponent,
};

export const ThreeLinks = (_, { service }) => (
  <ScrollablePromoComponent data={threeLinks} service={service} />
);

export const OnlyOneLink = (_, { service }) => (
  <ScrollablePromoComponent data={oneLinkOnly} service={service} />
);

export const OneLinkWithNoTitle = (_, { service }) => (
  <ScrollablePromoComponent data={oneLinkWithNoTitle} service={service} />
);

export const MoreThanThreeLinks = (_, { service }) => (
  <ScrollablePromoComponent data={moreThanThreeLinks} service={service} />
);

export const NoImagesInData = (_, { service }) => (
  <ScrollablePromoComponent data={twoLinksWithNoImages} service={service} />
);

export const TruncatedTextInSingleLink = (_, { service }) => (
  <ScrollablePromoComponent
    data={truncatedTextInSingleLink}
    service={service}
  />
);

export const ArabicText = () => (
  <ScrollablePromoComponent data={arabicText} service="arabic" />
);

export const WithTimestamp = (_, { service }) => (
  <ScrollablePromoComponent data={oneLinkWithTimestamp} service={service} />
);
