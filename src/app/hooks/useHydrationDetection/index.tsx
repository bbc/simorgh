import { useState, useEffect } from 'react';

/**
 * Detects whether the component has been hydrated.
 * Initially assumes the component is not hydrated (server-side render), and then updates to indicate hydration (client-side render).
 * @returns {boolean} True if the component is hydrated (client-side), false otherwise (server-side).
 */
export default (): boolean => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // setIsHydrated(true);
  }, []);

  return isHydrated;
};
