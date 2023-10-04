import React from 'react';
import styled from '@emotion/styled';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import LiveLabel from '../../legacy/psammead/psammead-live-label/src/index';
import md from '../../legacy/psammead/psammead-live-label/README.md';
import { StoryProps } from '../../models/types/storybook';
import services from '../../../server/utilities/serviceConfigs';
import Heading from '../Heading';
import InlineLink from '../InlineLink';

interface Props extends StoryProps {
  dir: string;
  ariaHidden: boolean;
  offScreenText: string;
  liveText?: string;
  text?: string;
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

export const WithLocalisedLiveText = ({ service, dir }: Props) => (
  <LiveLabel
    service={service}
    dir={dir}
    liveText={services[service].default.translations.media.liveLabel}
  />
);

export const WithCustomOffscreenText = ({ service, dir }: Props) => (
  <LiveLabel
    service={service}
    dir={dir}
    ariaHidden
    offScreenText="Watch Live"
    liveText={services[service].default.translations.media.liveLabel}
  />
);

export const WithChildren = ({ text: headline, service, dir }: Props) => (
  <Wrapper>
    <Heading level={3}>
        <LiveLabel
          service={service}
          dir={dir}
          ariaHidden
          offScreenText="Live"
          liveText={services[service].default.translations.media.liveLabel}
        />
      <InlineLink text={headline} to="https://www.bbc.co.uk/ws/languages" />
    </Heading>
  </Wrapper>
);
