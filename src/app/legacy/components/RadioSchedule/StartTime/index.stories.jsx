import React from 'react';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import StartTime from '.';

const storiesUnixTimestamp = 1566914061212;

const Component = ({ service, locale, dir, timezone }) => (
  <ServiceContextProvider
    service={service}
    locale={locale}
    dir={dir}
    timezone={timezone}
  >
    <StartTime timestamp={storiesUnixTimestamp} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/Radio Schedule/Start Time',
  Component,
};

export const Default = (_, globalArgs) => {
  const { service, dir, timezone } = globalArgs;

  return <Component service={service} dir={dir} timezone={timezone} />;
};
