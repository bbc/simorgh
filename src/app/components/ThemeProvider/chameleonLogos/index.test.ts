import SERVICES from '#app/lib/config/services';

describe('Chameleon Logo', () => {
  it.each(SERVICES)('should exist for %s', async service => {
    const { default: logo } = await import(`./${service}`);

    expect(logo).not.toBeNull();
  });
});
