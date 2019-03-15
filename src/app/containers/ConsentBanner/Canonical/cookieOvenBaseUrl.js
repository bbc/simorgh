const getCookieOvenBaseUrl = origin => {
  let base = 'https://cookie-oven.api.bbc';
  let tld = '.com';

  if (origin.includes('localhost')) {
    return origin;
  }

  if (origin.includes('.stage.') || origin.includes('.test.')) {
    base = 'https://cookie-oven.test.api.bbc';
  }

  if (origin.includes('.co.uk')) {
    tld = '.co.uk';
  }

  return base + tld;
};

export default getCookieOvenBaseUrl;
