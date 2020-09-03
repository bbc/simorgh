const identity = require('ramda/src/identity');
const memoizeWith = require('ramda/src/memoizeWith');

module.exports = memoizeWith(identity, service =>
  fetch(
    `https://toggles.test.api.bbci.co.uk/toggles?application=simorgh&service=${service}&__amp_source_origin=https://www.test.bbc.com`,
    {
      headers: {
        Origin: 'https://www.bbc.co.uk',
      },
    },
  ).then(response => response.json()),
);
