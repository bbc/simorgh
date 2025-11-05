import { useState, useEffect } from 'react';

const useOperaMiniDetection = () => {
  const [isOperaMini, setIsOperaMini] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.operamini) {
      (async () => setIsOperaMini(true))();
    }
  }, []);

  return isOperaMini;
};

export default useOperaMiniDetection;
