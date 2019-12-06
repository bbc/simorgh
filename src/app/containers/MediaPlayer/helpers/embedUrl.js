const embedUrl = ({ type, requestUrl, isAmp = false }) => {
  const avRoute = 'ws/av-embeds';
  const baseUrl = process.env.SIMORGH_EMBEDS_BASE_URL;
  const parts = [baseUrl, avRoute, type, requestUrl];

  if (isAmp) {
    parts.push('amp');
  }

  return parts.join('/');
};

export default embedUrl;
