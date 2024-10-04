import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import applyBasicPageHandlers from './applyBasicPageHandlers';

jest.mock('#app/legacy/containers/PageHandlers/withOptimizelyProvider');

describe('applyBasicPageHandlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
