/* istanbul ignore next */
export const addProcessClientDeviceAndSendStaticBeaconToWindow = () => {
  window.processClientDeviceAndSendStaticBeacon = (atiURL, reverbURL) => {
    console.log('SEND SCRIPT ADDED');
    const {
      screen: { width, height, colorDepth, pixelDepth },
      innerWidth,
      innerHeight,
    } = window;

    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    // COOKIE SETTINGS
    const cookieName = 'atuserid';
    const days = 397; // = 13 months
    const expires = days * 24 * 60 * 60; // days in seconds

    const getAtUserIdFromCookie = () => {
      const match = document.cookie.match(/(?:^|;\s*)atuserid=([^;]*)/);

      const atUserIdCookie = match?.[1] as string;

      if (atUserIdCookie) {
        const { val } = JSON.parse(decodeURIComponent(atUserIdCookie));

        return { val };
      }
      return { val: null };
    };

    const user = getAtUserIdFromCookie();

    if (!user.val && window.crypto && crypto.randomUUID) {
      user.val = crypto.randomUUID();
    }

    const stringifiedCookieValue = JSON.stringify(user);
    const encodedCookieValue = encodeURIComponent(stringifiedCookieValue);

    document.cookie = `${cookieName}=${encodedCookieValue}; path=/; max-age=${expires}; Secure;`;

    const screenResolutionColourDepth = [
      width || 0,
      height || 0,
      colorDepth || 0,
      pixelDepth || 0,
    ].join('x');

    const browserViewportResolution = [innerWidth || 0, innerHeight || 0].join(
      'x',
    );

    const timestamp = [hours, mins, secs].join('x');
    const isLiteSite = window.location.pathname?.includes('.lite');

    const params: Record<string, string> = {
      r: screenResolutionColourDepth,
      re: browserViewportResolution,
      hl: timestamp,
      app_type: isLiteSite ? 'lite' : 'responsive',
    };

    if (navigator.language) params.lng = navigator.language;
    if (user.val) params.idclient = user.val;

    params.ref = document.referrer || '';

    if (reverbURL) {
      const processedReverbUrl = reverbURL
        .replace('{screenResolutionColourDepth}', params.r)
        .replace('{browserViewportResolution}', params.re)
        .replace('{timestamp}', params.hl)
        .replace('{language}', params.lng)
        .replaceAll('{referrer}', params.ref)
        .replace('{idclient}', params.idclient);

      window.sendStaticBeacon(processedReverbUrl);
    } else if (atiURL) {
      if (isLiteSite && window.location.search.length) {
        const kvpairs: Record<string, string> = window.location.search
          .substring(1)
          .split('&')
          .map((param): [string, string] => {
            const pieces = param.split('=');
            return [
              decodeURIComponent(pieces[0]),
              decodeURIComponent(pieces[1]),
            ];
          })
          .reduce<Record<string, string>>((values, kv) => {
            // eslint-disable-next-line no-param-reassign, prefer-destructuring
            values[kv[0]] = kv[1];
            return values;
          }, {});

        Object.keys(kvpairs).forEach(keyName => {
          if (keyName.indexOf('at_') === 0) {
            params[keyName.replace('at_', 'src_')] = kvpairs[keyName];
          } else if (keyName.indexOf('utm_') === 0) {
            params[keyName] = kvpairs[keyName];
          }
        });
      }

      const paramValues = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');
      window.sendStaticBeacon(`${atiURL}&${paramValues}`);
    }
  };
};

export default (atiURL: string, reverbURL?: string) => {
  window.addEventListener('load', () => {
    window.processClientDeviceAndSendStaticBeacon(atiURL, reverbURL);
  });
};
