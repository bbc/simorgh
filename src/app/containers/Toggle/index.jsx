import React from 'react';
import { string, element } from 'prop-types';
import useToggle from './useToggle';

const ToggleContainer = ({ toggleName, FallbackComponent, children }) => {
  const { enabled } = useToggle(toggleName);

  if (enabled) {
    return children;
  }

  if (FallbackComponent) {
    return <FallbackComponent />;
  }

  return null;
};

ToggleContainer.propTypes = {
  toggleName: string.isRequired,
  FallbackComponent: element,
  children: element.isRequired,
};

ToggleContainer.defaultProps = {
  FallbackComponent: null,
};

export default ToggleContainer;
