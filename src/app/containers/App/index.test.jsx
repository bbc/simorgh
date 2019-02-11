/*
 * Credit Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { ClientApp, ServerApp } from '.';

describe('ClientApp', () => {
  it('should render as exepcted', () => {
    const wrapper = shallow(
      <ClientApp data="someData!" routes={['someRoute']} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe('ServerApp', () => {
  describe('no passed routerContext', () => {
    it('should render as exepcted', () => {
      const wrapper = shallow(
        <ServerApp
          location="someUrl"
          routes={['someRoute']}
          data="somePassedData"
          context={{}}
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render as exepcted', () => {
    const wrapper = shallow(
      <ServerApp
        location="someUrl"
        routes={['someRoute']}
        data="somePassedData"
        context={{ context: 'someRouterContext' }}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
