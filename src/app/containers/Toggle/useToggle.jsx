import { useContext } from 'react';
import { ToggleContext } from '#contexts/ToggleContext';

const useToggle = toggleName => {
  const featureToggleObject = useContext(ToggleContext).toggleState[toggleName];
  return featureToggleObject;
};

export default useToggle;
