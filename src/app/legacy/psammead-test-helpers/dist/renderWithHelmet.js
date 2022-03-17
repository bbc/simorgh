"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("@testing-library/react");

var _default = function _default(component) {
  /*
   * Similar to this problem https://github.com/testing-library/react-testing-library/issues/402
   * This helper was created to solve the problem of rendering helmet/head contents in snapshots.
   * Pass in a component that uses helmet somewhere in the component tree.
   * The full html tree is returned which you can then use to snapshot helmet/head contents.
   */
  var _render = (0, _react.render)(component),
      container = _render.container;

  var noop = function noop() {};

  var ARBITRARY_TIMEOUT = 100; // seems long enough for any dom mutations to occur

  var headElement = document.querySelector('head');
  headElement.innerHTML = ''; // clear out head mutations from previous tests

  return (0, _react.waitFor)({
    container: headElement,
    timeout: ARBITRARY_TIMEOUT
  }).catch(noop) // handle a waitFor timeout
  .then(function (mutationsList) {
    var headMutationDetected = mutationsList && mutationsList.length;

    if (headMutationDetected) {
      // helmet was probably used so we should get the full html
      var htmlElement = document.querySelector('html');
      var helmetElements = document.querySelectorAll('[data-react-helmet="true"]');

      var removeHelmetAttributes = function removeHelmetAttributes(el) {
        return el.removeAttribute('data-react-helmet');
      }; // remove react-helmet attribute noise from elements


      removeHelmetAttributes(htmlElement); // remove react-helmet attribute noise from elements

      Array.from(helmetElements).forEach(removeHelmetAttributes);
      return {
        container: document.querySelector('html')
      };
    }

    return {
      container: container
    };
  });
};

exports.default = _default;