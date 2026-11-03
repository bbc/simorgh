import { RequestContext } from '#app/contexts/RequestContext';
import Script from 'next/script';
import { use } from 'react';

export const USERZOOM_SRC =
  'https://cdn4.userzoom.com/files/js/QzI4NFQx.js?t=uz_til&cuid=286685F149F6DF1188490022196C4538';

export default () => {
  const { nonce } = use(RequestContext);

  return (
    <Script
      src={USERZOOM_SRC}
      strategy="lazyOnload"
      nonce={nonce ?? undefined}
    />
  );
};
