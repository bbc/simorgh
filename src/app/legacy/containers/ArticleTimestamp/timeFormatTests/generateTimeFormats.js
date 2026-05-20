// biome-ignore-all lint/suspicious/noEmptyBlockStatements: we want this
import fs from 'node:fs';
import path from 'node:path';

import services from '../../../../../server/utilities/serviceConfigs';
import { format, timestampsFixtures } from './testUtils';

const filePath = path.join(__dirname, './expectedFormats.json');

const generateTimeFormats = () => {
  const timeFormats = {};
  Object.keys(services).forEach(service => {
    const variants = Object.keys(services[service]);
    timeFormats[service] = {};
    variants.forEach(variant => {
      const { datetimeLocale, timezone, altCalendar } =
        services[service][variant];
      timeFormats[service][variant] = {};
      Object.keys(timestampsFixtures).forEach(fixture => {
        const timeStamp = format({
          datetimeLocale,
          timezone,
          fixture,
          altCalendar,
        });

        timeFormats[service][variant][fixture] = timeStamp;
      });
    });
  });
  const generatedJSON = JSON.stringify(timeFormats, null, 2);
  fs.writeFile(filePath, generatedJSON, 'utf8', error => {
    if (!error) {
    } else {
    }
  });
};

generateTimeFormats();
