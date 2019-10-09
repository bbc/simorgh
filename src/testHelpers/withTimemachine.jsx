import React, { useEffect } from 'react';
import timemachine from 'timemachine';
import { element } from 'prop-types';

// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimemachine = ({ children }) => {
  // set time, but leave it ticking, so knobs work
  timemachine.config({
    dateString: 'Friday, 9 August 2019 14:04:14',
    timestamp: 1565359454,
    tick: true,
  });
  useEffect(() => {
    // stop the timemachine from ticking, so timestamp displayed is frozen
    timemachine.reset();
    timemachine.config({
      dateString: 'Friday, 9 August 2019 14:04:14',
      timestamp: 1565359454,
      tick: true,
    });
    return () => {
      timemachine.reset();
    };
  }, [children]);
  return <>{children}</>;
};

WithTimemachine.propTypes = {
  children: element.isRequired,
};

export default WithTimemachine;
