"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var useEvent = function useEvent(event, callbackFunction) {
  var cb = (0, _react.useRef)(callbackFunction);
  (0, _react.useEffect)(function () {
    var callback = cb.current;
    window.addEventListener(event, callback);
    return function () {
      return window.removeEventListener(event, callback);
    };
  }, [cb]);
};

var _default = useEvent;
exports.default = _default;