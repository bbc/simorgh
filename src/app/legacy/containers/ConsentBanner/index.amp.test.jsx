/* eslint-disable global-require */
import React from 'react';
import { render } from '../../../components/react-testing-library-with-providers';

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render two banners with correct amp actions and visibility when privacyPolicy toggle is enabled', () => {
    AmpContainer = require('./index.amp').default;
    ({ container } = render(<AmpContainer />, {
      toggles: { privacyPolicy: { enabled: true } },
    }));

    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction:
          'tap:cookie.show, privacy.hide, AMP.setState({ isManagingSettings: false }), dataCollectionHeading.focus',
        promptId: 'privacy',
        rejectAction: 'tap:cookie.show, privacy.hide',
        hideAction: 'tap:brandLink.focus, privacy.hide',
        type: 'privacy',
      },
      undefined,
    );

    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction: 'tap:brandLink.focus, consent.accept',
        hidden: true,
        promptId: 'cookie',
        rejectAction: 'tap:brandLink.focus, consent.reject',
        hideAction: 'tap:brandLink.focus, cookie.hide',
        type: 'cookie',
      },
      undefined,
    );
  });

  it('should render one banner with correct amp actions and visibility when privacyPolicy toggle is disabled ', () => {
    AmpContainer = require('./index.amp').default;
    ({ container } = render(<AmpContainer />, {
      toggles: { privacyPolicy: { enabled: false } },
    }));

    expect(Banner).not.toHaveBeenCalledWith(
      {
        acceptAction:
          'tap:cookie.show, privacy.hide, AMP.setState({ isManagingSettings: false }), dataCollectionHeading.focus',
        promptId: 'privacy',
        rejectAction: 'tap:cookie.show, privacy.hide',
        hideAction: 'tap:brandLink.focus, privacy.hide',
        type: 'privacy',
      },
      undefined,
    );

    expect(Banner).toHaveBeenCalledWith(
      {
        acceptAction: 'tap:brandLink.focus, consent.accept',
        promptId: 'cookie',
        rejectAction: 'tap:brandLink.focus, consent.reject',
        hideAction: 'tap:brandLink.focus, cookie.hide',
        type: 'cookie',
      },
      undefined,
    );
  });

  it('should render a single amp-geo element containing inlined JSON', () => {
    AmpContainer = require('./index.amp').default;
    ({ container } = render(<AmpContainer />));

    expect(container.querySelectorAll('amp-geo').length).toEqual(1);
    const ampGeo = container.querySelector('amp-geo');
    expectNodeToContainInlinedJSON(ampGeo);
  });

  it('should render a single amp-consent element containing inlined JSON', () => {
    AmpContainer = require('./index.amp').default;
    ({ container } = render(<AmpContainer />));

    expect(container.querySelectorAll('amp-consent').length).toEqual(1);
    const ampConsent = container.querySelector('amp-consent');
    expectNodeToContainInlinedJSON(ampConsent);
  });
});
