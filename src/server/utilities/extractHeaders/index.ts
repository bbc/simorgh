import { IncomingHttpHeaders } from 'http';

const extractHeaders = (headers: IncomingHttpHeaders) => {
  let isUK = null;
  if (headers['x-bbc-edge-isuk']) {
    isUK = headers['x-bbc-edge-isuk'] === 'yes';
  } else if (headers['x-country']) {
    isUK = headers['x-country'] === 'gb';
  }

  return {
    isUK,
  };
};

export default extractHeaders;
