import { useEffect, useRef } from 'react';

const useClickTracking = () => {
  const clickRef = useRef(null);

  // Create click type utility and ignore double click if click is unmodified double click etc
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked!');
  };

  useEffect(() => {
    const trackedComponent = clickRef.current;
    trackedComponent?.addEventListener('click', handleClick); // Does 'click' cover enter keypress all the time?

    return () => trackedComponent?.removeEventListener('click', handleClick);
  }, []);

  return clickRef;
};

export default useClickTracking;
