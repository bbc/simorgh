// Important: The Pages Router never forwards its CSP nonce to React's Fizz renderer, so the
// inline Suspense reveal scripts ($RB/$RV/$RC and the shell timing script) are
// emitted without one and blocked by a nonce-based CSP. The App Router is unaffected.
// Delete this once the upstream fix lands and Next is upgraded:
// https://github.com/vercel/next.js/issues/96443 (fix: https://github.com/vercel/next.js/pull/97851)
const REACT_FIZZ_INLINE_SCRIPT =
  /<script((?:(?!\snonce=)[^>])*)>(?=\s*(?:\$R[A-Z]|requestAnimationFrame\(function\(\)\{\$RT))/g;

const addNonceToReactFizzScripts = (html: string, nonce: string | undefined) =>
  nonce
    ? html.replace(REACT_FIZZ_INLINE_SCRIPT, `<script nonce="${nonce}"$1>`)
    : html;

export default addNonceToReactFizzScripts;
