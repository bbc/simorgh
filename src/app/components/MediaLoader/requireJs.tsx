import Script from 'next/script';
import { MEDIA_PLAYER_STATUS } from '#app/lib/logger.const';
import nodeLogger from '../../lib/logger.node';

type BumpLoaderProps = {
  nonce?: string | null;
};

export type RequireJs = NonNullable<Window['requirejs']>;

const REQUIRE_JS_SRC =
  'https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js';
const BUMP_SRC = 'https://emp.bbci.co.uk/emp/bump-4/bump-4';
const REQUIRE_JS_SCRIPT_ID = 'simorgh-requirejs';

type RequireJsListener = {
  resolve: (readiness: RequireJsReadiness) => void;
};

type RequireJsReadiness =
  | { status: 'ready'; requireJs: RequireJs }
  | { status: 'failed'; error: unknown };

type RequireJsWait = {
  promise: Promise<RequireJsReadiness>;
  cancel: () => void;
};

const logger = nodeLogger(__filename);

let configuredRequireJs: RequireJs | undefined;
let failedRequireJs: RequireJs | null | undefined;
let requireJsFailure: unknown;
const requireJsListeners = new Set<RequireJsListener>();

const getRequireJs = () =>
  typeof window === 'undefined' ? undefined : window.requirejs;

const resetRequireJsStateIfNeeded = (requireJs: RequireJs | undefined) => {
  if (
    requireJs &&
    ((configuredRequireJs && configuredRequireJs !== requireJs) ||
      (failedRequireJs !== undefined && failedRequireJs !== requireJs))
  ) {
    configuredRequireJs = undefined;
    failedRequireJs = undefined;
    requireJsFailure = undefined;
  }
};

const failRequireJs = (error: unknown) => {
  const requireJs = getRequireJs();
  const failedRequireJsKey = requireJs || null;

  if (failedRequireJs === failedRequireJsKey) return;

  configuredRequireJs = undefined;
  failedRequireJs = failedRequireJsKey;
  requireJsFailure = error;
  requireJsListeners.forEach(({ resolve }) =>
    resolve({ status: 'failed', error }),
  );
  requireJsListeners.clear();
  logger.error(MEDIA_PLAYER_STATUS, error);
};

const configureRequireJs = (): RequireJs => {
  const requireJs = getRequireJs();

  if (!requireJs) {
    const error = new Error('RequireJS did not load');
    failRequireJs(error);
    throw error;
  }

  resetRequireJsStateIfNeeded(requireJs);

  if (configuredRequireJs === requireJs) return requireJs;
  if (failedRequireJs === requireJs) throw requireJsFailure;

  try {
    requireJs.config({
      paths: { 'bump-4': BUMP_SRC },
      waitSeconds: 30,
    });
    configuredRequireJs = requireJs;
    failedRequireJs = undefined;
    requireJsFailure = undefined;
    requireJsListeners.forEach(({ resolve }) =>
      resolve({ status: 'ready', requireJs }),
    );
    requireJsListeners.clear();
    return requireJs;
  } catch (error) {
    failRequireJs(error);
    throw error;
  }
};

const handleRequireJsReady = (requireJsShouldExist = false) => {
  if (!getRequireJs()) {
    if (requireJsShouldExist && failedRequireJs === undefined) {
      failRequireJs(new Error('RequireJS did not load'));
    }
    return;
  }

  try {
    configureRequireJs();
  } catch {
    // Configuration errors are logged by failRequireJs.
  }
};

const handleRequireJsError = (error: unknown) => {
  failRequireJs(error);
};

export const waitForRequireJs = (): RequireJsWait => {
  const requireJs = getRequireJs();
  resetRequireJsStateIfNeeded(requireJs);

  if (requireJs && configuredRequireJs === requireJs) {
    return {
      promise: Promise.resolve({ status: 'ready', requireJs }),
      cancel: () => undefined,
    };
  }

  if (
    failedRequireJs !== undefined &&
    (!requireJs || failedRequireJs === requireJs)
  ) {
    return {
      promise: Promise.resolve({
        status: 'failed',
        error: requireJsFailure,
      }),
      cancel: () => undefined,
    };
  }

  if (requireJs) {
    try {
      return {
        promise: Promise.resolve({
          status: 'ready',
          requireJs: configureRequireJs(),
        }),
        cancel: () => undefined,
      };
    } catch (error) {
      return {
        promise: Promise.resolve({ status: 'failed', error }),
        cancel: () => undefined,
      };
    }
  }

  let listener: RequireJsListener;
  const promise = new Promise<RequireJsReadiness>(resolve => {
    listener = { resolve };
    requireJsListeners.add(listener);
  });

  return {
    promise,
    cancel: () => requireJsListeners.delete(listener),
  };
};

export const BumpLoader = ({ nonce }: BumpLoaderProps) => (
  <Script
    id={REQUIRE_JS_SCRIPT_ID}
    strategy="afterInteractive"
    nonce={nonce || undefined}
    src={REQUIRE_JS_SRC}
    onLoad={() => handleRequireJsReady(true)}
    onReady={handleRequireJsReady}
    onError={handleRequireJsError}
  />
);
