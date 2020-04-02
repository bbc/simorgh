export const generateScriptSrc = ({ isAmp, isLive }) => {
  if (isAmp) {
    return [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'unsafe-inline'",
    ];
  }

  const scriptSrc = [
    'https://news.files.bbci.co.uk',
    'https://*.chartbeat.com',
    'https://*.go-mpulse.net',
    'https://mybbc-analytics.files.bbci.co.uk',
    'https://emp.bbci.co.uk',
    'https://static.bbci.co.uk',
    "'self'",
    "'unsafe-inline'",
  ];

  if (!isLive) {
    scriptSrc.push(
      'https://news.test.files.bbci.co.uk',
      'http://*.chartbeat.com', // for localhost canonical connecting via http
      'http://localhost:1124', // for localhost canonical JavaScript
    );
  }

  return scriptSrc;
};

export const generateImgSrc = ({ isLive }) => {
  let imgSrc = [
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
    'https://via.placeholder.com/970x250', // ads
  ];

  if (!isLive) {
    const testSrc = [
      'https://ichef.test.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://logws1363.ati-host.net',
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
    ];
    imgSrc = imgSrc.concat(testSrc);
  }
  // Duplicated to maintain proper order
  imgSrc.push("data: 'self'");
  return imgSrc;
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
  const frameSrc = [
    "'self'",
    'https://polling.bbc.co.uk', // Media page
    'https://securepubads.g.doubleclick.net', // ads
    'https://tpc.googlesyndication.com', // ads
  ];

  if (!isAmp) {
    frameSrc.push(
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
    );
  }

  if (!isLive) {
    frameSrc.push(
      'https://polling.test.bbc.co.uk', // Media page
    );
  }

  return frameSrc;
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
export const stringCspHeader = ({ isAmp, isLive, isUK }) => {
  const { directives } = constructCspHeader({ isAmp, isLive, isUK });
  return Object.keys(directives)
    .map((directive) => `${directive} ${directives[directive].join(' ')}`)
    .join('; ');
};
