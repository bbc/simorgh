import { BAD_GATEWAY, INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';
import onClient from '#lib/utilities/onClient';

export default () => (onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR);
