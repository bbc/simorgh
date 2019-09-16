import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import hausaConfig from '../../../lib/config/services/hausa';
import { shouldShallowMatchSnapshot } from '../../../../testHelpers';
import relatedItems from './relatedItems';
import IndexAlsos from '.';

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

  shouldShallowMatchSnapshot(
    'should render multiple correctly',
    <IndexAlsos alsoItems={relatedItems} script={latin} service="news" />,
  );

  shouldShallowMatchSnapshot(
    'should render one correctly',
    <IndexAlsos alsoItems={[relatedItems[0]]} script={latin} service="news" />,
  );
});
