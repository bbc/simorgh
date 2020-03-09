import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import RadioScheduleContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/radioschedule.json';

let container;

const localRadioScheduleEndpoint = service => {
  const localhostURL = 'http://localhost:7080';
  const localServiceURL = `${localhostURL}/${service}`;
  return `${localServiceURL}/bbc_${service}_radio/radioschedule.json`;
};

const getToggleState = enabled => ({ radioSchedule: { enabled } });

const renderRadioScheduleContainer = (service, radioScheduleToggle = false) =>
  act(async () => {
    ReactDOM.render(
      <ToggleContext.Provider
        value={{ toggleState: getToggleState(radioScheduleToggle) }}
      >
        <RequestContextProvider
          isAmp={false}
          pageType="frontPage"
          service={service}
          pathname={`/${service}`}
        >
          <ServiceContextProvider service={service}>
            <RadioScheduleContainer
              endpoint={localRadioScheduleEndpoint(service)}
            />
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContext.Provider>,
      container,
    );
  });

describe('RadioScheduleData', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
    fetch.resetMocks();
  });

  it('returns expected data for a service with a radio schedule', async () => {
    const ulContent = arabicRadioScheduleData.schedules.length;

    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    await renderRadioScheduleContainer('arabic', true);

    expect(container.querySelectorAll('ul').length).toEqual(ulContent);
  });

  it('returns empty string when radio schedule toggle is disabled', async () => {
    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    await renderRadioScheduleContainer('arabic');

    expect(container.innerHTML).toEqual('');
  });
});
