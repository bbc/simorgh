/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { ClientApp, ServerApp } from '.';
import App from './App';

jest.mock('./App', () => jest.fn());
App.mockImplementation(props => <div {...props} />);

jest.mock('react-router-dom', () => ({
  BrowserRouter: jest.fn(),
  StaticRouter: jest.fn(),
}));
BrowserRouter.mockImplementation(({ children }) => <div>{children}</div>);
StaticRouter.mockImplementation(({ children }) => <div>{children}</div>);

describe('ClientApp', () => {
  it('should render correctly', () => {
    render(<ClientApp data="someData!" routes={['someRoute']} />);
    expect(App).toHaveBeenCalledWith(
      { initialData: 'someData!', routes: ['someRoute'] },
      {},
    );
    expect(BrowserRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'someData!',
        routes: ['someRoute'],
      },
      {},
    );
    // expect(BrowserRouter.mock.calls[0][0].children).toBeInstanceOf(App);
  });
});

describe('ServerApp', () => {
  beforeEach(() => {
    // clear `route.getInitialData` and `reactRouterConfig.renderRoutes` mocks
    jest.clearAllMocks();
  });

  it('no passed routerContext', () => {
    render(
      <ServerApp
        data="somePassedData"
        routes={['someRoute']}
        bbcOrigin="https://www.bbc.com"
      />,
    );
    expect(App).toHaveBeenCalledWith(
      {
        initialData: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
      },
      {},
    );
    expect(StaticRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
      },
      {},
    );
  });
  it('should render correctly', () => {
    render(
      <ServerApp
        data="somePassedData"
        routes={['someRoute']}
        bbcOrigin="https://www.bbc.com"
        context={{ context: 'someRouterContext' }}
      />,
    );
    expect(App).toHaveBeenCalledWith(
      {
        initialData: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
        context: 'someRouterContext',
      },
      {},
    );
    expect(StaticRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
        context: 'someRouterContext',
      },
      {},
    );
  });
});
