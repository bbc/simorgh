import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import RadioScheduleData from './RadioScheduleData';
import { ServiceContextProvider } from '#contexts/ServiceContext';

// Currently, only these services have radio schedule data
const validServices = [
  'arabic',
  'gahuza',
  'hausa',
  'korean',
  'pashto',
  'persian',
  'somali',
  'urdu',
];

const staticRadioScheduleURL = service =>
  `/data/${service}/bbc_${service}_radio/radioschedule.json`;

const renderRadioScheduleContainer = service => (
  <ServiceContextProvider service={service}>
    <RadioScheduleData endpoint={staticRadioScheduleURL(service)} />
  </ServiceContextProvider>
);

const stories = storiesOf('Containers|RadioSchedule', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'arabic',
      services: validServices,
    }),
  )
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Radio schedules', ({ service }) => {
  return renderRadioScheduleContainer(service);
});
