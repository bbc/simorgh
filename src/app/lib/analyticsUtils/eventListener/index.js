import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = (frontpageData, platform, statsDestination, service) => {
  if (onClient()) {
    const navItems = document.getElementsByClassName('track-nav');

    navItems.forEach(item => {
      item.addEventListener('click', event => {
        FrontPageAtiEventTracker(
          frontpageData,
          platform,
          statsDestination,
          service,
          event,
        );
      });
    });
  }

  return null;
};

export default listener;
