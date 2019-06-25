/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { shouldShallowMatchSnapshot } from '../../../testHelpers';
import { ClientApp, ServerApp } from '.';

describe('ClientApp', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <ClientApp data="someData!" routes={['someRoute']} />,
  );
});

describe('ServerApp', () => {
  describe('no passed routerContext', () => {
    shouldShallowMatchSnapshot(
      'should render correctly',
      <ServerApp
        location="someUrl"
        routes={['someRoute']}
        data="somePassedData"
        context={{}}
      />,
    );
  });

  shouldShallowMatchSnapshot(
    'should render correctly',
    <ServerApp
      location="someUrl"
      routes={['someRoute']}
      data="somePassedData"
      context={{ context: 'someRouterContext' }}
    />,
  );
});
