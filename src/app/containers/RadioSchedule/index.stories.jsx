import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import RadioScheduleContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import WithTimeMachine from '#testHelpers/withTimeMachine';

// Currently, only these services have radio schedule data
const validServices = [
  'arabic',
  'hausa',
  'korean',
  'pashto',
  'persian',
  'somali',
];

const staticRadioScheduleURL = service =>
  `./data/${service}/bbc_${service}_radio/schedule.json`;

const renderRadioScheduleContainer = service => (
  <ToggleContextProvider service={service} origin="https://www.test.bbc.com">
    <RequestContextProvider
      isAmp={false}
      pageType="frontPage"
      service={service}
      pathname={`/${service}`}
    >
      <ServiceContextProvider service={service}>
        <RadioScheduleContainer
          radioScheduleEndpointOverride={staticRadioScheduleURL(service)}
        />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContextProvider>
);

const stories = storiesOf('Containers|RadioSchedule', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
  .addDecorator(
    withServicesKnob({
      defaultService: 'korean',
      services: validServices,
    }),
  )
  .addParameters({
    chromatic: { disable: true },
  });

stories.add('Radio schedules', ({ service }) => {
  return renderRadioScheduleContainer(service);
});
