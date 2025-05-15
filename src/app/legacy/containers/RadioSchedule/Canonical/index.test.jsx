import React from 'react';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  act,
} from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import RadioSchedule from '.';
import processRadioSchedule from '../utilities/processRadioSchedule';

const RadioScheduleWithContext = ({ radioSchedule, lang }) => (
  <RequestContextProvider
    isAmp={false}
    pageType={HOME_PAGE}
    service="arabic"
    pathname="/arabic"
    timeOnServer={Date.now()}
  >
    <ServiceContextProvider service="arabic">
      <RadioSchedule radioSchedule={radioSchedule} lang={lang} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('RadioSchedule', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('With initial data', () => {
    it('renders correctly for a service', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      let container;
      await act(async () => {
        container = render(
          <RadioScheduleWithContext radioSchedule={initialData} />,
        ).container;
      });
      expect(container).toMatchSnapshot();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      let container;

      await act(async () => {
        container = render(
          <RadioScheduleWithContext radioSchedule={initialData} />,
        ).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('does not render when data contains less than 4 programs', async () => {
      const radioSchedule2Programmes = { ...arabicRadioScheduleData };
      radioSchedule2Programmes.schedules =
        radioSchedule2Programmes.schedules.slice(0, 2);

      const initialData = processRadioSchedule(
        radioSchedule2Programmes,
        'arabic',
        Date.now(),
      );

      fetch.mockResponseOnce(JSON.stringify(radioSchedule2Programmes));

      let container;

      await act(async () => {
        container = render(
          <RadioScheduleWithContext initialData={initialData} />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data contains no programs', async () => {
      fetch.mockResponseOnce(JSON.stringify([]));
      const initialData = processRadioSchedule(
        { schedules: [] },
        'arabic',
        Date.now(),
      );
      let container;

      await act(async () => {
        container = render(
          <RadioScheduleWithContext initialData={initialData} />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });
  });
});
