// Create a mock function to pass in as a callback
// Spy on mock callback
// Call initObserver with threshold set to 0 and 
// componentViewStateSetter set to the mock callback

// Bring an element into view
// Expect mock callback to have been called with true

import initObserver from '.';

describe('getIntersectionObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an IntersectionObserver instance with the specified threshold', async () => {
    const mockCallback = jest.fn(); // Mock function to track calls

    // Mock IntersectionObserver
    const observe = jest.fn();
    const disconnect = jest.fn();
    // eslint-disable-next-line func-names, @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = jest.fn(function (this: any) {
      this.observe = observe;
      this.disconnect = disconnect;
    });

    const threshold = 0.75;

    await initObserver({
      threshold,
      componentViewStateSetter: mockCallback,
    });

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: [threshold] },
    );
  });
});
