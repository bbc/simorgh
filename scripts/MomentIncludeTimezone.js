const rawTimezones = require('moment-timezone/data/packed/latest.json');
const moment = require('moment-timezone/moment-timezone-utils');
const webpack = require('webpack');

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
  const defined = {};

  zones.forEach(zone => {
    const name = zone.split('|')[0].replace('/', '_');
    defined[`Moment_Timezone_${name}`] = JSON.stringify(zone);
  });

  return new webpack.DefinePlugin(defined);
}

module.exports = MomentIncludeTimezone;
