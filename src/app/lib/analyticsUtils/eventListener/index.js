import onClient from '../../utilities/onClient';
import sendBeacon from '../sendBeacon';

const listener = data => {
  if (onClient()) {
    // grab elements that need listeners - nav section brand story
    // add listeners
    const nav1 = document.getElementById('nav-/igbo');

    nav1.addEventListener('click', e => {
      e.preventDefault();
      sendBeacon('https://logws1363.ati-host.net?clicky-click');
    });
  }

  return data;
};

export default listener;
