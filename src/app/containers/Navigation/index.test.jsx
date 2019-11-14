import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import NavigationContainer from './index';
import { EventContextProvider } from '#app/contexts/EventContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';

describe('Navigation Container', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render a Navigation with igbo links correctly',
      <ServiceContextProvider service="igbo">
        <EventContextProvider>
          <NavigationContainer />
        </EventContextProvider>
      </ServiceContextProvider>,
    );
  });

  describe('assertions', () => {
    it('should render a Navigation with a Skip to content link, linking to #content', () => {
      const { container } = render(
        <ServiceContextProvider service="igbo">
          <EventContextProvider>
            <NavigationContainer />
          </EventContextProvider>
        </ServiceContextProvider>,
      );

      const skipLink = container.querySelector('a');
      const skipLinkHref = skipLink.getAttribute('href');

      expect(skipLinkHref).toBe('#content');
    });
  });
});
