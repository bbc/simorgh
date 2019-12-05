import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import { service as hausaConfig } from '#lib/config/services/hausa';
import relatedItems from './relatedItems';
import IndexAlsosContainer from '.';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});
const { useContext } = jest.requireMock('react');

describe('Index Alsos', () => {
  beforeEach(() => {
    useContext.mockReturnValue(hausaConfig.default);
  });

  afterEach(() => {
    useContext.mockReset();
  });

  shouldMatchSnapshot(
    'should render multiple correctly',
    <IndexAlsosContainer
      alsoItems={relatedItems}
      script={latin}
      service="news"
    />,
  );

  shouldMatchSnapshot(
    'should render one correctly',
    <IndexAlsosContainer
      alsoItems={[relatedItems[0]]}
      script={latin}
      service="news"
    />,
  );
});
