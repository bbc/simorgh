import { renderHook, act } from '../../react-testing-library-with-providers';
import useScreenGroup, { ScreenGroup } from './useScreenGroup';

describe('useScreenGroup', () => {
  it.each([
    {
      windowSize: 0,
      expectedGroup: ScreenGroup.GROUP_0,
    },
    {
      windowSize: 240,
      expectedGroup: ScreenGroup.GROUP_1_SMALL,
    },
    {
      windowSize: 320,
      expectedGroup: ScreenGroup.GROUP_1_FULL,
    },
    {
      windowSize: 400,
      expectedGroup: ScreenGroup.GROUP_2,
    },
    {
      windowSize: 600,
      expectedGroup: ScreenGroup.GROUP_3,
    },
    {
      windowSize: 900,
      expectedGroup: ScreenGroup.GROUP_4,
    },
    {
      windowSize: 1008,
      expectedGroup: ScreenGroup.GROUP_5,
    },
    {
      windowSize: 1280,
      expectedGroup: ScreenGroup.GROUP_6,
    },
  ])(
    'Should set group size to $expectedGroup when window is $windowSize px large',
    ({ windowSize, expectedGroup }) => {
      const { result } = renderHook(() => useScreenGroup());
      act(() => {
        global.innerWidth = windowSize;
        global.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toBe(expectedGroup);
    },
  );
});
