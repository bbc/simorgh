"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Returns a string that has had its tokens replaced.
 * @param {String} text A word or words containing tokens.
 * @param {Object} dictionary An object which maps keys as tokens to values.
 */
var detokenise = function detokenise(text, dictionary) {
  if (typeof text !== 'string' || dictionary !== Object(dictionary)) return null;
  return text.replace(/%\w+%/g, function (match) {
    return dictionary[match] || match;
  });
};

var _default = detokenise;
exports.default = _default;