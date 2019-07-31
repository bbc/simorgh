import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import CopyrightContainer from '.';
import services from '../../lib/config/services';
import { ServiceContext } from '../../contexts/ServiceContext';

storiesOf('Containers|Copyright', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        const imageCaptionText =
          services[service].imageCopyrightOffscreenText || 'Image source, ';

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
      },
      Object.keys(services),
    ),
  );
