import { useState } from 'react';

const useOperaMiniDetection = () => {
  const [isOperaMini] = useState(() => {
    if (typeof window !== 'undefined' && window.operamini) {
      return true;
    }
    return false;
  });

  return isOperaMini;
};

export default useOperaMiniDetection;
