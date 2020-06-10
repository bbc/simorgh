import onClient from '#lib/utilities/onClient';

const BAD_GATEWAY = 502;
const INTERNAL_SERVER_ERROR = 500;

export default () => (onClient() ? BAD_GATEWAY : INTERNAL_SERVER_ERROR);
