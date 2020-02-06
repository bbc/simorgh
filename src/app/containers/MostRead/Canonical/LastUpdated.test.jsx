import React from 'react';
import ReactDOM from 'react-dom';
import { latin } from '@bbc/gel-foundations/scripts';
import LastUpdated from './LastUpdated';

let container;

describe('MostReadCanonical - LastUpdated', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container = null;
  });

  it(`should render LastUpdated when timestamp when > 60 days`, () => {
    ReactDOM.render(
      <LastUpdated
        timestamp={864691200}
        prefix="Last Updated:"
        script={latin}
        service="news"
        locale="en-gb"
      />,
      container,
    );

    expect(container.querySelector('time').textContent).toEqual(
      'Last Updated: 11 January 1970',
    );
  });

  it(`should not render LastUpdated when timestamp < 60 days`, () => {
    const freshDate = new Date();

    ReactDOM.render(
      <LastUpdated
        timestamp={freshDate.getTime()}
        prefix="Last Updated:"
        script={latin}
        service="news"
        locale="en-gb"
      />,
      container,
    );

    expect(container.querySelectorAll('time').length).toEqual(0);
  });
});
