const rawTimezones = require('moment-timezone/data/packed/latest.json');
const moment = require('moment-timezone/moment-timezone-utils');
const writeToNestedFile = require('../writeToNestedFile');

const newZonesData = rawTimezones.zones.map(moment.tz.unpack);
const newLinksData = rawTimezones.links.map(link => link.split('|'));

// newZonesData with all links expanded into their own distinct timezone.
const newZonesDataUnlinked = newLinksData.reduce((zones, link) => {
  const newEntry = { ...newZonesData.find(z => z.name === link[0]) };
  newEntry.name = link[1]; // eslint-disable-line prefer-destructuring
  zones.push(newEntry);
  return zones;
}, newZonesData);

const filteredData = (start, end) =>
  newZonesDataUnlinked.map(zone =>
    moment.tz.pack(moment.tz.filterYears(zone, start, end)),
  );

const writeTimezoneDataToFile = zone => {
  const fileContents = `var moment = require("moment-timezone"); moment.tz.add('${zone}');`;
  const zoneName = zone.split('|')[0];

  writeToNestedFile(`../../tz/${zoneName}.js`, fileContents);
};

const writeNewTimezoneData = (startYear = -Infinity, endYear = Infinity) => {
  const zones = filteredData(startYear, endYear);

  zones.forEach(writeTimezoneDataToFile);
};

module.exports = writeNewTimezoneData;
