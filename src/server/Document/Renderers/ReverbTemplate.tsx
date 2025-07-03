import React from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const ReverbTemplate = () => {
  const staticAssetsPath = 
    getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN + 
    getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH;
  const testScriptPath = 'static/js/test/test.js';
  return (
    <>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.__reverb = {};
            window.__reverb.__reverbLoadedPromise = new Promise((resolve, reject) => {
              window.__reverb.__resolveReverbLoaded = resolve;
              window.__reverb.__rejectReverbLoaded = reject;
            });
            window.__reverb.__reverbTimeout = setTimeout(() => {
              window.__reverb.__rejectReverbLoaded();
            }, 5000);
            const reverbScript = document.createElement('script');
			reverbScript.setAttribute('src','${getEnvConfig().SIMORGH_REVERB_SOURCE}');
			document.head.appendChild(reverbScript);
			if ((navigator && navigator.connection) && ['2g', 'slow-2g', '3g'].includes(navigator.connection.effectiveType)) {
				const testScript = document.createElement('script');
				testScript.setAttribute('src','${staticAssetsPath}static/js/test/test.js');
				document.head.appendChild(testScript);
			}
            `,
        }}
      />
    </>
  );
};

export default ReverbTemplate;
