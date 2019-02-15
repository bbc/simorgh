import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';

global.fetch = fetch;

process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../../../server/assets/fixture.json',
);
