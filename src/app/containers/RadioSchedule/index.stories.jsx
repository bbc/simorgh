import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import moment from 'moment';
import RadioScheduleContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { getLocalRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';

// Currently, only these services have radio schedule data
const validServices = [
  'afrique',
  'arabic',
  'hausa',
  'korean',
  'pashto',
  'persian',
  'somali',
  'swahili',
];

const renderRadioScheduleContainer = service => (
  <BrowserRouter>
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        pageType="frontPage"
        service={service}
        pathname={`/${service}`}
      >
        <ServiceContextProvider service={service}>
          <RadioScheduleContainer
            radioScheduleEndpointOverride={getLocalRadioScheduleEndpoint({
              service,
            })}
          />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

moment.locale('en-GB'); // needed for Time Machine date string
const stories = storiesOf('Containers|RadioSchedule', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <WithTimeMachine
      datetime={moment.utc().format('x')} // Sets datetime to today. e.g. 1584525420043
      dateString={moment.utc().format('LLLL')} // Sets dateString to today. e.g. Wednesday, 18 March 2020 09:57
    >
      {story()}
    </WithTimeMachine>
  ))
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
