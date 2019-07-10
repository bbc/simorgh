import React, { useContext } from 'react';
import { string, element } from 'prop-types';
import { RequestContext } from '../../contexts/RequestContext';
import useToggle from './useToggle';

const ToggleContainer = ({ toggleName, FallbackComponent, children }) => {
  const { env } = useContext(RequestContext);
  const [enabled] = useToggle(toggleName, env);

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
