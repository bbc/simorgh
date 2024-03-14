import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import { ATI_LOGGING_ERROR } from '../../logger.const';
import 'isomorphic-fetch';

const { ReverbClient } = require('@bbc/reverb');

const logger = nodeLogger(__filename);

let Reverb;

const initaliseReverb = async ({ pageVars, userVars }) => {
  if (!Reverb) {
    Reverb = new ReverbClient({
      getPageVariables: () => Promise.resolve(pageVars),
      getUserVariables: () => Promise.resolve(userVars),
    });
  } else {
    Reverb.getPageVariables = () => Promise.resolve(pageVars);
    Reverb.getUserVariables = () => Promise.resolve(userVars);
  }
};

const reverbPageViews = async () => {
  await Reverb.initialise();
  await Reverb.viewEvent();
};

const reverbLinkClick = async () => {
  const config = {};

  await Reverb.userActionEvent(
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
  sectionView: reverbPageViews,
  sectionClick: reverbLinkClick,
};

const sendBeacon = async (url, reverbBeaconConfig) => {
  if (onClient()) {
    try {
      if (reverbBeaconConfig) {
        const {
          params: { page, user },
          eventName,
        } = reverbBeaconConfig;

        await initaliseReverb({ pageVars: page, userVars: user });

        await reverbHandlers[eventName]();
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
