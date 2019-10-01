const buildBaseUrl = origin => {
  /*
    Explicitly request the embed from the opposite domain to ensure valid playback on traffic direct to `.amp` pages.
    
    EG: 
    www.bbc.com/bbc_korean_radio/liveradio requests www.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio
  */
  const swappedOrigin = origin.includes('.co.uk')
    ? origin.replace('.co.uk', '.com')
    : origin.replace('.com', '.co.uk');

  if (!origin.includes('local')) {
    return swappedOrigin;
  }

  const tld = origin.includes('.co.uk') ? '.co.uk' : '.com';

  return `https://www.test.bbc${tld}`;
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
