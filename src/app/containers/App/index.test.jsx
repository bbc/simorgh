import React from 'react';
import { render } from '@testing-library/react';
import ReactRouter from 'react-router-dom';
import { ClientApp, ServerApp } from '.';
import * as App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));
jest.mock('./App', () => jest.fn(() => <>Mocked App component</>));

const renderClientApp = () =>
  render(<ClientApp data="someData!" routes={['someRoute']} />);

const renderServerApp = () =>
  render(
    <ServerApp
      data="somePassedData"
      routes={['someRoute']}
      bbcOrigin="https://www.bbc.com"
    />,
  );

describe('ClientApp', () => {
  it('App should be called with the correct props', () => {
    renderClientApp();
    expect(App).toHaveBeenCalledWith(
      { initialData: 'someData!', routes: ['someRoute'] },
      {},
    );
  });

  it('BrowserRouter should be called with the correct props', () => {
    const actualBrowserRouter = ReactRouter.BrowserRouter;
    ReactRouter.BrowserRouter = jest.fn(() => <></>);
    renderClientApp();
    expect(ReactRouter.BrowserRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'someData!',
        routes: ['someRoute'],
      },
      {},
    );
    ReactRouter.BrowserRouter = actualBrowserRouter; //  restore the original (non-mocked) implementation
  });

  it('should render App component', () => {
    const { getByText } = renderClientApp();
    expect(getByText('Mocked App component')).toBeInTheDocument();
  });
});

describe('ServerApp', () => {
  it('App should be called with the correct props', () => {
    renderServerApp();
    expect(App).toHaveBeenCalledWith(
      {
        initialData: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
      },
      {},
    );
  });

  it('StaticRouter should be called with the correct props', () => {
    const actualStaticRouter = ReactRouter.StaticRouter;
    ReactRouter.StaticRouter = jest.fn(() => <></>);
    renderServerApp();
    expect(ReactRouter.StaticRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
      },
      {},
    );
    ReactRouter.StaticRouter = actualStaticRouter; //  restore the original (non-mocked) implementation
  });

  it('should render App component', () => {
    const { getByText } = renderServerApp();
    expect(getByText('Mocked App component')).toBeInTheDocument();
  });
});
