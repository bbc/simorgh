import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

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
            `,
      }}
    />
  );
};

export default ReverbTemplate;
