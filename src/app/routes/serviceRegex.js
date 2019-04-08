import services from '../lib/config/services';

const serviceRegex = Object.keys(services)
    .filter(serviceName => serviceName !== 'default')
    .join('|');

export default serviceRegex;
