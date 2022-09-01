import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import moment from 'moment';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { getLocalRadioScheduleEndpoint } from '#lib/utilities/getUrlHelpers/getRadioSchedulesUrls';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import RadioScheduleContainer from '.';

// Currently, only these services have radio schedule data
const radioServices = {
  afaanoromoo: 'oromo',
  afrique: 'afrique',
  amharic: 'amharic',
  arabic: 'arabic',
  bengali: 'bangla',
  burmese: 'burmese',
  gahuza: 'gahuza',
  hausa: 'hausa',
  indonesia: 'indonesian',
  korean: 'korean',
  pashto: 'pashto',
  persian: 'dari',
  somali: 'somali',
  swahili: 'swahili',
  tigrinya: 'tigrinya',
  urdu: 'urdu',
};

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <BrowserRouter>
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        pageType={FRONT_PAGE}
        service={service}
        pathname={`/${service}`}
      >
        <ServiceContextProvider service={service}>
          <RadioScheduleContainer
            radioScheduleEndpointOverride={getLocalRadioScheduleEndpoint({
              service,
              radioService: radioServices[service],
            })}
          />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

moment.locale('en-GB'); // needed for Time Machine date string

export default {
  title: 'Containers/Radio Schedule',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [
    withKnobs,
    withServicesKnob({
      defaultService: 'korean',
      services: Object.keys(radioServices),
    }),
    story => (
      <WithTimeMachine
        datetime={moment.utc().format('x')} // Sets datetime to today. e.g. 1584525420043
        dateString={moment.utc().format('LLLL')} // Sets dateString to today. e.g. Wednesday, 18 March 2020 09:57
      >
        {story()}
      </WithTimeMachine>
    ),
  ],
};

export const RadioSchedule = Component;
