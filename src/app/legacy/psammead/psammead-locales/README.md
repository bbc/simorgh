This package provides a collection of locale configs, used in BBC World Service sites.

## Exports

### Moment locales

The following [Moment.js](https://momentjs.com/) locales have been added as they do not exist upstream:

- `/moment/am` - locale override for Amharic
- `/moment/ha` - locale for Hausa
- `/moment/ig` - locale for Igbo
- `/moment/om` - locale override for Afaanoromoo
- `/moment/pcm` - locale for Pidgin
- `/moment/ps` - locale for Pashto
- `/moment/rw` - locale for Gahuza
- `/moment/so` - locale for Somali
- `/moment/ti` - locale for Tigrinya

The following locales have overrides to meet BBC World Service requirements where these differ from the upstream locale. Note that importing them will also cause the upstream locale to be loaded.

- `/moment/ar` - locale override for Arabic
- `/moment/az` - locale override for Azeri
- `/moment/bn` - locale override for Bengali
- `/moment/es` - locale override for Mundo
- `/moment/gu` - locale override for Gujarati
- `/moment/hi` - locale override for Hindi
- `/moment/ky` - locale override for Kyrgyz
- `/moment/mr` - locale override for Marathi
- `/moment/ne` - locale override for Nepali
- `/moment/pa-in` - locale override for Punjabi
- `/moment/pt-br` - locale override for Brasil
- `/moment/ru` - locale override for Russian
- `/moment/si` - locale override for Sinhala
- `/moment/sr` - locale override for Serbian (Latin)
- `/moment/sr-cyrl` - locale override for Serbian (Cyrillic)
- `/moment/sw` - locale override for Swahili
- `/moment/ta` - locale override for Tamil
- `/moment/th` - locale override for Thai
- `/moment/uk` - locale override for Ukrainian
- `/moment/ur` - locale override for Urdu
- `/moment/uz` - locale override for Uzbek (Cyrillic)
- `/moment/uz-latn` - locale override for Uzbek (Latin)
- `/moment/yo` - locale override for Yoruba
- `/moment/zh-tw` - locale override for Zhongwen (Simplified & Traditional)

The following locales have overrides to meet BBC World Service requirements where these differ from the upstream locale, but we wish to keep the both the upstream and the new locale separate (extension rather than override). Note that importing them will also cause the upstream locale to be loaded.

- `/moment/fa-af` - locale for Dari, extends the `fa` locale for Persian

### Numerals

#### Numeral systems

`/numerals` - Numerals in several different number systems, e.g. Bengali, Burmese, Eastern Arabic, Western Arabic. This can be used for localised numbers for components. Returns arrays of the format `['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];`

These can either be imported and used directly or in conjunction with the `makeNumeralTranslator` helper function below.

#### `makeNumeralTranslator(system)`

`makeNumeralTranslator` is a small helper that returns a function that translates any 'Western' Arabic numerals in the input string into the specified numeral system.

It accepts one argument `system` which is an array of numeral system symbols such as one of the ones above, and returns a translator function. If the argument is omitted or an invalid numeral system is supplied then the translator returns input strings unchanged. Note that currently only the first 10 symbols from the array are used.

For an example see Usage, below.

## Usage

### Moment locales

```jsx
import moment from 'moment';
import '#psammead/psammead-locales/moment/ig';

moment.locale('ig');
```

### Numerals

```jsx
import {
  Bengali,
  makeNumeralTranslator,
} from '#psammead/psammead-locales/numerals';

const translateNumerals = makeNumeralTranslator(Bengali);
const result = translateNumerals(someInput); // returns someInput with numbers translated to Bengali
```

## Instructions for adding and updating locales

### Adding a new locale

Adding a new locale is necessary when the locale is not already supported by Moment.js i.e. there is no matching locale in the [Moment.js library](https://github.com/moment/moment/tree/develop/src/locale)

- Copy [src/app/legacy/psammead/psammead-locales/moment/templates/new-locale](./moment/templates/new-locale), paste into the [src/app/legacy/psammead/psammead-locales/moment](./moment/) folder and rename folder to match the desired locale e.g. [`pcm` for Pidgin](./moment/pcm)
- Use `moment.defineLocale('new-locale', { ... })` to define the [required locale fields](#required-locale-fields)
- Update `index.test.ts` as required - replacing `new-locale` with the desired locale & fixing test assertions
- [Import the new locale file into the service config](#import-locale-into-service-configuration) for the new service or the service which requires a new locale

### Updating / overwriting an existing locale

Overwriting a locale is necessary when the default Moment.js locale does not meet editorial or UX requirements e.g. when formatting needs to be more culturally accurate or simplified for a specific audience.

- Copy [src/app/legacy/psammead/psammead-locales/moment/templates/update-locale](./moment/templates/update-locale), paste into the [src/app/legacy/psammead/psammead-locales/moment](./moment/) folder and rename folder to match the desired locale e.g. [`zh-tw` for Zhongwen](./moment/zh-tw)
- Use `moment.updateLocale('update-locale', { ... })` to override any/all of the [required locale fields](#required-locale-fields)
- Update `index.test.ts` as required - replacing `update-locale` with the desired locale & fixing test assertions
- [Import the new locale file into the service config](#import-locale-into-service-configuration) for the new service or the service which requires an updated locale

### Extending an existing locale

Extending a locale is necessary Use creating a regional variant that mostly reuses an existing Moment.js locale.

- Copy [src/app/legacy/psammead/psammead-locales/moment/templates/extend-locale](./moment/templates/extend-locale), paste into the [src/app/legacy/psammead/psammead-locales/moment](./moment/) folder and rename folder to match the desired locale e.g. [`fa-af` for Dari](./moment/fa-af)
- Use `moment.defineLocale('extend-locale', { parentLocale: 'base-locale', ... })` to override any/all of the [required locale fields](#required-locale-fields)
- Update `index.test.ts` as required - replacing `extend-locale` with the desired locale & fixing test assertions
- [Import the new locale file into the service config](#import-locale-into-service-configuration) for the new service or the service which requires an extended locale

### Required Locale Fields

- `months`: array of 12 months in chronological order from January -> December
- `longDateFormat`
  - `LL`: date, full month name + year
  - `LLL`: date, full month name, year + time (hours & minutes)
- `relativeTime`
  - `past`: x ago
  - `m`: 1 minute
  - `mm`: x minutes
  - `h`: 1 hour
  - `hh`: x hours

### Import Locale into Service Configuration

In `src/app/lib/config/services/<service>.ts`

```jsx
import '#psammead/psammead-locales/moment/locale-name';

export default {
  ...
  datetimeLocale: 'locale-name',
  ...
}
```

## Locales with Alternative Calendars

Pashto & Persian use the Jalaali calendar to display dates according to both the Gregorian & Jalaali date formats.

The following configuration is required:

- [Add or update a locale according to the instructions](#instructions-for-adding-and-updating-locales)
- In the `src/app/lib/config/<service>.ts` file, import the Jalaali calendar

```jsx
import jalaali from '#psammead/psammead-calendars/src';

export default {
  ...
  altCalendar: jalaali,
  ...
};
```

- Add or import the Jalaali months for the locale and add to [`jalaaliMonths`](https://github.com/bbc/simorgh/blob/ad1fc108fd4ae237d61460a86aede2ac573e5a7c/src/app/legacy/psammead/psammead-calendars/src/calendars/jalaali.js#L8-L25)
