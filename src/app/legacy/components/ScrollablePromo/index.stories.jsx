import React from 'react';
import styled from '@emotion/styled';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
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
const ScrollablePromoComponent = ({ data, service, script, dir }) => (
  <ToggleContextProvider>
    <BackGround>
      <ServiceContextProvider service={service} script={script} dir={dir}>
        <ScrollablePromo blocks={data} />
      </ServiceContextProvider>
    </BackGround>
  </ToggleContextProvider>
);

export default {
  title: 'Components/Scrollable Promo',
  ScrollablePromoComponent,
};

export const ThreeLinks = (_, globalArgs) => (
  <ScrollablePromoComponent data={threeLinks} {...globalArgs} />
);

export const OnlyOneLink = (_, globalArgs) => (
  <ScrollablePromoComponent data={oneLinkOnly} {...globalArgs} />
);

export const OneLinkWithNoTitle = (_, globalArgs) => (
  <ScrollablePromoComponent data={oneLinkWithNoTitle} {...globalArgs} />
);

export const MoreThanThreeLinks = (_, globalArgs) => (
  <ScrollablePromoComponent data={moreThanThreeLinks} {...globalArgs} />
);

export const NoImagesInData = (_, globalArgs) => (
  <ScrollablePromoComponent data={twoLinksWithNoImages} {...globalArgs} />
);

export const TruncatedTextInSingleLink = (_, globalArgs) => (
  <ScrollablePromoComponent data={truncatedTextInSingleLink} {...globalArgs} />
);

export const ArabicText = () => (
  <ScrollablePromoComponent data={arabicText} service="arabic" />
);

export const WithTimestamp = (_, globalArgs) => (
  <ScrollablePromoComponent data={oneLinkWithTimestamp} {...globalArgs} />
);
