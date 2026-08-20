# Turbopack migration: Phase 0 webpack baseline

This is the behavioural contract for the current webpack implementation. It is
the comparison point for later bundler work; it is not an implementation plan.

## Scope and non-goals

Phase 0 records the current behaviour for representative canonical, AMP, and
Lite article responses, CSS extraction, and development HMR. A later phase may
use this document to compare output and test results.

This phase does not change application code, Next configuration, scripts,
dependencies, snapshots, or generated build output. It does not introduce a
Turbopack path or require pixel-perfect visual approval.

## Representative fixture matrix

The paths and route metadata below are taken from the existing integration
fixtures. A test that is not listed for a mode is not evidence that the mode is
supported for that fixture.

| Case | Service and route | Canonical | AMP | Lite | Why it is included |
| --- | --- | --- | --- | --- | --- |
| Normal article, LTR | `/news/articles/c0g992jmmkko` (`news`) | [`integration/pages/articles/news/canonical.test.ts`](../integration/pages/articles/news/canonical.test.ts) | [`integration/pages/articles/news/amp.test.ts`](../integration/pages/articles/news/amp.test.ts) | — | Canonical/AMP article comparator; English LTR service. |
| CSS-focused normal article, LTR | `/mundo/articles/ce42wzqr2mko` (`mundo`) | — | [`integration/pages/articles/mundo/amp.test.ts`](../integration/pages/articles/mundo/amp.test.ts) | [`integration/pages/articles/mundo/lite.test.ts`](../integration/pages/articles/mundo/lite.test.ts) | Existing inlined-CSS assertions exercise both inlining modes. |
| Media article, LTR | `/pidgin/articles/cw0x29n2pvqo` (`pidgin`) | [`integration/pages/mediaArticlePage/pidgin/canonical.test.ts`](../integration/pages/mediaArticlePage/pidgin/canonical.test.ts) | [`integration/pages/mediaArticlePage/pidgin/amp.test.ts`](../integration/pages/mediaArticlePage/pidgin/amp.test.ts) | — | Exercises a media page whose rendered dynamic imports can add CSS. |
| Normal article, RTL | `/persian/articles/c4vlle3q337o` (`persian`) | [`integration/pages/articles/persian/canonical.test.ts`](../integration/pages/articles/persian/canonical.test.ts) | [`integration/pages/articles/persian/amp.test.ts`](../integration/pages/articles/persian/amp.test.ts) | — | RTL theme, typography, and direction-sensitive output. |
| Lite-only article fixture | `/gahuza/articles/cey23zx8wx8o` (`gahuza`) | — | — | [`integration/pages/articles/gahuzaLiteSite/lite.test.ts`](../integration/pages/articles/gahuzaLiteSite/lite.test.ts) | Confirms the existing Lite-only fixture remains available. |

The AMP and Lite integration projects are selected by filename in
[`jest.config.ts`](../jest.config.ts): `*.amp.test.ts` and `*.lite.test.ts`.
Canonical selection excludes both of those suffixes.

## Baseline invariants

These are pass/fail properties, not implementation details that a future
bundler must reproduce byte-for-byte.

