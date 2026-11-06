import { ATI_LOGGING_ERROR } from '../../../../lib/logger.const';
import { ResonanceEventModel } from '../types';

const mockOnClient = jest.fn();
const mockLoggerError = jest.fn();

jest.mock('#app/lib/utilities/onClient', () => ({
  __esModule: true,
  default: () => mockOnClient(),
}));
jest.mock('../../../../lib/logger.node', () => ({
  __esModule: true,
  default: () => ({ error: mockLoggerError }),
}));

const buildEvent = (subcategory: string) =>
  ({ event: { subcategory } }) as ResonanceEventModel;

const getDispatchedEvents = (dispatchEventSpy: jest.SpyInstance) =>
  dispatchEventSpy.mock.calls.map(([event]) => event.detail);

describe('dispatchResonanceEvent', () => {
  let dispatchEventSpy: jest.SpyInstance;
  let dispatchResonanceEvent: typeof import('.').default;
  let markResonanceReady: typeof import('.').markResonanceReady;

  beforeEach(async () => {
    // The queue and ready state are held at module level, so load a fresh copy for each test
    jest.resetModules();
    ({ default: dispatchResonanceEvent, markResonanceReady } =
      await import('.'));

    mockOnClient.mockReturnValue(true);
    dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should not dispatch an event when not on client', () => {
    mockOnClient.mockReturnValue(false);

    dispatchResonanceEvent(buildEvent('one'));
    markResonanceReady();
    dispatchResonanceEvent(buildEvent('two'));

    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch an event before Resonance is ready', () => {
    dispatchResonanceEvent(buildEvent('one'));

    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('should dispatch queued events in order once Resonance is ready', () => {
    const first = buildEvent('one');
    const second = buildEvent('two');

    dispatchResonanceEvent(first);
    dispatchResonanceEvent(second);
    markResonanceReady();

    expect(getDispatchedEvents(dispatchEventSpy)).toEqual([first, second]);
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'viewability' }),
    );
  });

  it('should only dispatch queued events once if Resonance is marked as ready again', () => {
    dispatchResonanceEvent(buildEvent('one'));

    markResonanceReady();
    markResonanceReady();

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch a viewability CustomEvent immediately once Resonance is ready', () => {
    const detail = buildEvent('one');

    markResonanceReady();
    dispatchResonanceEvent(detail);

    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'viewability', detail }),
    );
  });

  it('should stop queueing once the queue is full, keeping the earliest events', () => {
    const events = Array.from({ length: 51 }, (_, index) =>
      buildEvent(`event-${index}`),
    );

    events.forEach(event => dispatchResonanceEvent(event));
    markResonanceReady();

    expect(getDispatchedEvents(dispatchEventSpy)).toEqual(events.slice(0, 50));
  });

  it('should log an error and keep dispatching when an event fails', () => {
    const error = new Error('dispatch failed');
    const second = buildEvent('two');

    dispatchEventSpy.mockImplementationOnce(() => {
      throw error;
    });

    dispatchResonanceEvent(buildEvent('one'));
    dispatchResonanceEvent(second);
    markResonanceReady();

    expect(mockLoggerError).toHaveBeenCalledWith(ATI_LOGGING_ERROR, { error });
    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
    expect(dispatchEventSpy.mock.calls[1][0].detail).toEqual(second);
  });
});
