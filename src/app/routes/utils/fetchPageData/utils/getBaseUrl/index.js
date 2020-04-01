const getBaseUrl = (origin) => {
  let base = 'https://www.bbc';
  let tld = '.com';

  if (origin.includes('localhost')) {
    return origin;
  }

  if (origin.includes('.stage.')) {
    base = 'https://www.stage.bbc';
  }

  if (origin.includes('.test.')) {
    base = 'https://www.test.bbc';
  }

  if (origin.includes('.co.uk')) {
    tld = '.co.uk';
  }

  /* TODO: Remove this from the PR prior to merging! */
  if (origin.includes('simorgh-infrastructure')) {
    base = 'https://www.test.bbc';
    tld = '.com';
  }

  return base + tld;
};

export default getBaseUrl;