| Area | Current invariant and evidence |
| --- | --- |
| Emotion CSS | SSR critical Emotion CSS is present in canonical output as `<style data-emotion="...">`. For AMP/Lite it is included in the renderer's inline styles. The `css` value is extracted by `@emotion/server` in [`pages/_document.page.tsx`](../pages/_document.page.tsx). |
| CSS Modules / hashed classes | CSS Module rules needed by AMP/Lite are in the inline CSS and retain css-loader's hashed class names (the integration assertion uses `/\.[A-Za-z]+_[a-zA-Z]+__[A-Za-z0-9]+/`). The same class names must match the rendered DOM. Canonical pages continue to use Next's normal CSS chunks. |
| Theme variables | AMP's `<style amp-custom>` and Lite's inline `<style>` contain at least `--brand-background` and `--sans-regular-font-family`; these are asserted by [`integration/common/inlinedCss.amp.ts`](../integration/common/inlinedCss.amp.ts) and [`integration/common/inlinedCss.lite.ts`](../integration/common/inlinedCss.lite.ts). |
| Font faces | AMP/Lite inline CSS contains `@font-face` and `font-family:ReithSans`, as asserted by the same inlined-CSS tests. |
| External stylesheets | AMP/Lite must not depend on an external CSS stylesheet for page styling: required page CSS is in the inline style (`amp-custom` for AMP, a head `<style>` for Lite). Non-CSS metadata/alternate links may still be present. Canonical output may load CSS chunks through `<link>` tags. |
| Dynamic media CSS | Production extraction combines the current page's static manifest CSS with CSS files associated with `__NEXT_DATA__.dynamicIds` in `build/react-loadable-manifest.json`; see [`utilities/getAmpLiteCss/index.ts`](../utilities/getAmpLiteCss/index.ts). Compare the normal article and media-article AMP responses so media-only CSS is present when the media component renders and does not become a requirement for the normal article. |
| Canonical isolation | In [`pages/_document.page.tsx`](../pages/_document.page.tsx), only `isAmp && pageType === 'article'` and `isLite` call `getAmpLiteCss`. Canonical rendering takes the default branch, does not read `__NEXT_DATA__` for CSS extraction, and must remain independent of AMP/Lite CSS failures. |

In development, the existing webpack loader writes the accumulated CSS Module
and global SCSS output to `build/dev-css-modules.css`; the development branch
of `getAmpLiteCss` reads that file. In production, it reads emitted CSS files
through the build and React Loadable manifests. This distinction is part of
the baseline being measured.

## Existing verification commands

Run commands from the repository root unless a different directory is shown.
The direct integration project commands require an app already serving on
`http://localhost:7081`; the root integration command builds and starts the
app itself.

Focused unit coverage for the extraction boundary and its webpack helpers:

```sh
yarn jest --runInBand --reporters=default \
  --testPathPatterns='ws-nextjs-app/(utilities/getAmpLiteCss/index|scripts/(DevCssExtractLoader|webpackDevLoaderUtils))\.test\.(ts|tsx)$'
```

With the app running, run the representative integration projects from
`ws-nextjs-app`:

```sh
cd ws-nextjs-app
yarn test:integration:canonical --runTestsByPath \
  integration/pages/articles/news/canonical.test.ts \
  integration/pages/mediaArticlePage/pidgin/canonical.test.ts \
  integration/pages/articles/persian/canonical.test.ts

yarn test:integration:amp --runTestsByPath \
  integration/pages/articles/news/amp.test.ts \
  integration/pages/articles/mundo/amp.test.ts \
  integration/pages/mediaArticlePage/pidgin/amp.test.ts \
  integration/pages/articles/persian/amp.test.ts

yarn test:integration:lite --runTestsByPath \
  integration/pages/articles/mundo/lite.test.ts \
  integration/pages/articles/gahuzaLiteSite/lite.test.ts
```

The existing full integration orchestration (build, start, all three Jest
projects, stop) is:

```sh
# repository root
yarn test:integration
```

AMP validator and production smoke commands use the existing root and app
scripts:

```sh
# repository root; an app must be serving on localhost:7081
yarn amp:validate

cd ws-nextjs-app
yarn build:local
yarn start
```

`yarn amp:validate` validates the fixed URL list in
[`scripts/ampHtmlValidator/validator/index.js`](../../scripts/ampHtmlValidator/validator/index.js)
and also checks the AMP manifest. `yarn build:local` is the current webpack
production build and `yarn start` serves its standalone output on port 7081.

## Manual development/HMR checks

Use a clean working tree for the two temporary edits, or record and preserve
any pre-existing diff in the files before starting. Do not commit either edit.

1. From `ws-nextjs-app`, run `yarn dev` and wait for the server on port 7081.
2. Capture the initial responses for the matrix's `mundo` route:
   `/mundo/articles/ce42wzqr2mko` (canonical), `.amp`, and `.lite`. Confirm the
   expected style container for each mode and note the initial contents of
   `build/dev-css-modules.css`.
