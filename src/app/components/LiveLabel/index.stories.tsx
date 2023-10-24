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
import metadata from './metadata.json';
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
    border-bottom: 0.0625rem solid transparent;
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
    metadata,
    docs: {
      page: md,
    },
    design: [
      {
        name: 'Group 0',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14619&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 1',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14709&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 2',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14438&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 3',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14526&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 4',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14307&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
      {
        name: 'Group 5',
        type: 'figma',
        url: 'https://www.figma.com/file/doY7xZ14jG6ieIssJ4BgAy/Live-promo---handoff?type=design&node-id=317-14807&mode=design&t=J5TMYaWVgzqOjtwY-4',
      },
    ],
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
