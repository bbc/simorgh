import defaultToggles from '#lib/config/toggles';
import constructTogglesEndpoint from '#contexts/ToggleContext/utils/constructTogglesEndpoint';
import nodeLogger from '#lib/logger.node';
import {
  CONFIG_REQUEST_RECEIVED,
  CONFIG_FETCH_ERROR,
  CONFIG_ERROR,
} from '#lib/logger.const';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const logger = nodeLogger(__filename);

const getToggles = async (service, cache) => {
  const environment = process.env.SIMORGH_APP_ENV || 'local';
  const localToggles = defaultToggles[environment];
  debugger;
  return localToggles;
};

export default getToggles;
