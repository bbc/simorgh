import React from 'react';
import useToggle from './useToggle';

const ToggleContainer = ({ toggleName, FallbackComponent, children }) => {
  const [enabled] = useToggle(toggleName);

  if (enabled) {
    return children;
  } else if (FallbackComponent) {
    return <FallbackComponent />;
  } else {
    return null;
  }
};

export default ToggleContainer;
