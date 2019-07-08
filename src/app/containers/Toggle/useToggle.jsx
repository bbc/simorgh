import { useContext } from 'react';
import { isToggleEnabled } from './toggleUtils';
import { ToggleContext } from '../../contexts/ToggleContext';

const useToggle = toggleName => {
  const { toggleState } = useContext(ToggleContext);
  const { enabled } = isToggleEnabled(toggleName, toggleState.test); //hard coded to test for now, env should be passed in from the request context

  return [enabled];
};

export default useToggle;
