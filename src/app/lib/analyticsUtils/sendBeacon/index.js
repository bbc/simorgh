import { ReverbClient } from '@bbc/reverb';
import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import { ATI_LOGGING_ERROR } from '../../logger.const';
import 'isomorphic-fetch';

const logger = nodeLogger(__filename);

const sendBeacon = async (url, useReverb) => {
  if (onClient()) {
    try {
      if (useReverb) {
        const pageVars = url.page;
        const userVars = url.user;

        const Reverb = new ReverbClient({
          getPageVariables: () => Promise.resolve(pageVars),
          getUserVariables: () => Promise.resolve(userVars),
        });

        Reverb.initialise().then(async () => {
          Reverb.viewEvent();
        });
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
