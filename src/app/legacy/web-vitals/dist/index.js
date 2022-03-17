"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crossFetch = _interopRequireDefault(require("cross-fetch"));

var _react = require("react");

var _webVitals = require("web-vitals");

var _reactAdaptiveHooks = require("react-adaptive-hooks");

var _useEvent = _interopRequireDefault(require("./use-event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var noOp = function noOp() {};

var webVitalsBase = {
  age: 0,
  type: 'web-vitals',
  url: 'current-page-url'
};
var vitals = {
  cls: null,
  fid: null,
  lcp: null,
  fcp: null,
  ttfb: null
};
var deviceMetrics = {
  device_mem: null,
  device_cpu: null,
  device_effective_connection: null
};

var updateWebVitals = function updateWebVitals(_ref) {
  var name = _ref.name,
      value = _ref.value;
  var vitalName = name.toLowerCase();
  vitals[vitalName] = value;
};

var updateDeviceMetrics = function updateDeviceMetrics(_ref2) {
  var deviceMemory = _ref2.deviceMemory,
      numberOfLogicalProcessors = _ref2.numberOfLogicalProcessors,
      effectiveConnectionType = _ref2.effectiveConnectionType;
  deviceMetrics.device_mem = deviceMemory;
  deviceMetrics.device_cpu = numberOfLogicalProcessors;
  deviceMetrics.device_effective_connection = effectiveConnectionType;
};

var setCurrentUrl = function setCurrentUrl() {
  webVitalsBase.url = window.location.href;
};

var appendReportParams = function appendReportParams(reportingEndpoint, reportParams) {
  var url = new URL(reportingEndpoint);
  var reportParamKeys = Object.keys(reportParams);
  var paramsString = reportParamKeys.map(function (param) {
    return "".concat(param, "=").concat(reportParams[param]);
  }).join('&');
  return url.search ? "".concat(reportingEndpoint, "&").concat(paramsString) : "".concat(reportingEndpoint, "?").concat(paramsString);
};

var sendBeacon = function sendBeacon(rawBeacon, reportingEndpoint, reportParams) {
  var beacon = JSON.stringify(rawBeacon);
  var beaconTarget = reportParams ? appendReportParams(reportingEndpoint, reportParams) : reportingEndpoint;

  if (navigator.sendBeacon) {
    var headers = {
      type: 'application/reports+json'
    };
    var blob = new Blob([beacon], headers);
    return new Promise(function (resolve, reject) {
      var beaconResult = navigator.sendBeacon(beaconTarget, blob);
      if (!beaconResult) reject(new Error('Send Beacon failed'));
      resolve();
    });
  }

  return (0, _crossFetch.default)(beaconTarget, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/reports+json'
    },
    body: beacon,
    mode: 'no-cors'
  });
};

var shouldSample = function shouldSample(sampleRate) {
  var randomNumber = Math.floor(Math.random() * 100);
  return randomNumber <= sampleRate;
};

var useWebVitals = function useWebVitals(_ref3) {
  var enabled = _ref3.enabled,
      reportingEndpoint = _ref3.reportingEndpoint,
      _ref3$loggerCallback = _ref3.loggerCallback,
      loggerCallback = _ref3$loggerCallback === void 0 ? noOp : _ref3$loggerCallback,
      _ref3$sampleRate = _ref3.sampleRate,
      sampleRate = _ref3$sampleRate === void 0 ? 100 : _ref3$sampleRate,
      reportParams = _ref3.reportParams;
  var pageLoadTime;

  var _useState = (0, _react.useState)({
    error: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  var shouldSendVitals = enabled && shouldSample(sampleRate);

  var _useNetworkStatus = (0, _reactAdaptiveHooks.useNetworkStatus)(),
      effectiveConnectionType = _useNetworkStatus.effectiveConnectionType;

  var _useHardwareConcurren = (0, _reactAdaptiveHooks.useHardwareConcurrency)(),
      numberOfLogicalProcessors = _useHardwareConcurren.numberOfLogicalProcessors;

  var _useMemoryStatus = (0, _reactAdaptiveHooks.useMemoryStatus)(),
      deviceMemory = _useMemoryStatus.deviceMemory;

  var sendVitals = function sendVitals() {
    var pageExitTime = Date.now();
    var pageAge = pageExitTime - pageLoadTime; // Last chance to get the CLS before sending the beacon.

    (0, _webVitals.getCLS)(updateWebVitals, true);
    var beacon = [_objectSpread(_objectSpread({}, webVitalsBase), {}, {
      age: pageAge,
      body: _objectSpread(_objectSpread({}, vitals), deviceMetrics)
    })];
    sendBeacon(beacon, reportingEndpoint, reportParams).catch(loggerCallback);
  };

  (0, _useEvent.default)('pagehide', shouldSendVitals ? sendVitals : noOp);
  (0, _react.useEffect)(function () {
    try {
      pageLoadTime = Date.now();
      setCurrentUrl();
      updateDeviceMetrics({
        effectiveConnectionType: effectiveConnectionType,
        numberOfLogicalProcessors: numberOfLogicalProcessors,
        deviceMemory: deviceMemory
      });
      (0, _webVitals.getCLS)(updateWebVitals, true); // Setting 'true' will report all CLS changes

      (0, _webVitals.getFID)(updateWebVitals);
      (0, _webVitals.getLCP)(updateWebVitals, true); // Setting 'true' will report all LCP changes

      (0, _webVitals.getFCP)(updateWebVitals);
      (0, _webVitals.getTTFB)(updateWebVitals);
    } catch (_ref4) {
      var message = _ref4.message;
      setStatus({
        error: true,
        message: message
      });
    }
  }, []);
  return status;
};

var _default = useWebVitals;
exports.default = _default;