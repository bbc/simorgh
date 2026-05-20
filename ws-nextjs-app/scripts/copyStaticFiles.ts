#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/*
  Copies the Next.js static build output into the standalone output folder.
  This is only for local development and is not needed for production as the static files are served from the CDN/static-assets route.
*/

import { cpSync } from 'node:fs';

const STATIC_SRC = 'build/static';
const STATIC_DEST = 'build/standalone/ws-nextjs-app/public/_next/static';

cpSync(STATIC_SRC, STATIC_DEST, { recursive: true });
