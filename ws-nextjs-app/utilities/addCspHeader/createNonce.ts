import getUUID from '#app/lib/utilities/getUUID';

const createNonce = () => Buffer.from(getUUID()).toString('base64');

export default createNonce;
