import onClient from '../../utilities/onClient';
import nodeLogger from '#lib/logger.node';
import { ANALYTICS_BEACON_ERROR } from '#lib/logger.const';
import 'isomorphic-fetch';

const logger = nodeLogger(__filename);

const sendBeacon = async url => {
  if (onClient()) {
    try {
      await fetch(url, { credentials: 'include' });
    } catch (error) {
      logger.error(ANALYTICS_BEACON_ERROR, { error });
    }
  }
};

export default sendBeacon;
