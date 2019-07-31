/* eslint-disable func-names, no-var, vars-on-top */
module.exports = {
  'es.array.concat': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
    // Our usage should be supported
    return true;
  },
  'es.array.filter': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    return Array.prototype.filter;
  },
  'es.object.get-own-property-descriptor': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor#Notes
    // check if getOwnPropertyDescriptor of a string returns an object:
    try {
      return typeof Object.getOwnPropertyDescriptor('foo', 0) === 'object';
    } catch (e) {
      return false;
    }
  },
  'es.object.get-own-property-descriptors': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
    return Object.getOwnPropertyDescriptors;
  },
  'es.object.keys': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    // check if Object.keys on string returns object:
    try {
      return typeof Object.keys('foo') === 'object';
    } catch (e) {
      return false;
    }
  },
  'es.string.match': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    // Our usage should be supported
    return true;
  },
  'es.array.join': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
    // Our usage should be supported
    return true;
  },
  'es.array.includes': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    return Array.prototype.includes;
  },
  'es.string.includes': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    return String.prototype.includes;
  },
  'es.array.find-index': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    return Array.prototype.findIndex;
  },
  'es.array.slice': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    // Our usage should be supported
    return true;
  },
  'es.string.replace': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    // Our usage should be supported
    return true;
  },
  'es.array.index-of': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    return Array.prototype.indexOf;
  },
  'es.array.find': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    return Array.prototype.find;
  },
  'es.string.trim': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    return String.prototype.trim;
  },
  'es.regexp.constructor': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    // Check if Unicode support:
    try {
      var text = 'Образец text';
      var regex = /[\u0400-\u04FF]+/g;

      var match = regex.exec(text);
      if (match[0] === 'Образец') return true;
      return false;
    } catch (e) {
      return false;
    }
  },
  'es.regexp.to-string': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString
    // Our usage should be supported
    return true;
  },
  'es.string.pad-start': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    return String.prototype.padStart;
  },
  'es.string.repeat': function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
    return String.prototype.repeat;
  },
  'fetch': function() {
    return window.fetch;
  },
};
