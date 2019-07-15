/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

let AmpContainer;
let container;

jest.mock('./Banner/index.amp', () => jest.fn());
const Banner = require('./Banner/index.amp');

Banner.mockImplementation(({ type }) => <div>Amp {type} banner</div>);

const expectNodeToContainInlinedJSON = node =>
  expect(
    node.querySelectorAll('script[type="application/json"]').length,
  ).toEqual(1);

describe('Amp Consent Banner Container', () => {
  beforeEach(() => {
    AmpContainer = require('./index.amp').default;

    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render(<AmpContainer />, container);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render two banners with correct amp actions and visibility', () => {
    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction: 'tap:cookie.show, privacy.hide',
        promptId: 'privacy',
        rejectAction: 'tap:cookie.show, privacy.hide',
        type: 'privacy',
      },
      {},
    );

    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction: 'tap:consent.accept',
        hidden: true,
        promptId: 'cookie',
        rejectAction: 'tap:consent.reject',
        type: 'cookie',
      },
      {},
    );
  });

  it('should render a single amp-geo element containing inlined JSON', () => {
    expect(container.querySelectorAll('amp-geo').length).toEqual(1);
    const ampGeo = container.querySelector('amp-geo');
    expectNodeToContainInlinedJSON(ampGeo);
  });

  it('should render a single amp-consent element containing inlined JSON', () => {
    expect(container.querySelectorAll('amp-consent').length).toEqual(1);
    const ampConsent = container.querySelector('amp-consent');
    expectNodeToContainInlinedJSON(ampConsent);
  });
});
