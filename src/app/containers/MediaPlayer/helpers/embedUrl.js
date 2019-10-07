const buildBaseUrl = (origin, isAmp) => {
  if (origin.includes('local') || origin.includes('bbc.github.io')) {
    const tld = origin.includes('.co.uk') ? '.co.uk' : '.com';
    return `https://www.test.bbc${tld}`;
  }

  /*
    Explicitly request the embed from the opposite domain to ensure valid playback on traffic direct to `.amp` pages.
    EG: www.bbc.com/bbc_korean_radio/liveradio requests www.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio
  */
  if (isAmp) {
    return origin.includes('.co.uk')
      ? origin.replace('.co.uk', '.com')
      : origin.replace('.com', '.co.uk');
  }

  return origin;
};

const embedUrl = ({ origin, type, requestUrl, isAmp = false }) => {
  const avRoute = 'ws/av-embeds';
  const baseUrl = buildBaseUrl(origin, isAmp);
  const parts = [baseUrl, avRoute, type, requestUrl];

  if (isAmp) {
    parts.push('amp');
  }

  return parts.join('/');
};

export default embedUrl;
