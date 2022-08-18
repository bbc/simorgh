/* eslint-disable import/prefer-default-export */

/* In an ideal world; this would just be `@supports (display: grid)`.
 * This is not an ideal world. This is a world where some mobile vendor forked
 * Firefox 48 which had WIP grid support disabled behind a feature flag, and
 * enabled the WIP grid support, which breaks our pages.
 * The `fit-content` CSS function did not land in Firefox until 51 (regardless
 * of feature flag settings) which enables us to better detect our fallback.
 */
export const grid = 'grid-template-columns: fit-content(200px)';
