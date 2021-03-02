/* eslint-disable global-require */
import React, { useRef, forwardRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

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

jest.mock('./Banner/index.canonical', () => jest.fn());
const Banner = require('./Banner/index.canonical');

Banner.mockImplementation(({ type }) => <div>Canonical {type} banner</div>);

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

const updateCookiePolicy = jest.fn();

useContext.mockImplementation(() => ({ updateCookiePolicy }));

describe('Canonical Consent Banner Container', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
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
      setShowCookieBannerState(false);
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

      setShowPrivacyBannerState(false);
      setShowCookieBannerState(true);
    });

    expect(container.innerHTML).toBe('<div>Canonical cookie banner</div>');
    expect(runInitial).toHaveBeenCalled();
    expect(logic).toHaveBeenCalledWith({
      setShowCookieBanner: expect.any(Function),
      setShowPrivacyBanner: expect.any(Function),
    });
    expect(Banner).toHaveBeenCalledWith(
      {
        onAccept: expect.any(Function),
        onReject: cookieOnReject,
        type: 'cookie',
      },
      {},
    );

    expect(cookieOnAllow).not.toHaveBeenCalled();
    expect(updateCookiePolicy).not.toHaveBeenCalled();

    Banner.mock.calls[0][0].onAccept();

    expect(cookieOnAllow).toHaveBeenCalled();
    expect(updateCookiePolicy).toHaveBeenCalled();
  });

  it('should render no banners when both are set to not be shown', () => {
    act(() => {
      ReactDOM.render(<CanonicalContainer />, container);

      setShowPrivacyBannerState(false);
      setShowCookieBannerState(false);
    });

    expect(container.innerHTML).toBe('');
    expect(runInitial).toHaveBeenCalled();
    expect(logic).toHaveBeenCalledWith({
      setShowCookieBanner: expect.any(Function),
      setShowPrivacyBanner: expect.any(Function),
    });
    expect(Banner).not.toHaveBeenCalled();
  });

  it('should focus on provided ref when cookie banner is accepted', () => {
    const FocusElement = forwardRef((props, ref) => (
      <a ref={ref}>BBC Brand Logo</a>
    ));
    const TestComponent = () => {
      const focusRef = useRef(null);
      return (
        <>
          <FocusElement ref={focusRef} />
          <CanonicalContainer onDismissFocusRef={focusRef} />
        </>
      );
    };
    act(() => {
      ReactDOM.render(<TestComponent />, container);

      setShowPrivacyBannerState(false);
      setShowCookieBannerState(true);
    });

    Banner.mock.calls[0][0].onAccept();

    expect(document.querySelector('a').text).toBe('BBC Brand Logo');
  });
});
