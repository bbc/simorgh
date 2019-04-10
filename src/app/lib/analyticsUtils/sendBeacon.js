import onClient from '../../helpers/onClient';
import nodeLogger from '../../helpers/logger.node';
import 'isomorphic-fetch';

const logger = nodeLogger(__filename);

const sendBeacon = async url => {
  if (onClient()) {
    try {
      await fetch(url, { credentials: 'include' });
    } catch (e) {
      logger.error(e);
    }
  }
};

export default sendBeacon;
