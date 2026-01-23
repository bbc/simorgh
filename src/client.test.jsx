import * as reactDom from 'react-dom/client';
import '#testHelpers/loggerMock';

jest.mock('react-dom/client');

const reactDomClientHydrateRootSpy = jest.spyOn(reactDom, 'hydrateRoot');

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
  beforeEach(() => {
    Object.defineProperty(window, 'SIMORGH_DATA', {
      writable: true,
      value: {
        pageData: 'some data',
        path: pathname,
      },
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete window.SIMORGH_DATA;
  });

  it('should hydrate client once routes are ready', async () => {
    jest
      .spyOn(window.location, 'pathname', 'get')
      .mockImplementation(() => pathname);

    await import('./client');

    expect(reactDomClientHydrateRootSpy).toHaveBeenCalled();
  });

  it('should not hydrate client if no routes match', async () => {
    jest
      .spyOn(window.location, 'pathname', 'get')
      .mockImplementation(() => unknownPathName);

    await import('./client');
    expect(reactDomClientHydrateRootSpy).not.toHaveBeenCalled();
  });
});
