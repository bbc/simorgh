/**
 * Returns a string that has had its tokens replaced.
 * @param {String} text A word or words containing tokens.
 * @param {Object} dictionary An object which maps keys as tokens to values.
 */
const detokenise = (text, dictionary) => {
  if (typeof text !== 'string' || dictionary !== Object(dictionary))
    return null;
  return text.replace(/%\w+%/g, match => dictionary[match] || match);
};

export default detokenise;
