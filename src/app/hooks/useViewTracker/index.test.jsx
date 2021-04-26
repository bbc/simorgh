import { renderHook, act } from '@testing-library/react-hooks';
import { useInView } from 'react-intersection-observer';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';
import useViewTracker from '.';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(),
}));

jest.mock('#containers/ATIAnalytics/beacon', () => ({
  sendEventBeacon: jest.fn(),
}));

beforeEach(jest.resetAllMocks);

const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

it('should return a tracking ref', async () => {
  useInView.mockImplementation(() => ({
    inView: false,
    ref: 'mock-ref',
  }));
  const data = { blah: 'foo' };
  const { result } = renderHook(() => useViewTracker(data));

  act(() => {
    useInView({ inView: true, ref: 'mock-ref' });
  });

  expect(result.current.trackRef).toEqual('mock-ref');
});

it('should call sendEventBeacon', async () => {
  const data = { blah: 'foo' };
  useInView.mockImplementation(() => ({
    inView: false,
    ref: 'mock-ref',
  }));
  const { rerender } = renderHook(() => useViewTracker(data));

  await act(async () => {
    useInView.mockImplementation(() => ({
      inView: true,
      ref: 'mock-ref',
    }));
    rerender();
    await wait(1100);
  });

  expect(sendEventBeacon).toBeCalledWith({ blah: 'foo' });
});
