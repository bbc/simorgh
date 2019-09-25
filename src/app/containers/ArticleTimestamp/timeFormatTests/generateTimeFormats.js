import fs from 'fs';
import path from 'path';
import { timestampsFixtures, format } from './testUtils';
import services from '../../../../testHelpers/serviceConfigs';

const testsServces = ['news', 'persian', 'igbo', 'arabic'];

const filePath = path.join(__dirname, './expectedFormats.json');

const generateTimeFormats = () => {
  const timeFormats = {};
  Object.keys(services).forEach(service => {
    if (testsServces.includes(service)) {
      const { datetimeLocale, timezone } = services[service].default;
      timeFormats[service] = {};
      Object.keys(timestampsFixtures).forEach(fixture => {
        const timeStamp = format(datetimeLocale, timezone, fixture);
        timeFormats[service][fixture] = timeStamp;
      });
    }
  });
  const generatedJSON = JSON.stringify(timeFormats, null, 2);
  fs.writeFile(filePath, generatedJSON, 'utf8', error => {
    if (!error) {
      // eslint-disable-next-line no-console
      console.info('done');
    } else {
      // eslint-disable-next-line no-console
      console.info('An Error Occurred -- ', error);
    }
  });
};

generateTimeFormats();
