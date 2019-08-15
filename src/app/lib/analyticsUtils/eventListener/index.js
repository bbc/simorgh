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

    const nav = document.getElementsByClassName('jvxHgK')[0];

    // eslint-disable-next-line valid-typeof
    if (typeof nav !== undefined) {
      FrontPageAtiEventTracker(data, platform, statsDestination, service);
    }
  }

  return null;
};

export default listener;
