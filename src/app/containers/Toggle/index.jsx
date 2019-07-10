import React, { useContext } from 'react';
import { RequestContext } from '../../contexts/RequestContext';
import useToggle from './useToggle';

const ToggleContainer = ({ toggleName, FallbackComponent, children }) => {
  const { env } = useContext(RequestContext);
  const [enabled] = useToggle(toggleName, env);

  if (enabled) {
    return children;
  } else if (FallbackComponent) {
    return <FallbackComponent />;
  } else {
    return null;
  }
};

export default ToggleContainer;
