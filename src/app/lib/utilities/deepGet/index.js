/**
 * Safely retrieves a nested object value, or `null` if doesn't exist.
 * Usage: `deepGet(['foo', 'bar'], myObj)` on `{ foo: { bar: 123 } }`
 * Taken from:
 * https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
 *
 * @param {Array} path Array of strings
 * @param {Object} object Object to retrieve nested value from
 */
const deepGet = (path, object) =>
  typeof object === 'object'
    ? path.reduce((xs, x) => (xs && xs[x] !== undefined ? xs[x] : null), object)
    : null;

export default deepGet;
