const buildBaseUrl = origin => {
  if (!origin.includes('local')) {
    return origin;
  }

  const tld = origin.includes('.co.uk') ? '.co.uk' : '.com';
  const baseUrl = `https://www.test.bbc${tld}`;

  return baseUrl;
};

const embedUrl = (origin, assetId, vpid, amp = false) => {
  const avRoute = 'ws/av-embeds';
  const baseUrl = buildBaseUrl(origin);
  const parts = [baseUrl, avRoute, assetId, vpid];

  if (amp) {
    parts.push('amp');
  }

  return parts.join('/');
};

export default embedUrl;
