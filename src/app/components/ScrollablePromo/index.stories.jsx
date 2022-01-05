import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import ScrollablePromo from '.';
import {
  threeLinks,
  oneLinkOnly,
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
  <BackGround>
    <ServiceContextProvider service={service} script={script} dir={dir}>
      <RequestContextProvider isAmp={false} service={service}>
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <ScrollablePromo blocks={data} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </BackGround>
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
