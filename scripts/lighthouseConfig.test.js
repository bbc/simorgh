const config = require('./lighthouseConfig');

test('extends lighthouse default config', () => {
  expect(config.extends).toEqual('lighthouse:default');
});

test('skips is-on-https check', () => {
  expect(config.settings.skipAudits.includes('is-on-https')).toEqual(true);
});
