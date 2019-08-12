const DOMAIN_PREFIX = {
  local: 'http://localhost.bbc.com:8080/ws/av-embeds',
  test: 'https://www.test.bbc.co.uk/ws/av-embeds',
  live: 'https://www.bbc.com/ws/av-embeds',
};

const embedUrl = (env, assetId, vpid, amp = false) => {
  const parts = [DOMAIN_PREFIX[env], assetId];
  let suffix = vpid;

  if (amp) {
    parts.push(suffix);
    suffix = 'amp';
  }

  parts.push(suffix);

  return parts.join('/');
};

export default embedUrl;
