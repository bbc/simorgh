import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import RadioScheduleContainer from '.';
import arabicRadioScheduleData from '#data/arabic/bbc_arabic_radio/radioschedule.json';

let container;

const localRadioScheduleEndpoint = service => {
  const localhostURL = 'http://localhost:7080';
  const localServiceURL = `${localhostURL}/${service}`;
  return `${localServiceURL}/bbc_${service}_radio/radioschedule.json`;
};

const renderRadioScheduleContainer = service =>
  act(async () => {
    ReactDOM.render(
      <RadioScheduleContainer endpoint={localRadioScheduleEndpoint(service)} />,
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

  it(`returns expected data for a service with a radio schedule`, async () => {
    const ulContent = arabicRadioScheduleData.schedules.length;

    fetch.mockResponse(JSON.stringify(arabicRadioScheduleData));
    await renderRadioScheduleContainer('arabic');

    expect(container.querySelectorAll('ul').length).toEqual(ulContent);
  });
});
