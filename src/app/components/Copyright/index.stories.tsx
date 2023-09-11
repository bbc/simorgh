import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import services from '#server/utilities/serviceConfigs';
import { ServiceContext } from '../../contexts/ServiceContext';
import CopyrightContainer from '.';
import { StoryProps } from '../../models/types/storybook';
import { ServiceConfig } from '../../models/types/serviceConfig';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }: StoryProps) => {
  const imageCaptionText =
    services[service][variant].imageCopyrightOffscreenText;

  const serviceContextStub = {
    imageCaptionOffscreenText: imageCaptionText,
    lang: services[service][variant].lang,
    dir: services[service][variant].dir,
  };
  return (
    <ServiceContext.Provider value={serviceContextStub as ServiceConfig}>
      <CopyrightContainer>{imageCaptionText}</CopyrightContainer>
    </ServiceContext.Provider>
  );
};

export default {
  title: 'Components/Copyright',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Copyright = Component;
