import React from 'react';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const ReverbTemplate = () => {
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
            }, 5000);`,
        }}
      />
      <script async src={`${getEnvConfig().SIMORGH_REVERB_SOURCE}`} />
    </>
  );
};

export default ReverbTemplate;
