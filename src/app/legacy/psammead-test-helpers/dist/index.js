"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testUtilityPackages = exports.suppressPropWarnings = exports.resetWindowValue = exports.setWindowValue = exports.isNull = exports.shouldMatchSnapshot = void 0;

var _react = require("@testing-library/react");

var _clone = _interopRequireDefault(require("ramda/src/clone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var shouldMatchSnapshot = function shouldMatchSnapshot(title, component) {
  it(title, function () {
    var _render = (0, _react.render)(component),
        container = _render.container;

    expect(container).toMatchSnapshot();
  });
};

exports.shouldMatchSnapshot = shouldMatchSnapshot;

var isNull = function isNull(title, component) {
  it(title, function () {
    var _render2 = (0, _react.render)(component),
        container = _render2.container;

    expect(container.firstChild).toBeNull();
  });
};

exports.isNull = isNull;

var setWindowValue = function setWindowValue(key, value) {
  var windowValue = window[key];
  delete window[key];
  var newValue = value;

  if (value && _typeof(value) === 'object') {
    newValue = _objectSpread(_objectSpread({}, (0, _clone.default)(windowValue)), value);
  }

  Object.defineProperty(window, key, {
    value: newValue,
    writable: true
  });
};

exports.setWindowValue = setWindowValue;

var resetWindowValue = function resetWindowValue(key, value) {
  Object.defineProperty(window, key, {
    value: value,
    writable: true
  });
};

exports.resetWindowValue = resetWindowValue;

var suppressPropWarnings = function suppressPropWarnings(warnings) {
  var _window = window,
      expectedWarnings = _window.expectedWarnings;

  if (expectedWarnings && Array.isArray(expectedWarnings)) {
    window.expectedWarnings = [].concat(_toConsumableArray(expectedWarnings), [warnings]);
  } else {
    window.expectedWarnings = [warnings];
  }
};

exports.suppressPropWarnings = suppressPropWarnings;

var errorIfMissingKey = function errorIfMissingKey(keys, object, message) {
  keys.forEach(function (key) {
    if (!(key in object)) {
      throw new Error("Missing value '".concat(key, "' in ").concat(message, "."));
    }
  });
};

var checkKeysExistInBothObjects = function checkKeysExistInBothObjects(object1, object2, message1, message2) {
  var object1Keys = Object.keys(object1);
  var object2Keys = Object.keys(object2);
  errorIfMissingKey(object1Keys, object2, message2);
  errorIfMissingKey(object2Keys, object1, message1);
};

var checkTypesOfExports = function checkTypesOfExports(actualExportsByName, actualExports, expectedExports, utilityName) {
  actualExportsByName.forEach(function (actualExportName) {
    var actualExportValue = actualExports[utilityName][actualExportName];
    var expectedExport = expectedExports[utilityName][actualExportName];
    var typeCheck = _typeof(actualExportValue) === expectedExport; // eslint-disable-line valid-typeof
    // if this fails it is likely that an export is missing from the unit test expectation

    expect(typeCheck).toBe(true);
  });
};

var testUtilityPackages = function testUtilityPackages(actualExports, expectedExports, packageName) {
  var actualUtilities = Object.keys(actualExports); // check if the actual exported file has defined expected values to match and that the expected values are actually exported

  checkKeysExistInBothObjects(actualExports, expectedExports, "the actual utilities for '".concat(packageName, "'"), "the expected utilities for '".concat(packageName, "'"));
  actualUtilities.forEach(function (utilityName) {
    var actualExportsByName = Object.keys(actualExports[utilityName]); // check if each of the actual exported consts have an expected value to match and that the expected values are actually exported

    checkKeysExistInBothObjects(actualExports[utilityName], expectedExports[utilityName], "the actual export for '".concat(packageName, "/").concat(utilityName, "'"), "the expected export for '".concat(packageName, "/").concat(utilityName, "'"));
    checkTypesOfExports(actualExportsByName, actualExports, expectedExports, utilityName);
  });
};

exports.testUtilityPackages = testUtilityPackages;