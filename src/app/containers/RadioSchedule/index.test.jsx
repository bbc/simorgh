import React from 'react';
import fetchMock from 'fetch-mock';
import { BrowserRouter } from 'react-router-dom';
import { render, act } from '@testing-library/react';
import { arabic } from '@bbc/gel-foundations/scripts';
import RadioSchedule from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import processRadioSchedule from './utilities/processRadioSchedule';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/schedule.json';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';

const endpoint = 'https://localhost/arabic/bbc_arabic_radio/schedule.json';

const getToggleState = enabled => ({
  radioSchedule: { enabled },
});

/* eslint-disable react/prop-types */
const RadioScheduleWithContext = ({
  service,
  radioScheduleToggle = false,
  isAmp = false,
  initialData,
  script,
  dir,
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: getToggleState(radioScheduleToggle),
      toggleDispatch: jest.fn(),
    }}
  >
    <RequestContextProvider
      isAmp={isAmp}
      pageType={FRONT_PAGE}
      service={service}
      pathname={`/${service}`}
      timeOnServer={Date.now()}
    >
      <ServiceContextProvider service={service} script={script} dir={dir}>
        <BrowserRouter>
          <RadioSchedule
            initialData={initialData}
            radioScheduleEndpointOverride={endpoint}
          />
        </BrowserRouter>
      </ServiceContextProvider>
    </RequestContextProvider>
  </ToggleContext.Provider>
);
describe('RadioScheduleData', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  describe('With initial data', () => {
    it('renders correctly for a service', async () => {
      fetchMock.mock(endpoint, arabicRadioScheduleData);
      const initialData = processRadioSchedule(
        arabicRadioScheduleData,
        'arabic',
        Date.now(),
      );
      const { container } = render(
        <RadioScheduleWithContext
          initialData={initialData}
          service="arabic"
          script={arabic}
          radioScheduleToggle
          dir="rtl"
        />,
      );
      expect(container).toMatchSnapshot();
      expect(container.querySelectorAll('li').length).toEqual(4);
      expect(fetchMock.calls(endpoint).length).toBeFalsy();
    });
  });

  describe('Without initial data', () => {
    it('contains four programs for a service with a radio schedule', async () => {
      fetchMock.mock(endpoint, arabicRadioScheduleData);
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext
            service="arabic"
            script={arabic}
            dir="rtl"
          />,
        ).container;
      });
      expect(container.querySelectorAll('li').length).toEqual(4);
    });

    it('does not render when data contains less than 4 programs', async () => {
      fetchMock.mock(endpoint, {
        schedules: arabicRadioScheduleData.schedules.slice(0, 2),
      });
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext
            service="arabic"
            script={arabic}
            dir="rtl"
          />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data contains no programs', async () => {
      fetchMock.mock(endpoint, {
        schedules: [],
      });
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext
            service="arabic"
            script={arabic}
            dir="rtl"
          />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data fetched returns non-ok status code', async () => {
      fetchMock.mock(endpoint, 404);
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext
            service="arabic"
            script={arabic}
            dir="rtl"
          />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when data fetch is rejected', async () => {
      fetchMock.mock(endpoint, {
        throws: 'Server not found',
      });
      let container;

      await act(async () => {
        container = await render(
          <RadioScheduleWithContext
            service="arabic"
            script={arabic}
            dir="rtl"
          />,
        ).container;
      });
      expect(container).toBeEmptyDOMElement();
    });
  });
});
