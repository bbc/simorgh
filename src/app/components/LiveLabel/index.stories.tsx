import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import LiveLabel from './index';
import md from './README.md';
import { StoryProps } from '../../models/types/storybook';
import Heading from '../Heading';
import ThemeProvider from '../ThemeProvider';
import { METAL } from '../ThemeProvider/palette';

interface Props extends StoryProps {
  ariaHidden?: boolean;
  offScreenText?: string;
  text?: string;
}

const Component = ({
  service,
  variant,
  offScreenText,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <LiveLabel offScreenText={offScreenText}>{children}</LiveLabel>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  position: relative;
  a {
    text-decoration: none;
    border-bottom: none;
  }

  a:hover > span,
  a:focus > span {
    text-decoration: underline;
  }

  a:visited > span {
    color: ${METAL};
  }
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

export const Localised = ({ service, variant }: Props) => (
  <Component service={service} variant={variant} />
);

export const WithCustomOffscreenText = ({ service, variant }: Props) => (
  <Component offScreenText="Watch Live" service={service} variant={variant} />
);

export const WithChildren = ({ text: headline, service, variant }: Props) => (
  <Wrapper>
    <Heading level={3}>
      <a href="https://www.bbc.co.uk/ws/languages">
        <Component service={service} variant={variant}>
          {headline}
        </Component>
      </a>
    </Heading>
  </Wrapper>
);
