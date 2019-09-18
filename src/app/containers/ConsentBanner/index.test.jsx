import React, { useEffect } from 'react';
import renderer from 'react-test-renderer';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { EventContext } from '../../contexts/EventContext';

jest.mock('./index.canonical', () => () => <div>Canonical Cookie banner</div>);
jest.mock('./index.amp', () => () => <div>Amp Cookie banner</div>);

jest.mock('react', () => {
  const react = jest.requireActual('react');

  return {
    ...react,
    useEffect: jest.fn(),
  };
});
const mockUseEffect = jest.fn();
const mockEventContextStub = {
  useClickTracker: jest.fn(),
};
useEffect.mockImplementation(mockUseEffect);

const ConsentBanner = require('./index').default;

const Component = (isAmp = false) => (
  <EventContext.Provider value={mockEventContextStub}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={isAmp}
      pageType="article"
      service="news"
      statusCode={200}
      pathname="/pathname"
    >
      <ConsentBanner />
    </RequestContextProvider>
  </EventContext.Provider>
);

describe('Consent Banner Container', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot('should correctly render amp banner', Component(true));

  shouldMatchSnapshot('should correctly render canonical banner', Component());

  it('should call useClickTracker and useEffect exactly once each', () => {
    renderer.create(Component());
    expect(mockEventContextStub.useClickTracker).toHaveBeenCalledTimes(1);
    expect(mockUseEffect).toHaveBeenCalledTimes(1);
  });
});
