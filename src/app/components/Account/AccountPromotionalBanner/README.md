# AccountPromotionalBanner

Displays the Account Promotional Banner under the header and navigation.

## Behaviour

- Shows Banner with title, description, "sign in", "register" and close buttons when the user is signed out
- Doesn't show Banner when user is signed in
- Banner is dismissible. Dismissals are remembered for `ACCOUNT_BANNER_DISMISS_INTERVAL_MS` (10 days) and the banner is permanently hidden after `ACCOUNT_BANNER_MAX_DISMISSALS` (3) dismissals.

## Data source

- Uses `AccountContext` to determine signed-in state.

## Dismissal storage

- Visibility and dismissal count are tracked via `localStorage` (`account_promotional_banner_dismissals` and `account_promotional_banner_last_dismissed`).
- On first render the component reads localStorage to decide whether to show the banner.
- On dismissal the counts are written back to localStorage.

## Storybook

- `Signed Out`
- `Signed In`
