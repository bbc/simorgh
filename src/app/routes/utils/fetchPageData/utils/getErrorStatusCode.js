import onClient from '#lib/utilities/onClient';
import { BAD_GATEWAY, INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';

export default () => {
  return onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR;
};
