import React, { useMemo } from 'react';
import services from '#server/utilities/serviceConfigs';
import { ServiceContext } from '../../contexts/ServiceContext';
import CopyrightContainer from '.';
import { StoryProps, StoryArgs } from '../../models/types/storybook';
import { ServiceConfig } from '../../models/types/serviceConfig';

const Component = (_: StoryArgs, { service, variant }: StoryProps) => {
  const imageCaptionText =
    services[service][variant].imageCopyrightOffscreenText;

  const serviceContextStub = useMemo(
    () => ({
      imageCaptionOffscreenText: imageCaptionText,
      lang: services[service][variant].lang,
      dir: services[service][variant].dir,
    }),
    [imageCaptionText, service, variant],
  );
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
};

export const Copyright = Component;
