import useHydrationDetection from '#app/hooks/useHydrationDetection';

const useAndroidDetection = () => {
  const isHydrated = useHydrationDetection();

  return isHydrated && /(android)/i.test(navigator.userAgent);
};

export default useAndroidDetection;
