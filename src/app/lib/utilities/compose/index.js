/*
 * © Andrew Clark https://github.com/acdlite
 * https://github.com/acdlite/recompose
 */

const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);

export default compose;
