import AD_DOMAINS from './constants';

/**
 * Appends ad domains to the CSP script-src directive. It is used to augment the server-defined policy via a meta[httpEquiv="Content-Security-Policy"] tag.
 * This prevents header size limits while enabling secondary header bidding scripts to load after DOM initialization.
 *
 * @param cspHeader - The original CSP header string
 * @param adDomains - An array of ad domains to append to the `script-src` directive. Defaults to `AD_DOMAINS`.
 * @returns The modified CSP header with ad domains added to script-src
 */

export default (cspHeader: string, adDomains = AD_DOMAINS): string => {
  const directives = cspHeader.split(';').map(d => d.trim());

  const modifiedDirectives = directives.map(directive => {
    if (directive.startsWith('script-src')) {
      const hasUnsafeEval = directive.includes('unsafe-eval');

      const unsafeEvalPart = hasUnsafeEval ? '' : " 'unsafe-eval'";
      const adDomainsString = `${unsafeEvalPart} ${adDomains.join(' ')}`;

      return `${directive}${adDomainsString}`;
    }
    return directive;
  });

  return modifiedDirectives.join(';');
};
