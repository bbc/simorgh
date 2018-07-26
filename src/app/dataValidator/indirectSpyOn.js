const foo = () => false;
const bar = () => module.exports.foo(true);

module.exports = { foo, bar };
