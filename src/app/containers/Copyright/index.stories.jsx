import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import CopyRightContainer from '.';
import services from '../../lib/config/services';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

storiesOf('CopyRight Container', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        const imageCaptionOffscreenText =
          services[service].imageCopyrightOffscreenText || 'Image source, ';

        const serviceContextStub = {
          imageCaptionOffscreenText,
          lang: services[service].lang,
          dir: services[service].dir,
        };
        return (
          <ServiceContextProvider service={service} value={serviceContextStub}>
            <CopyRightContainer>{imageCaptionOffscreenText}</CopyRightContainer>
          </ServiceContextProvider>
        );
      },
      Object.keys(services),
    ),
  );
