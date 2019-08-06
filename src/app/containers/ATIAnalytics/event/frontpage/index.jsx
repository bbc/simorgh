import listener from '../../../../lib/analyticsUtils/eventListener';

const FrontPageAtiEventTracker = frontpageData => {
  return listener(frontpageData);
};

export default FrontPageAtiEventTracker;
