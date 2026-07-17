#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/*
  Copies only CSS files from the Next.js static build output into the standalone
  output folder.

  Used for all non-local builds. Only CSS chunks are required in the standalone
  output — AMP and Lite renders inline CSS at SSR time via getAmpLiteCss, and JS
  assets are served from the CDN for canonical page loads so they do not need to
  be present on the server. Excluding JS significantly reduces the lambda zip size.

  For local builds, use copyStaticFiles.ts which copies all static files.
*/

import { cpSync, lstatSync } from 'fs';
import { extname } from 'path';

const STATIC_SRC = 'build/static';
const STATIC_DEST = 'build/standalone/ws-nextjs-app/public/_next/static';

cpSync(STATIC_SRC, STATIC_DEST, {
  recursive: true,
  filter: (srcPath: string) => {
    if (lstatSync(srcPath).isDirectory()) return true;
    return extname(srcPath) === '.css';
  },
});
