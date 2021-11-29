import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs, text } from '@storybook/addon-knobs';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import Promo from '.';
import { cpsPromoFixture, linkPromoFixture } from './fixtures';

// eslint-disable-next-line react/prop-types
const Wrappers = ({ service, variant, children }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <RequestContextProvider isAmp={false} service={service}>
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          {children}
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

const Component = props => {
  const imageUrl = text(
    'Image URL',
    'https://ichef.bbci.co.uk/news/976/cpsprodpb/189F/production/_121530360_hi071904982.jpg',
  );
  const mainBody = text(
    'Main Body',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quam magna, lacinia ut arcu in, vulputate ultricies lectus. Vestibulum purus ligula, finibus vel ultrices in, pretium non neque. Sed mauris ante, mollis ac metus fermentum, vestibulum malesuada felis. Nullam a congue mauris. Nulla venenatis felis ac eleifend rutrum.',
  );
  return (
    <Wrappers {...props}>
      <Promo
        image={{ src: imageUrl, alt: '', width: 500, height: 250, ratio: 52 }}
        url="#"
      >
        {mainBody}
      </Promo>
    </Wrappers>
  );
};

const WithCPSPromoData = props => {
  return (
    <Wrappers {...props}>
      <Promo {...cpsPromoFixture} />
    </Wrappers>
  );
};

const WithLinkPromoData = props => {
  return (
    <Wrappers {...props}>
      <Promo {...linkPromoFixture} />
    </Wrappers>
  );
};

export default {
  title: 'Components/Frosted Glass Promo',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Standalone = Component;
export const CPSPromo = WithCPSPromoData;
export const LinkPromo = WithLinkPromoData;
