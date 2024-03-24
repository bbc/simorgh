import React from 'react';
import styled from '@emotion/styled';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { MEDIA_TYPES } from '#components/Promo';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../ThemeProvider';
import Promo from '.';
import { StoryProps } from '../../../models/types/storybook';

const Wrapper = styled.div`
  max-width: 30rem;
`;

const Component = ({ service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Wrapper>
          <Promo {...fixture.data.curations[0].summaries[0]} />
        </Wrapper>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

// eslint-disable-next-line react/prop-types
const WithMediaIndicator = ({ service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Wrapper>
          <Promo
            {...fixture.data.curations[0].summaries[0]}
            type={MEDIA_TYPES.VIDEO}
            duration={123}
          />
          <Promo
            {...fixture.data.curations[0].summaries[0]}
            type={MEDIA_TYPES.PHOTO_GALLERY}
            duration={123}
          />
        </Wrapper>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Curation/Promo - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const Media = WithMediaIndicator;
