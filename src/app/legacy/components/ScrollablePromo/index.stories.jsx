import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
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
// eslint-disable-next-line react/prop-types
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
  title: 'components/scrollable promo component',
  ScrollablePromoComponent,
  decorators: [withKnobs, withServicesKnob()],
};

export const ThreeLinks = props => (
  <ScrollablePromoComponent data={threeLinks} {...props} />
);

export const OnlyOneLink = props => (
  <ScrollablePromoComponent data={oneLinkOnly} {...props} />
);

export const OneLinkWithNoTitle = props => (
  <ScrollablePromoComponent data={oneLinkWithNoTitle} {...props} />
);

export const MoreThanThreeLinks = props => (
  <ScrollablePromoComponent data={moreThanThreeLinks} {...props} />
);

export const NoImagesInData = props => (
  <ScrollablePromoComponent data={twoLinksWithNoImages} {...props} />
);

export const TruncatedTextInSingleLink = props => (
  <ScrollablePromoComponent data={truncatedTextInSingleLink} {...props} />
);

export const ArabicText = props => (
  <ScrollablePromoComponent data={arabicText} {...props} />
);

export const WithTimestamp = props => (
  <ScrollablePromoComponent data={oneLinkWithTimestamp} {...props} />
);
