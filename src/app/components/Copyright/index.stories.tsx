import React from 'react';
import services from '#server/utilities/serviceConfigs';
import withServicesDecorator from '#app/utilities/withServicesDecorator';
import { ServiceContext } from '../../contexts/ServiceContext';
import CopyrightContainer from '.';
import { StoryProps, UnusedFirstArg } from '../../models/types/storybook';
import { ServiceConfig } from '../../models/types/serviceConfig';

// eslint-disable-next-line react/prop-types
const Component = (_: UnusedFirstArg, { service, variant }: StoryProps) => {
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
  parameters: { chromatic: { disable: true } },
  decorators: [withServicesDecorator],
};

export const Copyright = Component;
