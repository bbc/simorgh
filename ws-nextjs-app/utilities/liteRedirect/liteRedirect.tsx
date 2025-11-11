/* eslint-disable react-hooks/rules-of-hooks */
import { RequestContext } from '#app/contexts/RequestContext';
import { useRouter } from 'next/router';
import React, { JSX, use, useEffect } from 'react';

const withLiteRedirect = <P,>(Component: React.ComponentType<P>) => {
  return (props: P & JSX.IntrinsicAttributes) => {
    const router = useRouter();
    const { pathname, isLite } = use(RequestContext);

    useEffect(() => {
      if (!isLite && window?.navigator?.connection?.effectiveType) {
        const ect = window.navigator.connection.effectiveType;
        const normalisedEct = ect.toLocaleLowerCase();

        switch (normalisedEct) {
          case 'slow-2g':
          case '2g':
          case '3g':
            router.push(`${pathname}.lite`);
            break;
          default:
            break;
        }
      }
    }, [isLite, pathname, router]);

    return <Component {...props} />;
  };
};

export default withLiteRedirect;
