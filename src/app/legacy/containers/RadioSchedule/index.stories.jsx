import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { getLocalRadioScheduleEndpoint } from '#lib/utilities/getUrlHelpers/getRadioSchedulesUrls';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import RadioScheduleContainer from '.';
import withServicesDecorator from '../../../../../.storybook/withServicesDecorator';

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
const Component = (_, { service }) => (
  <BrowserRouter>
    <ToggleContextProvider>
      <RequestContextProvider
        isAmp={false}
        pageType={FRONT_PAGE}
        service={service}
        pathname={`/${service}`}
      >
        <RadioScheduleContainer
          radioScheduleEndpointOverride={getLocalRadioScheduleEndpoint({
            service,
            radioService: radioServices[service],
          })}
        />
      </RequestContextProvider>
    </ToggleContextProvider>
  </BrowserRouter>
);

moment.locale('en-GB'); // needed for Time Machine date string

export default {
  title: 'Containers/Radio Schedule',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withServicesDecorator],
};

export const RadioSchedule = Component;
