import { renderHook } from '@testing-library/react-hooks';
import useScrollDepth from '.';

describe.only('useScrollDepth', () => {
  const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
  const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
  const optimizelyMock = jest.fn();

  it('should call add event listener with scroll', () => {
    renderHook(() => useScrollDepth(optimizelyMock));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );
  });

  it('should call remove event listener with scroll', () => {
    renderHook(() => useScrollDepth(optimizelyMock));

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    );
  });
});
