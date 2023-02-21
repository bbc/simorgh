import { useEffect, useState } from 'react';

/**
 * useScript is a custom hook that appends a non-blocking script element
 * to the head if it doesn't already exist and removes it in clean-up.
 * @param {string} src The URL of the script to be appended.
 */
const useScript = src => {
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const hasScript = !!document.querySelector(`head script[src="${src}"]`);

    if (src && !hasScript) {
      const script = document.createElement('script');
      script.onload = () => {
        setIsLoaded(true);
      };
      script.src = src;
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [src]);

  return isLoaded;
};

export default useScript;
