import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';
import dotenv from 'dotenv';

global.fetch = fetch;
dotenv.config({ path: './env-config/local.env' }); // for testing point dotenv to `local.env` rather than default `.env`

process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../../../server/assets/fixture.json',
);
