import { getEnvConfig } from '../getEnvConfig';

export default () => getEnvConfig().SIMORGH_APP_ENV === 'local';
