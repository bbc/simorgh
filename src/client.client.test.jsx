import React from 'react';
import * as reactDom from 'react-dom/client';
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

const pathname = '/foobar/articles/c0000000001o';
const unknownPathName = '/search?foo=bar';

describe('Client', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'SIMORGH_DATA', {
      pageData: 'some data',
      path: pathname,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    delete window.SIMORGH_DATA;
  });

  it('should hydrate client once routes are ready', async () => {
    jest
      .spyOn(window.location, 'pathname', 'get')
      .mockImplementation(() => pathname);

    await new Promise(resolve => {
      jest.isolateModules(async () => {
        await import('./client');

        expect(reactDom.hydrateRoot).toHaveBeenCalled();
        resolve();
      });
    });
  });

  it('should not hydrate client if no routes match', async () => {
    jest
      .spyOn(window.location, 'pathname', 'get')
      .mockImplementation(() => unknownPathName);

    await new Promise(resolve => {
      jest.isolateModules(async () => {
        await import('./client');

        expect(reactDom.hydrateRoot).not.toHaveBeenCalled();
        resolve();
      });
    });
  });
});
