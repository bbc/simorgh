import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = (frontpageData, platform, statsDestination, service) => {
  if (onClient()) {
    const navItems = document.getElementByClassName('track-nav');

    navItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();

        FrontPageAtiEventTracker(
          frontpageData,
          platform,
          statsDestination,
          service,
          e,
        );
      });
    });
  }

  return null;
};

export default listener;
