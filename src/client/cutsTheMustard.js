/*
 * cutsTheMustard is a method for checking that the current client can support the client-side hydration logic.
 * Current checks are:
 * - window.crypto || window.msCrypto: Mitigates against "undefined window.crypto.getRandomValues" https://caniuse.com/#feat=getrandomvalues
 */

const cutsTheMustard = () => window.crypto || window.msCrypto;

export default cutsTheMustard;
