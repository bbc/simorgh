import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs, text } from '@storybook/addon-knobs';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import Promo from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  const imageUrl = text(
    'Image URL',
    'https://ichef.bbci.co.uk/news/976/cpsprodpb/189F/production/_121530360_hi071904982.jpg',
  );
  const mainBody = text(
    'Main Body',
    'A further 1,185 people crossed the English Channel by boat to reach the UK on Thursday',
  );
  const date = text('Metadata', 'April 9, 2021');

  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider isAmp={false} service={service}>
        <Promo image={imageUrl} meta={date}>
          {mainBody}
        </Promo>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Frosted Glass Promo',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Demo = Component;
