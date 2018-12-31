import fetch from 'jest-fetch-mock'; // eslint-disable-line import/no-extraneous-dependencies

global.fetch = fetch;
process.env.ASSETS_MANIFEST = 'mockBundleAssets.json';
