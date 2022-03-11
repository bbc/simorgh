/* eslint-disable react/prop-types */
import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import styled from '@emotion/styled';
import mundoRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.ltr.json';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import ScrollablePromo from '.';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;

const ScrollablePromoWithOptimizely = withOptimizelyProvider(ScrollablePromo);

const ScrollablePromoComponent = ({
  data,
  service,
  script,
  dir,
  translations,
}) => (
  <ToggleContextProvider>
    <BackGround>
      <ServiceContextProvider
        service={service}
        script={script}
        dir={dir}
        translations={translations}
      >
        <ScrollablePromoWithOptimizely blocks={data} />
      </ServiceContextProvider>
    </BackGround>
  </ToggleContextProvider>
);

export default {
  title: 'components/Experimental-Editorial-Onward-Journey',
  ScrollablePromoComponent,
  decorators: [withKnobs, withServicesKnob()],
};

export const Recommendations = props => (
  <ScrollablePromoComponent data={mundoRecommendationsData} {...props} />
);
