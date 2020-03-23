import { useContext } from 'react';
import isToggleEnabled from './utils/isToggleEnabled';
import { RequestContext } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

// This is temporary until we are fetching toggles from a remote endpoint
const envMapping = {
  local: 'local',
  test: 'test',
  stage: 'test',
  live: 'live',
};

const useToggle = (toggleName) => {
  const { env } = useContext(RequestContext);
  const { toggleState } = useContext(ToggleContext);

  const toggleEnv = envMapping[env];
  const { enabled } = isToggleEnabled(toggleName, toggleState[toggleEnv]);
  return { enabled };
};

export default useToggle;
