import useHydrationDetection from '#app/hooks/useHydrationDetection';

const useOperaMiniDetection = () => {
  const isHydrated = useHydrationDetection();

  return isHydrated && Boolean(window.operamini);
};

export default useOperaMiniDetection;
