import { IncomingHttpHeaders } from 'http';

const extractHeaders = (reqHeaders: IncomingHttpHeaders) => ({
  isUK: reqHeaders['x-bbc-edge-isuk']
    ? reqHeaders['x-bbc-edge-isuk'] === 'yes'
    : null,
});

export default extractHeaders;
