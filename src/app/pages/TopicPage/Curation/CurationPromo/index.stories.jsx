import React from 'react';
import styled from '@emotion/styled';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import ThemeProvider from '../../../../components/ThemeProvider';
import { MEDIA_TYPES } from '#components/Promo';
import Promo from '.';

const Wrapper = styled.div`
  max-width: 30rem;
`;

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Wrapper>
          <Promo {...fixture.data.summaries[0]} />
        </Wrapper>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

// eslint-disable-next-line react/prop-types
const WithMediaIndicator = ({ service, variant }) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Wrapper>
          <Promo
            {...fixture.data.summaries[0]}
            type={MEDIA_TYPES.VIDEO}
            mediaDuration={123}
          />
        </Wrapper>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Topic/Curations/Promo - Normal',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const Media = WithMediaIndicator;
