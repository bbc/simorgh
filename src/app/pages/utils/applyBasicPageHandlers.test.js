import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
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

jest.mock('#app/legacy/containers/PageHandlers/withOptimizelyProvider');

describe('applyBasicPageHandlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should have called the withOptimizelyProvider function if applyOptimizely is true', () => {
    const component = jest.fn();
    const applyOptimizely = true;

    applyBasicPageHandlers(component, { applyOptimizely });

    expect(withOptimizelyProvider).toHaveBeenCalled();
  });

  it('should not call the withOptimizelyProvider function if applyOptimizely is false', () => {
    const component = jest.fn();
    const applyOptimizely = false;

    applyBasicPageHandlers(component, { applyOptimizely });

    expect(withOptimizelyProvider).not.toHaveBeenCalled();
  });

  it('should not call the withOptimizelyProvider function if applyOptimizely is not provided', () => {
    const component = jest.fn();

    applyBasicPageHandlers(component);

    expect(withOptimizelyProvider).not.toHaveBeenCalled();
  });

  it('should call pipe with withOptimizelyProvider as the last argument if applyOptimizely is true', () => {
    const component = jest.fn();
    const applyOptimizely = true;
    const pipeMock = jest.spyOn(pipe, 'default');

    applyBasicPageHandlers(component, { applyOptimizely });

    const args = pipeMock.mock.calls[0];
    const lastArg = args[args.length - 1];

    expect(lastArg).toEqual(withOptimizelyProvider);
    expect(withOptimizelyProvider).toHaveBeenCalledTimes(1);
  });
});
