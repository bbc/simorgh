const getOriginContext = bbcOrigin => {
  let origin = 'https://www.bbc.com';
  let isUK = false;

  if (bbcOrigin) {
    origin = bbcOrigin;
  } else if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.origin
  ) {
    origin = window.location.origin; // eslint-disable-line prefer-destructuring
  }

  if (origin.includes('.co.uk')) {
    isUK = true;
  }

  return {
    origin,
    isUK,
  };
};

export default getOriginContext;
