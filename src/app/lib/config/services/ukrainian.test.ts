describe('Ukrainian service timestamp locales', () => {
  it.each([
    {
      variant: 'default',
      expectedTimestamp: '14 лютого 2010, 15:25 GMT',
    },
    {
      variant: 'ru-UA',
      expectedTimestamp: '14 февраля 2010, 15:25 GMT',
    },
  ] as const)(
    'formats $variant timestamps after loading only the Ukrainian service configuration',
    async ({ variant, expectedTimestamp }) => {
      await jest.isolateModulesAsync(async () => {
        const { default: moment } = await import('moment');

        expect(moment.locales()).toEqual(['en']);

        const { service } = await import('./ukrainian');
        const { datetimeLocale, timezone } = service[variant];

        expect(moment.locales()).toContain(datetimeLocale);

        const { formatUnixTimestamp } =
          await import('#psammead/psammead-timestamp-container/src/utilities');

        expect(
          formatUnixTimestamp({
            timestamp: Date.UTC(2010, 1, 14, 15, 25),
            locale: datetimeLocale,
            timezone,
            format: 'D MMMM YYYY, HH:mm z',
          }),
        ).toBe(expectedTimestamp);
      });
    },
  );
});
