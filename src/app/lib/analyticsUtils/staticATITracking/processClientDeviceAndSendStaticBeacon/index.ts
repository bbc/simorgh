/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* istanbul ignore next */
export const addProcessClientDeviceAndSendStaticBeaconToWindow = function () {
  window.processClientDeviceAndSendStaticBeacon = function (options) {
    var reverbUrl = options.reverbUrl;
    var forwardingUrl = options.forwardingUrl || '';

    var screen = window.screen;
    var width = screen.width;
    var height = screen.height;
    var colorDepth = screen.colorDepth;
    var pixelDepth = screen.pixelDepth;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    var now = new Date();
    var hours = now.getHours();
    var mins = now.getMinutes();
    var secs = now.getSeconds();
    var epochTimestamp = now.getTime().toString();

    // COOKIE SETTINGS
    var cookieName = 'atuserid';
    var days = 397; // = 13 months
    var expires = days * 24 * 60 * 60; // days in seconds

    var getAtUserIdFromCookie = function () {
      var match = document.cookie.match(/(?:^|;\s*)atuserid=([^;]*)/);

      var atUserIdCookie = match ? match[1] : null;

      if (atUserIdCookie) {
        var parsedCookie = JSON.parse(decodeURIComponent(atUserIdCookie));

        return { val: parsedCookie.val };
      }
      return { val: null };
    };

    var user = getAtUserIdFromCookie();

    if (!user.val && window.crypto && crypto.randomUUID) {
      user.val = crypto.randomUUID();
    }

    var stringifiedCookieValue = JSON.stringify(user);
    var encodedCookieValue = encodeURIComponent(stringifiedCookieValue);

    document.cookie =
      cookieName +
      '=' +
      encodedCookieValue +
      '; path=/; max-age=' +
      expires +
      '; Secure;';

    var screenResolutionColourDepth = [
      width || 0,
      height || 0,
      colorDepth || 0,
      pixelDepth || 0,
    ].join('x');

    var browserViewportResolution = [innerWidth || 0, innerHeight || 0].join(
      'x',
    );

    var timestamp = [hours, mins, secs].join('x');
    var isLiteSite = window.location.pathname?.includes('.lite');

    var params: Record<string, string> = {
      r: screenResolutionColourDepth,
      re: browserViewportResolution,
      hl: timestamp,
      app_type: isLiteSite ? 'lite' : 'responsive',
    };

    if (navigator.language) params.lng = navigator.language;
    if (user.val) params.idclient = user.val;

    params.ref = document.referrer || '';

    if (reverbUrl) {
      var processedReverbUrl = reverbUrl
        .replace('{screenResolutionColourDepth}', params.r)
        .replace('{browserViewportResolution}', params.re)
        .replace('{timestamp}', params.hl)
        .replace('{language}', params.lng)
        .replaceAll('{referrer}', params.ref)
        .replace('{idclient}', params.idclient)
        .replace('{epochTimestamp}', epochTimestamp)
        .replace('{forwardingLink}', forwardingUrl)
        .replaceAll('ref=&', '')
        .replace(/&ref=$/, ''); // removes empty ref at end of URL

      var searchParams = new URLSearchParams(window.location.search);

      searchParams.forEach((value, key) => {
        if (
          key.startsWith('utm_') ||
          key.startsWith('at_') ||
          key.startsWith('xtor')
        ) {
          processedReverbUrl +=
            `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
              .replace('at_', 'src_')
              .replace('xtor', 'xto');
        }
      });
      window.sendStaticBeacon(processedReverbUrl);
    }
  };
};

export default function (reverbUrl: string) {
  window.addEventListener('load', function () {
    window.processClientDeviceAndSendStaticBeacon({ reverbUrl });
  });
}
