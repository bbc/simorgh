import { useContext } from 'react';
import { ToggleContext } from '#contexts/ToggleContext';

const useToggle = toggleName => {
  const featureToggleObject = useContext(ToggleContext).toggleState[toggleName];

  if (featureToggleObject) {
    return featureToggleObject;
  }
  return { enabled: null }; // if toggle does not exist then return { enabled: null }
};

export default useToggle;
