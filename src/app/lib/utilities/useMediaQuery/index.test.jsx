import { renderHook, cleanup } from '@testing-library/react-hooks';
import useMediaQuery from '.';

describe('useMediaQuery', () => {
  const mockAddListener = jest.fn();
  const mockRemoveListener = jest.fn();

  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches: query === '(max-width: 600px)',
      addListener: mockAddListener,
      removeListener: mockRemoveListener,
    };
  });

  beforeEach(() => {
    mockAddListener.mockReset();
    mockRemoveListener.mockReset();
  });

  it('should run handler straight away', () => {
    const testFn = jest.fn();
    renderHook(() => useMediaQuery('(max-width: 600px)', testFn));
    expect(testFn.mock.calls.length).toBe(1);
  });

  it('should set up the handler as a listener', () => {
    const testFn = jest.fn();
    renderHook(() => useMediaQuery('(max-width: 600px)', testFn));
    expect(mockAddListener.mock.calls.length).toBe(1);

    mockAddListener.mock.calls[0][0]();
    expect(testFn.mock.calls.length).toEqual(2);
  });

  it('should call removeListener on cleanup', () => {
    const testFn = jest.fn();
    renderHook(() => useMediaQuery('(max-width: 600px)', testFn));
    cleanup().then(() => {
      expect(mockRemoveListener.mock.calls.length).toEqual(1);
      expect(mockRemoveListener.mock.calls[0][0]).toEqual(testFn);
    });
  });
});
