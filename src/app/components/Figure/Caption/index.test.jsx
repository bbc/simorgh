import React from 'react';
import { shouldMatchSnapshot } from '../../../helpers/tests/testHelpers';
import Caption from './index';
import { ServiceContext } from '../../ServiceContext';
import serviceContextStub from '../../../helpers/contextHelpers';

describe('Caption', () => {
  shouldMatchSnapshot(
    'should render correctly for news',
    <ServiceContext.Provider value={serviceContextStub.news}>
      <Caption>This is some Caption text</Caption>
    </ServiceContext.Provider>,
  );

  shouldMatchSnapshot(
    'should render correctly for persian',
    <ServiceContext.Provider value={serviceContextStub.persian}>
      <Caption>توصیف چیزی که اتفاق می افتد</Caption>
    </ServiceContext.Provider>,
  );
});
