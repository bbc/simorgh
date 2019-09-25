/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { ClientApp, ServerApp } from '.';
// eslint-disable-next-line import/no-named-as-default
import App from './App';

jest.mock('./App', () => jest.fn(() => <div />));

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
    expect(BrowserRouter.mock.calls[0][0].children).not.toBeInstanceOf(Array);
    // eslint-disable-next-line no-underscore-dangle
    expect(BrowserRouter.mock.calls[0][0].children._owner.type.name).toEqual(
      'ClientApp',
    );
  });
});

describe('ServerApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
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
});
