# usePolling

A generic hook that repeatedly polls an endpoint on a fixed interval and returns
the latest data. It owns the timer, fetch and state mechanics, while each caller
supplies the endpoint-specific details (what to request and which part of the
response to keep).

This serves as a replacement for the previously individual polling hooks used in live pages (specfically [`useLivePagePolling`](https://github.com/bbc/simorgh/tree/05eb3ad92a10256426ef99a26554bd89aa7d36bc/src/app/hooks/useLivePagePolling) and [`useSportDataPolling`](https://github.com/bbc/simorgh/tree/05eb3ad92a10256426ef99a26554bd89aa7d36bc/src/app/hooks/useSportDataPolling)).

## Usage

```tsx
const currentSportData = usePolling<
  { sportDataEvent: HeadToHeadV2Data },
  HeadToHeadV2Data
>({
  initialData: initialSportData,
  enabled: Boolean(sportHeaderPollEnabled) && isSportDataLive,
  endpoint: 'sport',
  params: { sportDataEventUrn: encodeURIComponent(initialSportData.urn) },
  returnedData: response => response.sportDataEvent,
});
```

## Type parameters

| Name        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `TResponse` | Shape of `response.data` returned by `fetchPolledData` for the endpoint. |
| `TData`     | Shape of the value the hook stores and returns.                          |

## Props

| Prop           | Type                                                  | Description                                                                                                                                                                                                 |
| -------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initialData`  | `TData`                                               | The value returned before the first successful poll (typically the server-rendered data).                                                                                                                   |
| `enabled`      | `boolean`                                             | Whether polling should run. When `false`, no interval is created and no requests are made. Fold any caller-specific gating (feature toggles, page state) in here. This is usually tied to a feature toggle. |
| `endpoint`     | `string`                                              | The poll-data module to request, passed to `fetchPolledData` (e.g. `'live'`, `'sport'`).                                                                                                                    |
| `params`       | `Record<string, string \| number \| boolean>`         | Query params for the request. Read fresh on every tick, so it may change between renders without restarting the interval.                                                                                   |
| `returnedData` | `(response: TResponse) => TData \| null \| undefined` | Selects the value to store from `response.data`. Return `null`/`undefined` to signal "nothing usable this tick" and keep the current data.                                                                  |

## Returns

`TData` — the latest polled value, or `initialData` until a poll returns
something usable.

## How it works

1. `initialData` seeds internal state via `useState`; that state is what the hook
   returns.
2. A single `setInterval` is created inside a `useEffect` keyed on
   `[enabled, endpoint]`. When `enabled` is `false` the effect exits early, so no
   timer runs.
3. Every `POLLING_INTERVAL` (currently set to 15s as there are no requirements for other/unique polling intervals as of 19/08/2026) the interval calls `fetchPolledData(endpoint,
{ params })`. If the response has data, `returnedData` extracts the next value;
   it is stored only when it is not `null`/`undefined`.
4. `params` and `returnedData` are held in refs that are refreshed on every
   render. This lets the interval always read the newest values without listing
   them as effect dependencies — which would otherwise tear down and recreate the
   timer on every render and reset the countdown.
5. The effect's cleanup clears the interval on unmount and whenever `enabled` or
   `endpoint` changes.

## Notes

- Put all "should we poll right now?" logic into `enabled` (e.g. feature toggles,
  live status, or being on the first page of a paginated stream) rather than
  inside `returnedData`.
- `params` is compared by reference for the request but is not an effect
  dependency, so passing a new object literal each render is fine and will not
  restart the interval.
