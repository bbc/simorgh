import React from 'react';
import styled from '@emotion/styled';
import { withServicesKnob } from '#legacy/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { MEDIA_TYPES } from '#components/Promo';
import TopicPromo from '.';

const Wrapper = styled.div`
  max-width: 30rem;
`;

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Wrapper>
        <TopicPromo {...fixture.data.summaries[0]} />
      </Wrapper>
    </ServiceContextProvider>
  );
};

// eslint-disable-next-line react/prop-types
const WithMediaIndicator = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Wrapper>
        <TopicPromo
          {...fixture.data.summaries[0]}
          mediaType={MEDIA_TYPES.VIDEO}
          mediaDuration={123}
        />
      </Wrapper>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Promo',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const Media = WithMediaIndicator;
