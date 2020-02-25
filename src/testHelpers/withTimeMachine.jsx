import React, { useEffect } from 'react';
import { element } from 'prop-types';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimeMachine = ({ children }) => {
  // set time, but leave it ticking, so knobs work
  // startTimeMachine(false);
  // setting tick to false, prevents the timemachine from ticking,
  // so the timestamp displayed is frozen, and there are no side effects.
  useEffect(() => {
    // resetTimeMachine();
    startTimeMachine(true);
    return resetTimeMachine();
  });
  return <>{children}</>;
};
WithTimeMachine.propTypes = {
  children: element.isRequired,
};
export default WithTimeMachine;
