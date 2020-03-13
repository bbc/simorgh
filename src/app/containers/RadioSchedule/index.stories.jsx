import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import RadioScheduleContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

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
  `./data/${service}/bbc_${service}_radio/radioschedule.json`;

const renderRadioScheduleContainer = service => (
  <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
    <RequestContextProvider
      isAmp={false}
      pageType="frontPage"
      service={service}
      pathname={`/${service}`}
    >
      <ServiceContextProvider service={service}>
        <RadioScheduleContainer endpoint={staticRadioScheduleURL(service)} />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
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
