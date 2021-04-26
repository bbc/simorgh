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

const REQUIRED_TIME_IN_VIEW = 1000;
const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

it('should return a ref used for tracking if an element is in view', async () => {
  useInView.mockImplementation(() => ({
    inView: false,
    ref: 'mock-ref',
  }));

  const data = { blah: 'foo' };
  const { result } = renderHook(() => useViewTracker(data));

  expect(result.current.trackRef).toEqual('mock-ref');
});

it(`should call sendEventBeacon when is in view for more than ${
  REQUIRED_TIME_IN_VIEW / 1000
} seconds`, async () => {
  useInView.mockImplementation(() => ({
    inView: false,
    ref: 'mock-ref',
  }));

  const data = { blah: 'foo' };
  const { rerender } = renderHook(() => useViewTracker(data));

  await act(async () => {
    useInView.mockImplementation(() => ({
      inView: true,
      ref: 'mock-ref',
    }));
    rerender();
    await wait(REQUIRED_TIME_IN_VIEW + 100);
  });

  expect(sendEventBeacon).toBeCalledWith({ blah: 'foo' });
});
