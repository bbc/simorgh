export default () => {
  window.processClientDeviceAndSendStaticBeacon = atiURL => {
    if (atiURL) {
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
      const expires = 397; // expires in 13 months

      const getAtUserIdFromCookie = () => {
        try {
          const [, atUserIdCookie] =
            document.cookie.match(/(?:^|;\s*)atuserid=([^;]*)/) || [];

          const { val } = JSON.parse(decodeURIComponent(atUserIdCookie));

          return { val };
        } catch {
          return { val: null };
        }
      };

      const user = getAtUserIdFromCookie();

      if (!user.val && window.crypto && crypto.randomUUID) {
        user.val = crypto.randomUUID();

        const stringifiedCookieValue = JSON.stringify(user);
        const encodedCookieValue = encodeURIComponent(stringifiedCookieValue);

        document.cookie = `${cookieName}=${encodedCookieValue}; path=/; max-age=${expires}; Secure;`;
      }

      const screenResolutionColourDepth = [
        width || 0,
        height || 0,
        colorDepth || 0,
        pixelDepth || 0,
      ].join('x');

      const browserViewportResolution = [
        innerWidth || 0,
        innerHeight || 0,
      ].join('x');

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
      if (document.referrer) params.ref = document.referrer;

      const paramValues = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

      window.sendStaticBeacon(`${atiURL}&${paramValues}`);
    }
  };
};
