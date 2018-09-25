const isServer = () => !!(typeof process !== 'undefined' && process.versions);

export default isServer;
