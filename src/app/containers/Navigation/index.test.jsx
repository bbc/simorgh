import React from 'react';
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

  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  describe('snapshots', () => {
    shouldMatchSnapshot(
      'should render a Navigation with igbo links correctly',
      <NavigationContainer />,
    );
  });
});
