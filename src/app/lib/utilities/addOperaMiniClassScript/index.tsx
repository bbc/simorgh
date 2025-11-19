import React from 'react';
import isOperaProxy from '../isOperaProxy';

export const OPERA_MINI_CLASSNAME = 'is-opera-mini';

export default (nonce?: string | null) => (
  <script
    type="text/javascript"
    {...(nonce ? { nonce } : {})}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `
        if (${isOperaProxy.toString()}()) {
          document.documentElement.classList.add("${OPERA_MINI_CLASSNAME}");
        }
      `,
    }}
  />
);
