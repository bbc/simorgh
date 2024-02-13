import { ReverbClient } from '@bbc/reverb';
import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import { ATI_LOGGING_ERROR } from '../../logger.const';
import 'isomorphic-fetch';

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

const firePageViewEvent = async () => {
  Reverb.initialise().then(async () => {
    Reverb.viewEvent();
  });
};

const sendBeacon = async (url, reverbBeaconConfig) => {
  if (onClient()) {
    try {
      if (reverbBeaconConfig) {
        const {
          params: { page, user },
        } = reverbBeaconConfig;

        await initaliseReverb({ pageVars: page, userVars: user }).then(
          async () => {
            await firePageViewEvent();
          },
        );
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
