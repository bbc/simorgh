import { ReverbClient } from '@bbc/reverb';
import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import { ATI_LOGGING_ERROR } from '../../logger.const';
import 'isomorphic-fetch';

const logger = nodeLogger(__filename);

const reverbPageViews = config => {
  const pageVars = config.page;
  const userVars = config.user;

  const Reverb = new ReverbClient({
    getPageVariables: () => Promise.resolve(pageVars),
    getUserVariables: () => Promise.resolve(userVars),
  });

  Reverb.initialise().then(async () => {
    Reverb.viewEvent();
  });
};

const reverbLinkClick = config => {
  ReverbClient.userActionEvent(
    'click',
    'Top Stories Link',
    config,
    {},
    {},
    true,
  );
};

const reverbHandlers = {
  pageView: reverbPageViews,
  linkClick: reverbLinkClick,
};

const sendBeacon = async (url, reverbBeaconConfig) => {
  if (onClient()) {
    try {
      if (reverbBeaconConfig) {
        const { params, eventName } = reverbBeaconConfig;

        reverbHandlers[eventName](params);
      } else {
        await fetch(url, { credentials: 'include' }).then(res => res.text());
      }
    } catch (error) {
      logger.error(ATI_LOGGING_ERROR, {
        error,
      });
    }
  }
};

export default sendBeacon;
