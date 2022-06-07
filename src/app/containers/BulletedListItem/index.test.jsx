import React from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { shouldMatchSnapshot } from '#legacy/psammead-test-helpers/src';
import { latin } from '#legacy/gel-foundations/src/scripts';
import BulletedListItemContainer from './index';
import { listItemA, listItemB } from '../BulletedList/fixtures';

describe('BulletedListItemContainer', () => {
  shouldMatchSnapshot(
    'should render text correctly',
    <ServiceContext.Provider
      value={{ script: latin, service: 'news', dir: 'ltr' }}
    >
      <BulletedListItemContainer blocks={listItemA.model.blocks} />
    </ServiceContext.Provider>,
  );

  shouldMatchSnapshot(
    'should render rtl text correctly',
    <ServiceContext.Provider
      value={{ script: latin, service: 'news', dir: 'rtl' }}
    >
      <BulletedListItemContainer blocks={listItemB.model.blocks} />
    </ServiceContext.Provider>,
  );
});
