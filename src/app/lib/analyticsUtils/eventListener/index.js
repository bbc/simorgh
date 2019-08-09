import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = (frontpageData, platform, statsDestination) => {
  if (onClient()) {
    const nav1 = document.getElementById('nav-/yoruba');

    return nav1.addEventListener('click', e => {
      e.preventDefault();
      FrontPageAtiEventTracker(frontpageData, platform, statsDestination, e);
    });
  }

  return null;
};

export default listener;
