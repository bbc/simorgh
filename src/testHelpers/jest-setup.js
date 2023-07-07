import fetch from 'jest-fetch-mock';
import path from 'path';
import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

// etc
/*
 * Mock to avoid async behaviour in tests
 */
jest.mock('#contexts/ServiceContext');

globalThis.Cypress = {
  env: jest.fn(),
};

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: true,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

globalThis.fetch = fetch;
globalThis.document.domain = 'www.bbc.com';

process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN = 'http://localhost:7080';
process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH = '/';
process.env.SIMORGH_ASSETS_MANIFEST_PATH = path.resolve(
  __dirname,
  '../server/assets/fixture.json',
);
