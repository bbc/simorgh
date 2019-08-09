import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = (frontpageData, platform, statsDestination, service) => {
  if (onClient()) {
    const nav1 = document.getElementById(`nav-/${service}`);

    return nav1.addEventListener('click', e => {
      e.preventDefault();
      console.log(e);
      FrontPageAtiEventTracker(
        frontpageData,
        platform,
        statsDestination,
        service,
        e,
      );
    });
  }

  return null;
};

export default listener;
