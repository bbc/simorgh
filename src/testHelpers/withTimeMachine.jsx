import { useEffect, useState } from 'react';
import { element } from 'prop-types';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimeMachine = ({ children }) => {
  const [componentToRender, setComponentToRender] = useState(null);

  // This effect will start the time-machine, render the component, then reset the time-machine after the component has been rendered.
  useEffect(() => {
    startTimeMachine();
    setComponentToRender(children);
    return resetTimeMachine;
  }, [children]);
  return componentToRender;
};
WithTimeMachine.propTypes = {
  children: element.isRequired,
};
export default WithTimeMachine;
