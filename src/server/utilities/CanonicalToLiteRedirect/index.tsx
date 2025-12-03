import React from 'react';

export const redirectScript = (window: Window) => {
  const { pathname } = window.location;

  const allowList = ['/pidgin/articles/czrzwn80zjmo'];
  if (
    window?.navigator?.connection?.effectiveType &&
    allowList.includes(pathname)
  ) {
    const toLitePath = `${pathname}.lite`;
    const ect = window.navigator.connection.effectiveType;
    const normalisedEct = ect.toLocaleLowerCase();
    switch (normalisedEct) {
      case 'slow-2g':
      case '2g':
      case '3g':
        window.location.replace(toLitePath);
        break;
      default:
        break;
    }
  }
};

// THIS COMPONENT IS ONLY TO BE USED WITH CANONICAL RENDERERS
// DO NOT USE IT WITH LITE AND AMP RENDERERS
export default () => {
  return (
    <script>
      {`
        window.addEventListener('DOMContentLoaded', () => {
          (${redirectScript.toString()})(window)
        })
      `}
    </script>
  );
};
