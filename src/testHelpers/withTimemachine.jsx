import React, { useEffect } from 'react';
import { element } from 'prop-types';
import { start, reset } from '../../.storybook/time-machine';

// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimemachine = ({ children }) => {
  // set time, but leave it ticking, so knobs work
  start();
  useEffect(() => {
    reset();
    // stop the timemachine from ticking, so timestamp displayed is frozen
    return () => {
      reset();
    };
  });
  return <>{children}</>;
};

WithTimemachine.propTypes = {
  children: element.isRequired,
};

export default WithTimemachine;
