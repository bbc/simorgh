import React from 'react';
import { Helmet } from 'react-helmet';

export const redirectScript = (window: Window) => {
  const { pathname, href } = window.location;
  const isLite = /\.lite$/.test(href);
  const isAmp = /\.amp$/.test(href);

  const allowList = ['/pidgin/articles/czrzwn80zjmo'];

  if (
    !isLite &&
    !isAmp &&
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

export default () => {
  const innerHTML = `(
    window.addEventListener('load', () => {
      (${redirectScript.toString()})(window)
    })
  )`;

  return (
    <Helmet
      script={[
        {
          type: 'text/javascript',
          innerHTML,
        },
      ]}
    />
  );
};
