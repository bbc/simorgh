import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { ClientApp, ServerApp } from '.';
import * as App from './App';

jest.mock('./App', () => jest.fn(() => <div>I am the App component</div>));

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
    const { getByText } = render(
      <div>I am inside the ClientApp component</div>,
    );
    expect(
      getByText('I am inside the ClientApp component'),
    ).toBeInTheDocument();
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
    const { getByText } = render(
      <div>I am inside the ServerApp component</div>,
    );
    expect(
      getByText('I am inside the ServerApp component'),
    ).toBeInTheDocument();
  });
});
