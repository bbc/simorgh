import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = (data, platform, statsDestination, service) => {
  if (onClient()) {
    const navItems = document.getElementsByClassName('track-nav');

    navItems.forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        FrontPageAtiEventTracker(
          data,
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
