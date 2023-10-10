import React from 'react';
import styled from '@emotion/styled';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import LiveLabel from './index';
import md from './README.md';
import { StoryProps } from '../../models/types/storybook';
import services from '../../../server/utilities/serviceConfigs';
import Heading from '../Heading';

interface Props extends StoryProps {
  dir: string;
  ariaHidden: boolean;
  offScreenText: string;
  liveText?: string;
  text: string;
}

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
  <LiveLabel
    service={service}
    liveText={services[service][variant].translations.media.liveLabel}
  />
);

export const WithCustomOffscreenText = ({ service, variant }: Props) => (
  <LiveLabel
    service={service}
    ariaHidden
    offScreenText="Watch Live"
    liveText={services[service][variant].translations.media.liveLabel}
  />
);

export const WithChildren = ({ text: headline, service, variant }: Props) => (
  <Wrapper>
    <Heading level={3}>
      <a href="https://www.bbc.co.uk/ws/languages">
        <LiveLabel
          service={service}
          offScreenText="Live"
          liveText={services[service][variant].translations.media.liveLabel}
        >
          {headline}
        </LiveLabel>
      </a>
    </Heading>
  </Wrapper>
);
