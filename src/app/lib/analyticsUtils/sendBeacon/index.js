import onClient from '../../utilities/onClient';
import nodeLogger from '../../logger.node';
import 'isomorphic-fetch';

const logger = nodeLogger(__filename);

const sendBeacon = async url => {
  if (onClient()) {
    try {
      await fetch(url, { credentials: 'include' }).then(res => res.text());
    } catch (e) {
      logger.error(e);
    }
  }
};

export default sendBeacon;
