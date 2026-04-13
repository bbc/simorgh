#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { cpSync } = require('fs');
const { basename } = require('path');

const EXCLUDED_DIRS = ['fonts', 'images'];

const src = '../public';
const dest = 'build/standalone/ws-nextjs-app/public';

cpSync(src, dest, {
  recursive: true,
  filter: srcPath => !EXCLUDED_DIRS.includes(basename(srcPath)),
});
