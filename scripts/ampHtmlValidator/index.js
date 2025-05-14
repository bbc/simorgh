/* eslint-disable no-console */
/* eslint-disable import/extensions */
import checkManifest from './checkManifest/index.js';
import { runValidator } from './validator/index.js';
await runValidator();
await checkManifest();
