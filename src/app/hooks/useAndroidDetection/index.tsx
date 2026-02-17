import { useState } from 'react';

const useAndroidDetection = () => {
  const [isAndroid] = useState(() => {
    if (typeof navigator === 'undefined') {
      return false;
    }
    return /(android)/i.test(navigator.userAgent);
  });

  return isAndroid;
};

export default useAndroidDetection;
