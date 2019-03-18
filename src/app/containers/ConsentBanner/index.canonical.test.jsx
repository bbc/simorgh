/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

let CanonicalContainer;
let logic;
let container;

let setShowPrivacyBannerState;
let setShowCookieBannerState;

const runInitial = jest.fn();
const privacyOnAllow = jest.fn();
const privacyOnReject = jest.fn();
const cookieOnAllow = jest.fn();
const cookieOnReject = jest.fn();

jest.mock('./Banner', () => jest.fn());
const Banner = require('./Banner');

Banner.mockImplementation(({ type }) => <div>Canonical {type} banner</div>);

describe('Canonical Container', () => {
  beforeEach(() => {
    jest.mock('./CanonicalLogic', () => jest.fn());
    logic = require('./CanonicalLogic');

    logic.mockImplementation(
      ({ setShowPrivacyBanner, setShowCookieBanner }) => {
        setShowCookieBannerState = setShowCookieBanner;
        setShowPrivacyBannerState = setShowPrivacyBanner;

        return {
          runInitial,
          privacyOnAllow,
          privacyOnReject,
          cookieOnAllow,
          cookieOnReject,
        };
      },
    );

    CanonicalContainer = require('./index').default;

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should render privacy banner when both banners are set to be shown', () => {
    act(() => {
      ReactDOM.render(<CanonicalContainer />, container);

      setShowPrivacyBannerState(true);
      setShowCookieBannerState(true);
    });

    expect(container.innerHTML).toBe('<div>Canonical privacy banner</div>');
    expect(runInitial).toHaveBeenCalled();
    expect(logic).toHaveBeenCalledWith({
      setShowCookieBanner: expect.any(Function),
      setShowPrivacyBanner: expect.any(Function),
    });
    expect(Banner).toHaveBeenCalledWith(
      {
        onAccept: privacyOnAllow,
        onReject: privacyOnReject,
        type: 'privacy',
      },
      {},
    );
  });

  it('should render privacy banner when only privacy banner is set to be shown', () => {
    act(() => {
      ReactDOM.render(<CanonicalContainer />, container);

      setShowPrivacyBannerState(true);
    });

    expect(container.innerHTML).toBe('<div>Canonical privacy banner</div>');
    expect(runInitial).toHaveBeenCalled();
    expect(logic).toHaveBeenCalledWith({
      setShowCookieBanner: expect.any(Function),
      setShowPrivacyBanner: expect.any(Function),
    });
    expect(Banner).toHaveBeenCalledWith(
      {
        onAccept: privacyOnAllow,
        onReject: privacyOnReject,
        type: 'privacy',
      },
      {},
    );
  });

  it('should render cookie banner when only cookie banner is set to be shown', () => {
    act(() => {
      ReactDOM.render(<CanonicalContainer />, container);

      setShowCookieBannerState(true);
    });

    expect(container.innerHTML).toBe('<div>Canonical cookie banner</div>');
    expect(runInitial).toHaveBeenCalled();
    expect(logic).toHaveBeenCalledWith({
      setShowCookieBanner: expect.any(Function),
      setShowPrivacyBanner: expect.any(Function),
    });
    expect(Banner).toHaveBeenCalledWith(
      { onAccept: cookieOnAllow, onReject: cookieOnReject, type: 'cookie' },
      {},
    );
  });
});
