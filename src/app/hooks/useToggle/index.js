import { useContext } from 'react';
import { ToggleContext } from '#contexts/ToggleContext';

const useToggle = toggleName => {
  const featureToggle = useContext(ToggleContext).toggleState[toggleName];
  const { enabled = false, value } = featureToggle || {};

  if (featureToggle) {
    return {
      ...{ enabled, value },
    };
  }
  return { enabled: false }; // if toggle does not exist then return { enabled: false }
};

export default useToggle;
