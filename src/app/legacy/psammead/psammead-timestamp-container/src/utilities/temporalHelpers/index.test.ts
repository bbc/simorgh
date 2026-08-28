import {
  sanitiseDuration,
  sanitiseLocale,
  withArabicComma,
  translateDigits,
  applyFormat,
} from '.';

describe('Temporal Helper functions', () => {
  describe('sanitiseDuration', () => {
    describe('valid duration input', () => {
      it.each([
        ['PT0S', 0],
        ['PT45S', 45],
        ['PT30M', 1800],
        ['PT1H30M45S', 5445],
      ])('parses %s to %i total seconds', (duration, expectedSeconds) => {
        expect(sanitiseDuration(duration).total({ unit: 'seconds' })).toEqual(
          expectedSeconds,
        );
      });
    });

    describe('invalid duration input', () => {
      it.each(['garbage', ''])(
        'falls back to 0 seconds for invalid duration %p',
        duration => {
          expect(sanitiseDuration(duration).total({ unit: 'seconds' })).toEqual(
            0,
          );
        },
      );
    });

    it('falls back to 0 seconds when Temporal is unavailable', () => {
      const originalTemporal = globalThis.Temporal;
      try {
        // @ts-expect-error - simulating an environment without Temporal support
        delete globalThis.Temporal;
        expect(sanitiseDuration('PT1H30M').total({ unit: 'seconds' })).toEqual(
          0,
        );
      } finally {
        globalThis.Temporal = originalTemporal;
      }
    });
  });

  describe('sanitiseLocale', () => {
    describe('valid locale input', () => {
      it.each([
        ['en-GB', 'en-GB'],
        ['en-gb', 'en-GB'],
        ['en_GB', 'en-GB'],
        ['ar', 'ar'],
        ['fa', 'fa'],
        ['fa_af', 'fa-AF'],
        ['fa-AF', 'fa-AF'],
        ['fa-af', 'fa-AF'],
      ])(
        'normalises %p to %p so the output is a valid BCP 47 language tag',
        (locale, expected) => {
          expect(sanitiseLocale(locale)).toEqual(expected);
        },
      );
    });

    describe('invalid locale input', () => {
      it('falls back to en-GB for an unparseable locale', () => {
        expect(sanitiseLocale('not a locale!!')).toEqual('en-GB');
      });
    });
  });

  describe('withArabicComma', () => {
    it('replaces commas with the Arabic comma', () => {
      expect(withArabicComma('1,234,567')).toEqual('1،234،567');
    });

    it('replaces multiple adjacent commas', () => {
      expect(withArabicComma('1,,2')).toEqual('1،،2');
    });

    it('returns the string unchanged when it has no commas', () => {
      expect(withArabicComma('no commas here')).toEqual('no commas here');
    });
  });

  describe('translateDigits', () => {
    it.each([
      [5, 1, '5'],
      [5, 2, '05'],
      [5, 3, '005'],
      [12, 2, '12'],
    ])(
      'formats %i with minDigits %i as %p for en-GB',
      (value, minDigits, expected) => {
        expect(translateDigits(value, minDigits, 'en-GB')).toEqual(expected);
      },
    );

    it.each([
      ['my', '၀၅'],
      ['bn', '০৫'],
      ['ne', '०५'],
      ['fa', '۰۵'],
      ['fa-AF', '۰۵'],
      ['ps', '۰۵'],
    ])('translates digits into the %p numeral system', (locale, expected) => {
      expect(translateDigits(5, 2, locale)).toEqual(expected);
    });
  });

  describe('locale numbering system overrides', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('forces Eastern Arabic numerals for the `ps` locale', () => {
      const numberFormatSpy = jest.spyOn(Intl, 'NumberFormat');

      translateDigits(5, 2, 'ps');

      expect(numberFormatSpy).toHaveBeenCalledWith(
        'ps-u-nu-arabext',
        expect.objectContaining({
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      );
    });

    it('leaves locales without an explicit override unchanged', () => {
      const numberFormatSpy = jest.spyOn(Intl, 'NumberFormat');

      translateDigits(5, 2, 'fa');

      expect(numberFormatSpy).toHaveBeenCalledWith(
        'fa',
        expect.objectContaining({
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
      );
    });

    it('resolves arabext unicode extension to the Eastern Arabic system', () => {
      expect(
        new Intl.NumberFormat('ps-u-nu-arabext').resolvedOptions()
          .numberingSystem,
      ).toEqual('arabext');
    });
  });

  describe('applyFormat', () => {
    describe('when format is provided', () => {
      it.each([
        ['mm,ss', '05,09'],
        ['h:mm:ss', '1:05:09'],
        ['m', '5'],
      ])('replaces the %p format token', (format, expected) => {
        expect(
          applyFormat({
            format,
            hours: 1,
            minutes: 5,
            seconds: 9,
            sanitisedLocale: 'en-GB',
          }),
        ).toEqual(expected);
      });

      it.each([
        ['mm,ss', '۰۵,۰۹'],
        ['h:mm:ss', '۱:۰۵:۰۹'],
        ['m', '۵'],
      ])(
        'replaces the %p format token for a non en-GB locale',
        (format, expected) => {
          expect(
            applyFormat({
              format,
              hours: 1,
              minutes: 5,
              seconds: 9,
              sanitisedLocale: 'fa',
            }),
          ).toEqual(expected);
        },
      );
    });

    describe('when format is not provided', () => {
      it('uses mm:ss when hours is 0', () => {
        expect(
          applyFormat({
            hours: 0,
            minutes: 5,
            seconds: 9,
            sanitisedLocale: 'en-GB',
          }),
        ).toEqual('05:09');
      });

      it('uses h:mm:ss when hours is greater than 0', () => {
        expect(
          applyFormat({
            hours: 1,
            minutes: 5,
            seconds: 9,
            sanitisedLocale: 'en-GB',
          }),
        ).toEqual('1:05:09');
      });

      it('pads minutes and seconds to 2 digits at the zero boundary', () => {
        expect(
          applyFormat({
            hours: 0,
            minutes: 0,
            seconds: 0,
            sanitisedLocale: 'en-GB',
          }),
        ).toEqual('00:00');
      });

      it.each([
        ['my', '၀၅:၀၉'],
        ['bn', '০৫:০৯'],
        ['ne', '०५:०९'],
        ['fa', '۰۵:۰۹'],
        ['fa-AF', '۰۵:۰۹'],
        ['ps', '۰۵:۰۹'],
      ])('translates digits for locale %p', (sanitisedLocale, expected) => {
        expect(
          applyFormat({ hours: 0, minutes: 5, seconds: 9, sanitisedLocale }),
        ).toEqual(expected);
      });
    });
  });
});
