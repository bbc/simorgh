#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { cpSync } = require('fs');
const { basename } = require('path');

const EXCLUDED_DIRS = ['fonts', 'images'];

const SRC = '../public';
const DEST = 'build/standalone/ws-nextjs-app/public';

cpSync(SRC, DEST, {
  recursive: true,
  filter: (srcPath: string) => !EXCLUDED_DIRS.includes(basename(srcPath)),
});
