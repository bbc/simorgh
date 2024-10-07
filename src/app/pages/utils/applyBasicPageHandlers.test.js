import * as pipe from 'ramda/src/pipe';
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

  it('should call pipe with function as the last argument when passed via lastFunction', () => {
    const component = jest.fn();
    const mockLastFunction = jest.fn();
    const pipeMock = jest.spyOn(pipe, 'default');

    applyBasicPageHandlers(component, { lastHandler: mockLastFunction });

    const args = pipeMock.mock.calls[0];
    const lastArg = args[args.length - 1];

    expect(lastArg).toEqual(mockLastFunction);
    expect(mockLastFunction).toHaveBeenCalledTimes(1);
  });
});
