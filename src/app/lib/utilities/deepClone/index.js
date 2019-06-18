/**
 * Does a deep clone of a JSON object.
 * Warning: can't clone functions inside the object. Must be 'pure' object.
 *
 * @param {Object} originalObj The object to clone.
 */
const deepClone = originalObj => JSON.parse(JSON.stringify(originalObj));

export default deepClone;
