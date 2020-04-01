import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const getOriginContext = (bbcOrigin) => {
  let origin = 'https://www.bbc.co.uk';
  let isUK = true;

  let logPrefix = 'origin=default';

  if (bbcOrigin) {
    logPrefix = 'origin=bbcOrigin';
    origin = bbcOrigin;
  } else if (
    process &&
    process.env &&
    process.env.SIMORGH_APP_ENV === 'local'
  ) {
    logPrefix = 'origin=process.env.SIMORGH_BASE_URL';
    origin = process.env.SIMORGH_BASE_URL;
  } else if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.origin
  ) {
    logPrefix = 'origin=window.location.origin';
    origin = window.location.origin; // eslint-disable-line prefer-destructuring
  }

  if (origin.includes('.com')) {
    isUK = false;
  }

  logger.info(`${logPrefix}: ${origin}; isUK: ${isUK}`);

  return {
    origin,
    isUK,
  };
};

export default getOriginContext;
