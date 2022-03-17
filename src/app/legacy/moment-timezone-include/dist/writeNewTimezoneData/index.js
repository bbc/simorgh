"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rawTimezones = require('moment-timezone/data/packed/latest.json');

var moment = require('moment-timezone/moment-timezone-utils');

var writeToNestedFile = require('../writeToNestedFile');

var newZonesData = rawTimezones.zones.map(moment.tz.unpack);
var newLinksData = rawTimezones.links.map(function (link) {
  return link.split('|');
}); // newZonesData with all links expanded into their own distinct timezone.

var newZonesDataUnlinked = newLinksData.reduce(function (zones, link) {
  var newEntry = _objectSpread({}, newZonesData.find(function (z) {
    return z.name === link[0];
  }));

  newEntry.name = link[1]; // eslint-disable-line prefer-destructuring

  zones.push(newEntry);
  return zones;
}, newZonesData);

var filteredData = function filteredData(start, end) {
  return newZonesDataUnlinked.map(function (zone) {
    return moment.tz.pack(moment.tz.filterYears(zone, start, end));
  });
};

var writeTimezoneDataToFile = function writeTimezoneDataToFile(zone) {
  var fileContents = "var moment = require(\"moment-timezone\"); moment.tz.add('".concat(zone, "');");
  var zoneName = zone.split('|')[0];
  writeToNestedFile("../../tz/".concat(zoneName, ".js"), fileContents);
};

var writeNewTimezoneData = function writeNewTimezoneData() {
  var startYear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -Infinity;
  var endYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var zones = filteredData(startYear, endYear);
  zones.forEach(writeTimezoneDataToFile);
};

module.exports = writeNewTimezoneData;