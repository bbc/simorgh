const rawTimezones = require('moment-timezone/data/packed/latest.json');
const moment = require('moment-timezone/moment-timezone-utils');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const hash = require('object-hash');
const fs = require('fs');
const path = require('path');

const cacheVersion = '2';

const cacheDir = findCacheDir({
  name: 'MomentIncludeTimezone',
  create: true,
});

const newZonesData = rawTimezones.zones.map(moment.tz.unpack);
const newLinksData = rawTimezones.links.map(link => link.split('|'));

const filteredData = (start, end) =>
  moment.tz.filterLinkPack(
    {
      version: rawTimezones.version,
      zones: newLinksData.reduce((zones, link) => {
        const newEntry = { ...newZonesData.find(z => z.name === link[0]) };
        newEntry.name = link[1]; // eslint-disable-line prefer-destructuring
        zones.push(newEntry);
        return zones;
      }, newZonesData),
      links: [],
    },
    start,
    end,
  );

const writeToFile = (contents, extension) => {
  const newPath = path.join(
    cacheDir,
    `${cacheVersion}-${hash(contents)}.${extension}`,
  );

  if (!fs.existsSync(newPath)) {
    fs.writeFileSync(newPath, contents);
  }

  return newPath;
};

const replaceOriginalData = () => {
  const emptyFile = `{ "version": "${rawTimezones.version}", "zones": [], "links": [] }`;

  return writeToFile(emptyFile, 'json');
};

const replaceNewInclude = (request, zoneFileMap) => {
  const zoneName = request.replace('MomentIncludeTimezone/', '');
  const zoneFilePath = zoneFileMap[zoneName];

  if (!zoneFilePath) {
    throw new Error(
      `\n\nMomentIncludeTimezone: Unknown timezone ${zoneName}.\n`,
    );
  }

  return zoneFilePath; // eslint-disable-line no-param-reassign
};

const writeNewTimezoneData = (startYear, endYear) => {
  const { zones } = filteredData(startYear, endYear);

  const zoneFileMap = {};

  zones.forEach(zone => {
    const fileContents = `var moment = require("moment-timezone"); moment.tz.add('${zone}');`;
    const zoneName = zone.split('|')[0];

    zoneFileMap[zoneName] = writeToFile(fileContents, 'js');
  });

  return zoneFileMap;
};

function MomentIncludeTimezone(options = {}) {
  const startYear = options.startYear || -Infinity;
  const endYear = options.endYear || Infinity;

  const zoneFileMap = writeNewTimezoneData(startYear, endYear);

  return new webpack.NormalModuleReplacementPlugin(
    /(^MomentIncludeTimezone(\.*)|data[\\/]packed[\\/]latest\.json$)/,
    resource => {
      if (resource.context.match(/node_modules[\\/]moment-timezone$/)) {
        // eslint-disable-next-line no-param-reassign
        resource.request = replaceOriginalData();
      } else {
        // eslint-disable-next-line no-param-reassign
        resource.request = replaceNewInclude(resource.request, zoneFileMap);
      }
    },
  );
}

module.exports = MomentIncludeTimezone;
