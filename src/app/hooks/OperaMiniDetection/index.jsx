import { useState, useEffect } from 'react';

const OperaMiniDetection = () => {
  const [isOperaMini, setIsOperaMini] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.operamini) {
      setIsOperaMini(true);
    }
  }, []);

  return isOperaMini;
};

export default OperaMiniDetection;
