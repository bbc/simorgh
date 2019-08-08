const MORPH_SUFFIX = 'morph_env=test';
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

  if (env !== 'live') {
    const suffixParts = [suffix, MORPH_SUFFIX];
    suffix = suffixParts.join('?');
  }

  parts.push(suffix);

  return parts.join('/');
};

export default embedUrl;
