const directives = {
  connectSrc: {
    ampLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://toggles.api.bbci.co.uk', // Toggles service
      'https://cdn.ampproject.org', // AMP
      'https://amp-error-reporting.appspot.com', // AMP
      "'self'",
    ],
    canonicalLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://toggles.api.bbci.co.uk', // Toggles service
      "'self'",
    ],
    ampNonLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://cdn.ampproject.org',
      'https://amp-error-reporting.appspot.com',
      'https://logws1363.ati-host.net',
      'https://toggles.test.api.bbci.co.uk',
      "'self'",
    ],
    canonicalNonLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://logws1363.ati-host.net', // ATI
      'https://toggles.test.api.bbci.co.uk', // Toggles service
      "'self'",
    ],
  },
  frameSrc: {
    ampLive: [
      "'self'",
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
    ],
    canonicalLive: [
      "'self'",
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
    ],
    ampNonLive: [
      "'self'",
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://polling.test.bbc.co.uk', // Media page
    ],
    canonicalNonLive: [
      "'self'",
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      'https://polling.test.bbc.co.uk', // Media page
    ],
  },
  imgSrc: {
    ampLive: [
      // not currently used since is identical to canonical
    ],
    canonicalLive: [
      'https://ichef.bbci.co.uk',
      'https://ping.chartbeat.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://news.files.bbci.co.uk',
      'https://*.akstat.io',
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://via.placeholder.com', // ads
      "data: 'self'", // needed at the end to maintain proper order
    ],
    ampNonLive: [
      // not currently used since is identical to canonical
    ],
    canonicalNonLive: [
      'https://ichef.bbci.co.uk',
      'https://ping.chartbeat.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://news.files.bbci.co.uk',
      'https://*.akstat.io',
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://via.placeholder.com', // ads
      'https://ichef.test.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://logws1363.ati-host.net',
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
      "data: 'self'", // needed at the end to maintain proper order
    ],
  },
  scriptSrc: {
    ampLive: [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'unsafe-inline'",
    ],
    canonicalLive: [
      'https://news.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'unsafe-inline'",
    ],
    canonicalNonLive: [
      'https://news.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      "'self'",
      "'unsafe-inline'",
      'https://news.test.files.bbci.co.uk',
      'http://*.chartbeat.com', // for localhost canonical connecting via http
      'http://localhost:1124', // for localhost canonical JavaScript
    ],
  },
};

export const generateScriptSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.scriptSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.scriptSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.scriptSrc.ampLive;
  return directives.scriptSrc.canonicalLive;
};

export const generateImgSrc = ({ isLive }) => {
  if (!isLive) return directives.imgSrc.canonicalNonLive;
  return directives.imgSrc.canonicalLive;
};

const cookieOvenTld = ({ isUK }) => {
  if (!isUK) {
    return '.com';
  }
  return '.co.uk';
};

const generateCookieOvenUrls = ({ isLive, isUK }) => {
  const cookieUrl = [`https://cookie-oven.api.bbc${cookieOvenTld({ isUK })}`];
  if (!isLive) {
    cookieUrl.push(
      `https://cookie-oven.test.api.bbc${cookieOvenTld({ isUK })}`,
    );
  }

  return cookieUrl;
};

export const generateConnectSrc = ({ isAmp, isLive, isUK }) => {
  const connectSrc = [
    'https://*.akstat.io',
    'https://*.akamaihd.net',
    'https://c.go-mpulse.net',
    'https://adservice.google.com', // ads,
    'https://securepubads.g.doubleclick.net', // ads
    'https://pagead2.googlesyndication.com', // ads
    'https://tpc.googlesyndication.com', // ads
  ];

  if (!isLive) {
    connectSrc.push(
      'https://logws1363.ati-host.net',
      'https://toggles.test.api.bbci.co.uk',
    );
  } else {
    connectSrc.push(
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://toggles.api.bbci.co.uk',
    );
  }

  if (isAmp) {
    connectSrc.push(
      'https://cdn.ampproject.org',
      'https://amp-error-reporting.appspot.com',
    );
    return connectSrc;
  }

  connectSrc.push("'self'");
  return connectSrc.concat(generateCookieOvenUrls({ isLive, isUK }));
};

const generateFrameSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.frameSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.frameSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.frameSrc.ampLive;
  return directives.frameSrc.canonicalLive;
};

export const constructCspHeader = ({ isAmp, isLive, isUK }) => ({
  directives: {
    'default-src': ["'self'"],
    'font-src': [
      'https://gel.files.bbci.co.uk',
      'https://ws-downloads.files.bbci.co.uk',
    ],
    'style-src': ["'unsafe-inline'"],
    'img-src': generateImgSrc({ isLive }),
    'script-src': generateScriptSrc({ isAmp, isLive }),
    'connect-src': generateConnectSrc({ isAmp, isLive, isUK }),
    'frame-src': generateFrameSrc({ isAmp, isLive }),
    'worker-src': isAmp ? ['blob:'] : ["'self'"],
    'child-src': isAmp ? ['blob:'] : ["'self'"],
  },
});
