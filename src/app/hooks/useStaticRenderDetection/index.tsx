import { useState, useEffect } from 'react';

export const useStaticRenderDetection = () => {
  const [isStatic, setIsStatic] = useState(true);

  useEffect(() => {
    setIsStatic(false);
  }, []);

  return isStatic;
};

export default useStaticRenderDetection;
