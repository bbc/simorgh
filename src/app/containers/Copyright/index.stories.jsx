import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import CopyrightContainer from '.';
import services from '#server/utilities/serviceConfigs';
import { ServiceContext } from '#contexts/ServiceContext';

storiesOf('Containers|Copyright', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service, variant }) => {
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
  });
