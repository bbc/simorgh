import { services } from '#app/lib/config/services/loadableConfig';

describe('Chameleon Logo', () => {
  it.each(services)('should exist for %s', async service => {
    const { default: logo } = await import(`./${service}`);

    expect(logo).not.toBeNull();
  });
});
