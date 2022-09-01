import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

import Promo from '.';
import {
  cpsPromoFixture,
  linkPromoFixture,
  cpsNewsPromoFixture,
} from './fixtures';

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
    'Man City vs West Ham: Bad weather force Premier League to cancel Sunday match',
  );
  const minimumContrast = number('Minimum Contrast', 8);
  const paletteSize = number('Palette Size', 20, { min: 2, max: 99 });
  return (
    <Wrappers {...props}>
      <Promo
        image={{ src: imageUrl, alt: '', width: 500, height: 250, ratio: 52 }}
        url="#"
        minimumContrast={minimumContrast}
        paletteSize={paletteSize}
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

const WithNewsCPSPromoData = props => {
  return (
    <Wrappers {...props}>
      <Promo {...cpsNewsPromoFixture} />
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
export const CPSNewsPromo = WithNewsCPSPromoData;
export const LinkPromo = WithLinkPromoData;
