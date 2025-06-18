import * as pipe from 'ramda/src/pipe';
import WithContexts from '#app/legacy/containers/PageHandlers/withContexts';
import applyBasicPageHandlers from './applyBasicPageHandlers';

jest.mock('ramda/src/pipe', () => {
  const originalModule = jest.requireActual('ramda/src/pipe');

  return {
    __esModule: true,
    ...originalModule,
    default: originalModule,
  };
});

describe('applyBasicPageHandlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should call pipe with function as the argument before the withContexts argument when passed via handlerBeforeContexts', () => {
    const component = jest.fn();
    const mockBeforeContextsFunction = jest.fn();
    const pipeMock = jest.spyOn(pipe, 'default');

    applyBasicPageHandlers(component, {
      handlerBeforeContexts: mockBeforeContextsFunction,
    });

    const args = pipeMock.mock.calls[0];
    const beforeContextsFunctionArg = args[3];
    const WithContextsFunctionArg = args[4];

    expect(beforeContextsFunctionArg).toEqual(mockBeforeContextsFunction);
    expect(WithContextsFunctionArg).toEqual(WithContexts);
    expect(mockBeforeContextsFunction).toHaveBeenCalledTimes(1);
  });
});
