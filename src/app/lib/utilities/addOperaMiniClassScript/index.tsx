import isOperaProxy from '../isOperaProxy';

export const OPERA_MINI_CLASSNAME = 'is-opera-mini';

export default (nonce?: string | null) => (
  <script
    {...(nonce ? { nonce } : {})}
    type="text/javascript"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: we want this
    dangerouslySetInnerHTML={{
      __html: `
        if (${isOperaProxy.toString()}()) {
          document.documentElement.classList.add("${OPERA_MINI_CLASSNAME}");
        }
      `,
    }}
  />
);
