import { useEffect, useRef } from 'react';

const useClickTracking = () => {
  const clickRef = useRef(null);

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked!');
  };

  useEffect(() => {
    const trackedComponent = clickRef.current;

    trackedComponent?.addEventListener('click', handleClick);
    return () => trackedComponent?.removeEventListener('click', handleClick);
  }, []);

  return clickRef;
};

export default useClickTracking;
