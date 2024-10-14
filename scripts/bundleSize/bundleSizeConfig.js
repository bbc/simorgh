/** Size limit for all bundles used by each service (kB)
 *
 * `MIN_SIZE` should be the value of "Smallest total bundle size (kB) (smallest service + smallest page)" &
 * `MAX_SIZE` should be the value of "Largest total bundle size (kB) (largest service + largest page)"
 * from the "MODERN service config & theme + page bundle sizes summary" in the build output
 *
 * We are allowing a variance of -5 on `MIN_SIZE` and +5 on `MAX_SIZE` to avoid the need for frequent changes, as bundle sizes can fluctuate
 */

export const MIN_SIZE = 635 - 5;
export const MAX_SIZE = 1175 + 5;
