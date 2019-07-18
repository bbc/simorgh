const rawTimezones = require('moment-timezone/data/packed/latest.json');
const moment = require('moment-timezone/moment-timezone-utils');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const hash = require('object-hash');
const fs = require('fs');
const path = require('path');

const cacheVersion = '2';

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

function MomentIncludeTimezone(options = {}) {
  const startYear = options.startYear || -Infinity;
  const endYear = options.endYear || Infinity;

  const { zones } = filteredData(startYear, endYear);

  const cacheDir = findCacheDir({
    name: 'MomentIncludeTimezone',
    create: true,
  });

  const zoneFileMap = {};

  zones.forEach(zone => {
    const zoneName = zone.split('|')[0];
    const zoneFilePath = path.join(
      cacheDir,
      `${cacheVersion}-${hash(zone)}.js`,
    );

    zoneFileMap[zoneName] = zoneFilePath;

    if (!fs.existsSync(zoneFilePath)) {
      const fileContents = `var moment = require("moment-timezone"); moment.tz.add('${zone}');`;
      fs.writeFileSync(zoneFilePath, fileContents);
    }
  });

  return new webpack.NormalModuleReplacementPlugin(
    /^MomentIncludeTimezone(\.*)/,
    resource => {
      const zoneName = resource.request.replace('MomentIncludeTimezone/', '');
      const zoneFilePath = zoneFileMap[zoneName];

      if (!zoneFilePath) {
        throw new Error(
          `\n\nMomentIncludeTimezone: Unknown timezone ${zoneName}.\n`,
        );
      }

      resource.request = zoneFilePath; // eslint-disable-line no-param-reassign
    },
  );
}

module.exports = MomentIncludeTimezone;
