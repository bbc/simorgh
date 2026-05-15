# AccountPromotionalBanner

Displays the Account Promotional Banner under the header and navigation.

## Behaviour

- Shows Banner with title, description, "sign in", "register" and close buttons when the user is signed out
- Doesn't show Banner when user is signed in
- Banner is dismissible. Dismissals are remembered for `ACCOUNT_BANNER_DISMISS_INTERVAL_MS` (10 days) and the banner is permanently hidden after `ACCOUNT_BANNER_MAX_DISMISSALS` (3) dismissals.

## Data source

- Uses `AccountContext` to determine signed-in state and the initial banner visibility (computed on the server from the request cookies, see `utilities.ts`).

## Avoiding layout shift

- Visibility is determined from cookies (`accountPromoDismissals` and `accountPromoLastDismissed`) which are sent with the request, so the initial visibility is computed at SSR.
- The pre-computed visibility is provided to the banner via `AccountContext.isAccountPromoBannerVisible`, so the server-rendered HTML matches the client's initial render and there is no post-hydration flash.
- Dismissals are written back to the same cookies on the client.

## Storybook

- `Signed Out`
- `Signed In`
