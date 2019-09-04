/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ClientApp, ServerApp } from '.';

describe('ClientApp', () => {
  shouldMatchSnapshot(
    'should render correctly',
    <ClientApp data="someData!" routes={['someRoute']} />,
  );
});

describe('ServerApp', () => {
  describe('no passed routerContext', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <ServerApp
        location="someUrl"
        routes={['someRoute']}
        data="somePassedData"
        context={{}}
      />,
    );
  });

  shouldMatchSnapshot(
    'should render correctly',
    <ServerApp
      location="someUrl"
      routes={['someRoute']}
      data="somePassedData"
      context={{ context: 'someRouterContext' }}
    />,
  );
});
