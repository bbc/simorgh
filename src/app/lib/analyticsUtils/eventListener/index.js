import onClient from '../../utilities/onClient';
import FrontPageAtiEventTracker from '../../../containers/ATIAnalytics/event/frontpage';

const listener = () => {
  if (onClient()) {
    const nav1 = document.getElementById('nav-/yoruba');

    return nav1.addEventListener('click', e => {
      e.preventDefault();
      FrontPageAtiEventTracker(e);
    });
  }

  return 'something';
};

export default listener;
