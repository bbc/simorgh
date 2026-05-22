import { useEffect, useState } from 'react';

const useAndroidDetection = () => {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const testUserDevice = /(android)/i.test(navigator.userAgent);
    setIsAndroid(testUserDevice);
  }, []);

  return isAndroid;
};

export default useAndroidDetection;
