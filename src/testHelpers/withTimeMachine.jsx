import { useEffect, useState } from 'react';
import { element, number, string } from 'prop-types';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimeMachine = ({ children, dateString, timestamp }) => {
  const [componentToRender, setComponentToRender] = useState(null);

  // This effect will start the time-machine, render the component, then reset the time-machine after the component has been rendered.
  useEffect(() => {
    startTimeMachine({ dateString, timestamp });
    setComponentToRender(children);
    return resetTimeMachine;
  }, [children, dateString, timestamp]);
  return componentToRender;
};
WithTimeMachine.propTypes = {
  children: element.isRequired,
  dateString: string,
  timestamp: number,
};

export default WithTimeMachine;
