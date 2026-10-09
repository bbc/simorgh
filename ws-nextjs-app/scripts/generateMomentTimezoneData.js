import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const writeNewTimezoneData = require('../../src/app/legacy/psammead/moment-timezone-include/src/writeNewTimezoneData');

const START_YEAR = 2010;
const END_YEAR = 2026;

writeNewTimezoneData(START_YEAR, END_YEAR);
