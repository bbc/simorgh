import { RequestContext } from '#app/contexts/RequestContext';
import React, { use } from 'react';
import { Helmet } from 'react-helmet';

export const redirectScript = (
  window: Window,
  isLite: boolean,
  pathname: string,
) => {
  if (!isLite && window?.navigator?.connection?.effectiveType) {
    const ect = window.navigator.connection.effectiveType;
    const normalisedEct = ect.toLocaleLowerCase();
    switch (normalisedEct) {
      case 'slow-2g':
      case '2g':
      case '3g':
        window.location.replace(pathname);
        break;
      default:
        break;
    }
  }
};

export default () => {
  const { pathname, isLite } = use(RequestContext);
  const toLitePath = `${pathname}.lite`;
  const innerHTML = `(
    window.addEventListener('load', () => {
      (${redirectScript.toString()})(window, ${isLite},'${toLitePath}')
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
