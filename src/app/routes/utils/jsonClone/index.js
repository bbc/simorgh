/**
 * Creates a deep clone of a JSON object
 * @param {object} object - a JSON object to clone, it may not work as expected for
 * javascript objects with non-serialisable properties
 */
const jsonClone = object => JSON.parse(JSON.stringify(object));

export default jsonClone;
