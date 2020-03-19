import { useContext } from 'react';
import { ToggleContext } from '#contexts/ToggleContext';

const useToggle = toggleName => {
  const featureToggle = useContext(ToggleContext).toggleState[toggleName];
  const { enabled = null, value } = featureToggle || {};

  if (featureToggle) {
    return {
      ...{ enabled, value },
    };
  }
  return { enabled: null }; // if toggle does not exist then return { enabled: null }
};

export default useToggle;
