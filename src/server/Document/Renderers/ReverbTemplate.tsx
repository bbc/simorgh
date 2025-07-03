import React from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const ReverbTemplate = () => {
  const envConfig = getEnvConfig();
  // Guard in case getEnvConfig() returns undefined
  const staticAssetsPath =
    (envConfig?.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN ?? '') +
    (envConfig?.SIMORGH_PUBLIC_STATIC_ASSETS_PATH ?? '');
  // Removed unused testScriptPath

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
            reverbScript.setAttribute('src','${envConfig?.SIMORGH_REVERB_SOURCE ?? ''}');
            document.head.appendChild(reverbScript);
            `,
        }}
      />
    </>
  );
};

export default ReverbTemplate;
