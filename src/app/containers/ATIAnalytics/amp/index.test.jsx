import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpATIAnalytics from '.';
import * as atiUrl from '../atiUrl';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');

const atiBaseUrl = 'https://foobar.com?';
const contextToReturn = {
  service: 'news',
  id: 'c0000000000o',
  isAmp: true,
  pageType: 'article',
  env: 'live',
  bbcOrigin: 'https://www.bbc.co.uk',
};

describe('Amp ATI Analytics', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
    useContext.mockReset();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('creates an AMP analytics container with required parameters', () => {
    const mockAtiBaseUrl = jest.fn().mockReturnValue(atiBaseUrl);

    useContext.mockReturnValue(contextToReturn);
    atiUrl.atiBaseUrl = mockAtiBaseUrl;

    act(() => {
      ReactDOM.render(
        <AmpATIAnalytics pageviewParams="key1=value1&key2=value2" />,
        container,
      );
    });

    expect(mockAtiBaseUrl).toHaveBeenCalledWith('live');
    expect(container.querySelectorAll('amp-analytics').length).toEqual(1);
    expect(
      container.querySelectorAll(
        'amp-analytics script[type="application/json"]',
      ).length,
    ).toEqual(1);
    expect(
      container.querySelector('amp-analytics script[type="application/json"]')
        .innerHTML,
    ).toMatch(atiBaseUrl);
  });
});
