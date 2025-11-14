import React from 'react';
import isOperaProxy, { OPERA_MINI_CLASSNAME } from '.';

export default (
  <script
    type="text/javascript"
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
