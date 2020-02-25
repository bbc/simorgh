import React, { useEffect } from 'react';
import { element } from 'prop-types';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimeMachine = ({ children }) => {
  useEffect(() => {
    startTimeMachine(true);
    return resetTimeMachine();
  });
  return <>{children}</>;
};
WithTimeMachine.propTypes = {
  children: element.isRequired,
};
export default WithTimeMachine;
