/**
 * Returns a string of a known provider name.
 * @param {String} provider A given provider.
 */
export var getProviderName = function getProviderName(provider) {
  if (typeof provider !== 'string') throw Error("Expected 'provider' to be a string.");
  return {
    instagram: 'Instagram',
    twitter: 'Twitter',
    youtube: 'YouTube',
    facebook: 'Facebook'
  }[provider];
};
/**
 * Returns a string that has had its tokens replaced.
 * @param {String} text A word or words containing tokens.
 * @param {Object} dictionary An object which maps keys as tokens to values.
 */

export var detokenise = function detokenise(text, dictionary) {
  if (typeof text !== 'string' || dictionary !== Object(dictionary)) return null;
  return text.replace(/%\w+%/g, function (match) {
    return dictionary[match] || match;
  });
};
/**
 * Returns an object that can be used to map tokens to values.
 * @param {Object} definitions An object containing definitions.
 */

export var dictionaryFactory = function dictionaryFactory(_ref) {
  var provider = _ref.provider;
  return {
    '%provider_name%': getProviderName(provider) || provider,
    '%provider%': provider
  };
};
/**
 * These styles are lifted from @bbc/psammead-visually-hidden-text, which we
 * cannot use directly as we require control over _when_ they are applied.
 */

export var visuallyHiddenStyle = "\n  clip-path: inset(100%);\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n  margin: 0;\n";