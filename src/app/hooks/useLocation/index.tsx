import { useEffect, useState } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    search: '',
  } as Location);

  const listener = () => {
    setLocation(window.location);
  };

  useEffect(() => {
    setLocation(window.location);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.addEventListener('popstate', listener);
    return () => {
      window.removeEventListener('popstate', listener);
    };
  }, []);

  return location;
};

export default useLocation;
