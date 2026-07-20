import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';

const ReverbTemplate = ({ nonce }: { nonce?: string | null }) => {
  const envConfig = getEnvConfig();

  return (
    <script
      {...(nonce ? { nonce } : {})}
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
            if (${isOperaProxy.toString()}()) {
              const sendStaticBeaconScript = document.createElement('script');
              sendStaticBeaconScript.textContent = '(${addSendStaticBeaconToWindow.toString()})()';
              document.head.appendChild(sendStaticBeaconScript);
            }
            `,
      }}
    />
  );
};

export default ReverbTemplate;
