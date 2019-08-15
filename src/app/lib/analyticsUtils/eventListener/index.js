import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = (data, platform, statsDestination, service) => {
  if (onClient()) {
    const navItems = document.getElementsByClassName('track-nav');
    const brandItems = document.getElementsByClassName('track-brand');

    const trackedItems = [navItems, brandItems];

    trackedItems.forEach(component => {
      component.forEach(item => {
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

      // eslint-disable-next-line valid-typeof
      if (typeof component !== undefined) {
        FrontPageAtiEventTracker(
          data,
          platform,
          statsDestination,
          service,
          '',
          component,
        );
      }
    });
  }

  return null;
};

export default listener;
