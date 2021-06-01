import isChromatic from 'chromatic/isChromatic';

if (isChromatic()) {
  if (!document.__defineGetter__) {
    Object.defineProperty(document, 'cookie', {
      get: function () {
        return '';
      },
      set: function () {
        return true;
      },
    });
  } else {
    document.__defineGetter__('cookie', function () {
      return '';
    });
    document.__defineSetter__('cookie', function () {});
  }
}
