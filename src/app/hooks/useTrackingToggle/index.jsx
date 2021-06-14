import useToggle from '#hooks/useToggle';

const useTrackingToggle = componentName => {
  // 'enabled' is a boolean toggle for event tracking across all components
  // 'value' is a comma separated string representing the list of components
  // for which event tracking is disabled.
  const { enabled, value } = useToggle('eventTracking');

  const excludedComponents =
    typeof value === 'string' ? value.trim().split(',') : [];

  const isExcluded = excludedComponents.includes(componentName);

  return {
    trackingIsEnabled: enabled === true && !isExcluded,
  };
};

export default useTrackingToggle;
