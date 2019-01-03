import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';

global.fetch = fetch;
process.env.BASE_URL = 'http://localhost:7080';
process.env.PUBLIC_DIR = 'build/public';
process.env.ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../../../server/assets/fixture.json',
);
