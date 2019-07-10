import { useContext } from 'react';
import isToggleEnabled from './toggleUtils';
import { ToggleContext } from '../../contexts/ToggleContext';

// This is temporary until we are fetching toggles from a remote endpoint
const envMapping = {
  local: 'test',
  test: 'test',
  stage: 'live',
  live: 'live',
};

const useToggle = (toggleName, env) => {
  const { toggleState } = useContext(ToggleContext);
  const toggleEnv = envMapping[env];
  const { enabled } = isToggleEnabled(toggleName, toggleState[toggleEnv]); // hard coded to test for now, env should be passed in from the request context

  return enabled;
};

export default useToggle;
