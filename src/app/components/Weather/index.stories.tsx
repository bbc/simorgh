import React from 'react';
import Weather from './index';

export default {
  title: 'Components/Weather',
};

export const Default = () => (
  <Weather locationId="2653822" datetimeLocale="en-GB" />
);

export const LondonWeather = () => (
  <Weather locationId="2643743" datetimeLocale="en-GB" />
);

export const ParisWeather = () => (
  <Weather locationId="2988507" datetimeLocale="fr-FR" />
);