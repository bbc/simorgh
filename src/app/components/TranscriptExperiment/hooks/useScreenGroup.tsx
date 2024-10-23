import { useEffect, useState } from 'react';

// Disabled due to bug in ts lint
// eslint-disable-next-line no-shadow
export enum ScreenGroup {
  GROUP_0 = 0,
  GROUP_1_SMALL = 0.5,
  GROUP_1_FULL = 1,
  GROUP_2 = 2,
  GROUP_3 = 3,
  GROUP_4 = 4,
  GROUP_5 = 5,
  GROUP_6 = 6,
}

const useScreenGroup = () => {
  const [group, setGroup] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 0 && screenWidth < 240) {
        setGroup(ScreenGroup.GROUP_0);
      } else if (screenWidth >= 240 && screenWidth < 320) {
        setGroup(ScreenGroup.GROUP_1_SMALL);
      } else if (screenWidth >= 320 && screenWidth < 400) {
        setGroup(ScreenGroup.GROUP_1_FULL);
      } else if (screenWidth >= 400 && screenWidth < 600) {
        setGroup(ScreenGroup.GROUP_2);
      } else if (screenWidth >= 600 && screenWidth < 900) {
        setGroup(ScreenGroup.GROUP_3);
      } else if (screenWidth >= 900 && screenWidth < 1008) {
        setGroup(ScreenGroup.GROUP_4);
      } else if (screenWidth >= 1008 && screenWidth < 1279) {
        setGroup(ScreenGroup.GROUP_5);
      } else {
        setGroup(ScreenGroup.GROUP_6);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return group;
};

export default useScreenGroup;
