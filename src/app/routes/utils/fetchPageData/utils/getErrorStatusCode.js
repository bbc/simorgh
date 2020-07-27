import onClient from '#lib/utilities/onClient';
import { BAD_GATEWAY, INTERNAL_SERVER_ERROR } from './statusCodes';

export default () => {
  return onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR;
};
