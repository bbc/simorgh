import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import NavigationContainer from './index';
import { service as igboConfig } from '#lib/config/services/igbo';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');

describe('Navigation Container', () => {
  beforeEach(() => {
    useContext.mockReturnValue(igboConfig.default);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render a Navigation with igbo links correctly',
      <NavigationContainer />,
    );
  });

  describe('assertions', () => {
    it('should render a Navigation with a Skip to content link, linking to #content', () => {
      const { container } = render(<NavigationContainer />);

      const skipLink = container.querySelector('a');
      const skipLinkHref = skipLink.getAttribute('href');

      expect(skipLinkHref).toBe('#content');
    });
  });
});