3. CSS Module HMR: from the repository root, in
   `src/app/components/Curation/Subhead/index.module.scss`, add a temporary
   declaration such as `outline: 0.125rem solid magenta;` inside `.h2`.
   Save, wait for Fast Refresh, and confirm that the CSS file and the AMP/Lite
   inline CSS change without duplicated old rules. If the fixture renders a
   Curation subhead, confirm the updated rule is applied to its hashed class.
4. Restore the exact original CSS Module line(s), save, and confirm the
   temporary rule disappears after the next rebuild.
5. Global/theme SCSS HMR: from the repository root, in
   `src/app/components/ThemeProviderSCSSModules/themes/mundo/palette.scss`,
   temporarily change `--brand-background: #{palette.$postbox};` to
   `--brand-background: #{palette.$bluejay};`. Save and confirm the updated
   custom-property value reaches `build/dev-css-modules.css` and the AMP/Lite
   inline CSS.
6. Restore the original `palette.$postbox` expression and confirm the original
   value returns. Check `git diff --` for both temporary-edit paths and leave
   them exactly as they were before this check. Stop the server with the
   existing `yarn stop` command when finished.

For each edit, a pass requires the changed value to appear after HMR and the
restored value to appear after the revert. A failure includes missing or stale
CSS, duplicate rules, an AMP/Lite extraction failure affecting canonical
rendering, or a server/runtime error.

## Phase 0 evidence

| Checkpoint | Command/fixture | Expected evidence | Result (PASS/FAIL) | Notes or artifact location |
| --- | --- | --- | --- | --- |
| Focused unit extraction tests | Focused `yarn jest` command above | All selected tests pass. | PASS | 3 suites, 77 tests passed on 2026-08-20. |
| Targeted lint | `yarn eslint ws-nextjs-app/integration/common/inlinedCss.amp.ts ws-nextjs-app/integration/common/inlinedCss.lite.ts` | New baseline assertions satisfy the existing lint rules. | PASS | No lint findings. |
| Canonical integration | `test:integration:canonical` matrix above | Selected canonical fixtures pass; canonical CSS remains isolated. | FAIL | 355/357 tests passed. The `news` and `persian` image snapshots contain the pre-existing Emotion class `css-1seqhu9`; current output is `css-59yr1u`. No snapshots were updated. |
| AMP integration | `test:integration:amp` matrix above | Selected AMP fixtures pass; inline CSS invariants pass. | PASS | 4 suites, 355 tests, and 164 snapshots passed, including the new no-external-Next-CSS assertion. |
| Lite integration | `test:integration:lite` matrix above | Selected Lite fixtures pass; inline CSS invariants pass. | FAIL | The CSS-focused `mundo` fixture passed. The `gahuzaLiteSite` fixture failed only because existing Emotion class hashes differ from its snapshot; 8/9 tests passed. No snapshots were updated. |
| AMP validator | `yarn amp:validate` | Validator and manifest checks pass. | PASS | 6/6 pages passed and all 5 manifest comparisons passed. Local HTTP service-worker URL diagnostics were reported but are treated as passing by the existing validator. |
| Production webpack smoke | `yarn build:local`, `yarn start` | Build completes and representative routes serve. | PASS | Next 16.2.11 webpack build completed. Mundo canonical, AMP, and Lite returned HTTP 200; AMP/Lite contained inline CSS Modules, theme variables, and fonts without a Next stylesheet link. Canonical retained its Next stylesheet link. |
| CSS Module HMR | Manual step 3 above | Changed rule appears once, then disappears on revert. | PASS | Temporary `outline` appeared in `build/dev-css-modules.css` and Mundo AMP/Lite responses, then disappeared after exact source reversion. |
| Global/theme SCSS HMR | Manual step 5 above | Changed custom property reaches AMP/Lite, then reverts. | PASS | Temporary Mundo `--brand-background: #0f556c` appeared in the development CSS and AMP/Lite responses, then disappeared after exact source reversion. |

The baseline was run after `yarn install --immutable` restored the lockfile's
Next.js 16.2.11 dependency state. Existing warnings included duplicate Jest
haste names from `build/standalone`, the `optimiseCssPrefixes` browserslist
import warning, and Next's custom-Document warning for the specialised
AMP/Lite renderers. These are recorded baseline conditions, not Turbopack
migration regressions.
