import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as ReactDOMRouter from 'react-router-dom';
import { ClientApp, ServerApp } from '.';
import * as App from './App';

jest.mock('./App', () => jest.fn(() => <>Mocked App component</>));

jest.mock('react-router-dom', () => {
  const reactRouterDOM = jest.requireActual('react-router-dom');
  return {
    ...reactRouterDOM,
    StaticRouter: jest.fn(({ children }) => <>{children}</>),
    BrowserRouter: jest.fn(({ children }) => <>{children}</>),
  };
});

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('App should be called with the correct props', () => {
    renderClientApp();
    expect(App).toHaveBeenCalledWith(
      { initialData: 'someData!', routes: ['someRoute'] },
      {},
    );
  });

  it('should render App component', () => {
    const { getByText } = renderClientApp();
    expect(getByText('Mocked App component')).toBeInTheDocument();
  });

  it('BrowserRouter should be called with the correct props', () => {
    renderClientApp();
    expect(ReactDOMRouter.BrowserRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'someData!',
        routes: ['someRoute'],
      },
      {},
    );
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
    renderServerApp();
    expect(ReactDOMRouter.StaticRouter).toHaveBeenCalledWith(
      {
        children: expect.anything(),
        data: 'somePassedData',
        routes: ['someRoute'],
        bbcOrigin: 'https://www.bbc.com',
      },
      {},
    );
  });

  it('should render App component', () => {
    const { getByText } = renderServerApp();
    expect(getByText('Mocked App component')).toBeInTheDocument();
  });
});
