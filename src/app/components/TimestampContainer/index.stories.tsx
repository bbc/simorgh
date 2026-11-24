import { ComponentProps, use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TimestampContainer from '.';
import readme from './README.md';
import metadata from './metadata.json';

const Component = (props: ComponentProps<typeof TimestampContainer>) => {
  const { datetimeLocale, timezone, altCalendar } = use(ServiceContext);
  return (
    <TimestampContainer
      locale={datetimeLocale}
      timezone={timezone}
      altCalendar={altCalendar}
      {...props}
    />
  );
};

export default {
  title: 'Components/TimestampContainer',
  component: TimestampContainer,
  render: Component,
  parameters: { docs: { readme }, metadata },
  args: {
    timestamp: 1566914061212,
    dateTimeFormat: 'YYYY-MM-DD',
    format: 'D MMMM YYYY, HH:mm z',
  },
};

export const Default = {};
export const WithPrefix = { args: { prefix: 'Updated' } };
export const WithPrefixAndSuffix = {
  args: { prefix: 'This', suffix: 'is the last update' },
};
export const Relative = {
  args: { isRelative: true },
  render: (props: ComponentProps<typeof TimestampContainer>) => (
    <Component {...props} timestamp={Date.now() - 59 * 60 * 1000} />
  ),
};
