import React from 'react';
import * as reactDom from 'react-dom';
import { ClientApp } from './app/containers/App';
import routes from './app/routes';
import { resetWindowValue, setWindowValue } from './testHelpers';

jest.mock('react-dom');

jest.mock('react-router-dom');

jest.mock('./app/containers/App');

jest.mock('./app/routes', () => ({
  default: [],
}));

jest.mock('./app/routes/getInitialData/utils/getRouteProps');

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

const windowLocation = window.location;
const pathname = '/foobar/articles/c0000000001o';

describe('Client', () => {
  beforeAll(() => {
    setWindowValue('SIMORGH_DATA', 'someData');
    setWindowValue('location', { pathname });
  });

  afterAll(() => {
    resetWindowValue('SIMORGH_DATA', null);
    resetWindowValue('location', windowLocation);
  });

  it('should hydrate client once routes are ready', async () => {
    await import('./client');

    expect(reactDom.hydrate).toHaveBeenCalledWith(
      <ClientApp routes={routes} data={window.SIMORGH_DATA} />,
      mockRootElement,
    );
  });
});
