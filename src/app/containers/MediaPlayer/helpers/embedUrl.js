const embedUrl = (assetId, vpid, amp = false) => {
  const baseUrl = process.env.SIMORGH_EMBED_BASE_URL;
  const parts = [baseUrl, assetId, vpid];

  if (amp) {
    parts.push('amp');
  }

  return parts.join('/');
};

export default embedUrl;
