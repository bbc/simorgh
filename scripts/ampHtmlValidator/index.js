/* eslint-disable no-console */
/* eslint-disable import/extensions */
import checkManifest from './checkManifest/index.js';
import { runValidator } from './validator/index.js';

console.log(`\nAMP Validation: scripts/ampHtmlValidator/validator/index.js`);
await runValidator();

console.log(
  `\nAMP Manifest File: scripts/ampHtmlValidator/checkManifest/index.js`,
);
await checkManifest();
