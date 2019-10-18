import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import usefulItems from './usefulItems';
import UsefulLinksComponent from '.';

describe('Useful links', () => {
  shouldMatchSnapshot(
    'should render multiple correctly',
    <UsefulLinksComponent items={usefulItems} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render one correctly',
    <UsefulLinksComponent
      items={[usefulItems[0]]}
      script={latin}
      service="news"
    />,
  );
});
