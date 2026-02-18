# AccountPromotionalBanner

Displays the Account Promotional Banner under the header and navigation.

## Behaviour
- Shows Banner with title, description, "sign in", "register" and close buttons when the user is signed out
- Doesn't show Banner when user is signed in

## Data source
- Uses `AccountContext` to determine signed-in state

## Storybook
- `Signed Out`
- `Signed In`

This is an initial MVP version. Styling and IDCTA integration will follow in later tickets.