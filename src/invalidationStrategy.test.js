import {
  objToMilliseconds,
  reloadAfterInactivity,
  resetInactivityTimer,
} from './invalidationStrategy';

describe('objToMilliseconds', () => {
  it('should convert a full object into milliseconds', () => {
    /**
     * (3 * 60 * 60 * 1000) = 10800000
     *    + (4 * 60 * 1000) =   240000
     *         + (5 * 1000) =     5000
     *                      = 11045000
     */
    expect(
      objToMilliseconds({
        hours: 3,
        minutes: 4,
        seconds: 5,
      }),
    ).toEqual(11045000);
  });

  it('should convert a mix and match of object properties', () => {
    expect(
      objToMilliseconds({
        minutes: 2,
        seconds: 27,
      }),
    ).toEqual(147000);
  });
});

const originalSetTimeout = window.setTimeout;

describe('reloadAfterInactivity and resetInactivityTimer', () => {
  beforeEach(() => {
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
    });
    window.location.reload = jest.fn();
  });

  it('should trigger setTimeout after the given time', () => {
    window.setTimeout = jest.fn();
    reloadAfterInactivity({
      hours: 3,
      minutes: 4,
      seconds: 5,
    });
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 11045000);
  });

  it('should have a minimum reload time of 15 seconds to prevent accidental DOS', () => {
    window.setTimeout = jest.fn();
    reloadAfterInactivity({
      seconds: 1, // this should be overridden under the hood
    });
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 15000);
  });

  it('should trigger the reload even in the presence of another error (albeit in a try-catch)', () => {
    /**
     * Complicated test to mentally parse, so here's my attempt to explain:
     * 1. Mocks the `setTimeout` method to run after 1 second.
     * 2. Calls `reloadAfterInactivity`, which triggers the mocked `setTimeout` method.
     * 3. Error is thrown and caught.
     * 4. Using the _original_ `setTimeout` method, waits for _3 seconds_, during which time...
     * 5. ...the `reloadAfterInactivity` function should trigger `window.location.reload`.
     * 6. Finally, after 3 secs, check to see that `window.location.reload` was indeed triggered.
     */
    window.setTimeout = jest.fn(callback => {
      originalSetTimeout(callback, 1000); // 1 second - allows enough time for Error to be thrown
    });
    try {
      reloadAfterInactivity();
      throw new Error("This shouldn't break the reload functionality");
    } catch (e) {
      // silently catch the error
    }
    return new Promise(resolve => {
      originalSetTimeout(() => {
        expect(window.location.reload).toHaveBeenCalled();
        resolve();
      }, 3000); // 3 seconds - so will run after the reloadAfterInactivity has completed
    });
  });

  it('should reset the timer on `resetInactivityTimer`', () => {
    /**
     * Another complicated test to mentally parse; bear with me:
     * 1. Mocks `setTimeout` method to run after 30 seconds (arbitrary, will never get called)
     * 2. Calls `reloadAfterInactivity`, which triggers mocked `setTimeout` with 1 min interval
     * 3. Reset `setTimeout` to trigger immediately
     * 4. Calls `resetInteractivityTimer`, which triggers `reloadAfterInactivity`, which triggers
     * `setTimeout`, which has now been mocked to trigger immediately, but with a 1 min argument
     * 5. Asserts that `setTimeout` was called with 60000 (1 min in milliseconds), as opposed to
     * 30000 (30 seconds) that was originally selected (and even though it was called
     * immediately).
     */
    window.setTimeout = jest.fn(callback => {
      originalSetTimeout(callback, 30000); // 30 seconds - but the callback won't ever be called
    });

    reloadAfterInactivity({
      minutes: 1, // we'll pass what would be 1 minute (but mocked, is 10 seconds)
    });

    // now reset what `setTimeout` means again
    window.setTimeout = jest.fn();

    // call the reset, which should `clearInterval` and then hit `setTimeout` again
    resetInactivityTimer();

    // but this `setTimeout` mock calls the callback _instantly_, so we can check it immediately
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 60000);
  });
});
