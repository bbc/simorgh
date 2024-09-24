import React from 'react';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import {
  render,
  act,
} from '../../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import CanonicalRadioSchedule from '.';
import processRadioSchedule from '../utilities/processRadioSchedule';

const endpoint = 'https://localhost/arabic/bbc_arabic_radio/schedule.json';

const RadioScheduleWithContext = ({ initialData, lang }) => (
  <RequestContextProvider
    isAmp={false}
    pageType={FRONT_PAGE}
    service="arabic"
    pathname="/arabic"
    timeOnServer={Date.now()}
  >
    <ServiceContextProvider service="arabic">
      <CanonicalRadioSchedule
        initialData={initialData}
        endpoint={endpoint}
        lang={lang}
      />
    </ServiceContextProvider>
  </RequestContextProvider>
);

describe('Canonical RadioSchedule', () => {
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
          <RadioScheduleWithContext initialData={initialData} />,
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
          <RadioScheduleWithContext initialData={initialData} />,
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

  describe('Without initial data', () => {
    it('renders correctly for a service with a radio schedule and page frequency URL', async () => {
      fetch.mockResponseOnce(JSON.stringify(arabicRadioScheduleData));
      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext />).container;
      });

      expect(container).toMatchSnapshot();
    });

    it('contains four programs for a service with a radio schedule', async () => {
      fetch.mockResponseOnce(JSON.stringify(arabicRadioScheduleData));
      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext />).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('render radio schedules container with lang code', async () => {
      fetch.mockResponseOnce(JSON.stringify(arabicRadioScheduleData));
      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext lang="fa-AF" />).container;
      });
      expect(container.querySelector('section')).toHaveAttribute(
        'lang',
        'fa-AF',
      );
    });

    it('does not render when data contains less than 4 programs', async () => {
      const radioSchedule2Programmes = { ...arabicRadioScheduleData };
      radioSchedule2Programmes.schedules =
        radioSchedule2Programmes.schedules.slice(0, 2);

      fetch.mockResponseOnce(JSON.stringify(radioSchedule2Programmes));

      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data contains no programs', async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          schedules: [],
        }),
      );
      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data fetched returns non-ok status code', async () => {
      global.console.error = jest.fn();
      fetch.mockResponse({ status: 404 });
      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data fetch is rejected', async () => {
      global.console.error = jest.fn();
      fetch.mockRejectOnce(Error('Server not found'));
      let container;

      await act(async () => {
        container = render(<RadioScheduleWithContext />).container;
      });
      expect(container).toBeEmptyDOMElement();
    });
  });
});
