# ArticleTimestamp

`ArticleTimestamp` renders the publication timestamp for an article and, when
appropriate, a separate last-updated timestamp.

The component reads locale, timezone, calendar, prefix, suffix, and translation
values from `ServiceContext`. Render it inside a `ServiceContextProvider` so
the timestamp uses the active service's formatting rules.

## Usage

```jsx
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ArticleTimestamp from '.';

<ServiceContextProvider service="news">
  <ArticleTimestamp
    firstPublished={1530947227000}
    lastPublished={1552666749637}
  />
</ServiceContextProvider>;
```

`firstPublished` and `lastPublished` are Unix timestamps in milliseconds.

## Behaviour

- Invalid or missing timestamps render nothing.
- Recent timestamps can be rendered using the service's relative-time rules.
- Older timestamps use the service's localized date and time format.
- The last-updated timestamp is rendered only when the article meets the
  component's update and relative-time conditions.
- Service-specific timezones, prefixes, suffixes, scripts, and alternate
  calendars are supported. For example, the Persian service renders the
  alternate date using the Jalali calendar.
- The publication label is visually hidden while remaining available to
  assistive technology.

## Props

| Prop               | Type      | Default | Description                                                             |
| ------------------ | --------- | ------- | ----------------------------------------------------------------------- |
| `firstPublished`   | `number`  | -       | Publication time as a Unix timestamp in milliseconds.                   |
| `lastPublished`    | `number`  | -       | Last update time as a Unix timestamp in milliseconds.                   |
| `popOut`           | `boolean` | `true`  | Chooses the grid wrapper used to position the timestamp.                |
| `minutesTolerance` | `number`  | `0`     | Minimum time difference, in minutes, before an update can be displayed. |
| `className`        | `string`  | `''`    | Optional class name applied to the grid wrapper.                        |
| `hasReadTime`      | `boolean` | `false` | Removes timestamp padding when used alongside read-time content.        |

## Stories

The Storybook stories cover relative and hard-coded timestamp scenarios across
the service and variant matrix, timezone and locale checks, and the Persian
service's Jalali calendar formatting.

## Tests

Run the focused unit tests with:

```sh
yarn jest --runTestsByPath src/app/legacy/containers/ArticleTimestamp/index.test.jsx --selectProjects='Unit Tests' --runInBand
```

The `timeFormatTests` directory contains regression tests for timestamp and
timezone formatting across services.
