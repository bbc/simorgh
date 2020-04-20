const getOriginContext = bbcOrigin => {
  let origin = 'https://www.bbc.co.uk';
  let isUK = true;

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (
    process &&
    process.env &&
    process.env.SIMORGH_APP_ENV === 'local'
  ) {
    origin = process.env.SIMORGH_BASE_URL;
  } else if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.origin
  ) {
    origin = window.location.origin; // eslint-disable-line prefer-destructuring
  }

  if (origin.includes('.com')) {
    isUK = false;
  }

  return {
    origin,
    isUK,
  };
};

export default getOriginContext;
