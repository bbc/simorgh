import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import LiveLabel from './index';
import md from './README.md';
import { StoryProps } from '../../models/types/storybook';
import services from '../../../server/utilities/serviceConfigs';
import Heading from '../Heading';
import ThemeProvider from '../ThemeProvider';

interface Props extends StoryProps {
  ariaHidden?: boolean;
  offScreenText?: string;
  liveText?: string;
  text?: string;
}

const Component = ({
  service,
  variant,
  offScreenText,
  children,
  ariaHidden = false,
}: PropsWithChildren<Props>) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <LiveLabel
          ariaHidden={ariaHidden}
          liveText={services[service][variant].translations.media.liveLabel}
          offScreenText={offScreenText}
        >
          {children}
        </LiveLabel>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default {
  title: 'New Components/Live Label',
  decorators: [withKnobs(), withServicesKnob({ defaultService: 'pidgin' })],
  parameters: {
    docs: {
      page: md,
    },
  },
};

export const WithLocalisedLiveText = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} />
);

export const WithCustomOffscreenText = ({ service, variant }: Props) => (
  <Component
    ariaHidden
    offScreenText="Watch Live"
    service={service}
    variant={variant}
  />
);

export const WithChildren = ({ text: headline, service, variant }: Props) => (
  <Wrapper>
    <Heading level={3}>
      <a href="https://www.bbc.co.uk/ws/languages">
        <Component service={service} variant={variant} offScreenText="Live">
          {headline}
        </Component>
      </a>
    </Heading>
  </Wrapper>
);
