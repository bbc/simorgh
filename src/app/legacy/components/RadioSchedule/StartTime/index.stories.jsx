import React from 'react';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import StartTime from '.';

const storiesUnixTimestamp = 1566914061212;

// eslint-disable-next-line react/prop-types
const Component = ({ service, locale, script, dir, timezone }) => (
  <ServiceContextProvider
    service={service}
    locale={locale}
    script={script}
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

export const Default = (_, globalArgs) => <Component {...globalArgs} />;
