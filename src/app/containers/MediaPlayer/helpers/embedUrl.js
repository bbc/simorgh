// Local embeds do not work, therefore, we use the test server when running locally or in storybook
const buildBaseUrl = origin => {
  if (origin.includes('local') || origin.includes('bbc.github.io')) {
    const tld = origin.includes('.co.uk') ? '.co.uk' : '.com';
    return `https://www.test.bbc${tld}`;
  }

  return origin;
};

const embedUrl = ({ origin, type, requestUrl, isAmp = false }) => {
  const avRoute = 'ws/av-embeds';
  const baseUrl = buildBaseUrl(origin);
  const parts = [baseUrl, avRoute, type, requestUrl];

  if (isAmp) {
    parts.push('amp');
  }

  return parts.join('/');
};

export default embedUrl;
