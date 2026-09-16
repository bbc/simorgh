# FollowTopicButton

Renders a topic follow call-to-action on topic pages, with signed-in and signed-out variants.

## Props (TypeScript)

```ts
interface FollowTopicButtonProps {
  topicData: FollowTopicData;
}

interface FollowTopicData {
  topicId: string;
  title: string;
  service: Services;
  url: string;
  description?: string;
  imageUrl?: string;
}
```

## Behaviour

- Returns `null` when topic UAS personalization is not available for the current service/user context.
- Renders authenticated variant when topic UAS personalization is enabled for a signed-in user.
- Renders guest variant when topic UAS personalization is available but the user is signed out.
- Wraps rendering with `ErrorBoundary`.
- Includes a `noscript` style fallback to hide the button when JavaScript is disabled.

## Variants

### Authenticated (`FollowTopicButtonAuthenticated`)

- Uses `useTopicFollowButton` to fetch status and perform follow/unfollow actions.
- Reuses `SaveButton` for consistent visual and interaction patterns.
- Handles label transitions for loading, updating, followed and unfollow intent.
- Sends click and view tracking events.

### Guest (`FollowTopicButtonGuest`)

- Reuses `SaveButton` and opens `AccountSignInModal` via portal on click.
- Uses hydration detection to prevent mismatches between server and client label states.
- Sends click and view tracking events.

## Translations

Requires `translations.followTopicButton` keys in service config:

- `loading`
- `follow`
- `following`
- `followed`
- `unfollow`
- `unfollowAccessible`
- `unfollowing`

If these translations are missing, the authenticated variant does not render.

## Data source and dependencies

- `AccountContext`
  - `isTopicPersonalizationAvailable`
  - `isTopicPersonalizationEnabled`
  - `signInUrl`
  - `registerUrl`
- `ServiceContext`
  - `translations.followTopicButton`
- Hooks
  - `useTopicFollowButton`
  - `useHydrationDetection`
  - `useClickTrackerHandler`
  - `useViewTracker`

## Usage

```tsx
import FollowTopicButton from '#app/components/FollowTopicButton';

<FollowTopicButton
  topicData={{
    topicId: 'cw90edn9kw4t',
    title: 'India',
    service: 'hindi',
    url: 'https://www.bbc.com/hindi/topics/cw90edn9kw4t',
  }}
/>;
```

## Testing

See `index.test.tsx` for behaviour coverage including:

- personalization toggle and availability gating
- signed-in vs signed-out rendering
- modal open/close interactions for guest users
- follow/unfollow action dispatch for signed-in users
- service allowlist behaviour
- IDCTA availability behaviour
