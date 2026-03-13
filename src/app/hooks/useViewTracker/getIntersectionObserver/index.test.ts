import initObserver from '.';

describe('getIntersectionObserver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an IntersectionObserver instance with the specified threshold', async () => {
    const mockCallback = jest.fn();

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
