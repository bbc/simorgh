import React from 'react';
import * as reactDom from 'react-dom/client';
import {
  resetWindowValue,
  setWindowValue,
} from '#psammead/psammead-test-helpers/src';
import '#testHelpers/loggerMock';

jest.mock('react-dom/client');

jest.mock('react-router-dom');

jest.mock('./app/legacy/containers/App');

jest.mock('./app/routes', () => [{ path: '/foobar/articles/:id' }]);

jest.mock('@loadable/component', () => {
  const original = jest.requireActual('@loadable/component');
  return {
    ...original,
    __esModule: true,
    default: () => {},
    loadableReady: callback => callback(),
  };
});

jest.mock('./app/routes/utils/fetchPageData/utils/getRouteProps');

const mockRootElement = <div />;
document.getElementById = jest.fn().mockReturnValue(mockRootElement);

const windowLocation = window.location;
const pathname = '/foobar/articles/c0000000001o';
const unknownPathName = '/search?foo=bar';

describe('Client', () => {
  beforeAll(() => {
    setWindowValue('SIMORGH_DATA', { pageData: 'some data', path: pathname });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    resetWindowValue('SIMORGH_DATA', null);
    resetWindowValue('location', windowLocation);
  });

  it('should hydrate client once routes are ready', async () => {
    setWindowValue('location', { pathname });

    await new Promise(resolve => {
      jest.isolateModules(async () => {
        await import('./client');

        expect(reactDom.hydrateRoot).toHaveBeenCalled();
        resolve();
      });
    });
  });

  it('should not hydrate client if no routes match', async () => {
    setWindowValue('location', { pathname: unknownPathName });

    await new Promise(resolve => {
      jest.isolateModules(async () => {
        await import('./client');

        expect(reactDom.hydrateRoot).not.toHaveBeenCalled();
        resolve();
      });
    });
  });
});
