const getOriginContext = bbcOrigin => {
  let origin = 'https://www.bbc.co.uk';
  let isUK = true;

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (process && process.env && process.env.APP_ENV === 'local') {
    // For local dev, set origin to Test
    // Ensures analytics are sent to Test bucket
    origin = 'https://www.test.bbc.co.uk';
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
