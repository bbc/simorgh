/** Size limit for all bundles used by each service (kB)
 *
 * `MIN` should be the value of "Smallest total bundle size (kB) (smallest service + smallest page)"
 * `MAX` should be the value of "Largest total bundle size (kB) (largest service + largest page)"
 * from the "MODERN service config & theme + page bundle sizes summary" in the build output
 *
 * We are allowing a variance of -5 on `MIN_SIZE` and +5 on `MAX_SIZE` to avoid the need for frequent changes, as bundle sizes can fluctuate
 */

const MIN = 919;
const MAX = 1453;

const VARIANCE = 5;
export const MIN_SIZE = MIN - VARIANCE;
export const MAX_SIZE = MAX + VARIANCE;
