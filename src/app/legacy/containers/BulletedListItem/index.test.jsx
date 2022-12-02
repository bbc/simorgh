import React from 'react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContext } from '../../../contexts/ServiceContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
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
