import { useEffect, useState } from 'react';
import { element } from 'prop-types';
import {
  startTimeMachine,
  resetTimeMachine,
} from '../../.storybook/time-machine';
// This affects the global Date object for the storybook application, to ensure consistency in chromaticQA testing.
const WithTimeMachine = ({ children }) => {
  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    function handleStateChange() {
      setComponentToRender(children);
    }
    startTimeMachine();
    handleStateChange();
    return () => resetTimeMachine();
  });
  return componentToRender;
};
WithTimeMachine.propTypes = {
  children: element.isRequired,
};
export default WithTimeMachine;
