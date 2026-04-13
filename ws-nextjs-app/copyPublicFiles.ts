#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/* 
  Copies /public folder from root directory into the Next.js standalone output folder.
  This allows Next.js to serve the files in public (namely sw.js and manifest.json).
  Excludes the fonts and images directories as these are served from the CDN/static-assets route.
*/

const { cpSync } = require('fs');
const { basename } = require('path');

const EXCLUDED_DIRS = ['fonts', 'images'];

const SRC = '../public';
const DEST = 'build/standalone/ws-nextjs-app/public';

cpSync(SRC, DEST, {
  recursive: true,
  filter: (srcPath: string) => !EXCLUDED_DIRS.includes(basename(srcPath)),
});
