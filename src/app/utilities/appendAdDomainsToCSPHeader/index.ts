import AD_DOMAINS from './constants';

/**
 * Inserts ad domains into the script-src directive of a CSP header to augment the server-defined policy via a meta tag.
 * This prevents header size limits while enabling secondary header bidding scripts to load post-DOM initialization.
 *
 * @param cspHeader - The original CSP header string
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
