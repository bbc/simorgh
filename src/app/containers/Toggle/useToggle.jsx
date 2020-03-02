import { useContext } from 'react';
import isToggleEnabled from './utils/isToggleEnabled';
import { ToggleContext } from '#contexts/ToggleContext';

const useToggle = toggleName => {
  const { toggleState } = useContext(ToggleContext);
  const { enabled } = isToggleEnabled(toggleName, toggleState);
  return { enabled };
};

export default useToggle;
