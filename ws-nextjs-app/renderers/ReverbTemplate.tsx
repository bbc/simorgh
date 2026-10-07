/* eslint-disable no-underscore-dangle */
import { EnvConfig, getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import addInlineScript from '#app/lib/utilities/addInlineScript';

// eslint-disable-next-line func-names
const reverbScaffold = function (envConfig: EnvConfig) {
  // eslint-disable-next-line no-var
  var simorghReverbSource =
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    envConfig && envConfig.SIMORGH_REVERB_SOURCE
      ? envConfig.SIMORGH_REVERB_SOURCE
      : '';

  window.__reverb = {} as Window['__reverb'];

  // eslint-disable-next-line func-names
  window.__reverb.__reverbLoadedPromise = new Promise(function (
    resolve,
    reject,
  ) {
    window.__reverb.__resolveReverbLoaded = resolve;
    window.__reverb.__rejectReverbLoaded = reject;
  });

  // eslint-disable-next-line func-names
  window.__reverb.__reverbTimeout = setTimeout(function () {
    window.__reverb.__rejectReverbLoaded();
  }, 5000);

  // eslint-disable-next-line no-var, vars-on-top
  var reverbScript = document.createElement('script');
  reverbScript.setAttribute('src', simorghReverbSource);
  document.head.appendChild(reverbScript);
};

const ReverbTemplate = ({ nonce }: { nonce?: string | null }) => {
  const envConfig = getEnvConfig();

  return addInlineScript({
    script: reverbScaffold,
    parameters: [envConfig],
    nonce,
    setInnerHTML: true,
  });
};

export default ReverbTemplate;
