/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
import type { ComponentType } from 'react';

type LoadableFn = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: object,
) => ComponentType<any>;

// eslint-disable-next-line import/no-mutable-exports
let loadable: LoadableFn;

if (process.env.NEXT_RUNTIME) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  loadable = require('next/dynamic').default as LoadableFn;
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  loadable = require('@loadable/component').default as LoadableFn;
}

export default loadable;
