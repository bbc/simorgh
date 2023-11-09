import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import StartTime from '.';
import ThemeProvider from '../../../../components/ThemeProvider';

const storiesUnixTimestamp = 1566914061212;

// eslint-disable-next-line react/prop-types
const Component = ({ service, locale, script, dir, timezone }) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider
      service={service}
      locale={locale}
      script={script}
      dir={dir}
      timezone={timezone}
    >
      <StartTime timestamp={storiesUnixTimestamp} />
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  title: 'Components/Radio Schedule/Start Time',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Default = props => <Component {...props} />;
