import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import BulletedListContainer from './index';
import { ServiceContext } from '#contexts/ServiceContext';
import { orderedList } from './fixtures';

describe('BulletedListContainer', () => {
  shouldMatchSnapshot(
    'should render ltr correctly',
    <ServiceContext.Provider
      value={{ script: latin, service: 'news', dir: 'ltr' }}
    >
      <BulletedListContainer blocks={orderedList.model.blocks} />
    </ServiceContext.Provider>,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <ServiceContext.Provider
      value={{ script: arabic, service: 'arabic', dir: 'rtl' }}
    >
      <BulletedListContainer blocks={orderedList.model.blocks} />
    </ServiceContext.Provider>,
  );
});
