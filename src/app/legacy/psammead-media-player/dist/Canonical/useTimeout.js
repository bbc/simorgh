"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var isValidIframeRef = function isValidIframeRef(iframeRef) {
  return iframeRef && iframeRef.current && typeof iframeRef.current.addEventListener === 'function';
};
/**
 * useTimeout Hook.
 * @param {function} callback A callback function that's passed `true` if the timer
 *                            completes, and `false` if it's interrupted.
 * @param {object} iframeRef A React DOM Ref providing access to an iframe node.
 * @param {number} timeout The number of milliseconds until the timer completes.
 */


var useTimeout = function useTimeout(callback, iframeRef, timeout) {
  // Persist a reference to the timer across renders. This is used to clearTimeout().
  var timer = (0, _react.useRef)(null);

  var handleLoad = function handleLoad() {
    clearTimeout(timer.current);
    callback(false);
  }; // The function we pass to useEffect will run on mount, and the one we return will
  // run on unmount. We don't do anything if the value of `timeout` can't be used.
  // eslint-disable-next-line consistent-return


  (0, _react.useEffect)(function () {
    if (!isValidIframeRef(iframeRef)) throw Error("useTimeout expected 'iframeRef' to be a valid React DOM Ref.");

    if (timeout > 0) {
      iframeRef.current.addEventListener('load', handleLoad, {
        once: true
      });
      timer.current = setTimeout(function () {
        callback(true);
      }, timeout);
      return function () {
        return clearTimeout(timer.current);
      };
    }
  }, []);
};

var _default = useTimeout;
exports.default = _default;