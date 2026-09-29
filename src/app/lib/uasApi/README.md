## UAS integration in Simorgh

This folder contains the browser-side integration with BBC User Activity Service (UAS) for World Service personalisation features.

Today, this integration is used for:

- saved articles (`favourites` activity type)
- followed topics (`follows` activity type)

The main goals are:

- keep user activity scoped to World Service
- keep service-specific experiences isolated (for example `hindi` vs `mundo`)
- keep saved metadata up to date over time

## Why World Service wiring matters

UAS data for all World Service services is stored in a shared bucket:

- `resourceDomain: 'world-service-news'`

To avoid cross-service leakage, Simorgh writes service information into each activity and filters by service when reading list data.

Where this is wired:

- `createFavouritesPayload` / `createFollowsPayload` set:
  - `resourceDomain`
  - `resourceType`
  - `resourceTitle` (service)
  - `metaData.service`
  - file: `src/app/lib/uasApi/uasUtility.ts`
- `getRecentActivity` reads favourites with `resourceDomain/resourceType/action` query params and then applies service filtering in-app (`belongsToService`)
  - file: `src/app/lib/uasApi/getRecentActivity.ts`

## Request model

All UAS requests go through `uasApiRequest`:

- file: `src/app/lib/uasApi/index.ts`
- methods supported: `GET`, `POST`, `DELETE`
- auth header: `X-API-Key` from `SIMORGH_UAS_PUBLIC_API_KEY`
- credentials: `include` (browser sends auth cookies automatically)
- timeout: `UAS_CLIENT_TIMEOUT_MS = 10000`
- host:
  - live: `activity.api.bbc.com`
  - non-live: `activity.test.api.bbc.com`

Token refresh is handled before requests when needed:

- file: `src/app/lib/uasApi/tokenRefresh/tokenManager.ts`
- `refreshTokensIfExpired(isRefreshAvailable)` prevents parallel refresh races and throws `401` when refresh is unavailable and tokens are invalid.

## Global ID contract

UAS resource lookups and deletes rely on a shared global id format:

`urn:bbc:${resourceDomain}:${resourceType}:${resourceId}`

Always use `buildGlobalId` from:

- `src/app/lib/uasApi/uasUtility.ts`

Used by:

- status fetch (`GET /my/:activityType/:globalId`) via `useUASStatusHook`
- remove action (`DELETE /my/favourites/:globalId`) via `useUASButton`

## Saved article flow (end to end)

### 1) Initial status fetch

- `useUASButton` delegates to `useUASFetchSaveStatus`
- `useUASFetchSaveStatus` wraps generic `useUASStatusHook`
- status query is cached with `uasKeys.favouriteStatus(hashedUserId, articleId)`

Files:

- `src/app/hooks/useUASButton/index.ts`
- `src/app/hooks/useUASFetchSaveStatus/index.ts`
- `src/app/hooks/useUASStatusHook/index.ts`
- `src/app/lib/uasApi/queryKeys.ts`

### 2) Save action

- `useUASButton.handleSaveAction('save')` calls `upsertArticleData`
- `upsertArticleData` builds payload with `createFavouritesPayload` and sends `POST /my/favourites`
- metadata returned from `buildCurrentMetadata` is used to update cache immediately

File:

- `src/app/lib/uasApi/upsertArticleData.ts`

### 3) Remove action

- `useUASButton.handleSaveAction('remove')` builds global id and sends `DELETE /my/favourites/:globalId`

### 4) Cache updates after mutation

On success (`useUASButton`):

- status cache is updated optimistically via `setQueryData`
- favourites list queries are invalidated via `invalidateQueries`

This keeps button state instant while allowing list pages to refresh from source data.

## Metadata synchronisation

Saved article metadata can become stale if an article changes.

`useUASButton` uses `useUASMetadataSync` to compare:

- current metadata (`buildCurrentMetadata`)
- saved metadata from UAS

If different, it silently re-upserts the article metadata (without showing user action tooltip state).

Related helpers:

- `compareMetadataWithSaved`
- `sanitiseMetadataString`

File:

- `src/app/lib/uasApi/uasUtility.ts`

## Error handling

- non-2xx responses throw `UasError` with parsed JSON or text message body when available
- service-level retrieval helpers (for example `getRecentActivity`) log and rethrow
- save/remove/status hooks report failures through error tracking hooks

Files:

- `src/app/lib/uasApi/errors.ts`
- `src/app/lib/uasApi/getRecentActivity.ts`
- `src/app/hooks/useUASButton/index.ts`

## How to test UAS endpoints locally

Please refer to the documentation in the simorgh-infrastructure repo for the steps:  
[https://github.com/bbc/simorgh-infrastructure/blob/latest/documentation/testing-simorgh-uas-endpoints-locally.md](https://github.com/bbc/simorgh-infrastructure/blob/latest/documentation/testing-simorgh-uas-endpoints-locally.md)

## Testing expectations

Use existing tests in this folder and related hooks/components as a guide.

At minimum, cover:

- service and domain scoping (`world-service-news` + service filtering)
- global id generation/usage
- signed-in vs signed-out behaviour at UI boundaries
- save/remove happy paths
- loading/offline/error states
- metadata resync paths
- query cache updates and invalidation
- token refresh edge cases (`isRefreshAvailable`, refresh locking)

Useful test files:

- `src/app/lib/uasApi/index.test.ts`
- `src/app/lib/uasApi/uasUtility.test.ts`
- `src/app/lib/uasApi/getRecentActivity.test.ts`
- `src/app/lib/uasApi/upsertArticleData.test.ts`
- `src/app/lib/uasApi/tokenRefresh/tokenManager.test.ts`
- `src/app/hooks/useUASButton/index.test.tsx`

## Implementation checklist

Before shipping UAS-related changes:

- confirm feature toggle + signed-in gating are correct at call sites
- use the shared config/constants in `uasUtility.ts` (do not hardcode per-call)
- use `buildGlobalId` for lookup/delete operations
- preserve World Service scoping (domain + service)
- keep metadata shape changes backward compatible where possible
- update/add tests for behaviour changes
- update this README only when behaviour or contracts change
