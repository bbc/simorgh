import { useState, useEffect } from 'react';

const IsOperaMini = () => {
  const [operaMini, setOperaMini] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.operamini) {
      setOperaMini(true);
    }
  }, []);

  return operaMini;
};

export default IsOperaMini;
