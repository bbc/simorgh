import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import services from '#server/utilities/serviceConfigs';
import { ServiceContext } from '../../../contexts/ServiceContext';
import CopyrightContainer from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  const imageCaptionText =
    services[service][variant].imageCopyrightOffscreenText;

  const serviceContextStub = {
    imageCaptionOffscreenText: imageCaptionText,
    lang: services[service].lang,
    dir: services[service].dir,
  };
  return (
    <ServiceContext.Provider value={serviceContextStub}>
      <CopyrightContainer>{imageCaptionText}</CopyrightContainer>
    </ServiceContext.Provider>
  );
};

export default {
  title: 'Containers/Copyright',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Copyright = Component;
