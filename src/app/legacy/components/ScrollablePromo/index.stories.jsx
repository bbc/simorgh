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

export const ThreeLinks = () => <ScrollablePromoComponent data={threeLinks} />;

export const OnlyOneLink = () => (
  <ScrollablePromoComponent data={oneLinkOnly} />
);

export const OneLinkWithNoTitle = () => (
  <ScrollablePromoComponent data={oneLinkWithNoTitle} />
);

export const MoreThanThreeLinks = () => (
  <ScrollablePromoComponent data={moreThanThreeLinks} />
);

export const NoImagesInData = () => (
  <ScrollablePromoComponent data={twoLinksWithNoImages} />
);

export const TruncatedTextInSingleLink = () => (
  <ScrollablePromoComponent data={truncatedTextInSingleLink} />
);

export const ArabicText = () => (
  <ScrollablePromoComponent data={arabicText} service="arabic" />
);

export const WithTimestamp = () => (
  <ScrollablePromoComponent data={oneLinkWithTimestamp} />
);
