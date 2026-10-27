#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/*
  Copies the Next.js static build output into the standalone output folder.

  Required for both local development and production environments. Although static
  JS/CSS assets are served from the CDN for canonical page loads, AMP and Lite
  renders inline CSS directly from the server filesystem at SSR time via
  getAmpLiteCss — so the CSS chunks must be present in the standalone output
  regardless of environment.
*/

import { cpSync } from 'fs';

const STATIC_SRC = 'build/static';
const STATIC_DEST = 'build/standalone/ws-nextjs-app/public/_next/static';

cpSync(STATIC_SRC, STATIC_DEST, { recursive: true });
