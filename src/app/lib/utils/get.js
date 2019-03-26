// A replacement for lodash _get for accessing nested values.
// https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
const get = (path, object) =>
  path.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), object);

export default get;
