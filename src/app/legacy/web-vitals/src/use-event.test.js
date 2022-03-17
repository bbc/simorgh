import { renderHook } from '@testing-library/react-hooks';
import useEvent from './use-event';

let eventMap = {};

const mockEventListener = mockedEvent => {
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;
  window.addEventListener = jest.fn((event, cb) => {
    if (event !== mockedEvent) {
      originalAddEventListener(event, cb);
    } else {
      eventMap[event] = cb;
    }
  });
  window.removeEventListener = jest.fn((event, cb) => {
    if (event !== mockedEvent) {
      originalRemoveEventListener(event, cb);
    } else {
      delete eventMap[event];
    }
  });
};

describe('useEvent', () => {
  afterEach(() => {
    eventMap = {};
  });

  it('should add an event listener for the given event', () => {
    const callback = () => {};
    mockEventListener('message');

    renderHook(() => useEvent('message', callback));

    expect(eventMap).toHaveProperty('message');
  });

  it('should call the given callback function when the given event is triggered', () => {
    const callback = jest.fn(() => {});
    mockEventListener('message');

    renderHook(() => useEvent('message', callback));

    eventMap.message();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should remove the event listener when the page is unmounted', () => {
    const callback = () => {};
    mockEventListener('message');

    const { unmount } = renderHook(() => useEvent('message', callback));

    expect(eventMap).toHaveProperty('message');

    unmount();

    expect(eventMap).not.toHaveProperty('message');
  });
});
