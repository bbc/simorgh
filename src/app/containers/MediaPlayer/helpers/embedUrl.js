const buildBaseUrl = origin => {
  if (!origin.includes('local')) {
    return origin;
  }

  const tld = origin.includes('.co.uk') ? '.co.uk' : '.com';

  return `https://www.test.bbc${tld}`;
};

const embedUrl = ({ origin, type, assetId, isAmp = false }) => {
  const avRoute = 'ws/av-embeds';
  const baseUrl = buildBaseUrl(origin);
  const parts = [baseUrl, avRoute, type, assetId];

  if (isAmp) {
    parts.push('amp');
  }

  return parts.join('/');
};

export default embedUrl;
